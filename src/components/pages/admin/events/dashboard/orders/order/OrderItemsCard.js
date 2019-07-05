import React, { Component } from "react";
import {
	Typography,
	withStyles,
	IconButton,
	Collapse,
	Hidden
} from "@material-ui/core";
import PropTypes from "prop-types";
import classnames from "classnames";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import Card from "../../../../../../elements/Card";
import {
	fontFamilyDemiBold,
	secondaryHex
} from "../../../../../../../config/theme";
import { dollars } from "../../../../../../../helpers/money";
import TicketCard from "./TicketCard";

const styles = theme => ({
	root: {
		paddingTop: 27,
		paddingBottom: 22,
		marginTop: 5
	},
	innerPadding: {
		paddingLeft: 25,
		paddingRight: 25
	},
	row: {
		display: "flex"
	},
	headingText: {
		fontFamily: fontFamilyDemiBold
	},
	subText: {
		color: "#8b94a7",
		fontSize: 14
	},
	moreButtonContainer: {
		top: -20,
		position: "relative"
	},
	showMoreContainer: {
		display: "flex",
		cursor: "pointer",
		marginTop: 10
	},
	showMoreText: {
		fontFamily: fontFamilyDemiBold,
		color: secondaryHex,
		fontSize: 14,
		marginRight: 6,
		marginTop: 2,
		textTransform: "capitalize"
	},
	ticketContainer: {
		marginTop: 20
	},
	//Mobile styles
	mobileCard: {
		marginTop: 20
	},
	mobileHeadingText: {
		fontFamily: fontFamilyDemiBold,
		color: secondaryHex
	},
	mobileRow: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "flex-start"
	},
	mobilePadded: {
		padding: 18
	},
	mobileEventDetailsText: {
		color: "#8b94a7",
		fontSize: 14
	},
	mobileBottomRow: {
		display: "flex",
		paddingLeft: 18,
		paddingRight: 18
	},
	mobileSubHeadingText: {
		fontSize: 12,
		textTransform: "uppercase",
		opacity: 0.3
	},
	mobileValueText: {
		fontSize: 15,
		textTransform: "uppercase"
	},
	mobileValueHighlightedText: {
		color: secondaryHex
	}
});

class OrderItemsCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showOrderDetails: false,

			selectedRefundOrderItem: {}
		};

		this.toggleShowOrderDetails = this.toggleShowOrderDetails.bind(this);
	}

	componentDidMount() {
		setTimeout(this.toggleShowOrderDetails, 200);
	}

	toggleShowOrderDetails() {
		const { showOrderDetails } = this.state;

		this.setState({ showOrderDetails: !showOrderDetails });
	}

	toggleRefundOrderItem(id) {
		this.setState(({ selectedRefundOrderItem }) => {
			selectedRefundOrderItem[id] = !selectedRefundOrderItem[id];
			return { selectedRefundOrderItem };
		});
	}

	renderTickets() {
		const { classes, eventDetails, order, items } = this.props;
		const { showOrderDetails, selectedRefundOrderItem } = this.state;

		const colStyles = [
			{ flex: 4 },
			{ flex: 3 },
			{ flex: 3 },
			{ flex: 2 },
			{ flex: 1 },
			{ flex: 2 },
			{ flex: 2 }
		];

		return (
			<Collapse in={showOrderDetails}>
				<div className={classes.ticketContainer}>
					<div className={classes.row}>
						{[
							"Ticket #",
							"Attendee",
							"Ticket type",
							"Code",
							"QTY",
							"Total",
							"Status"
						].map((heading, index) => (
							<Typography
								key={index}
								style={colStyles[index]}
								className={classes.headingText}
							>
								{heading}
							</Typography>
						))}
					</div>
					{items.map((item, index) => (
						<TicketCard
							onCheck={() => this.toggleRefundOrderItem(index)}
							isChecked={!!selectedRefundOrderItem[index]}
							key={index}
							colStyles={colStyles}
							{...item}
						/>
					))}
				</div>
			</Collapse>
		);
	}

	render() {
		const { classes, eventDetails, order, items } = this.props;
		const { showOrderDetails } = this.state;

		const {
			name: eventName,
			venue,
			displayDate: eventDisplayDate
		} = eventDetails;

		let code = "";
		order.items.forEach(item => {
			if (item.redemption_code) {
				code = item.redemption_code;
			}
		});

		const { total_in_cents, fees_in_cents } = order;

		const topRowCols = [
			{ flex: 4 },
			{ flex: 2 },
			{ flex: 1 },
			{ flex: 2 },
			{ flex: 1, textAlign: "right" }
		];

		const moreIcon = (
			<IconButton onClick={e => {}}>
				<MoreHorizIcon nativeColor="#2c3136"/>
			</IconButton>
		);

		const venueDisplayName = `${venue.name}, ${venue.address}, ${venue.city}`;

		const accessCodeType = "TODO";
		const qty = items.length;

		return (
			<React.Fragment>
				{/*DESKTOP*/}
				<Hidden smDown>
					<div
						className={classnames({
							[classes.row]: true,
							[classes.innerPadding]: true
						})}
					>
						{["Event", "Code", "QTY", "Total", ""].map((heading, index) => (
							<Typography
								key={index}
								style={topRowCols[index]}
								className={classes.headingText}
							>
								{heading}
							</Typography>
						))}
					</div>
					<Card
						variant={"raisedLight"}
						className={classnames({
							[classes.root]: true,
							[classes.innerPadding]: true
						})}
					>
						<div className={classes.row}>
							<span style={topRowCols[0]}>
								<Typography className={classes.headingText}>
									{eventName}
								</Typography>

								<Typography className={classes.subText}>
									{venueDisplayName}
								</Typography>

								<Typography className={classes.subText}>
									{eventDisplayDate}
								</Typography>
							</span>
							<span style={topRowCols[1]}>
								{code ? (
									<React.Fragment>
										<Typography className={classes.headingText}>
											{code}
										</Typography>
										<Typography className={classes.subText}>
											{accessCodeType}
										</Typography>
									</React.Fragment>
								) : (
									"-"
								)}
							</span>
							<span style={topRowCols[2]}>{qty}</span>
							<span style={topRowCols[3]}>{dollars(total_in_cents)}</span>
							<span
								style={topRowCols[4]}
								className={classes.moreButtonContainer}
							>
								{moreIcon}
							</span>
						</div>

						<div
							className={classes.showMoreContainer}
							onClick={this.toggleShowOrderDetails}
						>
							<Typography className={classes.showMoreText}>
								{showOrderDetails ? "Hide" : "Show"} order details
							</Typography>
							<img
								src={`/icons/${showOrderDetails ? "up" : "down"}-gray.svg`}
							/>
						</div>

						{this.renderTickets()}
					</Card>
				</Hidden>

				{/*MOBILE*/}
				<Hidden mdUp>
					<Card variant={"raisedLight"} className={classes.mobileCard}>
						<div className={classes.mobileRow}>
							<div className={classes.mobilePadded} style={{ paddingRight: 0 }}>
								<Typography className={classes.mobileHeadingText}>
									{eventName}
								</Typography>
								<Typography className={classes.mobileEventDetailsText}>
									{venueDisplayName}
								</Typography>
								<Typography className={classes.mobileEventDetailsText}>
									{eventDisplayDate}
								</Typography>
							</div>
							{moreIcon}
						</div>

						<div className={classes.mobileBottomRow}>
							<div style={{ flex: 4 }}>
								<Typography className={classes.mobileSubHeadingText}>
									Code
								</Typography>
								<Typography className={classes.mobileValueText}>
									{code}
								</Typography>
								<Typography>{accessCodeType}</Typography>
							</div>
							<div style={{ flex: 2 }}>
								<Typography className={classes.mobileSubHeadingText}>
									QTY
								</Typography>
								<Typography className={classes.mobileValueText}>
									{code}
								</Typography>
								<Typography>{qty}</Typography>
							</div>
							<div style={{ flex: 3 }}>
								<Typography className={classes.mobileSubHeadingText}>
									Total
								</Typography>
								<Typography className={classes.mobileValueText}>
									{dollars(total_in_cents - fees_in_cents)}
								</Typography>
								<Typography>+ {dollars(fees_in_cents)} fees</Typography>
							</div>
						</div>
					</Card>
				</Hidden>
			</React.Fragment>
		);
	}
}

OrderItemsCard.propTypes = {
	classes: PropTypes.object.isRequired,
	eventDetails: PropTypes.object.isRequired,
	items: PropTypes.array.isRequired,
	order: PropTypes.object.isRequired
};

export default withStyles(styles)(OrderItemsCard);
