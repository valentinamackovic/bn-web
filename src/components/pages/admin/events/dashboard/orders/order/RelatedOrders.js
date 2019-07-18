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

const styles = theme => ({
	root: {}
});

class RelatedOrders extends Component {
	constructor(props) {
		super(props);

		this.state = {
			orders: null
		};
	}

	componentDidMount() {
		const { organizationId, userId } = this.props;

		const params = {
			organization_id: organizationId,
			user_id: userId
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
		const { orders } = this.state;

		if (orders) {
			return <div>TODO</div>;
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
	userId: PropTypes.string.isRequired,
	timezone: PropTypes.string.isRequired
};

export default withStyles(styles)(RelatedOrders);
