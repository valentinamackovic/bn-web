import React from "react";
import Card from "../../../../elements/Card";
import { Typography } from "@material-ui/core";

const DetailsOverview = ({ classes, event, venue }) => {
	const {
		name,
		top_line_info,
		door_time,
		cancelled_at,
		publish_date,
		eventEnded,
		on_sale,
		isExternal
	} = event;

	const colStyles = [{ flex: 2 }, { flex: 4 }, { flex: 2 }];
	const headings = ["Event name", "Venue", "Top Line Info"];
	const values = [name, venue.name, top_line_info];

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
export default DetailsOverview;
