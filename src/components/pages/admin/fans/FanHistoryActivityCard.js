import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, Typography, Collapse } from "@material-ui/core";

import moment from "moment";
import Card from "../../../elements/Card";
import { fontFamilyDemiBold, secondaryHex } from "../../../../config/theme";

const styles = theme => ({
	root: {
		marginBottom: theme.spacing.unit
	},
	card: { padding: theme.spacing.unit * 2 },
	greySubtitle: {
		color: "#9DA3B4",
		fontSize: theme.typography.fontSize * 0.9
	},
	boldSpan: {
		fontFamily: fontFamilyDemiBold
	},
	pinkSpan: {
		color: secondaryHex,
		fontFamily: fontFamilyDemiBold,
		paddingLeft: theme.spacing.unit * 2
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
	upperRow: {
		display: "flex",
		flexDirection: "row"
	}
});

class FanHistoryActivityCard extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	renderActivity(type) {
		const {
			event_name,
			event_start,
			event_loc,
			onExpandChange,
			expanded,
			profile,
			classes
		} = this.props;

		let activityCard = null;

		switch (type) {
			case "Purchase":
				activityCard = (
					<div className={classes.root}>
						<Card onClick={onExpandChange} className={classes.card}>
							<div className={classes.card}>
								<div className={classes.upperRow}>
									<Typography className={classes.greySubtitle}>
										{moment(event_start).format("M/D/Y hh:mmA")} &nbsp;
									</Typography>
									<Typography>
										<span className={classes.pinkSpan}>
											{profile.first_name}&nbsp;{profile.last_name}&nbsp;
										</span>
										<span className={classes.boldSpan}>
											purchased ticket to {event_name}
										</span>
									</Typography>
									<Typography className={classes.greySubtitle}>
										{event_loc}
									</Typography>
								</div>
							</div>
							<Collapse in={expanded}>
								<div className={classes.card}>helloo ?</div>
							</Collapse>
						</Card>
					</div>
				);
				break;
			case "CheckIn":
				activityCard = (
					<div className={classes.root}>
						<Card onClick={onExpandChange} className={classes.card}>
							<div className={classes.card}>
								<Typography>
									<span className={classes.boldSpan}>
										Checked in to {event_name}
									</span>
								</Typography>
								<Typography className={classes.greySubtitle}>
									{moment(event_start).format("M/D/Y hh:mmA")}
								</Typography>
								<Typography className={classes.greySubtitle}>
									{event_loc}
								</Typography>
							</div>
							<Collapse in={expanded}>
								<div className={classes.card}>helloo ?</div>
							</Collapse>
						</Card>
					</div>
				);
				break;
			case "Refund":
				activityCard = (
					<div className={classes.root}>
						<Card onClick={onExpandChange} className={classes.card}>
							<div className={classes.card}>
								<Typography>
									<span className={classes.boldSpan}>
										Refunded {event_name}
									</span>
								</Typography>
								<Typography className={classes.greySubtitle}>
									{moment(event_start).format("M/D/Y hh:mmA")}
								</Typography>
								<Typography className={classes.greySubtitle}>
									{event_loc}
								</Typography>
							</div>
							<Collapse in={expanded}>
								<div className={classes.card}>helloo ?</div>
							</Collapse>
						</Card>
					</div>
				);
				break;
			case "Note":
				activityCard = (
					<div className={classes.root}>
						<Card onClick={onExpandChange} className={classes.card}>
							<div className={classes.card}>
								<Typography>
									<span className={classes.boldSpan}>Note {event_name}</span>
								</Typography>
								<Typography className={classes.greySubtitle}>
									{moment(event_start).format("M/D/Y hh:mmA")}
								</Typography>
								<Typography className={classes.greySubtitle}>
									{event_loc}
								</Typography>
							</div>
							<Collapse in={expanded}>
								<div className={classes.card}>helloo ?</div>
							</Collapse>
						</Card>
					</div>
				);
				break;
			default:
				activityCard = <div>hello</div>;
		}

		return activityCard;
	}

	render() {
		const { type } = this.props;
		return this.renderActivity(type);
	}
}
FanHistoryActivityCard.propTypes = {
	order_date: PropTypes.string,
	event_start: PropTypes.string,
	ticket_sales: PropTypes.number,
	event_name: PropTypes.string.isRequired,
	event_id: PropTypes.string,
	revenue_in_cents: PropTypes.number,
	order_id: PropTypes.string,
	event_loc: PropTypes.string,
	onExpandChange: PropTypes.func.isRequired,
	expanded: PropTypes.bool.isRequired,
	event_history: PropTypes.array,
	type: PropTypes.string.isRequired
};

export default withStyles(styles)(FanHistoryActivityCard);
