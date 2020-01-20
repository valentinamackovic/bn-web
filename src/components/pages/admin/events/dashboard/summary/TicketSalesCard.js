import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Hidden } from "@material-ui/core";
import PropTypes from "prop-types";

import CollapseCard from "./CollapseCard";
import { fontFamilyDemiBold } from "../../../../../../config/theme";
import TicketSalesChart from "./charts/TicketSalesChart";
import ticketCountReport from "../../../../../../stores/reports/ticketCountReport";
import EventTicketCountTable from "../../../reports/counts/EventTicketCountTable";
import moment from "moment";

const styles = theme => {
	return {
		root: {
			[theme.breakpoints.up("sm")]: {
				padding: 30
			},
			[theme.breakpoints.down("md")]: {
				padding: 10
			},
			[theme.breakpoints.down("sm")]: {
				padding: 0
			}
		},
		titleText: {
			fontFamily: fontFamilyDemiBold,
			fontSize: 19,
			marginBottom: 20
		}
	};
};

class TicketSalesCard extends Component {
	constructor(props) {
		super(props);
		this.state = { ticketCounts: null };
	}

	refreshData() {
		const { organization_id, id } = this.props;
		const queryParams = { organization_id, event_id: id };

		ticketCountReport.fetchCountAndSalesData(queryParams, false, () => {
			const ticketCounts = ticketCountReport.dataByPrice[id];

			this.setState({ ticketCounts });
		});
	}

	render() {
		const {
			classes,
			token,
			on_sale,
			event_end,
			venue,
			cubeApiUrl,
			name,
			organization_id,
			id,
			...rest
		} = this.props;

		const title = "Ticket Sales";

		const { ticketCounts } = this.state;
		if (!ticketCounts) {
			this.refreshData();
		}

		return (
			<CollapseCard title={title} className={classes.root}>
				<div className={classes.root}>
					<Hidden smDown>
						<Typography className={classes.titleText}>{title}</Typography>
					</Hidden>

					<TicketSalesChart
						cubeApiUrl={cubeApiUrl}
						token={token}
						timezone={venue.timezone}
						endDate={event_end}
					/>
				</div>
				{ticketCounts ? (
					<div className={classes.root}>
						<EventTicketCountTable ticketCounts={ticketCounts} hideDetails={true}/>
					</div>
				) : (
					<div>Loading</div>
				)}
			</CollapseCard>
		);
	}
}

TicketSalesCard.propTypes = {
	classes: PropTypes.object.isRequired,
	token: PropTypes.string.isRequired,
	on_sale: PropTypes.string.isRequired,
	event_end: PropTypes.string.isRequired,
	venue: PropTypes.object.isRequired,
	cubeApiUrl: PropTypes.string.isRequired
};

export default withStyles(styles)(TicketSalesCard);
