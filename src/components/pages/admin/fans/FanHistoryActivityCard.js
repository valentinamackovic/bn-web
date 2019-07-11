import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, Typography, Collapse } from "@material-ui/core";

import moment from "moment";
import Card from "../../../elements/Card";
import { fontFamilyDemiBold, secondaryHex } from "../../../../config/theme";
import FanActivityCardRow from "./FanActivityCardRow";
import servedImage from "../../../../helpers/imagePathHelper";

const styles = theme => ({
	root: {
		marginBottom: theme.spacing.unit * 2
	},
	card: {
		margin: theme.spacing.unit / 2,
		paddingLeft: theme.spacing.unit * 2,
		paddingRight: theme.spacing.unit * 2,
		paddingTop: theme.spacing.unit,
		paddingBottom: theme.spacing.unit
	},
	greySubtitle: {
		color: "#9DA3B4",
		fontSize: theme.typography.fontSize * 0.9
	},
	boldSpan: {
		fontFamily: fontFamilyDemiBold
	},
	pinkSpan: {
		color: secondaryHex
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
	showHideRow: {
		display: "flex",
		flexDirection: "row",
		cursor: "pointer"
	},
	showHideIcon: {
		paddingLeft: theme.spacing.unit,
		paddingBottom: theme.spacing.unit / 2
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
			ticket_quantity,
			order_number,
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
						<Card
							variant={"raisedLight"}
							onClick={onExpandChange}
							className={classes.card}
						>
							<div>
								<FanActivityCardRow>
									<img src={servedImage("/icons/events-active.svg")}/>
									<Typography className={classes.greySubtitle}>
										{moment(event_start).format("l hh:mmA")}
									</Typography>
									<Typography>
										<span className={classes.boldSpan}>Purchased</span>
										&nbsp;
										<span>
											{ticket_quantity} tickets {event_name}
										</span>
										<span>
											(
											<span className={classes.pinkSpan}>
												{"Order #" + order_number + ""}
											</span>
											)
										</span>
										&nbsp;
									</Typography>

									{!expanded ? (
										<div className={classes.showHideRow}>
											<Typography className={classes.showHide}>
												<span className={classes.greySubtitle}>
													Show Details
												</span>
											</Typography>
											<img
												className={classes.showHideIcon}
												src={servedImage("/icons/down-gray.svg")}
											/>
										</div>
									) : (
										<div className={classes.showHideRow}>
											<Typography className={classes.showHide}>
												<span className={classes.greySubtitle}>
													Hide Details
												</span>
											</Typography>
											<img
												className={classes.showHideIcon}
												src={servedImage("/icons/up-gray.svg")}
											/>
										</div>
									)}
								</FanActivityCardRow>
								<Collapse in={expanded}>
									<div className={classes.card}>
										<Typography className={classes.greySubtitle}>
											Checked in tickets:
										</Typography>
									</div>
								</Collapse>
							</div>
						</Card>
					</div>
				);
				break;
			case "CheckIn":
				activityCard = (
					<div className={classes.root}>
						<Card
							variant={"raisedLight"}
							onClick={onExpandChange}
							className={classes.card}
						>
							<div>
								<FanActivityCardRow>
									<img src={servedImage("/icons/events-active.svg")}/>
									<Typography className={classes.greySubtitle}>
										{moment(event_start).format("l hh:mmA")}
									</Typography>
									<Typography>
										<span className={classes.boldSpan}>Checked in to</span>
										&nbsp;the event
									</Typography>

									{!expanded ? (
										<div className={classes.showHideRow}>
											<Typography className={classes.showHide}>
												<span className={classes.greySubtitle}>
													Show Details
												</span>
											</Typography>
											<img
												className={classes.showHideIcon}
												src={servedImage("/icons/down-gray.svg")}
											/>
										</div>
									) : (
										<div className={classes.showHideRow}>
											<Typography className={classes.showHide}>
												<span className={classes.greySubtitle}>
													Hide Details
												</span>
											</Typography>
											<img
												className={classes.showHideIcon}
												src={servedImage("/icons/up-gray.svg")}
											/>
										</div>
									)}
								</FanActivityCardRow>
								<Collapse in={expanded}>
									<div className={classes.card}>
										<Typography className={classes.greySubtitle}>
											Checked in tickets:
										</Typography>
									</div>
								</Collapse>
							</div>
						</Card>
					</div>
				);
				break;
			case "Refund":
				activityCard = (
					<div className={classes.root}>
						<Card
							variant={"raisedLight"}
							onClick={onExpandChange}
							className={classes.card}
						>
							<div>
								<FanActivityCardRow>
									<img src={servedImage("/icons/events-active.svg")}/>
									<Typography className={classes.greySubtitle}>
										{moment(event_start).format("l hh:mmA")}
									</Typography>
									<Typography>
										<span className={classes.pinkSpan + " " + classes.boldSpan}>
											{profile.first_name}&nbsp;{profile.last_name}&nbsp;
										</span>
										<span className={classes.boldSpan}>
											Refunded ticket to {event_name}
										</span>
									</Typography>

									{!expanded ? (
										<div className={classes.showHideRow}>
											<Typography className={classes.showHide}>
												<span className={classes.greySubtitle}>
													Show Details
												</span>
											</Typography>
											<img
												className={classes.showHideIcon}
												src={servedImage("/icons/down-gray.svg")}
											/>
										</div>
									) : (
										<div className={classes.showHideRow}>
											<Typography className={classes.showHide}>
												<span className={classes.greySubtitle}>
													Hide Details
												</span>
											</Typography>
											<img
												className={classes.showHideIcon}
												src={servedImage("/icons/up-gray.svg")}
											/>
										</div>
									)}
								</FanActivityCardRow>
								<Collapse in={expanded}>
									<div className={classes.card}>
										<Typography className={classes.greySubtitle}>
											Checked in tickets:
										</Typography>
									</div>
								</Collapse>
							</div>
						</Card>
					</div>
				);
				break;
			case "Note":
				activityCard = (
					<div className={classes.root}>
						<Card
							variant={"raisedLight"}
							onClick={onExpandChange}
							className={classes.card}
						>
							<div>
								<FanActivityCardRow>
									<img src={servedImage("/icons/events-active.svg")}/>
									<Typography className={classes.greySubtitle}>
										{moment(event_start).format("l hh:mmA")}
									</Typography>
									<Typography>
										<span className={classes.pinkSpan + " " + classes.boldSpan}>
											{profile.first_name}&nbsp;{profile.last_name}&nbsp;
										</span>
										<span className={classes.boldSpan}>
											Added note to {event_name}
										</span>
									</Typography>

									{!expanded ? (
										<div className={classes.showHideRow}>
											<Typography className={classes.showHide}>
												<span className={classes.greySubtitle}>
													Show Details
												</span>
											</Typography>
											<img
												className={classes.showHideIcon}
												src={servedImage("/icons/down-gray.svg")}
											/>
										</div>
									) : (
										<div className={classes.showHideRow}>
											<Typography className={classes.showHide}>
												<span className={classes.greySubtitle}>
													Hide Details
												</span>
											</Typography>
											<img
												className={classes.showHideIcon}
												src={servedImage("/icons/up-gray.svg")}
											/>
										</div>
									)}
								</FanActivityCardRow>
								<Collapse in={expanded}>
									<div className={classes.card}>
										<Typography className={classes.greySubtitle}>
											Checked in tickets:
										</Typography>
									</div>
								</Collapse>
							</div>
						</Card>
					</div>
				);
				break;
			case "Transfer":
				activityCard = (
					<div className={classes.root}>
						<Card
							variant={"raisedLight"}
							onClick={onExpandChange}
							className={classes.card}
						>
							<div>
								<FanActivityCardRow>
									<img src={servedImage("/icons/events-active.svg")}/>
									<Typography className={classes.greySubtitle}>
										{moment(event_start).format("l hh:mmA")}
									</Typography>
									<Typography>
										<span className={classes.boldSpan}>
											Successfully transferred{" "}
										</span>
										&nbsp;the event
									</Typography>

									{!expanded ? (
										<div className={classes.showHideRow}>
											<Typography className={classes.showHide}>
												<span className={classes.greySubtitle}>
													Show Details
												</span>
											</Typography>
											<img
												className={classes.showHideIcon}
												src={servedImage("/icons/down-gray.svg")}
											/>
										</div>
									) : (
										<div className={classes.showHideRow}>
											<Typography className={classes.showHide}>
												<span className={classes.greySubtitle}>
													Hide Details
												</span>
											</Typography>
											<img
												className={classes.showHideIcon}
												src={servedImage("/icons/up-gray.svg")}
											/>
										</div>
									)}
								</FanActivityCardRow>
								<Collapse in={expanded}>
									<div className={classes.card}>
										<Typography className={classes.greySubtitle}>
											Checked in tickets:
										</Typography>
									</div>
								</Collapse>
							</div>
						</Card>
					</div>
				);
				break;
			default:
				activityCard = <div/>;
		}

		return activityCard;
	}

	render() {
		const { type } = this.props;
		return this.renderActivity(type);
	}
}

FanHistoryActivityCard.propTypes = {
	ticket_quantity: PropTypes.number,
	order_number: PropTypes.number,
	order_date: PropTypes.string,
	event_start: PropTypes.string,
	ticket_sales: PropTypes.number,
	event: PropTypes.object,
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
