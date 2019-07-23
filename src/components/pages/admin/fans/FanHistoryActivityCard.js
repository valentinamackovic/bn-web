import React, { Component } from "react";
import PropTypes from "prop-types";
import {
	withStyles,
	Typography,
	Collapse,
	Hidden,
	Divider
} from "@material-ui/core";
import Card from "../../../elements/Card";
import { fontFamilyDemiBold, secondaryHex } from "../../../../config/theme";
import FanActivityCardRow from "./FanActivityCardRow";
import FanActivityTransferRow from "./FanActivityTransferRow";
import FanActivityMobileRow from "./FanActivityMobileRow";
import servedImage from "../../../../helpers/imagePathHelper";
import classNames from "classnames";

import FanActivityPurchaseRow from "./FanActivityPurchaseRow";
import { Link } from "react-router-dom";
import Button from "../../../elements/Button";
import CancelTransferDialog from "../../myevents/transfers/CancelTransferDialog";

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
	mobiCard: {
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

		this.state = {
			cancelTransferKey: null
		};
		this.onOpenCancelTransferDialog = this.onOpenCancelTransferDialog.bind(
			this
		);
	}

	onOpenCancelTransferDialog(cancelTransferKey) {
		this.setState({ cancelTransferKey });
	}

	renderActivity(type) {
		const {
			ticket_quantity,
			order_number,
			status,
			total_in_cents,
			ticket_ids,
			destination_addresses,
			accepted_by,
			reason,
			refund_items,
			note,
			order_id,
			transfer_key,
			ticket_number,
			initiated_by,
			refunded_by,
			redeemed_by,
			events,
			redeemed_for,
			cancelled_by,
			ticket_numbers
		} = this.props.item;

		const { name, venue } = this.props.event;

		const {
			onExpandChange,
			expanded,
			profile,
			occurredAt,
			classes,
			eventStart
		} = this.props;

		let activityCard = null;

		switch (type) {
			case "Purchase":
				activityCard = (
					<div className={classes.root}>
						<Card variant={"subCard"} className={classes.card}>
							<div>
								<FanActivityCardRow>
									<img src={servedImage("/icons/money-circle-active.svg")}/>
									<Typography className={classes.greySubtitle}>
										{occurredAt}
									</Typography>
									<Typography>
										<span
											className={classNames({
												[classes.pinkSpan]: true,
												[classes.boldSpan]: true
											})}
										>
											{profile.first_name}&nbsp;{profile.last_name}&nbsp;
										</span>
										<span className={classes.boldSpan}>purchased</span>
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
										<div
											onClick={onExpandChange}
											className={classes.showHideRow}
										>
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
										<div
											onClick={onExpandChange}
											className={classes.showHideRow}
										>
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
															className={classNames({
																[classes.greySubtitle]: true,
																[classes.boldSpan]: true
															})}
														>{` / $${(item.total_in_cents / 100).toFixed(
																2
															)}`}</span>
														<br/>
														<span
															className={classNames({
																[classes.greySubtitle]: true,
																[classes.boldSpan]: true
															})}
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
											<span className={classes.greySubtitle}>{eventStart}</span>
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
						<Card variant={"subCard"} className={classes.card}>
							<div>
								<FanActivityCardRow>
									<img src={servedImage("/icons/calendar-active.svg")}/>
									<Typography className={classes.greySubtitle}>
										{occurredAt}
									</Typography>
									<Typography>
										<span
											className={classNames({
												[classes.pinkSpan]: true,
												[classes.boldSpan]: true
											})}
										>
											{redeemed_by.full_name}&nbsp;
										</span>
										<span className={classes.boldSpan}>checked-in&nbsp;</span>
										<span>to {name} (1 Ticket)</span>
									</Typography>

									{!expanded ? (
										<div
											onClick={onExpandChange}
											className={classes.showHideRow}
										>
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
										<div
											onClick={onExpandChange}
											className={classes.showHideRow}
										>
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
											{"#" + ticket_number + " ( "}
											<span className={classes.pinkSpan}>
												{"Order #" + order_number}&nbsp;
											</span>
											) scanned by&nbsp;
											<span className={classes.pinkSpan}>
												{redeemed_for.full_name}&nbsp;
											</span>
											on&nbsp;
											<span className={classes.greySubtitle}>{occurredAt}</span>
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
						<Card variant={"subCard"} className={classes.card}>
							<div>
								<FanActivityCardRow>
									<img src={servedImage("/icons/refund-active.svg")}/>
									<Typography className={classes.greySubtitle}>
										{occurredAt}
									</Typography>
									<Typography>
										<span
											className={classNames({
												[classes.pinkSpan]: true,
												[classes.boldSpan]: true
											})}
										>
											{refunded_by.full_name}&nbsp;
										</span>
										<span className={classes.boldSpan}>refunded&nbsp;</span>
										<span className={classes.totalRevenue}>{`$${(
											total_in_cents / 100
										).toFixed(2)}`}</span>
										&nbsp;
										<span>
											to&nbsp;
											<span
												className={classNames({
													[classes.pinkSpan]: true,
													[classes.boldSpan]: true
												})}
											>
												{profile.first_name}&nbsp;{profile.last_name}&nbsp;
											</span>
											&nbsp;(
											<span className={classes.pinkSpan}>
												Order #{order_number}
											</span>
											)
										</span>
									</Typography>

									{!expanded ? (
										<div
											onClick={onExpandChange}
											className={classes.showHideRow}
										>
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
										<div
											onClick={onExpandChange}
											className={classes.showHideRow}
										>
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
												className={classNames({
													[classes.greySubtitleCap]: true,
													[classes.halfFlexItem]: true
												})}
											>
												Items refunded
											</Typography>
											<Typography
												className={classNames({
													[classes.greySubtitleCap]: true,
													[classes.halfFlexItem]: true
												})}
											>
												Reason
											</Typography>
										</div>
										<div className={classes.halfFlex}>
											<div
												className={classNames({
													[classes.darkGreySubtitle]: true,
													[classes.halfFlexItem]: true
												})}
											>
												{refund_items.map((item, index) => {
													return (
														<Typography
															key={index}
															className={classes.darkGreySubtitle}
														>
															{item.item_type} | {order_number} |
															<span
																className={classNames({
																	[classes.totalRevenue]: true,
																	[classes.boldSpan]: true
																})}
															>{`$${(item.amount / 100).toFixed(2)}`}</span>
															<br/>
															<span
																className={classes.totalRevenue}
															>{`Per Ticket Fee - $${(
																	item.amount /
																item.quantity /
																100
																).toFixed(2)}`}</span>
														</Typography>
													);
												})}
											</div>
											<Typography
												className={classNames({
													[classes.darkGreySubtitle]: true,
													[classes.halfFlexItem]: true
												})}
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
						<Card variant={"subCard"} className={classes.card}>
							<div>
								<FanActivityCardRow>
									<img src={servedImage("/icons/note-circle-gray.svg")}/>
									<Typography className={classes.greySubtitle}>
										{occurredAt}
									</Typography>
									<Typography>
										<span
											className={classNames({
												[classes.pinkSpan]: true,
												[classes.boldSpan]: true
											})}
										>
											{profile.first_name}&nbsp;{profile.last_name}&nbsp;
										</span>
										<span className={classes.boldSpan}>added a note</span>
										&nbsp;
										<span>to</span>
										&nbsp;
										<span className={classes.boldSpan}>{name}</span>
									</Typography>

									{!expanded ? (
										<div
											onClick={onExpandChange}
											className={classes.showHideRow}
										>
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
										<div
											onClick={onExpandChange}
											className={classes.showHideRow}
										>
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
						<Card variant={"subCard"} className={classes.card}>
							<div>
								<FanActivityCardRow>
									{status === "Cancelled" ? (
										<img
											src={servedImage("/icons/transfer-circle-error.svg")}
										/>
									) : status === "Completed" ? (
										<img
											src={servedImage("/icons/transfer-circle-success.svg")}
										/>
									) : (
										<img
											src={servedImage("/icons/transfer-circle-warning.svg")}
										/>
									)}
									<Typography className={classes.greySubtitle}>
										{occurredAt}
									</Typography>
									<Typography>
										<span
											className={classNames({
												[classes.pinkSpan]: true,
												[classes.boldSpan]: true
											})}
										>
											{profile.first_name}&nbsp;{profile.last_name}&nbsp;
										</span>
										<span className={classes.boldSpan}>
											{"transferred (" + status + ") "}
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
										<div
											onClick={onExpandChange}
											className={classes.showHideRow}
										>
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
										<div
											onClick={onExpandChange}
											className={classes.showHideRow}
										>
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
												{status === "Cancelled"
													? "Cancelled by"
													: "Accepted by"}
											</Typography>
											{status === "Pending" ? (
												<Button
													variant="warning"
													size="small"
													onClick={() =>
														this.onOpenCancelTransferDialog(transfer_key)
													}
												>
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
												{ticket_numbers.map(item => {
													return item;
												})}
												<br/>
												<span>
													(
													<span className={classes.pinkSpan}>
														Order #{order_number}
													</span>
													)
												</span>
											</Typography>
											<Typography className={classes.greySubtitle}>
												<span className={classes.pinkSpan}>
													{initiated_by !== null ? initiated_by.full_name : "-"}
												</span>
												<br/>
												{occurredAt}
											</Typography>
											<Typography className={classes.darkGreySubtitle}>
												{destination_addresses}
											</Typography>
											<Typography className={classes.darkGreySubtitle}>
												<span className={classes.pinkSpan}>
													{status === "Cancelled"
														? cancelled_by.full_name
														: accepted_by !== null
															? accepted_by.full_name
															: "-"}
												</span>
											</Typography>
											<div/>
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

	renderActivityMobile(type) {
		const {
			ticket_quantity,
			order_number,
			status,
			total_in_cents,
			ticket_ids,
			destination_addresses,
			reason,
			refund_items,
			note,
			order_id,
			transfer_key,
			ticket_number,
			ticket_numbers,
			redeemed_by,
			redeemed_for
		} = this.props.item;

		const { name } = this.props.event;

		const {
			onExpandChange,
			expanded,
			profile,
			occurredAt,
			classes
		} = this.props;

		let activityCard = null;

		switch (type) {
			case "Purchase":
				activityCard = (
					<div className={classes.root}>
						<Divider/>
						<div className={classes.mobileActivityHeader}>
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
											{ticket_quantity} tickets to&nbsp;
											<span className={classes.boldSpan}>{name}</span>
										</span>
										&nbsp;
										<span>
											(
											<span className={classes.pinkSpan}>
												Order #{order_number}
											</span>
											)
										</span>
										&nbsp;
									</Typography>
								</div>
								<div className={classes.mobileHeaderBottomRow}>
									<Typography className={classes.greySubtitle}>
										{occurredAt}
									</Typography>
									{!expanded ? (
										<div
											onClick={onExpandChange}
											className={classes.showHideRow}
										>
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
										<div
											onClick={onExpandChange}
											className={classes.showHideRow}
										>
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
									<FanActivityMobileRow>
										<Typography className={classes.greySubtitleCap}>
											Qty
										</Typography>
										<Typography className={classes.greySubtitleCap}>
											Order Value
										</Typography>
										<div/>
									</FanActivityMobileRow>
									<FanActivityMobileRow>
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
												<span className={classes.smallTextCap}>View order</span>
											</Button>
										</Link>
									</FanActivityMobileRow>
								</Collapse>
							</div>
						</div>
					</div>
				);
				break;
			case "CheckIn":
				activityCard = (
					<div className={classes.root}>
						<Divider/>
						<div className={classes.mobileActivityHeader}>
							<div>
								<div className={classes.mobileHeaderTopRow}>
									<img
										className={classes.mobiIcon}
										src={servedImage("/icons/calendar-active.svg")}
									/>
									<Typography>
										<span
											className={classNames({
												[classes.pinkSpan]: true,
												[classes.boldSpan]: true
											})}
										>
											{redeemed_by.full_name}&nbsp;
										</span>
										<span className={classes.boldSpan}>checked-in&nbsp;</span>
										to {name} (1 Ticket)
									</Typography>
								</div>
								<div className={classes.mobileHeaderBottomRow}>
									<Typography className={classes.greySubtitle}>
										{occurredAt}
									</Typography>
									{!expanded ? (
										<div
											onClick={onExpandChange}
											className={classes.showHideRow}
										>
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
										<div
											onClick={onExpandChange}
											className={classes.showHideRow}
										>
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
									<div className={classes.mobiCard}>
										<Typography className={classes.greySubtitleCap}>
											Checked-in tickets
										</Typography>
										<Typography className={classes.darkGreySubtitle}>
											{"#" + ticket_number + " ( "}
											<span className={classes.pinkSpan}>
												Order #{order_number}&nbsp;
											</span>
											) scanned by&nbsp;
											<span className={classes.pinkSpan}>
												{redeemed_for.full_name}&nbsp;
											</span>
											on&nbsp;
											<span className={classes.greySubtitle}>{occurredAt}</span>
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
						<Divider/>
						<div className={classes.mobileActivityHeader}>
							<div>
								<div className={classes.mobileHeaderTopRow}>
									<img
										className={classes.mobiIcon}
										src={servedImage("/icons/refund-active.svg")}
									/>
									<Typography>
										<span
											className={classNames({
												[classes.pinkSpan]: true,
												[classes.boldSpan]: true
											})}
										>
											{profile.first_name}&nbsp;{profile.last_name}&nbsp;
										</span>
										<span className={classes.boldSpan}>refunded&nbsp;</span>
										<span className={classes.totalRevenue}>{`$${(
											total_in_cents / 100
										).toFixed(2)}`}</span>
										<br/>
										<span>
											&nbsp;(
											<span className={classes.pinkSpan}>
												{"Order #" + order_number + ""}
											</span>
											)
										</span>
									</Typography>
								</div>
								<div className={classes.mobileHeaderBottomRow}>
									<Typography className={classes.greySubtitle}>
										{occurredAt}
									</Typography>
									{!expanded ? (
										<div
											onClick={onExpandChange}
											className={classes.showHideRow}
										>
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
										<div
											onClick={onExpandChange}
											className={classes.showHideRow}
										>
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
									<div className={classes.mobiCard}>
										<FanActivityMobileRow>
											<Typography className={classes.greySubtitleCap}>
												Items refunded
											</Typography>
											<Typography className={classes.greySubtitleCap}>
												Reason
											</Typography>
										</FanActivityMobileRow>
										<FanActivityMobileRow>
											<div className={classes.darkGreySubtitle}>
												{refund_items.map((item, index) => {
													return (
														<Typography
															key={index}
															className={classes.darkGreySubtitle}
														>
															{item.item_type} | ${order_number} |
															<span
																className={classNames({
																	[classes.totalRevenue]: true,
																	[classes.boldSpan]: true
																})}
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
											<Typography className={classes.darkGreySubtitle}>
												{reason === null ? "-" : reason}
											</Typography>
										</FanActivityMobileRow>
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
						<Divider/>
						<div className={classes.mobileActivityHeader}>
							<div>
								<div className={classes.mobileHeaderTopRow}>
									<img
										className={classes.mobiIcon}
										src={servedImage("/icons/note-circle-gray.svg")}
									/>
									<Typography>
										<span
											className={classNames({
												[classes.pinkSpan]: true,
												[classes.boldSpan]: true
											})}
										>
											{profile.first_name}&nbsp;{profile.last_name}&nbsp;
										</span>
										<span className={classes.boldSpan}>added a note</span>
										&nbsp;
										<span>to</span>
										&nbsp;
										<span className={classes.boldSpan}>{name}</span>
									</Typography>
								</div>
								<div className={classes.mobileHeaderBottomRow}>
									<Typography className={classes.greySubtitle}>
										{occurredAt}
									</Typography>
									{!expanded ? (
										<div
											onClick={onExpandChange}
											className={classes.showHideRow}
										>
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
										<div
											onClick={onExpandChange}
											className={classes.showHideRow}
										>
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
									<div className={classes.mobiCard}>
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
						<Divider/>
						<div className={classes.mobileActivityHeader}>
							<div>
								<div className={classes.mobileHeaderTopRow}>
									{status === "Cancelled" ? (
										<img
											className={classes.mobiIcon}
											src={servedImage("/icons/transfer-circle-error.svg")}
										/>
									) : status === "Completed" ? (
										<img
											className={classes.mobiIcon}
											src={servedImage("/icons/transfer-circle-success.svg")}
										/>
									) : (
										<img
											className={classes.mobiIcon}
											src={servedImage("/icons/transfer-circle-warning.svg")}
										/>
									)}
									<Typography>
										<span
											className={classNames({
												[classes.pinkSpan]: true,
												[classes.boldSpan]: true
											})}
										>
											{profile.first_name}&nbsp;{profile.last_name}&nbsp;
										</span>
										<span className={classes.boldSpan}>
											{"transferred (" + status + ") "}
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
								</div>
								<div className={classes.mobileHeaderBottomRow}>
									<Typography className={classes.greySubtitle}>
										{occurredAt}
									</Typography>
									{!expanded ? (
										<div
											onClick={onExpandChange}
											className={classes.showHideRow}
										>
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
										<div
											onClick={onExpandChange}
											className={classes.showHideRow}
										>
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
									<div className={classes.mobiCard}>
										<div>
											<Typography className={classes.greySubtitleCap}>
												Tickets:
											</Typography>
											<Typography className={classes.darkGreySubtitle}>
												{ticket_numbers.map((item, index) => {
													return item;
												})}
											</Typography>
										</div>
										<div>
											{status === "Pending" ? (
												<Button
													variant="warning"
													size="small"
													onClick={() =>
														this.onOpenCancelTransferDialog(transfer_key)
													}
												>
													<span className={classes.smallTextCap}>
														Cancel Transfer
													</span>
												</Button>
											) : (
												<div/>
											)}
										</div>
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
		const { cancelTransferKey } = this.state;
		return (
			<div>
				<CancelTransferDialog
					transferKey={cancelTransferKey}
					onClose={() => this.setState({ cancelTransferKey: null })}
					// onSuccess={() => this.refreshGuests()}
				/>
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
