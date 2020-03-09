import React from "react";
import PropTypes from "prop-types";
import { Card, Typography, withStyles } from "@material-ui/core";
import classNames from "classnames";

const AnnouncementBanner = props => {
	const { heading, children, shaded, classes } = props;

	return (
		<div className={classes.root}>
			<Typography className={classNames.bannerText}>
				this a test announcement llabdgskfgdksufhodls this a test announcement
				llabdgskfgdksufhodls this a test announcement llabdgskfgdksufhodls this
				a test announcement llabdgskfgdksufhodls this a test announcement
				llabdgskfgdksufhodls this a test announcement llabdgskfgdksufhodls
			</Typography>
		</div>
	);
};

const styles = theme => ({
	root: {
		paddingLeft: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit * 2,
		borderBottom: "1px solid #ececec",
		marginBottom: theme.spacing.unit * 2
	}
});

AnnouncementBanner.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.array.isRequired,
	heading: PropTypes.bool,
	shaded: PropTypes.bool
};

export default withStyles(styles)(AnnouncementBanner);
