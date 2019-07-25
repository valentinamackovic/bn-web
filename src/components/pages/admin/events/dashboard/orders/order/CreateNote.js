import React, { Component } from "react";
import { Typography, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import classnames from "classnames";

import notifications from "../../../../../../../stores/notifications";
import Bigneon from "../../../../../../../helpers/bigneon";
import Button from "../../../../../../elements/Button";
import BoxInput from "../../../../../../elements/form/BoxInput";

const styles = theme => ({
	root: {},
	buttonContainer: {
		marginTop: 15,
		display: "flex",
		justifyContent: "flex-end"
	}
});

class CreateNote extends Component {
	constructor(props) {
		super(props);

		this.state = {
			note: "",
			isSaving: false
		};
	}

	saveNote() {
		const { orderId, onSuccess } = this.props;
		const { note } = this.state;

		this.setState({ isSaving: true });

		Bigneon()
			.notes.create({ main_table: "orders", id: orderId, note })
			.then(response => {
				const { data } = response;
				notifications.show({ variant: "success", message: "Note saved." });
				this.setState({ note: "" });
				onSuccess();
			})
			.catch(error => {
				console.error(error);

				notifications.showFromErrorResponse({
					defaultMessage: "Saving note failed.",
					error
				});
			})
			.finally(() => {
				this.setState({ isSaving: false });
			});
	}

	render() {
		const { classes } = this.props;
		const { isSaving, note } = this.state;

		return (
			<div className={classes.root}>
				<BoxInput
					name={"note"}
					placeholder={"Type your note here..."}
					value={note}
					onChange={e => this.setState({ note: e.target.value })}
					variant={"textarea"}
				/>
				<div className={classes.buttonContainer}>
					<Button
						disabled={isSaving || !note}
						variant={"secondary"}
						onClick={this.saveNote.bind(this)}
						style={{ minWidth: 100 }}
					>
						{isSaving ? "Saving..." : "Add"}
					</Button>
				</div>
			</div>
		);
	}
}

CreateNote.propTypes = {
	classes: PropTypes.object.isRequired,
	orderId: PropTypes.string.isRequired,
	onSuccess: PropTypes.func.isRequired
};

export default withStyles(styles)(CreateNote);
