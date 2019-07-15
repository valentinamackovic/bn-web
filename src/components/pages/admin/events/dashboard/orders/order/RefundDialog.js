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
import { fontFamilyDemiBold } from "../../../../../../../config/theme";

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
	}
});

class RefundDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	refund() {
		const { order, items: itemDetails } = this.props;

		if (!this.orderRefundable()) {
			notification.show({
				message: "Order doesn't contain any refundable items.",
				variant: "warning"
			});
		}

		const { id } = order;

		const items = [];

		if (itemDetails) {
			itemDetails.forEach(i => {
				const { order_item_id, ticket_instance_id, refundable } = i;
				if (refundable) {
					items.push({
						order_item_id,
						ticket_instance_id
					});
				}
			});
		}

		Bigneon()
			.orders.refund({
				id,
				items
			})
			.then(response => {
				notification.show({
					message: "Order refunded successfully.",
					variant: "success"
				});

				const { amount_refunded, refund_breakdown } = response.data;
			})
			.catch(error => {
				notification.showFromErrorResponse({
					error,
					defaultMessage: "Refund failed."
				});
			})
			.finally(() => {
				this.setState({
					mobileOptionsControlOpen: false
				});
				this.props.refreshOrder();
			});
	}

	renderDesktopOrderDetails() {
		const { classes, order, items } = this.props;

		const { order_number, user, total_in_cents } = order;

		const { first_name, last_name, email, id: userId } = user;

		const colStyles = [{ flex: 1 }, { flex: 3 }, { flex: 2 }, { flex: 1 }];
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
						<Typography>
							{first_name} {last_name}
						</Typography>
						<Typography>{email}</Typography>
					</div>
					<div style={colStyles[2]}>
						<Typography>{displayCode}</Typography>
						<Typography>{displayCodeType}</Typography>
					</div>
					<Typography style={colStyles[3]}>
						{dollars(total_in_cents)}
					</Typography>
				</div>
			</div>
		);
	}

	renderMobileOrderDetails() {
		return <div>mobile Order details</div>;
	}

	render() {
		const { classes, open, onClose } = this.props;

		return (
			<Dialog
				iconUrl={"/icons/tickets-white.svg"}
				open={open}
				title={"Issue refund"}
				onClose={onClose}
			>
				<div className={classes.content}>
					<Hidden smDown>{this.renderDesktopOrderDetails()}</Hidden>
					<Hidden mdUp>{this.renderMobileOrderDetails()}</Hidden>
					<div className={classes.actionButtonsContainer}>
						<Button
							style={{ marginRight: 5, width: 150 }}
							variant="default"
							onClick={onClose}
						>
							Cancel
						</Button>
						<Button
							style={{ marginLeft: 5, width: 150 }}
							variant="secondary"
							onClick={this.refund.bind(this)}
						>
							Confirm
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
