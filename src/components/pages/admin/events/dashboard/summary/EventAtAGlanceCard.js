import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Hidden } from "@material-ui/core";
import CollapseCard from "./CollapseCard";
import HorizontalBreakdownBar from "../../../../../elements/charts/HorizontalBreakdownBar";
import {
	fontFamilyBold,
	fontFamilyDemiBold
} from "../../../../../../config/theme";
import ActivityChart from "./charts/ActivityChart";
// import AttendanceChart from "./charts/AttendanceChart";
import PropTypes from "prop-types";
import { dollars } from "../../../../../../helpers/money";
import EventSummaryCard from "../../EventSummaryCard";

const styles = theme => {
	return {
		root: {
			[theme.breakpoints.up("sm")]: {
				padding: 30
			},
			[theme.breakpoints.down("md")]: {
				padding: 10
			},
			[theme.breakpoints.down("sm")]: {
				padding: 0
			}
		},
		titleText: {
			fontFamily: fontFamilyDemiBold,
			fontSize: 19,
			marginBottom: 20
		},
		label: {
			color: "#9DA3B4",
			fontSize: 13
		},
		value: {
			fontSize: 32,
			fontFamily: fontFamilyBold
		},
		subValue: {
			color: "#9DA3B4",
			paddingTop: 7,
			fontSize: 11,
			fontFamily: fontFamilyBold
		},
		valueContainer: {
			marginRight: 20
		},
		valuesContainer: {
			display: "flex",
			//paddingBottom: 20,

			[theme.breakpoints.down("sm")]: {
				//paddingBottom: 10
			}
		},
		breakdownContainer: {
			display: "flex",
			justifyContent: "flex-end",
			alignContent: "center",

			[theme.breakpoints.down("sm")]: {
				justifyContent: "flex-start",
				paddingTop: 14
			}
		},
		breakdownHeading: {
			fontSize: 14.4,
			fontFamily: fontFamilyDemiBold
		},
		breakdownValue: {
			fontSize: 16.8,
			fontFamily: fontFamilyDemiBold
		},
		breakdownDivider: {
			height: 16.8,
			borderLeft: "1px solid",
			borderColor: "#9da3b4",
			opacity: 0.5,
			marginRight: theme.spacing.unit * 2,
			marginLeft: theme.spacing.unit * 2
		},
		rowOne: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",

			paddingBottom: 14,
			[theme.breakpoints.down("sm")]: {
				paddingBottom: 0,
				paddingTop: 14
			}
		},
		chartContainer: {
			paddingTop: 20,
			[theme.breakpoints.up("sm")]: {
				display: "flex"
			}
		},
		innerChartContainer: {
			flex: 1,
			display: "flex",
			flexDirection: "flex-start"
		}
	};
};

const BreakDownValues = ({ classes, values }) => {
	return (
		<div className={classes.breakdownContainer}>
			{values.map(({ value, label, color }, index) => (
				<div style={{ display: "flex", alignItems: "center" }} key={label}>
					<div>
						<Typography className={classes.breakdownHeading} style={{ color }}>
							{label}
						</Typography>
						<Typography className={classes.breakdownValue}>{value}</Typography>
					</div>
					{index + 1 < values.length ? (
						<div className={classes.breakdownDivider}/>
					) : null}
				</div>
			))}
		</div>
	);
};

const EventAtAGlanceCard = ({
	classes,
	token,
	on_sale,
	cubeApiUrl,
	sales_total_in_cents,
	total_tickets,
	sold_unreserved,
	sold_held,
	tickets_open,
	tickets_held,
	venue
}) => {
	const totalSold = sold_held + sold_unreserved;
	const totalOpen = tickets_open;
	const totalHeld = tickets_held - sold_held;
	const timezone = venue.timezone;

	const values = [
		{ label: "Sold", value: totalSold, color: "#707ced" },
		{ label: "Open", value: totalOpen, color: "#afc6d4" },
		{ label: "Held", value: totalHeld, color: "#ff22b2" }
	];

	const breakDownValues = <BreakDownValues classes={classes} values={values}/>;

	const title = "Event at a Glance";

	return (
		<CollapseCard title={title} className={classes.root}>
			<Hidden smDown>
				<Typography className={classes.titleText}>{title}</Typography>
			</Hidden>

			<div className={classes.rowOne}>
				<div className={classes.valuesContainer}>
					<div className={classes.valueContainer}>
						<Typography className={classes.label}>Gross Revenue</Typography>
						<Typography className={classes.value}>
							{dollars(sales_total_in_cents)}
						</Typography>
					</div>
					<div className={classes.valueContainer}>
						<Typography className={classes.label}>Tickets Sold</Typography>
						<span style={{ display: "flex" }}>
							<Typography className={classes.value}>
								{sold_unreserved}
							</Typography>
							<Typography className={classes.subValue}>
								/{total_tickets}
							</Typography>
						</span>
					</div>
				</div>

				{/*DESKTOP*/}
				<Hidden smDown>{breakDownValues}</Hidden>
			</div>

			<HorizontalBreakdownBar values={values}/>

			{/*MOBILE*/}
			<Hidden mdUp>{breakDownValues}</Hidden>

			<div className={classes.chartContainer}>
				<div className={classes.innerChartContainer}>
					<ActivityChart
						cubeApiUrl={cubeApiUrl}
						token={token}
						startDate={on_sale}
						timezone={timezone}
						title={"Transfer Activity"}
						legendKeyMap={{
							Completed: "Completed Transfers",
							Pending: "Pending Transfers",
							Cancelled: "Cancelled Transfers"
						}}
						measures={["Transfers.count"]}
						dimensions={["Transfers.status"]}
					/>
				</div>
				<div className={classes.innerChartContainer}>
					<ActivityChart
						cubeApiUrl={cubeApiUrl}
						token={token}
						startDate={on_sale}
						timezone={timezone}
						title={"Scanning & Attendance"}
						legendKeyMap={{
							"Not Redeemed": "Tickets Scanned/Attended",
							Redeemed: "Remaining/No Show"
						}}
						measures={["Tickets.count"]}
						dimensions={["Tickets.redeemedStatus"]}
						segments={["Tickets.purchasedTickets"]}
					/>
				</div>
			</div>
		</CollapseCard>
	);
};

EventAtAGlanceCard.propTypes = {
	classes: PropTypes.object.isRequired,
	token: PropTypes.string.isRequired,
	on_sale: PropTypes.string.isRequired,
	sales_total_in_cents: PropTypes.number.isRequired,
	cubeApiUrl: PropTypes.string.isRequired,
	venue: PropTypes.object.isRequired
};
export default withStyles(styles)(EventAtAGlanceCard);
