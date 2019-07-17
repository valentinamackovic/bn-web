import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";

import Button from "../../../../../../elements/Button";
import Dialog from "../../../../../../elements/Dialog";
import notification from "../../../../../../../stores/notifications";
import Bigneon from "../../../../../../../helpers/bigneon";
import { dollars } from "../../../../../../../helpers/money";
import { Hidden, Typography } from "@material-ui/core";
import {
	fontFamilyDemiBold,
	secondaryHex
} from "../../../../../../../config/theme";
import SelectGroup from "../../../../../../common/form/SelectGroup";
import CheckBox from "../../../../../../elements/form/CheckBox";

const styles = theme => ({
	content: {
		[theme.breakpoints.up("sm")]: {
			minWidth: 550
		}
	},
	actionButtonsContainer: {
		display: "flex",
		justifyContent: "center",
		marginTop: 20
	},
	desktopOrderRow: {
		display: "flex",
		paddingLeft: 20,
		paddingRight: 20
	},
	desktopOrderRowBorder: {
		borderRadius: 6,
		border: "1px solid rgba(222, 226, 232, 0.56)",
		paddingTop: 20,
		paddingBottom: 20,
		marginTop: 10,
		marginBottom: 10
	},
	headingText: {
		color: "#939bad",
		fontSize: 14,
		fontFamily: fontFamilyDemiBold,
		textTransform: "uppercase",
		opacity: 0.7
	},
	desktopOrderDetailsContainer: {
		marginTop: 20
	},
	userText: {
		color: secondaryHex,
		fontFamily: fontFamilyDemiBold
	},
	subText: {
		color: "#8b94a7",
		fontSize: 14
	},
	formLabelText: {
		fontFamily: fontFamilyDemiBold,
		marginBottom: 8
	},
	refundAmountBox: {
		backgroundColor: "#f6f7f9",
		padding: 20,
		paddingBottom: 12,
		borderRadius: 8
	},
	refundAmountRow: {
		display: "flex",
		justifyContent: "space-between",
		marginBottom: 8
	},
	valueText: {
		fontFamily: fontFamilyDemiBold
	},
	valueTextActive: {
		color: secondaryHex
	}
});

const refundReasons = [
	{
		value: "exchange",
		label: "Exchange"
	},
	{
		value: "event-cancelled",
		label: "Event cancelled"
	},
	{
		value: "other",
		label: "Other"
	}
];

class RefundDialog extends Component {
	constructor(props) {
		super(props);

		this.defaultState = {
			reasonVal: "",
			selectedRefundType: "fullRefund",
			isRefunding: false
		};

		this.state = this.defaultState;

		this.onClose = this.onClose.bind(this);
	}

	onClose() {
		const { onClose } = this.props;

		this.setState(this.defaultState);

		onClose();
	}

	refund() {
		const { order, items: itemDetails } = this.props;

		const { id } = order;

		const { reasonVal, selectedRefundType } = this.state;

		//TODO use selectedRefundType to adjust which items should be refunded

		const items = [];

		if (itemDetails) {
			itemDetails.forEach(i => {
				const { order_item_id, ticket_instance_id, refundable, ...rest } = i;
				if (refundable) {
					items.push({
						order_item_id,
						ticket_instance_id
					});
				}
			});
		}

		this.setState({ isRefunding: true });

		const reason = refundReasons[reasonVal];

		Bigneon()
			.orders.refund({
				id,
				items,
				reason
			})
			.then(response => {
				notification.show({
					message: "Order refunded successfully.",
					variant: "success"
				});

				const { amount_refunded, refund_breakdown } = response.data;

				this.onClose();
			})
			.catch(error => {
				notification.showFromErrorResponse({
					error,
					defaultMessage: "Refund failed."
				});
			})
			.finally(() => {
				this.setState({
					mobileOptionsControlOpen: false,
					isRefunding: false
				});
			});
	}

	onReasonChange(e) {
		const reasonVal = e.target.value;

		this.setState({ reasonVal });
	}

	refundValues(order) {
		let faceOnlyInCents = 0;
		let feesOnlyInCents = 0;

		const { total_in_cents, items } = order;
		const { selectedRefundType } = this.state;

		items.forEach(item => {
			const { item_type, unit_price_in_cents, quantity } = item;

			switch (item_type) {
				case "PerUnitFees":
				case "EventFees":
					feesOnlyInCents += unit_price_in_cents * quantity;
					break;
				case "Tickets":
					faceOnlyInCents += unit_price_in_cents * quantity;
			}
		});

		//TODO put other options back
		return {
			// faceOnly: {
			// 	label: "Ticket face only",
			// 	cents: faceOnlyInCents
			// },
			// feesOnly: { label: "Fees only", cents: feesOnlyInCents },
			fullRefund: {
				label: "Full refund",
				cents: total_in_cents
			}
		};
	}

	renderDesktopOrderDetails() {
		const { classes, order, items } = this.props;

		const { order_number, user, total_in_cents } = order;

		const { first_name, last_name, email, id: userId } = user;

		const colStyles = [{ flex: 2 }, { flex: 4 }, { flex: 2 }, { flex: 1 }];
		const headings = ["Order #", "Purchaser", "Code", "Total"];

		let displayCode = "-";
		let displayCodeType = "";
		items.forEach(({ code, code_type }) => {
			if (code) {
				displayCode = code;
			}

			if (code_type) {
				displayCodeType = code_type;
			}
		});

		return (
			<div className={classes.desktopOrderDetailsContainer}>
				<div className={classes.desktopOrderRow}>
					{headings.map((heading, index) => (
						<Typography
							key={index}
							style={colStyles[index]}
							className={classes.headingText}
						>
							{heading}
						</Typography>
					))}
				</div>
				<div
					className={classnames({
						[classes.desktopOrderRow]: true,
						[classes.desktopOrderRowBorder]: true
					})}
				>
					<Typography style={colStyles[0]}>{order_number}</Typography>
					<div style={colStyles[1]}>
						<Typography className={classes.userText}>
							{first_name} {last_name}
						</Typography>
						<Typography className={classes.subText}>{email}</Typography>
					</div>
					<div style={colStyles[2]}>
						<Typography>{displayCode}</Typography>
						<Typography className={classes.subText}>
							{displayCodeType}
						</Typography>
					</div>
					<Typography style={colStyles[3]}>
						{dollars(total_in_cents)}
					</Typography>
				</div>
			</div>
		);
	}

	renderMobileOrderDetails() {
		return <div>{""}</div>;
	}

	render() {
		const { classes, open, order } = this.props;
		const { reasonVal, selectedRefundType, isRefunding } = this.state;

		const refundValues = this.refundValues(order);

		return (
			<Dialog
				iconUrl={"/icons/tickets-white.svg"}
				open={open}
				title={"Issue refund"}
				onClose={this.onClose}
			>
				<div className={classes.content}>
					<Hidden smDown>{this.renderDesktopOrderDetails()}</Hidden>
					<Hidden mdUp>{this.renderMobileOrderDetails()}</Hidden>

					<br/>
					<Typography className={classes.formLabelText}>
						Select refund reason
					</Typography>
					<SelectGroup
						name={"reason"}
						value={reasonVal}
						onChange={this.onReasonChange.bind(this)}
						items={refundReasons}
					/>

					<Typography className={classes.formLabelText}>
						Select refund amount
					</Typography>

					<div className={classes.refundAmountBox}>
						{Object.keys(refundValues).map(key => {
							const { label, cents } = refundValues[key];
							const active = selectedRefundType === key;

							return (
								<div key={key} className={classes.refundAmountRow}>
									<CheckBox
										active={active}
										onClick={() => this.setState({ selectedRefundType: key })}
									>
										{label}
									</CheckBox>
									<Typography
										className={classnames({
											[classes.valueText]: true,
											[classes.valueTextActive]: active
										})}
									>
										{dollars(cents)}
									</Typography>
								</div>
							);
						})}
					</div>

					<div className={classes.actionButtonsContainer}>
						<Button
							style={{ marginRight: 5, width: 150 }}
							variant="default"
							onClick={this.onClose}
						>
							Cancel
						</Button>
						<Button
							style={{ marginLeft: 5, width: 150 }}
							variant="secondary"
							disabled={isRefunding}
							onClick={this.refund.bind(this)}
						>
							{isRefunding ? "Refunding..." : "Confirm"}
						</Button>
					</div>
				</div>
			</Dialog>
		);
	}
}

RefundDialog.propTypes = {
	classes: PropTypes.object.isRequired,
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	items: PropTypes.array.isRequired,
	order: PropTypes.object.isRequired
};

export default withStyles(styles)(RefundDialog);
