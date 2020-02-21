import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Dialog from "../../elements/Dialog";
import { fontFamily, fontFamilyDemiBold } from "../../../config/theme";
import Button from "../../elements/Button";

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
	},
	lightGreyText: {
		fontSize: 16,
		color: "#9BA3B5",
		fontfamily: fontFamily,
		lineHeight: "18px"
	},
	modalContainer: {
		maxWidth: 308
	},
	customTitle: {
		fontSize: 26
	}
});

class BigneonPerksDialog extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			isSubmitting: false
		};
	}

	render() {
		const { onClose, open, classes, isDelete } = this.props;
		const { name, isSubmitting } = this.state;

		return (
			<Dialog
				// open={open}
				open={true}
				onClose={onClose}
			>
				<div className={classes.modalContainer}>
					<Typography className={classes.customTitle}>
						Life is Better with the Big Neon App!
					</Typography>
					<Typography className={classes.lightGreyText}>
						The Big Neon app makes your tickets more secure and unlocks a richer
						experience at the event. Don’t want to use the app? Just bring your
						photo ID to the event instead.
					</Typography>
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
					<Button
						variant={"secondary"}
						size={"mediumLarge"}
						onClick={onClose()}
					>
						Awesome
					</Button>
				</div>
			</Dialog>
		);
	}
}

BigneonPerksDialog.propTypes = {
	id: PropTypes.string,
	onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(BigneonPerksDialog);
