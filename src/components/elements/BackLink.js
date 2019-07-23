import React from "react";
import { Hidden, Typography, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { fontFamilyDemiBold, secondaryHex } from "../../config/theme";

const styles = theme => ({
	root: {
		display: "flex"
	},
	linkText: {
		color: secondaryHex,
		fontFamily: fontFamilyDemiBold,

		[theme.breakpoints.down("xs")]: {
			textTransform: "uppercase"
		}
	},
	icon: {
		marginRight: 5,
		marginBottom: 4
	}
});

const BackLink = ({ classes, children, to }) => {
	return (
		<Link className={classes.root} to={to}>
			<Hidden mdUp>
				<img className={classes.icon} src={"/icons/left-active.svg"}/>{" "}
			</Hidden>
			<Typography className={classes.linkText}>{children}</Typography>
		</Link>
	);
};

BackLink.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired
};

export default withStyles(styles)(BackLink);
