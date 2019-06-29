import React, { Component } from "react";
import { Hidden, Typography, withStyles, Grid } from "@material-ui/core";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import user from "../../../../../../stores/user";
import Loader from "../../../../../elements/loaders/Loader";
import Card from "../../../../../elements/Card";
import Bigneon from "../../../../../../helpers/bigneon";
import moment from "moment-timezone";
import notifications from "../../../../../../stores/notifications";
import StyledLink from "../../../../../elements/StyledLink";
import {
	fontFamilyDemiBold,
	secondaryHex
} from "../../../../../../config/theme";
import { dollars } from "../../../../../../helpers/money";
import Divider from "../../../../../common/Divider";

const styles = theme => ({
	root: {
		padding: 31,
		paddingLeft: 65,
		paddingRight: 65
	},
	linkText: {
		color: secondaryHex,
		fontFamily: fontFamilyDemiBold
	},
	orderNumber: {
		fontSize: 28,
		fontFamily: fontFamilyDemiBold
	},
	headerText: {},
	orderTotalText: {
		fontSize: 17,
		fontFamily: fontFamilyDemiBold,
		textTransform: "uppercase",
		marginTop: 20
	}
});

class SingleOrder extends Component {
	constructor(props) {
		super(props);

		this.eventId = this.props.match.params.eventId;
		this.orderId = this.props.match.params.orderId;

		this.state = {
			order: null
		};
	}

	componentDidMount() {
		this.loadOrder();
	}

	loadOrder() {
		Bigneon()
			.orders.read({ id: this.orderId })
			.then(response => {
				const { data } = response;

				const { date, is_box_office } = data;

				const { timezone } = this.props;
				const displayDate = moment(date)
					.tz(timezone)
					.format("MM/DD/YYYY h:mm A z");

				const platform = is_box_office ? "Box office" : data.platform || "";

				this.setState({ order: { ...data, displayDate, platform } });

				//this.loadOrderDetails();
			})
			.catch(error => {
				console.error(error);

				notifications.showFromErrorResponse({
					defaultMessage: "Loading order failed.",
					error
				});
			});
	}

	// loadOrderDetails() {
	// 	Bigneon()
	// 		.orders.details({ id: this.orderId })
	// 		.then(response => {
	// 			const { data } = response;
	//
	// 		})
	// 		.catch(error => {
	// 			console.error(error);
	//
	// 			notifications.showFromErrorResponse({
	// 				defaultMessage: "Loading order details failed.",
	// 				error
	// 			});
	// 		});
	// }

	renderHeader() {
		const { order } = this.state;
		const { classes } = this.props;

		const { order_number, user, displayDate, platform, total_in_cents } = order;

		const { first_name, last_name, id: userId } = user;

		return (
			<div>
				<Typography className={classes.orderNumber}>
					Order #{order_number}
				</Typography>

				<Typography className={classes.headerText}>
					Purchased by{" "}
					<Link to={`/admin/fans/${userId}`}>
						<span className={classes.linkText}>
							{first_name} {last_name}
						</span>
					</Link>{" "}
					on {displayDate}
				</Typography>

				<Typography className={classes.headerText}>
					Paid by TODO {platform ? `via ${platform}` : ""}
				</Typography>

				<Typography className={classes.orderTotalText}>
					Order total: {dollars(total_in_cents)}
				</Typography>
			</div>
		);
	}

	renderSummary() {}

	render() {
		const { order } = this.state;
		const { classes } = this.props;

		return (
			<Card className={classes.root}>
				<div>
					<Link to={`/admin/events/${this.eventId}/dashboard/orders/manage`}>
						<Typography className={classes.linkText}>Back to sales</Typography>
					</Link>

					{order ? (
						<React.Fragment>
							{this.renderHeader()}
							<Divider style={{ marginTop: 20, marginBottom: 20 }}/>
						</React.Fragment>
					) : (
						<Loader/>
					)}
				</div>
			</Card>
		);
	}
}

SingleOrder.propTypes = {
	classes: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
	timezone: PropTypes.string.isRequired
};

const Order = observer(props => {
	const { currentOrgTimezone } = user;

	if (!currentOrgTimezone) {
		return <Loader>Loading organization details...</Loader>;
	}

	return <SingleOrder {...props} timezone={currentOrgTimezone}/>;
});

export default withStyles(styles)(Order);
