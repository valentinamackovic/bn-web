import React from "react";
import Card from "../../../../elements/Card";
import { Typography, Hidden, Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import lineBreakHtmlToPlainText from "../../../../../helpers/lineBreakHtmlToPlainText";
import ReadMoreAdditionalInfo from "../../../../elements/event/ReadMoreAdditionalInfo";

const DetailsOverview = ({
	classes,
	event,
	venue,
	displayEventStart,
	displayEventEnd,
	timezoneAbbr,
	displayEventEndTime,
	age_limit,
	event_type,
	private_access_code,
	status
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

	const infoHeadings = [
		"Age limit",
		"Event type",
		"Private access code",
		"event status",
		""
	];

	const infoValues = [age_limit, event_type, private_access_code, status, " "];

	return (
		<Card variant={"form"} className={classes.detailsCardStyle}>
			{/*DESKTOP*/}
			<Hidden smDown>
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
				<ReadMoreAdditionalInfo readMoreText="View full description" readLessText="Hide full description">
					{additional_info ? lineBreakHtmlToPlainText(additional_info) : ""}
				</ReadMoreAdditionalInfo>
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

				<Divider className={classes.dividerStyle}/>
				<div className={classes.detailsTopRow}>
					{infoHeadings.map((heading, index) => (
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
					{infoValues.map((value, index) => (
						<Typography
							key={index}
							style={dateColStyles[index]}
							className={classes.smallTitle}
						>
							{value ? value : "-"}
						</Typography>
					))}
				</div>
			</Hidden>
			{/*MOBILE*/}
			<Hidden mdUp> 
				<div className={classes.detailsContainer}>
					<Typography
						className={classes.smallGreyCapTitle}
					>
						Event Name
					</Typography>
					<Typography
						className={classes.smallTitle}
					>
						{values[0] ? values[0] : "-"}
					</Typography>
				</div>
				<div className={classes.detailsContainer}>
					<Typography
						className={classes.smallGreyCapTitle}
					>
						Venue
					</Typography>
					<Typography
						className={classes.smallTitle}
					>
						{values[1] ? values[1] : "-"}
					</Typography>
				</div>
				<div className={classes.detailsContainer}>
					<Typography
						className={classes.smallGreyCapTitle}
					>
						Top Line Info
					</Typography>
					<Typography
						className={classes.smallTitle}
					>
						{values[2] ? values[2] : "-"}
					</Typography>
				</div>
				<Divider className={classes.dividerStyle}/>
				<Typography className={classes.smallGreyCapTitle}>
					Additional Event info
				</Typography>
				<ReadMoreAdditionalInfo readMoreText="View full description" readLessText="Hide full description">
					{additional_info ? lineBreakHtmlToPlainText(additional_info) : ""}
				</ReadMoreAdditionalInfo>
				<Divider className={classes.dividerStyle}/>
				<Grid container>
					{dateHeadings.map((heading, index) => (
						<Grid item xs={6} key={index}>
							<div className={classes.detailsContainer}>
								<Typography
									className={classes.smallGreyCapTitle}
								>
									{heading}
								</Typography>
								<Typography
									className={classes.smallTitle}
								>
									{dateValues[index] ? dateValues[index] : "-"}
								</Typography>
							</div>
						</Grid>
					))}
				</Grid>
				<Divider className={classes.dividerStyle}/>
				<Grid container>
					{infoHeadings.map((heading, index) => (
						<Grid item xs={6} key={index}>
							<div className={classes.detailsContainer}>
								<Typography
									className={classes.smallGreyCapTitle}
								>
									{heading}
								</Typography>
								<Typography
									className={classes.smallTitle}
								>
									{infoValues[index] ? infoValues[index] : "-"}
								</Typography>
							</div>
						</Grid>
					))}
				</Grid>
			</Hidden>
		</Card>
	);
};
export default DetailsOverview;
