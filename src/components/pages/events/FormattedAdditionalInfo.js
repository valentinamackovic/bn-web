import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinkifyReact from "linkifyjs/react";

import {
	textColorPrimary,
	secondaryHex,
	fontFamilyDemiBold,
	fontFamilyBold
} from "../../../config/theme";
import Hidden from "@material-ui/core/Hidden";

const styles = theme => ({
	root: {},
	readMoreLink: {
		font: "inherit",
		color: secondaryHex,
		cursor: "pointer"
	}
});

const ADDITIONAL_INFO_CHAR_LIMIT = 300;

class FormattedAdditionalInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showAllAdditionalInfo: false
		};
	}

	showHideMoreAdditionalInfo() {
		this.setState(({ showAllAdditionalInfo }) => ({
			showAllAdditionalInfo: !showAllAdditionalInfo
		}));
	}

	render() {
		const { classes, children } = this.props;

		if (!children) {
			return null;
		}

		const { showAllAdditionalInfo } = this.state;

		const options = {
			nl2br: true,
			className: classes.eventDescriptionLink
		};

		//TODO limit chars

		return (
			<div className={classes.root}>
				<LinkifyReact options={options}>{children}</LinkifyReact>

				<span
					className={classes.readMoreLink}
					onClick={this.showHideMoreAdditionalInfo.bind(this)}
				>
					{showAllAdditionalInfo ? "Read less" : "Read more"}
				</span>

				{/*<Typography className={classes.eventDetailText}>*/}
				{/*	{showAllAdditionalInfo ||*/}
				{/*	additional_info.length <= ADDITIONAL_INFO_CHAR_LIMIT ? (*/}
				{/*			<FormattedAdditionalInfo>*/}
				{/*				{additional_info}*/}
				{/*			</FormattedAdditionalInfo>*/}
				{/*		) : (*/}
				{/*			nl2br(*/}
				{/*				ellipsis(additional_info, ADDITIONAL_INFO_CHAR_LIMIT)*/}
				{/*			)*/}
				{/*		)}*/}

				{/*	{additional_info &&*/}
				{/*	additional_info.length > ADDITIONAL_INFO_CHAR_LIMIT ? (*/}
				{/*			<span*/}
				{/*				className={classes.eventDetailLinkText}*/}
				{/*				onClick={this.showHideMoreAdditionalInfo.bind(this)}*/}
				{/*			>*/}
				{/*				{showAllAdditionalInfo ? "Read less" : "Read more"}*/}
				{/*			</span>*/}
				{/*		) : null}*/}
				{/*</Typography>*/}

				<p>
					<Hidden mdUp>Mobile</Hidden>

					<Hidden smDown>Desktop</Hidden>
				</p>
			</div>
		);
	}
}

FormattedAdditionalInfo.defaultProps = { children: "" };

FormattedAdditionalInfo.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.string.isRequired
};

export default withStyles(styles)(FormattedAdditionalInfo);
