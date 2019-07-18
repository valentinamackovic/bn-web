import React, { Component } from "react";
import PropTypes from "prop-types";
import {
	withStyles,
	Typography,
	Collapse,
	Hidden,
	Divider
} from "@material-ui/core";

import moment from "moment";
import Card from "../../../elements/Card";
import { fontFamilyDemiBold, secondaryHex } from "../../../../config/theme";
import FanActivityCardRow from "./FanActivityCardRow";
import FanActivityTransferRow from "./FanActivityTransferRow";
import FanActivityMobileRow from "./FanActivityMobileRow";
import servedImage from "../../../../helpers/imagePathHelper";
import FanActivityPurchaseRow from "./FanActivityPurchaseRow";
import { Link } from "react-router-dom";
import Button from "../../../elements/Button";

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
	mobileActivityHeader: {
		marginBottom: theme.spacing.unit * 2,
		paddingTop: theme.spacing.unit * 2,
		paddingRight: theme.spacing.unit * 2,
		paddingLeft: theme.spacing.unit * 2
	},
	mobileHeaderTopRow: {
		display: "flex",
		flexDirection: "row",
		marginTop: theme.spacing.unit,
		alignItems: "flex-start"
	},
	mobileHeaderBottomRow: {
		display: "flex",
		flexDirection: "row",
		marginTop: theme.spacing.unit * 2,
		justifyContent: "space-between",
		alignItems: "flex-end"
	},
	mobiIcon: {
		marginRight: theme.spacing.unit * 2
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
	smallTextCap: {
		fontSize: theme.typography.fontSize * 0.8,
		textTransform: "uppercase",
		color: "#fff",
		whiteSpace: "nowrap"
	},
	darkGreySubtitle: {
		color: "#0e0e0e",
		fontSize: theme.typography.fontSize * 0.9
	},
	greySubtitleCap: {
		color: "#9DA3B4",
		fontSize: theme.typography.fontSize * 0.8,
		textTransform: "uppercase"
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
	halfFlex: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start"
	},
	halfFlexItem: {
		display: "flex",
		minWidth: "49%",
		flexDirection: "column"
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
			transfer_id,
			destination_addresses,
			accepted_by,
			reason,
			refund_items,
			note,
			order_id,
			initiated_by,
			redeemed_by,
			events,
			redeemed_for,
			occured_at,
			ticket_instance_id
		} = this.props.item;

		const { name, event_start, venue } = this.props.event;

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
									<img src={servedImage("/icons/money-circle-active.svg")}/>
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
									<div className={classes.card}>
										<FanActivityPurchaseRow>
											<Typography className={classes.greySubtitleCap}>
												Event
											</Typography>
											<Typography className={classes.greySubtitleCap}>
												Code
											</Typography>
											<Typography className={classes.greySubtitleCap}>
												Qty
											</Typography>
											<Typography className={classes.greySubtitleCap}>
												Total
											</Typography>
											<div/>
										</FanActivityPurchaseRow>
										<FanActivityPurchaseRow>
											<Typography>
												<span className={classes.boldSpan}>{name}</span>
											</Typography>
											{events.map((item, index) => {
												return (
													<Typography
														key={index}
														className={classes.darkGreySubtitle}
													>
														<span className={classes.boldSpan}>
															{item.code}
														</span>
														<span
															className={
																classes.greySubtitle + " " + classes.boldSpan
															}
														>{` / $${(item.total_in_cents / 100).toFixed(
																2
															)}`}</span>
														<br/>
														<span
															className={
																classes.greySubtitle + " " + classes.boldSpan
															}
														>
															{item.code_type}
														</span>
													</Typography>
												);
											})}
											<Typography className={classes.darkGreySubtitle}>
												{ticket_quantity}
											</Typography>
											<Typography className={classes.darkGreySubtitle}>
												<span className={classes.totalRevenue}>{`$${(
													total_in_cents / 100
												).toFixed(2)}`}</span>
											</Typography>
											<Link to={`/orders/${order_id}`}>
												<Button variant="secondary" size="small">
													<span className={classes.smallTextCap}>
														View order
													</span>
												</Button>
											</Link>
										</FanActivityPurchaseRow>
										<Typography>
											<span className={classes.greySubtitle}>
												{venue.address}
											</span>
											<br/>
											<span className={classes.greySubtitle}>
												{moment(event_start).format("llll")}
											</span>
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
									<img src={servedImage("/icons/calendar-active.svg")}/>
									<Typography className={classes.greySubtitle}>
										{moment(event_start).format("l hh:mmA")}
									</Typography>
									<Typography>
										<span className={classes.pinkSpan + " " + classes.boldSpan}>
											{redeemed_by.full_name}&nbsp;
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
										<Typography className={classes.greySubtitleCap}>
											Checked-in tickets
										</Typography>
										<Typography className={classes.darkGreySubtitle}>
											{"#" + ticket_instance_id + " ( "}
											<span className={classes.pinkSpan}>
												{"Order #" + order_number}&nbsp;
											</span>
											) by&nbsp;
											<span className={classes.pinkSpan}>
												{redeemed_for.full_name}&nbsp;
											</span>
											on&nbsp;
											<span className={classes.greySubtitle}>
												{moment(occured_at).format("l hh:mmA")}
											</span>
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
									<img src={servedImage("/icons/refund-active.svg")}/>
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
										<div className={classes.halfFlex}>
											<Typography
												className={
													classes.greySubtitleCap + " " + classes.halfFlexItem
												}
											>
												Items refunded
											</Typography>
											<Typography
												className={
													classes.greySubtitleCap + " " + classes.halfFlexItem
												}
											>
												Reason
											</Typography>
										</div>
										<div className={classes.halfFlex}>
											<div
												className={
													classes.darkGreySubtitle + " " + classes.halfFlexItem
												}
											>
												{refund_items.map((item, index) => {
													return (
														<Typography
															key={index}
															className={classes.darkGreySubtitle}
														>
															{item.item_type +
																" | " +
																item.ticket_type_name +
																" | #" +
																order_number +
																" | "}
															<span
																className={
																	classes.totalRevenue + " " + classes.boldSpan
																}
															>{`$${(item.amount / 100).toFixed(2)}`}</span>
														</Typography>
													);
												})}
												<span
													className={classes.totalRevenue}
												>{`Per Ticket Fee - $${(total_in_cents / 100).toFixed(
														2
													)}`}</span>
											</div>
											<Typography
												className={
													classes.darkGreySubtitle + " " + classes.halfFlexItem
												}
											>
												{reason === null ? "-" : reason}
											</Typography>
										</div>
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
									<img src={servedImage("/icons/note-circle-gray.svg")}/>
									<Typography className={classes.greySubtitle}>
										{moment(event_start).format("l hh:mmA")}
									</Typography>
									<Typography>
										<span className={classes.pinkSpan + " " + classes.boldSpan}>
											{profile.first_name}&nbsp;{profile.last_name}&nbsp;
										</span>
										<span className={classes.boldSpan}>added a note</span>
										&nbsp;
										<span>to</span>
										&nbsp;
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
										<Typography className={classes.greySubtitleCap}>
											Note:
										</Typography>
										<Typography className={classes.darkGreySubtitle}>
											{note}
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
									{action === "Cancelled" ? (
										<img
											src={servedImage("/icons/transfer-circle-error.svg")}
										/>
									) : action === "Accepted" ? (
										<img
											src={servedImage("/icons/transfer-circle-success.svg")}
										/>
									) : (
										<img
											src={servedImage("/icons/transfer-circle-warning.svg")}
										/>
									)}
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
										<FanActivityMobileRow>
											<Typography className={classes.greySubtitleCap}>
												Tickets:
											</Typography>
											<Typography className={classes.greySubtitleCap}>
												Initiated by:
											</Typography>
											<Typography className={classes.greySubtitleCap}>
												Transfer Address:
											</Typography>
											<Typography className={classes.greySubtitleCap}>
												Accepted by:
											</Typography>
											{action === "Started" ? (
												<Button variant="warning" size="small">
													<span className={classes.smallTextCap}>
														Cancel Transfer
													</span>
												</Button>
											) : (
												<div/>
											)}
										</FanActivityMobileRow>
										<FanActivityMobileRow>
											<Typography className={classes.darkGreySubtitle}>
												{transfer_id}
											</Typography>
											<Typography className={classes.darkGreySubtitle}>
												<span className={classes.pinkSpan}>
													{initiated_by !== null ? initiated_by.full_name : "-"}
												</span>
											</Typography>
											<Typography className={classes.darkGreySubtitle}>
												{destination_addresses}
											</Typography>
											<Typography className={classes.darkGreySubtitle}>
												<span className={classes.pinkSpan}>
													{accepted_by !== null ? accepted_by.full_name : "-"}
												</span>
											</Typography>
											<div/>
										</FanActivityMobileRow>
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

	renderActivityMobile(type) {
		const {
			ticket_quantity,
			order_number,
			action,
			total_in_cents,
			ticket_ids,
			transfer_id,
			destination_addresses,
			accepted_by,
			reason,
			refund_items,
			note,
			order_id,
			initiated_by,
			redeemed_by,
			events,
			redeemed_for,
			occured_at,
			ticket_instance_id
		} = this.props.item;

		const { name, event_start, venue } = this.props.event;

		const { onExpandChange, expanded, profile, classes } = this.props;

		let activityCard = null;

		switch (type) {
			case "Purchase":
				activityCard = (
					<div className={classes.root}>
						<Divider/>
						<div
							onClick={onExpandChange}
							className={classes.mobileActivityHeader}
						>
							<div>
								<div className={classes.mobileHeaderTopRow}>
									<img
										className={classes.mobiIcon}
										src={servedImage("/icons/money-circle-active.svg")}
									/>
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
								</div>
								<div className={classes.mobileHeaderBottomRow}>
									<Typography className={classes.greySubtitle}>
										{moment(event_start).format("l hh:mmA")}
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
								</div>
								<Collapse in={expanded}>
									<div className={classes.card}>
										<FanActivityPurchaseRow>
											<Typography className={classes.greySubtitleCap}>
												Event
											</Typography>
											<Typography className={classes.greySubtitleCap}>
												Code
											</Typography>
											<Typography className={classes.greySubtitleCap}>
												Qty
											</Typography>
											<Typography className={classes.greySubtitleCap}>
												Total
											</Typography>
											<div/>
										</FanActivityPurchaseRow>
										<FanActivityPurchaseRow>
											<Typography>
												<span className={classes.boldSpan}>{name}</span>
											</Typography>
											{events.map((item, index) => {
												return (
													<Typography
														key={index}
														className={classes.darkGreySubtitle}
													>
														<span className={classes.boldSpan}>
															{item.code}
														</span>
														<span
															className={
																classes.greySubtitle + " " + classes.boldSpan
															}
														>{` / $${(item.total_in_cents / 100).toFixed(
																2
															)}`}</span>
														<br/>
														<span
															className={
																classes.greySubtitle + " " + classes.boldSpan
															}
														>
															{item.code_type}
														</span>
													</Typography>
												);
											})}
											<Typography className={classes.darkGreySubtitle}>
												{ticket_quantity}
											</Typography>
											<Typography className={classes.darkGreySubtitle}>
												<span className={classes.totalRevenue}>{`$${(
													total_in_cents / 100
												).toFixed(2)}`}</span>
											</Typography>
											<Link to={`/orders/${order_id}`}>
												<Button variant="secondary" size="small">
													<span className={classes.smallTextCap}>
														View order
													</span>
												</Button>
											</Link>
										</FanActivityPurchaseRow>
										<Typography>
											<span className={classes.greySubtitle}>
												{venue.address}
											</span>
											<br/>
											<span className={classes.greySubtitle}>
												{moment(event_start).format("llll")}
											</span>
										</Typography>
									</div>
								</Collapse>
							</div>
						</div>
					</div>
				);
				break;
			case "CheckIn":
				activityCard = (
					<div className={classes.root}>
						<div
							variant={"raisedLight"}
							onClick={onExpandChange}
							className={classes.card}
						>
							<div>
								<FanActivityCardRow>
									<img src={servedImage("/icons/calendar-active.svg")}/>
									<Typography className={classes.greySubtitle}>
										{moment(event_start).format("l hh:mmA")}
									</Typography>
									<Typography>
										<span className={classes.pinkSpan + " " + classes.boldSpan}>
											{redeemed_by.full_name}&nbsp;
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
										<Typography className={classes.greySubtitleCap}>
											Checked-in tickets
										</Typography>
										<Typography className={classes.darkGreySubtitle}>
											{"#" + ticket_instance_id + " ( "}
											<span className={classes.pinkSpan}>
												{"Order #" + order_number}&nbsp;
											</span>
											) by&nbsp;
											<span className={classes.pinkSpan}>
												{redeemed_for.full_name}&nbsp;
											</span>
											on&nbsp;
											<span className={classes.greySubtitle}>
												{moment(occured_at).format("l hh:mmA")}
											</span>
										</Typography>
									</div>
								</Collapse>
							</div>
						</div>
					</div>
				);
				break;
			case "Refund":
				activityCard = (
					<div className={classes.root}>
						<div
							variant={"raisedLight"}
							onClick={onExpandChange}
							className={classes.card}
						>
							<div>
								<FanActivityCardRow>
									<img src={servedImage("/icons/refund-active.svg")}/>
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
										<div className={classes.halfFlex}>
											<Typography
												className={
													classes.greySubtitleCap + " " + classes.halfFlexItem
												}
											>
												Items refunded
											</Typography>
											<Typography
												className={
													classes.greySubtitleCap + " " + classes.halfFlexItem
												}
											>
												Reason
											</Typography>
										</div>
										<div className={classes.halfFlex}>
											<div
												className={
													classes.darkGreySubtitle + " " + classes.halfFlexItem
												}
											>
												{refund_items.map((item, index) => {
													return (
														<Typography
															key={index}
															className={classes.darkGreySubtitle}
														>
															{item.item_type +
																" | " +
																item.ticket_type_name +
																" | #" +
																order_number +
																" | "}
															<span
																className={
																	classes.totalRevenue + " " + classes.boldSpan
																}
															>{`$${(item.amount / 100).toFixed(2)}`}</span>
														</Typography>
													);
												})}
												<span
													className={classes.totalRevenue}
												>{`Per Ticket Fee - $${(total_in_cents / 100).toFixed(
														2
													)}`}</span>
											</div>
											<Typography
												className={
													classes.darkGreySubtitle + " " + classes.halfFlexItem
												}
											>
												{reason === null ? "-" : reason}
											</Typography>
										</div>
									</div>
								</Collapse>
							</div>
						</div>
					</div>
				);
				break;
			case "Note":
				activityCard = (
					<div className={classes.root}>
						<div
							variant={"raisedLight"}
							onClick={onExpandChange}
							className={classes.card}
						>
							<div>
								<FanActivityCardRow>
									<img src={servedImage("/icons/note-circle-gray.svg")}/>
									<Typography className={classes.greySubtitle}>
										{moment(event_start).format("l hh:mmA")}
									</Typography>
									<Typography>
										<span className={classes.pinkSpan + " " + classes.boldSpan}>
											{profile.first_name}&nbsp;{profile.last_name}&nbsp;
										</span>
										<span className={classes.boldSpan}>added a note</span>
										&nbsp;
										<span>to</span>
										&nbsp;
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
										<Typography className={classes.greySubtitleCap}>
											Note:
										</Typography>
										<Typography className={classes.darkGreySubtitle}>
											{note}
										</Typography>
									</div>
								</Collapse>
							</div>
						</div>
					</div>
				);
				break;
			case "Transfer":
				activityCard = (
					<div className={classes.root}>
						<div
							variant={"raisedLight"}
							onClick={onExpandChange}
							className={classes.card}
						>
							<div>
								<FanActivityCardRow>
									{action === "Cancelled" ? (
										<img
											src={servedImage("/icons/transfer-circle-error.svg")}
										/>
									) : action === "Accepted" ? (
										<img
											src={servedImage("/icons/transfer-circle-success.svg")}
										/>
									) : (
										<img
											src={servedImage("/icons/transfer-circle-warning.svg")}
										/>
									)}
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
											<Typography className={classes.greySubtitleCap}>
												Tickets:
											</Typography>
											<Typography className={classes.greySubtitleCap}>
												Initiated by:
											</Typography>
											<Typography className={classes.greySubtitleCap}>
												Transfer Address:
											</Typography>
											<Typography className={classes.greySubtitleCap}>
												Accepted by:
											</Typography>
											{action === "Started" ? (
												<Button variant="warning" size="small">
													<span className={classes.smallTextCap}>
														Cancel Transfer
													</span>
												</Button>
											) : (
												<div/>
											)}
										</FanActivityTransferRow>
										<FanActivityTransferRow>
											<Typography className={classes.darkGreySubtitle}>
												{transfer_id}
											</Typography>
											<Typography className={classes.darkGreySubtitle}>
												<span className={classes.pinkSpan}>
													{initiated_by !== null ? initiated_by.full_name : "-"}
												</span>
											</Typography>
											<Typography className={classes.darkGreySubtitle}>
												{destination_addresses}
											</Typography>
											<Typography className={classes.darkGreySubtitle}>
												<span className={classes.pinkSpan}>
													{accepted_by !== null ? accepted_by.full_name : "-"}
												</span>
											</Typography>
											<div/>
										</FanActivityTransferRow>
									</div>
								</Collapse>
							</div>
						</div>
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
		return (
			<div>
				<Hidden smDown>{this.renderActivity(type)}</Hidden>
				<Hidden mdUp>{this.renderActivityMobile(type)}</Hidden>
			</div>
		);
	}
}

FanHistoryActivityCard.propTypes = {
	item: PropTypes.object,
	event: PropTypes.object,
	event_id: PropTypes.string,
	revenue_in_cents: PropTypes.number,
	order_id: PropTypes.string,
	venue: PropTypes.string,
	onExpandChange: PropTypes.func.isRequired,
	expanded: PropTypes.bool.isRequired,
	event_history: PropTypes.array
	//	type: PropTypes.string.isRequired
};

export default withStyles(styles)(FanHistoryActivityCard);
