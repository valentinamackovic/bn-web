import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";

const Button = ({ classes, type, onClick, disabled }) => {
	return (
		<div
			onClick={onClick}
			className={classnames({
				noselect: true,
				[classes.button]: true,
				[classes.plusContainer]: type === "plus",
				[classes.minusContainer]: type === "minus",
				[classes.disabled]: !disabled
			})}
		>
			{type === "minus" ? (
				<Typography className={classes.minusText}>-</Typography>
			) : null}
			{type === "plus" ? (
				<Typography className={classes.plusText}>+</Typography>
			) : null}
		</div>
	);
};

const NumberSelect = ({
	classes,
	children,
	onIncrement,
	onDecrement,
	style = {},
	available
}) => {
	return (
		<div className={classes.root} style={style}>
			<Button type="minus" classes={classes} onClick={onDecrement}/>
			<Typography className={classes.value}>{children || "0"}</Typography>
			<Button type="plus" classes={classes} onClick={onIncrement} disabled={available}/>
		</div>
	);
};

NumberSelect.propTypes = {
	children: PropTypes.number,
	classes: PropTypes.object.isRequired,
	onIncrement: PropTypes.func.isRequired,
	onDecrement: PropTypes.func.isRequired,
	style: PropTypes.object,
	available: PropTypes.bool
};

const styles = theme => {
	return {
		root: {
			display: "flex",
			justifyContent: "space-between",
			alignContent: "center",
			alignItems: "center",
			height: "100%",
			maxHeight: 40,
			width: "100%",
			maxWidth: 180,
			[theme.breakpoints.down("xs")]: {
				maxWidth: 80
			}
		},
		value: {
			fontSize: theme.typography.fontSize * 1.7,
			margin: 0,
			height: "100%",
			[theme.breakpoints.up("md")]: {
				paddingTop: 10
			},
			[theme.breakpoints.down("sm")]: {
				paddingTop: 2,
				fontSize: theme.typography.fontSize * 1.8
			},
			[theme.breakpoints.down("xs")]: {
				paddingTop: 4,
				fontSize: theme.typography.fontSize * 1.5
			}
		},
		button: {
			cursor: "pointer",
			borderRadius: 30,
			width: 22,
			height: 22,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			paddingTop: 3,
			[theme.breakpoints.down("xs")]: {
				width: 20,
				height: 20,
				borderRadius: 20,
				paddingTop: 2
			}
		},
		plusContainer: {
			backgroundColor: theme.palette.secondary.main
		},
		disabled: {
			backgroundColor: "#FFE8F7"
		},
		minusContainer: {
			backgroundColor: "#f5f6f7"
		},
		minusText: {
			lineHeight: 0,
			color: "black"
		},
		plusText: {
			lineHeight: 0,
			color: "#FFFFFF"
		}
	};
};

export default withStyles(styles)(NumberSelect);
