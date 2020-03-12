import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import notifications from "../../../../stores/notifications";
import Button from "../../../elements/Button";
import Dialog from "../../../elements/Dialog";
import Bigneon from "../../../../helpers/bigneon";
import { fontFamilyDemiBold } from "../../../../config/theme";

class DeleteAnnouncementDialog extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			isSubmitting: false
		};
	}

	onSubmit() {
		const { onClose, id } = this.props;
		this.setState({ isSubmitting: true });

		Bigneon()
			.announcements.del({ id })
			.then(response => {
				this.setState({ isSubmitting: false }, () => {
					onClose();
				});
			})
			.catch(error => {
				console.error(error);
				this.setState({ isSubmitting: false });

				notifications.showFromErrorResponse({
					defaultMessage: "Deleting Announcement failed",
					error
				});
			});
	}

	render() {
		const { onClose, classes, open } = this.props;
		const { isSubmitting } = this.state;

		return (
			<Dialog open={open} onClose={onClose} title={"Delete Announcement"}>
				<form noValidate autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
					<div>
						<Typography>
							Are you sure you want to delete this announcement?
						</Typography>
					</div>
					<div className={classes.btnContainer}>
						<Button
							className={classes.btnStyle}
							onClick={onClose()}
							color="primary"
						>
							Keep Announcement
						</Button>
						<Button
							className={classes.btnStyle}
							disabled={isSubmitting}
							type="submit"
							variant="secondary8border"
						>
							{isSubmitting ? "Deleting..." : "Delete"}
						</Button>
					</div>
				</form>
			</Dialog>
		);
	}
}

const styles = theme => ({
	btnStyle: {
		flex: 1,
		marginRight: theme.spacing.unit
	},
	btnContainer: {
		display: "flex",
		marginTop: theme.spacing.unit * 2,
		justifyItems: "space-between"
	},
	nameText: {
		marginTop: theme.spacing.unit,
		fontFamily: fontFamilyDemiBold
	}
});

DeleteAnnouncementDialog.propTypes = {
	id: PropTypes.string,
	onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(DeleteAnnouncementDialog);
