import React from "react";
import PropTypes from "prop-types";
import { withStyles, Typography } from "@material-ui/core";
import classNames from "classnames";
import { fontFamilyDemiBold } from "../../../../../../../config/theme";

const styles = theme => {
	return {
		root: {
			paddingLeft: theme.spacing.unit * 2,
			paddingRight: theme.spacing.unit * 2,

			paddingTop: theme.spacing.unit,
			paddingBottom: theme.spacing.unit,

			display: "flex"
		},
		gray: {
			backgroundColor: "#f5f7fa"
		},
		heading: {
			backgroundColor: "#000000",
			borderTopLeftRadius: 8,
			borderTopRightRadius: 8,
			fontFamily: fontFamilyDemiBold
		},
		headingText: {
			fontSize: 14,
			color: "#FFFFFF"
			//textOverflow: "ellipses"
		},
		text: {
			fontSize: 16
			//textOverflow: "ellipses"
		}
	};
};

const PageViewsRow = props => {
	const { heading, gray, children, classes } = props;

	const columnStyles = [
		{ flex: 3, textAlign: "left" },
		{ flex: 2, textAlign: "left" },
		{ flex: 2, textAlign: "left" },
		{ flex: 2, textAlign: "left" },
		{ flex: 2, textAlign: "left" }
	];

	const columns = children.map((text, index) => {
		return (
			<Typography
				noWrap
				className={classNames({
					[classes.headingText]: heading,
					[classes.text]: !heading
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
				[classes.heading]: heading
			})}
		>
			{columns}
		</div>
	);
};

PageViewsRow.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.array.isRequired,
	gray: PropTypes.bool,
	heading: PropTypes.bool
};

export default withStyles(styles)(PageViewsRow);
