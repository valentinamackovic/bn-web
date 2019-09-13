import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import classnames from "classnames";

import { fontFamilyDemiBold } from "../../../../../../../config/theme";

const styles = theme => ({
	text: {
		marginBottom: 10,
		fontSize: 28,
		fontFamily: fontFamilyDemiBold
	}
});

const Heading = ({ children, classes, className }) => {
	return (
		<Typography className={classnames(classes.text, className)}>
			{children}
		</Typography>
	);
};

Heading.propTypes = {
	children: PropTypes.any.isRequired,
	classes: PropTypes.object.isRequired,
	className: PropTypes.string
};

export default withStyles(styles)(Heading);
