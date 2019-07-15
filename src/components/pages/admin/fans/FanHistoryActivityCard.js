import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, Typography, Collapse } from "@material-ui/core";

import moment from "moment";
import Card from "../../../elements/Card";
import { fontFamilyDemiBold, secondaryHex } from "../../../../config/theme";
import FanActivityCardRow from "./FanActivityCardRow";
import FanActivityTransferRow from "./FanActivityTransferRow";
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
	bottomCard: {
		margin: theme.spacing.unit / 2,
		paddingLeft: theme.spacing.unit * 2,
		paddingRight: theme.spacing.unit * 2,
		paddingTop: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		display: "flex",
		flexDirection: "row"
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
			action,
			total_in_cents,
			ticket_ids,
			destination_addresses
		} = this.props.item;

		const { name, event_start } = this.props.event;

		const { onExpandChange, expanded, profile, classes } = this.props;

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
											{ticket_quantity} tickets to{" "}
											<span className={classes.boldSpan}>{name}</span>
										</span>
										&nbsp;
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
									<div className={classes.bottomCard}>
										<Typography className={classes.greySubtitle}>
											Event:
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
										<span className={classes.pinkSpan + " " + classes.boldSpan}>
											{profile.first_name}&nbsp;{profile.last_name}&nbsp;
										</span>
										<span className={classes.boldSpan}>checked-in&nbsp;</span>
										<span>
											{"to " + name}&nbsp;{"(" + ticket_quantity + ")"}
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
										<span className={classes.boldSpan}>refunded&nbsp;</span>
										<span className={classes.totalRevenue}>{`$${(
											total_in_cents / 100
										).toFixed(2)}`}</span>
										<span>
											&nbsp;(
											<span className={classes.pinkSpan}>
												{"Order #" + order_number + ""}
											</span>
											)
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
										<span className={classes.boldSpan}>added a note</span>
										<span>to</span>
										<span className={classes.boldSpan}>{name}</span>
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
										<span className={classes.pinkSpan + " " + classes.boldSpan}>
											{profile.first_name}&nbsp;{profile.last_name}&nbsp;
										</span>
										<span className={classes.boldSpan}>
											{"transferred (" + action + ") "}
										</span>
										{ticket_ids.length > 1 ? (
											<span>{ticket_ids.length + " tickets to "}</span>
										) : (
											<span>{ticket_ids.length + " ticket to "}</span>
										)}
										<span className={classes.boldSpan}>
											{destination_addresses}
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
										<FanActivityTransferRow>
											<Typography className={classes.greySubtitle}>
												Tickets:
											</Typography>
											<Typography className={classes.greySubtitle}>
												Tickets:
											</Typography>
											<Typography className={classes.greySubtitle}>
												Tickets:
											</Typography>
											<Typography className={classes.greySubtitle}>
												Tickets:
											</Typography>
										</FanActivityTransferRow>
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
		const { type } = this.props.item;
		return this.renderActivity(type);
	}
}

FanHistoryActivityCard.propTypes = {
	item: PropTypes.object,
	event: PropTypes.object,
	event_id: PropTypes.string,
	revenue_in_cents: PropTypes.number,
	order_id: PropTypes.string,
	event_loc: PropTypes.string,
	onExpandChange: PropTypes.func.isRequired,
	expanded: PropTypes.bool.isRequired,
	event_history: PropTypes.array
	//	type: PropTypes.string.isRequired
};

export default withStyles(styles)(FanHistoryActivityCard);
