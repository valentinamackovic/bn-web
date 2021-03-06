import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import classNames from "classnames";

const styles = theme => ({
	root: {
		display: "flex",
		paddingTop: theme.spacing.unit * 2,
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

const FanActivityMobileRow = props => {
	const { heading, children, shaded, classes } = props;

	const columnStyles = [
		{ flex: 3, textAlign: "left" },
		{ flex: 3, textAlign: "left" },
		{ flex: 3, textAlign: "left" }
	];

	const columns = children.map((child, index) => {
		return (
			<span
				className={classNames({ [classes.heading]: heading })}
				key={index}
				style={columnStyles[index]}
			>
				{child}
			</span>
		);
	});

	return (
		<div
			className={classNames({
				[classes.root]: true,
				[classes.shaded]: !!shaded
			})}
		>
			{columns}
		</div>
	);
};

FanActivityMobileRow.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.array.isRequired,
	heading: PropTypes.bool,
	shaded: PropTypes.bool
};

export default withStyles(styles)(FanActivityMobileRow);
