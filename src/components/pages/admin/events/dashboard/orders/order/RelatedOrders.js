import React, { Component } from "react";
import { Typography, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import classnames from "classnames";

import notifications from "../../../../../../../stores/notifications";
import Bigneon from "../../../../../../../helpers/bigneon";
import Button from "../../../../../../elements/Button";
import BoxInput from "../../../../../../elements/form/BoxInput";
import moment from "moment-timezone";
import Loader from "../../../../../../elements/loaders/Loader";
import Card from "../../../../../../elements/Card";

const styles = theme => ({
	root: {},
	orderCard: {
		padding: 15,
		paddingLeft: 25,
		display: "flex"
	},
	icon: {
		width: 20,
		height: 20
	}
});

class RelatedOrders extends Component {
	constructor(props) {
		super(props);

		this.state = {
			orders: null,
			firstName: "",
			lastName: ""
		};
	}

	componentDidMount() {
		const { organizationId, user } = this.props;

		const { id: userId, first_name: firstName, last_name: lastName } = user;

		this.setState({ firstName, lastName });

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
		const { classes } = this.props;
		const { orders, firstName, lastName } = this.state;

		if (orders) {
			return (
				<div>
					{orders.map(order => {
						const { order_id, displayDate, ticket_sales } = order;

						return (
							<Card key={order_id} className={classes.orderCard}>
								<img
									src={"/icons/money-circle-active.svg"}
									className={classes.icon}
								/>
								<Typography>{displayDate}</Typography>

								<Typography>
									{firstName} {lastName}
								</Typography>
							</Card>
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
	timezone: PropTypes.string.isRequired,
	user: PropTypes.object.isRequired
};

export default withStyles(styles)(RelatedOrders);
