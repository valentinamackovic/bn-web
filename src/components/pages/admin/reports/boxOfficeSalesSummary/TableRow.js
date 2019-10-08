import React from "react";
import PropTypes from "prop-types";
import { withStyles, Typography } from "@material-ui/core";
import classNames from "classnames";
import { fontFamilyDemiBold, primaryHex } from "../../../../../config/theme";

const styles = theme => {
	return {
		root: {
			paddingLeft: theme.spacing.unit * 2,
			paddingRight: theme.spacing.unit * 2,
			paddingTop: theme.spacing.unit,
			paddingBottom: theme.spacing.unit,
			display: "flex"
		},
		default: {},
		gray: {
			backgroundColor: "#f5f7fa"
		},
		heading: {
			backgroundColor: "#000000",
			borderTopLeftRadius: 8,
			borderTopRightRadius: 8
		},
		subHeading: {
			backgroundColor: "#f5f7fa",
			fontFamily: fontFamilyDemiBold
		},
		headingText: {
			fontSize: theme.typography.fontSize,
			color: "#FFFFFF",
			textTransform: "capitalize"
		},
		total: {
			backgroundColor: primaryHex,
			borderBottomLeftRadius: 8,
			borderBottomRightRadius: 8
		},
		totalText: {
			color: "#FFFFFF",
			borderRadius: 4,
			fontFamily: fontFamilyDemiBold,
			textTransform: "uppercase"
		},
		text: {
			fontSize: theme.typography.fontSize
		}
	};
};

const TableRow = props => {
	const {
		columnStyles,
		heading,
		subHeading,
		gray,
		children,
		classes,
		total,
		...rest
	} = props;

	// const columnStyles = [
	// 	{ flex: 3, textAlign: "left" },
	// 	{ flex: 2, textAlign: "left" },
	// 	{ flex: 2, textAlign: "left" },
	// 	{ flex: 2, textAlign: "left" },
	// 	{ flex: 2, textAlign: "left" },
	// 	{ flex: 2, textAlign: "left" },
	// 	{ flex: 2, textAlign: "left" },
	// 	{ flex: 2, textAlign: "left" },
	// 	{ flex: 2, textAlign: "left" },
	// 	{ flex: 2, textAlign: "left" }
	// ];

	const columns = children.map((text, index) => {
		return (
			<Typography
				noWrap
				className={classNames({
					[classes.headingText]: heading,
					[classes.subHeading]: subHeading,
					[classes.text]: !heading,
					[classes.totalText]: total
				})}
				key={index}
				style={columnStyles[index]}
			>
				{text}
			</Typography>
		);
	});

	return (
		<div
			className={classNames({
				[classes.root]: true,
				[classes.gray]: gray,
				[classes.total]: total,
				[classes.heading]: heading,
				[classes.subHeading]: subHeading
			})}
			{...rest}
		>
			{columns}
		</div>
	);
};

TableRow.propTypes = {
	classes: PropTypes.object.isRequired,
	columnStyles: PropTypes.array.isRequired,
	children: PropTypes.array.isRequired,
	gray: PropTypes.bool,
	total: PropTypes.bool,
	heading: PropTypes.bool,
	subHeading: PropTypes.bool
};

export default withStyles(styles)(TableRow);
