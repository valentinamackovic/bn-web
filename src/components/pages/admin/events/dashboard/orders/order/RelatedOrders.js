import React, { Component } from "react";
import { Hidden, Typography, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";

import notifications from "../../../../../../../stores/notifications";
import Bigneon from "../../../../../../../helpers/bigneon";
import Button from "../../../../../../elements/Button";
import BoxInput from "../../../../../../elements/form/BoxInput";
import moment from "moment-timezone";
import Loader from "../../../../../../elements/loaders/Loader";
import Card from "../../../../../../elements/Card";
import {
	fontFamilyDemiBold,
	secondaryHex
} from "../../../../../../../config/theme";

const styles = theme => ({
	root: {},
	orderCard: {
		padding: 15,
		paddingLeft: 25,
		display: "flex",
		justifyContent: "space-between",
		marginBottom: 10
	},
	icon: {
		width: 20,
		height: 20,
		marginRight: 15
	},
	orderCardText: {
		display: "flex"
	},
	dateText: {
		color: "#9da3b4",
		fontSize: 14,
		marginRight: 15
	},
	linkText: {
		color: secondaryHex,
		fontFamily: fontFamilyDemiBold
	},
	viewOrderText: {
		color: "#9da3b4",
		fontSize: 14,
		marginRight: 20,
		textAlign: "right"
	},
	boldText: {
		fontFamily: fontFamilyDemiBold
	},
	mobileOrderCard: {
		padding: 20,
		marginBottom: 10
	},
	mobileTopRow: {
		display: "flex",
		marginBottom: 10
	},
	mobileBottomRow: {
		display: "flex",
		justifyContent: "space-between"
	},
	mobileIcon: {
		width: 20,
		height: 20,
		marginRight: 10
	}
});

class RelatedOrders extends Component {
	constructor(props) {
		super(props);

		this.state = {
			orders: null
		};
	}

	componentDidMount() {
		const { organizationId, user } = this.props;

		const { id: userId } = user;

		const params = {
			organization_id: organizationId,
			user_id: userId,
			activity_type: "Purchased"
		};

		Bigneon()
			.organizations.fans.history(params)
			.then(response => {
				const { data, paging } = response.data;

				const { timezone } = this.props;

				//Set the qty of tickets bought and the formatted date
				data.forEach(o => {
					o.displayDate = moment(o.order_date)
						.tz(timezone)
						.format("MM/DD/YYYY h:mm A");
				});

				this.setState({ orders: data, paging });
			})
			.catch(error => {
				console.error(error);

				notifications.showFromErrorResponse({
					defaultMessage: "Loading related orders failed.",
					error
				});
			});
	}

	orderList() {
		const { classes, eventId, user, orderId } = this.props;
		const { orders } = this.state;

		const { first_name, last_name, id: userId } = user;

		if (orders) {
			return (
				<div>
					{orders.map(order => {
						const { order_id, displayDate, ticket_sales } = order;

						//Don't show the current order
						if (order_id === orderId) {
							return null;
						}

						const orderNumber = order_id ? order_id.slice(-8) : "";
						const orderLink = `/admin/events/${eventId}/dashboard/orders/manage/${order_id}`;

						return (
							<React.Fragment key={order_id}>
								<Hidden smDown>
									<Card className={classes.orderCard}>
										<div className={classes.orderCardText}>
											<img
												src={"/icons/money-circle-active.svg"}
												className={classes.icon}
											/>
											<Typography className={classes.dateText}>
												{displayDate}
											</Typography>
											<Typography>
												<Link to={`/admin/fans/${userId}`}>
													<span className={classes.linkText}>
														{first_name} {last_name}
													</span>
												</Link>
												<span className={classes.boldText}> purchased</span>{" "}
												{ticket_sales} ticket
												{ticket_sales !== 1 ? "s " : " "}
												<Link to={orderLink}>
													(
													<span className={classes.linkText}>
														Order #{orderNumber}
													</span>
													)
												</Link>
											</Typography>
										</div>
										<Link to={orderLink}>
											<Typography className={classes.viewOrderText}>
												View order
											</Typography>
										</Link>
									</Card>
								</Hidden>
								<Hidden mdUp>
									<Card className={classes.mobileOrderCard}>
										<div className={classes.mobileTopRow}>
											<img
												src={"/icons/money-circle-active.svg"}
												className={classes.icon}
											/>
											<Typography>
												<Link to={`/admin/fans/${userId}`}>
													<span className={classes.linkText}>
														{first_name} {last_name}
													</span>
												</Link>
												<span className={classes.boldText}> purchased</span>{" "}
												{ticket_sales} ticket
												{ticket_sales !== 1 ? "s " : " "}
											</Typography>
										</div>
										<div className={classes.mobileBottomRow}>
											<Typography className={classes.dateText}>
												{displayDate}
											</Typography>
											<Link to={orderLink}>
												<Typography className={classes.viewOrderText}>
													View order
												</Typography>
											</Link>
										</div>
									</Card>
								</Hidden>
							</React.Fragment>
						);
					})}
				</div>
			);
		}

		return null;
	}

	render() {
		const { classes } = this.props;
		const { orders } = this.state;

		return (
			<div className={classes.root}>
				{orders === null ? (
					<Loader>Loading related orders...</Loader>
				) : (
					this.orderList()
				)}
			</div>
		);
	}
}

RelatedOrders.propTypes = {
	classes: PropTypes.object.isRequired,
	organizationId: PropTypes.string.isRequired,
	orderId: PropTypes.string.isRequired,
	timezone: PropTypes.string.isRequired,
	user: PropTypes.object.isRequired,
	eventId: PropTypes.string.isRequired
};

export default withStyles(styles)(RelatedOrders);
