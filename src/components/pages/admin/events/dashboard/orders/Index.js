import React, { Component } from "react";
import { Hidden, Typography, withStyles, Grid } from "@material-ui/core";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import Bigneon from "../../../../../../helpers/bigneon";

import user from "../../../../../../stores/user";
import Container from "../Container";
import Loader from "../../../../../elements/loaders/Loader";
import notifications from "../../../../../../stores/notifications";
import Divider from "../../../../../common/Divider";
import {
	fontFamilyDemiBold,
	secondaryHex
} from "../../../../../../config/theme";
import SelectGroup from "../../../../../common/form/SelectGroup";
import moment from "moment-timezone";
import SearchBox from "../../../../../elements/SearchBox";
import OrderRow from "./OrderRow";

const styles = theme => ({
	root: {},

	pageSubTitle: {
		fontFamily: fontFamilyDemiBold,
		fontSize: theme.typography.fontSize * 0.75,
		textTransform: "uppercase",
		color: secondaryHex
	},
	pageTitle: {
		fontFamily: fontFamilyDemiBold,
		fontSize: theme.typography.fontSize * 1.75
	},
	mobilePageTitleContainer: {
		marginTop: theme.spacing.unit * 3,
		marginBottom: theme.spacing.unit * 2
	},
	desktopHeadingRow: {
		display: "flex",
		paddingLeft: theme.spacing.unit * 2,
		paddingRight: theme.spacing.unit * 2
	},
	desktopHeadingText: { fontFamily: fontFamilyDemiBold }
});

const columnStyles = [
	{ flex: 2 },
	{ flex: 4 },
	{ flex: 8 },
	{ flex: 2 },
	{ flex: 3 },
	{ flex: 2 }
];

@observer
class OrderList extends Component {
	constructor(props) {
		super(props);

		this.eventId = this.props.match.params.id;

		this.state = {
			orders: null,
			promoCodes: [],
			promoFilterId: "",
			ticketTypes: [],
			ticketTypeFilterId: ""
		};

		this.onChangePromoFilter = this.onChangePromoFilter.bind(this);
		this.onChangeTicketTypeFilter = this.onChangeTicketTypeFilter.bind(this);
		this.onSearch = this.onSearch.bind(this);
	}

	componentDidMount() {
		this.refreshOrders();
		this.loadPromoCodes();
		this.loadTicketTypes();
	}

	refreshOrders(query = "") {
		const { currentOrgTimezone } = user;

		this.setState({ orders: null });

		const { promoFilterId, ticketTypeFilterId } = this.state;

		const params = { event_id: this.eventId, query };

		//FIXME this is just the current user's orders for now
		Bigneon()
			.admin.orders(params)
			.then(response => {
				const { data, paging } = response.data; //@TODO Implement pagination

				//Set the qty of tickets bought and the formatted date
				data.forEach(o => {
					o.displayDate = moment(o.date)
						.tz(currentOrgTimezone)
						.format("MM/DD/YYYY h:mm A");

					o.ticketCount = 0;
					o.items.forEach(({ item_type, quantity, ...rest }) => {
						if (item_type === "Tickets") {
							o.ticketCount += quantity;
						}
					});
					o.first_name = o.first_name || "Unknown";
					o.last_name = o.last_name || "";
					o.email = o.email || "Unknown email";
					o.pos = "Online";
				});

				this.setState({ orders: data });
			})
			.catch(error => {
				console.error(error);

				notifications.showFromErrorResponse({
					defaultMessage: "Loading orders failed.",
					error
				});
			});

		// Bigneon()
		// 	.events.guests.index({ event_id, query: "" })
		// 	.then(response => {
		// 		const { data, paging } = response.data; //@TODO Implement pagination
		// 		const guests = {};
		//
		// 		const orders = {};
		////
		// 		data.forEach(
		// 			({
		// 				 order_id,
		// 				user_id,
		// 				email,
		// 				first_name,
		// 				last_name,
		// 				phone,
		// 				...ticketDetails
		// 			}) => {
		// 				if (!guests[user_id]) {
		// 					guests[user_id] = {
		// 						email,
		// 						first_name,
		// 						last_name,
		// 						phone,
		// 						ticketCount: 1
		// 					};
		// 				} else {
		// 					guests[user_id].ticketCount++;
		// 				}
		// 			}
		// 		);
		//
		// 		this.setState({ guests });
		// 	})
		// 	.catch(error => {
		// 		console.error(error);
		//
		// 		notifications.showFromErrorResponse({
		// 			defaultMessage: "Loading orders failed.",
		// 			error
		// 		});
		// 	});
	}

	onSearch(query) {
		this.refreshOrders(query);
	}

	loadPromoCodes() {
		const promoCodes = [
			{
				value: "none",
				label: "Clear filter"
			}
		];

		Bigneon()
			.events.codes.index({ event_id: this.eventId })
			.then(response => {
				const codes = response.data.data;
				codes.forEach(c => {
					promoCodes.push({ value: c.id, label: c.name });
				});

				this.setState({ promoCodes });
			});
	}

	loadTicketTypes() {
		const ticketTypes = [
			{
				value: "none",
				label: "Clear filter"
			}
		];

		Bigneon()
			.events.ticketTypes.index({ event_id: this.eventId })
			.then(response => {
				const types = response.data.data;

				types.forEach(t => {
					ticketTypes.push({ value: t.id, label: t.name });
				});

				this.setState({ ticketTypes });
			});
	}

	onChangePromoFilter(e) {
		let id = e.target.value;

		if (id === "none") {
			id = "";
		}

		this.setState({ promoFilterId: id }, this.refreshOrders.bind(this));
	}

	onChangeTicketTypeFilter(e) {
		let id = e.target.value;

		if (id === "none") {
			id = "";
		}

		this.setState({ ticketTypeFilterId: id }, this.refreshOrders.bind(this));
	}

	renderDesktopHeadings() {
		const { classes } = this.props;
		const headings = [
			"Order #",
			"Date & Time",
			"Fan",
			"QTY",
			"Order value",
			"POS"
		];

		return (
			<div className={classes.desktopHeadingRow}>
				{headings.map((heading, index) => (
					<Typography
						key={index}
						className={classes.desktopHeadingText}
						style={columnStyles[index]}
					>
						{heading}
					</Typography>
				))}
			</div>
		);
	}

	renderPromoCodeFilter() {
		const { promoFilterId, promoCodes } = this.state;

		return (
			<SelectGroup
				value={promoFilterId}
				items={promoCodes}
				name={"promo-filter"}
				label={"Filter by promo"}
				onChange={this.onChangePromoFilter}
			/>
		);
	}

	renderTicketTypeFilter() {
		const { ticketTypeFilterId, ticketTypes } = this.state;

		return (
			<SelectGroup
				value={ticketTypeFilterId}
				items={ticketTypes}
				name={"ticket-type-filter"}
				label={"Filter by ticket type"}
				onChange={this.onChangeTicketTypeFilter}
			/>
		);
	}

	renderList() {
		const { orders } = this.state;

		if (orders === null) {
			return <Loader>Loading orders...</Loader>;
		}

		return (
			<div>
				<Hidden smDown>{this.renderDesktopHeadings()}</Hidden>
				{orders.map(order => {
					return (
						<OrderRow
							key={order.id}
							eventId={this.eventId}
							columnStyles={columnStyles}
							{...order}
						/>
					);
				})}
			</div>
		);
	}

	renderDesktopContent() {
		const { classes } = this.props;

		return (
			<Container
				eventId={this.eventId}
				subheading={"tools"}
				layout={"childrenInsideCard"}
			>
				<Grid container spacing={24}>
					<Grid item sm={2} md={2} lg={2}>
						<Typography className={classes.pageSubTitle}>
							Order management
						</Typography>
						<Typography className={classes.pageTitle}>Orders</Typography>
					</Grid>
					<Grid item sm={3} md={3} lg={3}>
						{this.renderPromoCodeFilter()}
					</Grid>
					<Grid item sm={3} md={3} lg={3}>
						{this.renderTicketTypeFilter()}
					</Grid>
					<Grid item sm={4} md={4} lg={4} style={{ marginTop: 10 }}>
						<SearchBox
							placeholder="Search Order #, Name, Email, Ticket #"
							onSearch={this.onSearch}
						/>
					</Grid>
				</Grid>

				<Divider style={{ marginBottom: 40 }}/>

				{this.renderList()}
			</Container>
		);
	}

	renderMobileContent() {
		const { classes } = this.props;

		return (
			<Container
				eventId={this.eventId}
				subheading={"tools"}
				layout={"childrenOutsideNoCard"}
			>
				<div className={classes.mobilePageTitleContainer}>
					<Typography className={classes.pageSubTitle}>
						Order management
					</Typography>
					<Typography className={classes.pageTitle}>Orders</Typography>
				</div>

				<Grid container spacing={24}>
					<Grid item xs={6}>
						{this.renderPromoCodeFilter()}
					</Grid>
					<Grid item xs={6}>
						{this.renderTicketTypeFilter()}
					</Grid>
				</Grid>
				<SearchBox
					placeholder="Search Order #, Name, Email, Ticket #"
					onSearch={this.onSearch}
				/>

				{this.renderList()}
			</Container>
		);
	}

	render() {
		return (
			<React.Fragment>
				<Hidden smDown>{this.renderDesktopContent()}</Hidden>
				<Hidden mdUp>{this.renderMobileContent()}</Hidden>
			</React.Fragment>
		);
	}
}

OrderList.propTypes = {
	classes: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired
};

const Orders = observer(props => {
	if (!user.currentOrgTimezone) {
		return <Loader>Loading organization details...</Loader>;
	}

	return <OrderList {...props}/>;
});

export default withStyles(styles)(Orders);
