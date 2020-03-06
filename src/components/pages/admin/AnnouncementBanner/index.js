import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import classNames from "classnames";

const styles = theme => ({
	root: {
		paddingLeft: theme.spacing.unit * 2,
		paddingRight: theme.spacing.unit * 2,
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
		display: "flex",
		alignItems: "center"
	},
	shaded: {
		backgroundColor: "#F5F7FA",
		borderRadius: 8
	},
	heading: {
		textTransform: "capitalize"
	}
});

const AnnouncementBanner = props => {
	const { heading, children, shaded, classes } = props;

	return (
		<div className={classNames.root}>
			<div>hello</div>
		</div>
	);
};

AnnouncementBanner.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.array.isRequired,
	heading: PropTypes.bool,
	shaded: PropTypes.bool
};

export default withStyles(styles)(AnnouncementBanner);
