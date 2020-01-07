import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Collapse } from "@material-ui/core";
import PropTypes from "prop-types";

import Card from "../../../../../elements/Card";
import { fontFamilyDemiBold } from "../../../../../../config/theme";
import Hidden from "@material-ui/core/Hidden";
import Button from "../../../../../elements/Button";
import { Link } from "react-router-dom";

const styles = theme => {
	return {
		root: {
			padding: 20,

			[theme.breakpoints.up("md")]: {
				padding: 40
			}
		},
		topRow: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",

			[theme.breakpoints.down("sm")]: {
				cursor: "pointer"
			}
		},
		titleText: {
			fontFamily: fontFamilyDemiBold,
			fontSize: 19
		},
		icon: {
			height: 6.5,
			width: "auto",
			display: "none",
			[theme.breakpoints.down("sm")]: {
				display: "block"
			}
		}
	};
};

class CollapseCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			expanded: true
		};

		this.toggle = this.toggleExpand.bind(this);
	}

	toggleExpand() {
		this.setState(({ expanded }) => {
			return { expanded: !expanded };
		});
	}

	render() {
		const { classes, title, children } = this.props;
		const { expanded } = this.state;

		return (
			<Card className={classes.root}>
				<Hidden smDown>{children}</Hidden>
				<Hidden mdUp>
					<div className={classes.topRow} onClick={this.toggle}>
						<Typography className={classes.titleText}>{title}</Typography>
						<img
							src={`/icons/${expanded ? "up" : "down"}-active.svg`}
							className={classes.icon}
						/>
					</div>
					<Collapse in={expanded}>{children}</Collapse>
				</Hidden>
			</Card>
		);
	}
}

CollapseCard.propTypes = {
	classes: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	children: PropTypes.any.isRequired
};

export default withStyles(styles)(CollapseCard);
