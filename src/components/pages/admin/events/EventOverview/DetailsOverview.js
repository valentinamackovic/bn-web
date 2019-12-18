import React from "react";
import Card from "../../../../elements/Card";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import FormattedAdditionalInfo from "../../../events/FormattedAdditionalInfo";
import lineBreakHtmlToPlainText from "../../../../../helpers/lineBreakHtmlToPlainText";

const DetailsOverview = ({
	classes,
	event,
	venue,
	displayEventStart,
	displayEventEnd,
	timezoneAbbr,
	displayEventEndTime
}) => {
	const {
		name,
		top_line_info,
		additional_info,
		displayShowTime,
		displayDoorTime
	} = event;

	// Top Line col styles
	const colStyles = [{ flex: 3 }, { flex: 2 }, { flex: 4 }];
	const headings = ["Event name", "Venue", "Top Line Info"];
	const values = [name, venue.name, top_line_info];

	// Col styles for dates and times
	const dateColStyles = [
		{ flex: 2 },
		{ flex: 2 },
		{ flex: 2 },
		{ flex: 2 },
		{ flex: 2 }
	];
	const dateHeadings = [
		`Event date (${timezoneAbbr})`,
		`Show time (${timezoneAbbr})`,
		"Door time",
		`End date (${timezoneAbbr})`,
		`End time (${timezoneAbbr})`
	];
	const dateValues = [
		displayEventStart,
		displayShowTime,
		displayDoorTime,
		displayEventEnd,
		displayEventEndTime
	];

	return (
		<Card variant={"form"} className={classes.detailsCardStyle}>
			<div className={classes.detailsTopRow}>
				{headings.map((heading, index) => (
					<Typography
						key={index}
						style={colStyles[index]}
						className={classes.smallGreyCapTitle}
					>
						{heading}
					</Typography>
				))}
			</div>
			<div className={classes.detailsTopRow}>
				{values.map((value, index) => (
					<Typography
						key={index}
						style={colStyles[index]}
						className={classes.smallTitle}
					>
						{value ? value : "-"}
					</Typography>
				))}
			</div>
			<Divider className={classes.dividerStyle}/>
			<Typography className={classes.smallGreyCapTitle}>
				Additional Event info
			</Typography>
			<FormattedAdditionalInfo>
				{lineBreakHtmlToPlainText(additional_info)}
			</FormattedAdditionalInfo>
			<Divider className={classes.dividerStyle}/>
			<div className={classes.detailsTopRow}>
				{dateHeadings.map((heading, index) => (
					<Typography
						key={index}
						style={dateColStyles[index]}
						className={classes.smallGreyCapTitle}
					>
						{heading}
					</Typography>
				))}
			</div>
			<div className={classes.detailsTopRow}>
				{dateValues.map((value, index) => (
					<Typography
						key={index}
						style={dateColStyles[index]}
						className={classes.smallTitle}
					>
						{value ? value : "-"}
					</Typography>
				))}
			</div>
		</Card>
	);
};
export default DetailsOverview;
