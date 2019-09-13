//Base component https://material-ui.com/api/button/
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import classnames from "classnames";
import servedImage from "../../helpers/imagePathHelper";

const styles = theme => {
	return {
		root: {
			border: 0
		},
		icon: {}
	};
};

const CustomIconButton = props => {
	const { children, classes, iconUrl, iconClass, ...rest } = props;

	return (
		<IconButton
			classes={{
				root: classnames(classes.root)
			}}
			{...rest}
		>
			<img
				alt={children || ""}
				className={classnames(classes.icon, iconClass)}
				src={servedImage(iconUrl)}
			/>
		</IconButton>
	);
};
CustomIconButton.defaultProps = {
	iconClass: ""
};

CustomIconButton.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.oneOfType([PropTypes.string]).isRequired,
	iconUrl: PropTypes.string,
	iconClass: PropTypes.string
};

export default withStyles(styles)(CustomIconButton);
