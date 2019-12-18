import React from "react";
import Card from "../../../../elements/Card";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import FormattedAdditionalInfo from "../../../events/FormattedAdditionalInfo";
import lineBreakHtmlToPlainText from "../../../../../helpers/lineBreakHtmlToPlainText";

const PublishedOverview = ({ classes, event }) => {
	const { name, top_line_info, additional_info, status, created_at } = event;

	// Top Line col styles
	const colStyles = [{ flex: 1 }, { flex: 4 }];
	const headings = ["Status", "Published on"];
	const values = [status, created_at];

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
export default PublishedOverview;
