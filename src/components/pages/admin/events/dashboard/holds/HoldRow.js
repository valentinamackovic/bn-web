import React from "react";
import PropTypes from "prop-types";
import { withStyles, Typography, Hidden, Collapse } from "@material-ui/core";
import classNames from "classnames";
import Card from "../../../../../elements/Card";
import Divider from "../../../../../common/Divider";

const styles = theme => {
	return {
		root: {
			paddingLeft: theme.spacing.unit * 2,
			paddingRight: theme.spacing.unit * 2,

			paddingTop: theme.spacing.unit * 2,
			paddingBottom: theme.spacing.unit * 2,

			display: "flex",
			borderRadius: 4
		},
		default: {},
		gray: {
			backgroundColor: "#f5f7fa"
		},
		active: {
			backgroundColor: theme.palette.secondary.main,
			color: "#FFFFFF"
		},
		text: {},
		activeText: {
			color: "#FFFFFF"
		},
		headingText: {
			fontSize: theme.typography.caption.fontSize
		},
		icon: {
			marginLeft: theme.spacing.unit * 2,
			width: 14,
			height: 14,
			cursor: "pointer"
		},
		mobileRow: {
			display: "flex",
			flex: 1,
			justifyContent: "space-between"
		},
		mobileCard: {
			borderRadius: 6,
			marginTop: theme.spacing.unit * 2,
			padding: theme.spacing.unit * 2
		}
	};
};

const HoldRow = props => {
	const {
		heading,
		gray,
		active,
		onExpand,
		children,
		classes,
		expanded,
		actions,
		...rest
	} = props;

	const columnStyles = [
		{ flex: 3, textAlign: "left" },
		{ flex: 2, textAlign: "left" },
		{ flex: 3, textAlign: "center" },
		{ flex: 2, textAlign: "center" },
		{ flex: 2, textAlign: "center" },
		{ flex: 2, textAlign: "left" },
		{ flex: 2, textAlign: "left" }
	];

	const columns = children.map((text, index) => {
		const className = heading
			? classes.headingText
			: active
				? classes.activeText
				: classes.text;
		return (
			<Typography className={className} key={index} style={columnStyles[index]}>
				{text}
			</Typography>
		);
	});

	let actionButtons = <span>&nbsp;</span>;
	if (actions) {
		actionButtons = (
			<span>
				{actions.map(({ id, name, iconUrl, onClick }) => (
					<span
						key={name}
						onClick={e => {
							// e.stopPropagation();
							// e.nativeEvent.stopImmediatePropagation();
							onClick && onClick(id, name);
						}}
					>
						<img alt={name} src={iconUrl} className={classes.icon}/>
					</span>
				))}
			</span>
		);
	}

	return (
		<div>
			{/*DESKTOP*/}
			<Hidden smDown>
				<div
					className={classNames(
						classes.root,
						gray ? classes.gray : "",
						active ? classes.active : ""
					)}
					{...rest}
				>
					{columns}

					{actionButtons}
				</div>
			</Hidden>

			{/*MOBILE*/}
			<Hidden mdUp>
				<Card variant={"block"} className={classes.mobileCard}>
					<div className={classes.mobileSummarySection} onClick={onExpand}>
						<div className={classes.mobileRow}>{columns}</div>
					</div>

					<Collapse in={expanded}>
						<Divider/>
						{actionButtons}
					</Collapse>
				</Card>
			</Hidden>
		</div>
	);
};

HoldRow.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.array.isRequired,
	gray: PropTypes.bool,
	active: PropTypes.bool,
	heading: PropTypes.bool,
	actions: PropTypes.array
};

export default withStyles(styles)(HoldRow);
