import React, { Component } from "react";
import { Hidden, Typography, withStyles, Grid } from "@material-ui/core";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import user from "../../../../../../../stores/user";
import Loader from "../../../../../../elements/loaders/Loader";
import Card from "../../../../../../elements/Card";
import Bigneon from "../../../../../../../helpers/bigneon";
import moment from "moment-timezone";
import notifications from "../../../../../../../stores/notifications";
import Divider from "../../../../../../common/Divider";
import OrderItemsCard from "./OrderItemsCard";
import Header from "./Header";
import BackLink from "../../../../../../elements/BackLink";

const styles = theme => ({
	root: {
		padding: 31,
		paddingLeft: 65,
		paddingRight: 65
	}
});

class SingleOrder extends Component {
	constructor(props) {
		super(props);

		this.eventId = this.props.match.params.eventId;
		this.orderId = this.props.match.params.orderId;

		this.state = {
			eventDetails: null,
			order: null,
			orderItems: null
		};

		this.refreshOrder = this.loadAll.bind(this);
	}

	componentDidMount() {
		this.loadAll();
	}

	loadAll() {
		this.loadEventDetails();
		this.loadOrder();
		this.loadOrderItems();
	}

	loadEventDetails() {
		Bigneon()
			.events.read({ id: this.eventId })
			.then(response => {
				const { data } = response;

				const { event_start, venue } = data;

				const displayDate = moment(event_start)
					.tz(venue.timezone)
					.format("ddd, MMM DD, YYYY");

				this.setState({
					eventDetails: { ...data, displayDate }
				});
			})
			.catch(error => {
				console.error(error);

				notifications.showFromErrorResponse({
					defaultMessage: "Loading event details failed.",
					error
				});
			});
	}

	loadOrder() {
		Bigneon()
			.orders.read({ id: this.orderId })
			.then(response => {
				const { data } = response;

				const { date, is_box_office, items } = data;

				const { timezone } = this.props;
				const displayDate = moment(date)
					.tz(timezone)
					.format("MM/DD/YYYY h:mm A z");

				const platform = is_box_office ? "Box office" : data.platform || "";

				let fees_in_cents = 0;
				items.forEach(({ item_type, unit_price_in_cents }) => {
					if (item_type === "EventFees" || item_type === "PerUnitFees") {
						fees_in_cents += unit_price_in_cents;
					}
				});

				this.setState({
					order: { ...data, displayDate, platform, fees_in_cents }
				});
			})
			.catch(error => {
				console.error(error);

				notifications.showFromErrorResponse({
					defaultMessage: "Loading order failed.",
					error
				});
			});
	}

	loadOrderItems() {
		Bigneon()
			.orders.details({ id: this.orderId })
			.then(response => {
				const { data } = response;

				this.setState({ orderItems: data.items });
			})
			.catch(error => {
				console.error(error);

				notifications.showFromErrorResponse({
					defaultMessage: "Loading order details failed.",
					error
				});
			});
	}

	render() {
		const { order, orderItems, eventDetails } = this.state;
		const { classes } = this.props;

		const isReady = order && eventDetails && orderItems;

		const header = isReady ? <Header {...order}/> : null;

		const orderDetails = isReady ? (
			<OrderItemsCard
				eventDetails={eventDetails}
				order={order}
				items={orderItems}
				refreshOrder={this.refreshOrder}
			/>
		) : null;

		return (
			<React.Fragment>
				<BackLink to={`/admin/events/${this.eventId}/dashboard/orders/manage`}>
					Back to sales
				</BackLink>

				{!isReady ? <Loader/> : null}

				{/*DESKTOP*/}
				<Hidden smDown>
					{isReady ? (
						<Card className={classes.root}>
							{header}
							<Divider style={{ marginTop: 20, marginBottom: 20 }}/>
							{orderDetails}
						</Card>
					) : null}
				</Hidden>

				{/*MOBILE*/}
				<Hidden mdUp>
					{header}
					{orderDetails}
				</Hidden>
			</React.Fragment>
		);
	}
}

SingleOrder.propTypes = {
	classes: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
	timezone: PropTypes.string.isRequired
};

const Index = observer(props => {
	const { currentOrgTimezone } = user;

	if (!currentOrgTimezone) {
		return <Loader>Loading organization details...</Loader>;
	}

	return <SingleOrder {...props} timezone={currentOrgTimezone}/>;
});

export default withStyles(styles)(Index);
