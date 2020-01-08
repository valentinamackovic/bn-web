import React from "react";
import Card from "../../../../elements/Card";
import { Typography, Hidden, Grid } from "@material-ui/core";
import classnames from "classnames";
import moment from "moment-timezone";
import Divider from "@material-ui/core/Divider";
import { dollars } from "../../../../../helpers/money";
import splitByCamelCase from "../../../../../helpers/splitByCamelCase";
import Collapse from "@material-ui/core/es/Collapse/Collapse";
import servedImage from "../../../../../helpers/imagePathHelper";

const TicketingOverview = ({
	classes,
	ticket_type,
	timezone,
	timezoneAbbr,
	isExpanded,
	onExpandClick
}) => {
	const {
		id,
		name,
		available,
		ticket_pricing,
		start_date,
		end_date,
		description,
		increment,
		additional_fee_in_cents,
		price_in_cents,
		visibility,
		limit_per_person,
		end_date_type
	} = ticket_type;
	const displayStartDate = start_date
		? moment
			.utc(start_date)
			.tz(timezone)
			.format("L")
		: "Immediately";
	const displayStartTime = start_date
		? moment
			.utc(start_date)
			.tz(timezone)
			.format("hh:mm A")
		: null;
	const displayEndDate = end_date
		? moment
			.utc(end_date)
			.tz(timezone)
			.format("L")
		: splitByCamelCase(end_date_type);
	const displayEndTime = end_date
		? moment
			.utc(start_date)
			.tz(timezone)
			.format("hh:mm A")
		: null;

	//General ticket info columns
	const colStyles = [
		{ flex: 3 },
		{ flex: 2 },
		{ flex: 2 },
		{ flex: 2 },
		{ flex: 2 },
		start_date ? { flex: 2 } : { flex: 4 },
		{ flex: 2 }
	];
	const headings = [
		"Ticket name",
		"Quantity",
		"Price",
		"Sales start",
		start_date ? `start time (${timezoneAbbr})` : null,
		"sales end",
		end_date ? `end time (${timezoneAbbr})` : null
	];

	const values = [
		name,
		available,
		dollars(price_in_cents),
		displayStartDate,
		displayStartTime,
		displayEndDate,
		displayEndTime
	];

	//Additional info cols
	const infoColStyles = [{ flex: 2 }, { flex: 2 }, { flex: 2 }, { flex: 2 }];
	const infoHeadings = [
		"Max tickets per customer",
		"visibility",
		"cart quantity increment",
		"per ticket fee increase"
	];

	const infoValues = [
		limit_per_person === 0 ? "None" : limit_per_person,
		splitByCamelCase(visibility),
		increment,
		dollars(additional_fee_in_cents)
	];

	//Scheduled price change  cols
	const priceChangeColStyles = [
		{ flex: 2 },
		{ flex: 2 },
		{ flex: 2 },
		{ flex: 2 },
		{ flex: 2 },
		{ flex: 1 }
	];
	const priceChangeHeadings = [
		"Price Name",
		`On sale date (${timezoneAbbr})`,
		`On sale time (${timezoneAbbr})`,
		`End sale date (${timezoneAbbr})`,
		`End sale time (${timezoneAbbr})`,
		"price"
	];

	return (
		<Card variant={"form"} className={classes.detailsCardStyle}>
			{/*Mobile expand icon*/}
			<Hidden smUp>
				{!isExpanded ? (
					<div
						className={classes.expandIconRow}
						onClick={() => onExpandClick(id)}
					>
						<img
							className={classes.expandIcon}
							src={servedImage("/icons/down-active.svg")}
						/>
					</div>
				) : (
					<div
						className={classes.expandIconRow}
						onClick={() => onExpandClick(null)}
					>
						<img
							className={classes.expandIcon}
							src={servedImage("/icons/up-active.svg")}
						/>
					</div>
				)}
			</Hidden>
			{/*DESKTOP*/}
			<Hidden smDown>
				<div className={classes.detailsTopRow}>
					{headings.map((heading, index) =>
						heading ? (
							<Typography
								key={index}
								style={colStyles[index]}
								className={classes.smallGreyCapTitle}
							>
								{heading}
							</Typography>
						) : null
					)}
				</div>
				<div className={classes.detailsTopRow}>
					{values.map((value, index) =>
						value ? (
							<Typography
								key={index}
								style={colStyles[index]}
								className={classes.smallTitle}
							>
								{value}
							</Typography>
						) : null
					)}
				</div>
				{description ? (
					<div>
						<Divider className={classes.dividerStyle}/>
						<Typography className={classes.smallGreyCapTitle}>
							Ticket description
						</Typography>
						<Typography className={classes.smallTitle}>
							{description}
						</Typography>
					</div>
				) : null}

				<Divider className={classes.dividerStyle}/>

				<div className={classes.detailsTopRow}>
					{infoHeadings.map((heading, index) =>
						heading ? (
							<Typography
								key={index}
								style={infoColStyles[index]}
								className={classes.smallGreyCapTitle}
							>
								{heading}
							</Typography>
						) : null
					)}
				</div>
				<div className={classes.detailsTopRow}>
					{infoValues.map((value, index) =>
						value ? (
							<Typography
								key={index}
								style={infoColStyles[index]}
								className={classes.smallTitle}
							>
								{value}
							</Typography>
						) : null
					)}
				</div>
				{ticket_pricing.length > 0 ? (
					<div>
						<Divider className={classes.dividerStyle}/>
						<Typography className={classes.headerTitle}>
							Scheduled Price Change
						</Typography>
						{ticket_pricing.map((ticket, index) => {
							const displayStartDate = ticket.start_date
								? moment
									.utc(ticket.start_date)
									.tz(timezone)
									.format("L")
								: "Immediately";
							const displayStartTime = ticket.start_date
								? moment
									.utc(ticket.start_date)
									.tz(timezone)
									.format("hh:mm A")
								: null;
							const displayEndDate = ticket.end_date
								? moment
									.utc(ticket.end_date)
									.tz(timezone)
									.format("L")
								: splitByCamelCase(ticket.end_date_type);
							const displayEndTime = ticket.end_date
								? moment
									.utc(ticket.start_date)
									.tz(timezone)
									.format("hh:mm A")
								: null;
							const priceChangeValues = [
								ticket.name,
								displayStartDate,
								displayStartTime,
								displayEndDate,
								displayEndTime,
								dollars(price_in_cents)
							];
							return (
								<Card
									key={index}
									style={{ marginTop: 20 }}
									variant={"form"}
									className={classes.detailsCardStyle}
								>
									<div className={classes.detailsTopRow}>
										{priceChangeHeadings.map((heading, index) => (
											<Typography
												key={index}
												style={priceChangeColStyles[index]}
												className={classes.smallGreyCapTitle}
											>
												{heading}
											</Typography>
										))}
									</div>
									<div className={classes.detailsTopRow}>
										{priceChangeValues.map((value, index) => (
											<Typography
												key={index}
												style={priceChangeColStyles[index]}
												className={classes.smallTitle}
											>
												{value ? value : "-"}
											</Typography>
										))}
									</div>
								</Card>
							);
						})}
					</div>
				) : null}
			</Hidden>
			{/*MOBILE*/}
			<Hidden mdUp>
				<Grid container>
					{headings.map((heading, index) =>
						heading ? (
							<Grid item key={index} xs={index === 0 ? 12 : 6}>
								<Typography className={classes.smallGreyCapTitle}>
									{heading}
								</Typography>
								<Typography className={classes.smallTitle}>
									{values[index]}
								</Typography>
							</Grid>
						) : null
					)}
				</Grid>

				<Collapse in={isExpanded} timeout="auto" classes={{wrapper: classes.noBackground}}>
					<Grid container>
						{description ? (
							<Grid item xs={12}>
								<Divider className={classes.dividerStyle}/>
								<Typography className={classes.smallGreyCapTitle}>
									Ticket description
								</Typography>
								<Typography className={classes.smallTitle}>
									{description}
								</Typography>
							</Grid>
						) : null}
						<Grid item xs={12}>
							<Divider className={classes.dividerStyle}/>
						</Grid>
						{infoHeadings.map((heading, index) =>
							heading ? (
								<Grid item key={index} xs={12}>
									<Typography className={classes.smallGreyCapTitle}>
										{heading}
									</Typography>
									<Typography className={classes.smallTitle}>
										{infoValues[index]}
									</Typography>
								</Grid>
							) : null
						)}
						{ticket_pricing.map((ticket, index) => {
							const displayStartDate = ticket.start_date
								? moment
									.utc(ticket.start_date)
									.tz(timezone)
									.format("L")
								: "Immediately";
							const displayStartTime = ticket.start_date
								? moment
									.utc(ticket.start_date)
									.tz(timezone)
									.format("hh:mm A")
								: null;
							const displayEndDate = ticket.end_date
								? moment
									.utc(ticket.end_date)
									.tz(timezone)
									.format("L")
								: splitByCamelCase(ticket.end_date_type);
							const displayEndTime = ticket.end_date
								? moment
									.utc(ticket.start_date)
									.tz(timezone)
									.format("hh:mm A")
								: null;
							const priceChangeValues = [
								ticket.name,
								displayStartDate,
								displayStartTime,
								displayEndDate,
								displayEndTime,
								dollars(price_in_cents)
							];
							return (
								<div key={index}>
									<Grid item xs={12}>
										<Divider className={classes.dividerStyle}/>
									</Grid>
									<Typography className={classes.headerTitle}>
										Scheduled Price Change
									</Typography>
									<Grid
										container
										style={{ marginTop: 20 }}
										className={classes.ticketsCardStyle}
									>
										{priceChangeHeadings.map((heading, index) => (
											<Grid item key={index} xs={index === 0 ? 12 : 6}>
												<Typography className={classes.smallGreyCapTitle}>
													{heading}
												</Typography>
												<Typography className={classes.smallTitle}>
													{priceChangeValues[index]
														? priceChangeValues[index]
														: "-"}
												</Typography>
											</Grid>
										))}
									</Grid>
								</div>
							);
						})}
					</Grid>
				</Collapse>
			</Hidden>
		</Card>
	);
};
export default TicketingOverview;
