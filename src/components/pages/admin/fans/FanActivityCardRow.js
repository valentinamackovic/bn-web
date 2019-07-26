import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import classNames from "classnames";

const styles = theme => {
	return {
		root: {
			display: "flex",
			alignItems: "center"
		},
		shaded: {
			backgroundColor: "#F5F7FA",
			borderRadius: 8
		},
		heading: {
			textTransform: "capitalize"
		},
		col1: {
			flex: 1,
			textAlign: "center"
		},
		col2: {
			flex: 3,
			textAlign: "left",
			[theme.breakpoints.only("lg")]: {
				flex: 4
			}
		},
		col4: {
			flex: 14,
			textAlign: "left"
		},
		col5: {
			flex: 3,
			textAlign: "right"
		}
	};
};

const FanActivityCardRow = props => {
	const { heading, children, shaded, classes } = props;

	const columns = children.map((child, index) => {
		return (
			<span
				className={classNames({
					[classes.heading]: heading,
					[classes[`col${index}`]]: true
				})}
				key={index}
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

FanActivityCardRow.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.array.isRequired,
	heading: PropTypes.bool,
	shaded: PropTypes.bool
};

export default withStyles(styles)(FanActivityCardRow);
