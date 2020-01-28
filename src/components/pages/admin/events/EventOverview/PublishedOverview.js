import React from "react";
import Card from "../../../../elements/Card";
import { Typography, Grid, Hidden } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import FormattedAdditionalInfo from "../../../events/FormattedAdditionalInfo";
import lineBreakHtmlToPlainText from "../../../../../helpers/lineBreakHtmlToPlainText";
import moment from "moment-timezone";

const PublishedOverview = ({ classes, event, timezoneAbbr }) => {
	const {
		name,
		top_line_info,
		additional_info,
		status,
		created_at,
		publish_date,
		cancelled_at
	} = event;

	// Top Line col styles
	const colStyles = [{ flex: 1 }, { flex: 4 }];
	const publishStatusHeading = moment.utc(publish_date).isBefore(moment.utc())
		? "Published on"
		: "Publish date";
	const publishStatus = cancelled_at
		? "Cancelled"
		: moment.utc(publish_date).isBefore(moment.utc())
			? "Published"
			: "Draft";
	const headings = ["Status", publishStatusHeading];
	const values = [
		publishStatus,
		publish_date
			? moment(publish_date, "YYYY-MM-DD HH:mm ZZ").format("MM/DD/YYYY HH:mm A")
			: ""
	];

	return (
		<Card className={classes.detailsCardStyle}>
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
							{value ? value + " " : "-"}
						</Typography>
					))}
				</div>
			</Hidden>
			{/*MOBILE*/}
			<Hidden mdUp>
				<Grid container>
					{headings.map((heading, index) => (
						<Grid item key={index} xs={index === 0 ? 4 : 8}>
							<Typography className={classes.smallGreyCapTitle}>
								{heading}
							</Typography>
							<Typography className={classes.smallTitle}>
								{values[index] ? values[index] + " " : "-"}
							</Typography>
						</Grid>
					))}
				</Grid>
			</Hidden>
		</Card>
	);
};
export default PublishedOverview;
