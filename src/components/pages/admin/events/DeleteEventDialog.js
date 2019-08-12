import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import notifications from "../../../../stores/notifications";
import Button from "../../../elements/Button";
import Dialog from "../../../elements/Dialog";
import Bigneon from "../../../../helpers/bigneon";

const styles = {};

class DeleteEventDialog extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			isSubmitting: false
		};
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		//TODO check if the ID changed, if it did pull the event details into state
		const { id } = this.props;

		if (id && prevProps.id !== id) {
			Bigneon()
				.events.read({ id })
				.then(response => {
					const { artists, organization, venue, ...event } = response.data;
					const { name } = event;
					this.setState({
						name
					});
				})
				.catch(error => {
					console.error(error);
					let message = "Loading event details failed.";
					if (
						error.response &&
						error.response.data &&
						error.response.data.error
					) {
						message = error.response.data.error;
					}

					notifications.show({
						message,
						variant: "error"
					});
				});
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const { onClose, id } = this.props;

		this.setState({ isSubmitting: true });

		Bigneon()
			.events.delete({ id })
			.then(response => {
				this.setState({ isSubmitting: false }, () => onClose());
			})
			.catch(error => {
				console.error(error);
				this.setState({ isSubmitting: false });

				notifications.showFromErrorResponse({
					defaultMessage: "Deleting event failed.",
					variant: "error"
				});
			});
	}

	render() {
		const { onClose, id } = this.props;
		const { name, isSubmitting } = this.state;

		return (
			<Dialog open={!!id} onClose={onClose} title={"Delete event"}>
				<form noValidate autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
					<div>
						<Typography>
							Are you sure you want to permanently delete this event?
						</Typography>
						{name ? <Typography>{name}</Typography> : null}
					</div>
					<div>
						<br/>
						<Button
							style={{ marginRight: 10 }}
							onClick={onClose}
							color="primary"
						>
							Keep event
						</Button>
						<Button disabled={isSubmitting} type="submit" variant="warning">
							{isSubmitting ? "Deleting..." : "Delete event"}
						</Button>
					</div>
				</form>
			</Dialog>
		);
	}
}

DeleteEventDialog.propTypes = {
	id: PropTypes.string,
	onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(DeleteEventDialog);
