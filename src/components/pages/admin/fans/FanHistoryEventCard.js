import React from "react";
import PropTypes from "prop-types";
import { withStyles, Typography } from "@material-ui/core";

import moment from "moment";
import Card from "../../../elements/Card";
import { fontFamilyDemiBold, secondaryHex } from "../../../../config/theme";

const styles = theme => ({
	root: {
		marginTop: theme.spacing.unit
	},
	card: { padding: theme.spacing.unit * 2 },
	greySubtitle: {
		color: "#9DA3B4",
		fontSize: theme.typography.fontSize * 0.9
	},
	boldSpan: {
		fontFamily: fontFamilyDemiBold
	},
	linkText: {
		color: secondaryHex,
		fontFamily: fontFamilyDemiBold
	},
	verticalDividerSmall: {
		borderLeft: "1px solid #DEE2E8",
		height: 20,
		marginLeft: 15,
		marginRight: 15
	},
	bold: {
		fontFamily: fontFamilyDemiBold
	},
	bottomRow: {
		display: "flex"
	}
});

const FanHistoryEventCard = ({
	order_date,
	event_name,
	event_loc,
	event_start,
	event_id,
	event_history,
	classes
}) => (
	<div className={classes.root}>
		<Card variant="subCard">
			<div className={classes.card}>
				<Typography>
					<span className={classes.boldSpan}>{event_name}</span>
				</Typography>
				<Typography className={classes.greySubtitle}>
					{moment(event_start).format("M/D/Y hh:mmA")}
				</Typography>
				<Typography className={classes.greySubtitle}>{event_loc}</Typography>
			</div>
		</Card>
	</div>
);

FanHistoryEventCard.propTypes = {
	order_date: PropTypes.string,
	event_start: PropTypes.string,
	ticket_sales: PropTypes.number,
	event_name: PropTypes.string.isRequired,
	event_id: PropTypes.string,
	revenue_in_cents: PropTypes.number,
	order_id: PropTypes.string,
	event_loc: PropTypes.string,
	event_history: PropTypes.array,
	type: PropTypes.oneOf(["Purchase", "Attendance"]).isRequired
};

export default withStyles(styles)(FanHistoryEventCard);
