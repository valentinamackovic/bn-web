import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Dialog from "../../../elements/Dialog";
import { fontFamilyDemiBold } from "../../../../config/theme";

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

class DeleteCancelEventDialog extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			isSubmitting: false
		};
	}

	render() {
		const { onClose, id, classes, isDelete } = this.props;
		const { name, isSubmitting } = this.state;

		return (
			<Dialog
				open={!!id}
				onClose={onClose}
				title={isDelete ? "Delete Event" : "Cancel Event"}
			>
				<div className={classes.desktopCardFooterContainer}>
					<Typography>With the Big Neon App you can:</Typography>
					<div className={classes.iconText}>
						<Typography className={classes.desktopFooterText}>
							<span className={classes.icon}>&#x1F46F;</span>
							Transfer tickets to friends
						</Typography>
						<Typography className={classes.desktopFooterText}>
							<span className={classes.icon}>&#x1F430;</span>
							Speed through the line
						</Typography>
						<Typography className={classes.desktopFooterText}>
							<span className={classes.icon}>&#x1F379;</span>
							Score presale access to events
						</Typography>
					</div>
				</div>
			</Dialog>
		);
	}
}

DeleteCancelEventDialog.propTypes = {
	id: PropTypes.string,
	onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(DeleteCancelEventDialog);
