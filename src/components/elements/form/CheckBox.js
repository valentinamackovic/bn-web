import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { fontFamilyDemiBold, textColorPrimary } from "../../../config/theme";
import classNames from "classnames";
import servedImage from "../../../helpers/imagePathHelper";

const styles = theme => {
	return {
		root: {
			cursor: "pointer",
			marginRight: theme.spacing.unit * 2,
			display: "flex"
		},
		label: { color: "#868f9b", paddingTop: 2 },
		labelActive: {
			fontFamily: fontFamilyDemiBold,
			color: textColorPrimary
		},
		square: {
			marginRight: theme.spacing.unit,
			borderStyle: "solid",
			borderWidth: 0.5,
			borderRadius: 4
		},
		default: {
			backgroundColor: "#afc6d4",
			opacity: 0.2,
			borderColor: "#9da3b4"
		},
		white: {
			backgroundColor: "#ffffff",
			borderColor: "#d1d1d1"
		},
		activeSquare: {
			backgroundImage: "linear-gradient(229deg, #e53d96, #5491cc)",
			marginRight: theme.spacing.unit,
			borderRadius: 4,
			display: "flex",
			justifyContent: "center",
			alignItems: "center"
		},
		disabledRoot: {
			cursor: "default"
		},
		disabledActiveSquare: {
			backgroundImage:
				"linear-gradient(229deg, rgb(229,61,150,0.5), rgb(84,145,204,0.5))"
		},
		checkmark: {
			width: 12,
			height: 12
		},
		small: {
			width: 18,
			height: 18
		},
		medium: {
			width: 20,
			height: 20
		}
	};
};

const CheckBox = ({
	active,
	children,
	onClick,
	classes,
	disabled,
	style = {},
	labelClass,
	variant,
	size
}) => {
	return (
		<div
			className={classNames({
				[classes.root]: true,
				[classes.disabledRoot]: !!disabled
			})}
			onClick={!disabled ? onClick : null}
			style={style}
		>
			{active ? (
				<div
					className={classNames({
						[classes.activeSquare]: true,
						[classes.disabledActiveSquare]: !!disabled,
						[classes[size]]: true
					})}
				>
					<img
						className={classes.checkmark}
						src={servedImage("/icons/checkmark-white.svg")}
					/>
				</div>
			) : (
				<div
					className={classNames({
						[classes.square]: true,
						[classes[variant]]: true,
						[classes[size]]: true
					})}
				/>
			)}
			{children ? (
				<Typography
					className={classNames({
						[classes.label]: true,
						[classes.labelActive]: !!active,
						[labelClass]: !!labelClass
					})}
				>
					{children}
				</Typography>
			) : null}
		</div>
	);
};

CheckBox.defaultProps = {
	variant: "default",
	size: "medium"
};

CheckBox.propTypes = {
	active: PropTypes.bool.isRequired,
	children: PropTypes.string,
	labelClass: PropTypes.string,
	classes: PropTypes.object.isRequired,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	style: PropTypes.object,
	variant: PropTypes.oneOf(["default", "white"]),
	size: PropTypes.oneOf(["small", "medium"])
};

export default withStyles(styles)(CheckBox);
