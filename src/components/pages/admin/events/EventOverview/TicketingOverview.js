import React from "react";
import Card from "../../../../elements/Card";
import optimizedImageUrl from "../../../../../helpers/optimizedImageUrl";
import { Typography } from "@material-ui/core";
import classnames from "classnames";
import moment from "moment-timezone";

const TicketingOverview = ({
	classes,
	ticket_type,
	timezone,
	timezoneAbbr
}) => {
	const { name, available, ticket_pricing, start_date, end_date } = ticket_type;

	const displayStartDate = moment
		.utc(start_date)
		.tz(timezone)
		.format("L");
	const displayStartTime = moment
		.utc(start_date)
		.tz(timezone)
		.format("hh:mm A");
	const displayEndDate = moment
		.utc(end_date)
		.tz(timezone)
		.format("L");
	const displayEndTime = moment
		.utc(start_date)
		.tz(end_date)
		.format("hh:mm A");

	const colStyles = [
		{ flex: 2 },
		{ flex: 2 },
		{ flex: 2 },
		{ flex: 2 },
		{ flex: 2 },
		{ flex: 2 },
		{ flex: 2 }
	];
	const headings = [
		"Ticket name",
		"Quantity",
		"Price",
		"Sales start",
		`start time ${timezoneAbbr}`,
		"sales end",
		`end time ${timezoneAbbr}`
	];

	const values = [
		name,
		available,
		ticket_pricing.price_in_cents,
		displayStartDate,
		displayStartTime,
		displayEndDate,
		displayEndTime
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
		</Card>
	);
};
export default TicketingOverview;
