import React from "react";
import Card from "../../../../elements/Card";
import { Typography, Grid, Hidden } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import FormattedAdditionalInfo from "../../../events/FormattedAdditionalInfo";
import lineBreakHtmlToPlainText from "../../../../../helpers/lineBreakHtmlToPlainText";
import moment from "moment-timezone";

const PublishedOverview = ({ classes, event, timezoneAbbr }) => {
	const { name, top_line_info, additional_info, status, created_at } = event;

	// Top Line col styles
	const colStyles = [{ flex: 1 }, { flex: 4 }];
	const headings = ["Status", "Published on"];
	const values = [status, moment(created_at, "YYYY-MM-DD HH:mm ZZ").format("DD/MM/YYYY HH:mm A") + " " + timezoneAbbr];

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
							{value ?  value + " " : "-"}
						</Typography>
					))}
				</div>
			</Hidden>
			{/*MOBILE*/}
			<Hidden mdUp>
				<Grid container>
					{headings.map((heading, index) => (
						<Grid item key={index} xs={(index === 0) ? 4 : 8}>
							<Typography
								className={classes.smallGreyCapTitle}
							>
								{heading}
							</Typography>
							<Typography
								className={classes.smallTitle}
							>
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
