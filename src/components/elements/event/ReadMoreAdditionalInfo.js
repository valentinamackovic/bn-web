import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import linkifyHtml from "linkifyjs/html";
import classnames from "classnames";

import { secondaryHex, fontFamilyDemiBold } from "../../../config/theme";
import "../../pages/events/rich-event-description.css";
import substringIgnoreHtml from "../../../helpers/substringIgnoreHtml";

const styles = theme => ({
	root: {
		paddingTop: 10,
		[theme.breakpoints.down("sm")]: {
			paddingTop: 0
		}
	},
	readMoreLink: {
		font: "inherit",
		color: secondaryHex,
		cursor: "pointer",
		marginTop: 10,
		marginBottom: 10,
		display: "block",
		fontWeight: 100
	},
	textBlock: {
		display: "-webkit-box"
	},
	descriptionLink: {
		font: "inherit",
		color: secondaryHex,
		cursor: "pointer",
		fontFamily: fontFamilyDemiBold
	},
	shortenedTextBlock: {
		height: 150,
		overflow: "hidden",
		textOverflow: "elipsis"
	}
});

class ReadMoreAdditionalInfo extends Component {
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
		const { classes, children, readMoreText, readLessText } = this.props;

		if (!children) {
			return null;
		}

		const { showAllAdditionalInfo } = this.state;

		const options = {
			nl2br: true,
			className: classes.descriptionLink
		};

		const linkifiedText = linkifyHtml(children, options);

		//Remove html chars to get an accurate character length
		const removeHtml = linkifiedText.replace(/<[^>]*>?/gm, "");
		const maxLength = 190;

		const readMore = (
			<span
				className={classes.readMoreLink}
				onClick={this.showHideMoreAdditionalInfo.bind(this)}
			>
				{showAllAdditionalInfo ? readLessText : readMoreText}
			</span>
		);

		//Exclude html tags for the initial shortened text of the description
		const toShow = substringIgnoreHtml(linkifiedText, maxLength);

		return (
			<div className={classes.root}>
				{removeHtml.length < maxLength ? (
					<span
						className={classnames({
							[classes.textBlock]: true
						})}
					>
						<div
							className={"rich-edit-content"}
							dangerouslySetInnerHTML={{ __html: linkifiedText }}
						/>
					</span>
				) : (
					<span
						className={classnames({
							[classes.textBlock]: true
						})}
					>
						{!showAllAdditionalInfo && (
							<div
								className={classnames({
									["rich-edit-content"]: true,
									[classes.shortenedTextBlock]: true
								})}
								dangerouslySetInnerHTML={{ __html: toShow }}
							/>
						)}
					</span>
				)}
				{removeHtml.length > maxLength && showAllAdditionalInfo && (
					<span
						className={classnames({
							[classes.textBlock]: true
						})}
					>
						<div
							className={"rich-edit-content"}
							dangerouslySetInnerHTML={{ __html: linkifiedText }}
						/>
					</span>
				)}
				{removeHtml.length > maxLength ? readMore : ""}
			</div>
		);
	}
}

ReadMoreAdditionalInfo.defaultProps = {
	children: "",
	readMoreText: "Read more",
	readLessText: "Read less"
};

ReadMoreAdditionalInfo.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.string.isRequired,
	readMoreText: PropTypes.string.isRequired,
	readLessText: PropTypes.string.isRequired
};

export default withStyles(styles)(ReadMoreAdditionalInfo);
