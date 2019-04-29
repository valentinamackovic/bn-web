import React, { Component } from "react";
import { Typography, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Divider from "../../../../common/Divider";
import Button from "../../../../elements/Button";
import { fontFamilyDemiBold } from "../../../../../config/theme";
import notifications from "../../../../../stores/notifications";
import { EventSalesTable } from "../eventSummary/EventSalesTable";
import EventTicketCountTable from "../counts/EventTicketCountTable";
import downloadCSV from "../../../../../helpers/downloadCSV";
import promoCodeReport from "../../../../../stores/reports/promoCodeReport";
import summaryReport from "../../../../../stores/reports/summaryReport";
import { observer } from "mobx-react";
import Loader from "../../../../elements/loaders/Loader";
import Card from "../../../../elements/Card";
import { EventPromoCodesTable } from "./EventPromoCodeTable";

const styles = theme => ({
	root: {
		padding: theme.spacing.unit * 4,
		marginBottom: theme.spacing.unit
	},
	subHeading: {
		fontFamily: fontFamilyDemiBold,
		fontSize: theme.typography.fontSize * 1.3
	}
});

@observer
class EventPromoCodesReport extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		this.refreshData();
	}

	refreshData() {
		const { eventId, organizationId, onLoad } = this.props;

		const queryParams = { organization_id: organizationId, event_id: eventId };

		//Refresh promo code sales data
		promoCodeReport.fetchSalesData(queryParams, onLoad);
	}

	exportCSV() {
		const { salesData } = promoCodeReport.salesByPromoCode;
		if (!Object.keys(salesData).length) {
			return notifications.show({
				message: "No rows to export.",
				variant: "warning"
			});
		}

		const { eventName } = this.props;

		let csvRows = [];

		let title = "Event promo code report";
		if (eventName) {
			title = `${title} - ${eventName}`;
		}

		csvRows.push([title]);
		csvRows.push([""]);

		//Sales details:
		const eventSalesRows = promoCodeReport.csv(
			promoCodeReport.salesByPromoCode
		);
		csvRows = [...csvRows, ...eventSalesRows];

		csvRows.push([""]);
		csvRows.push([""]);

		downloadCSV(csvRows, "event-promo-code-report");
	}

	renderPromoCodes() {
		const { salesData, totals } = promoCodeReport.salesByPromoCode;

		if (salesData === false) {
			//Query failed
			return null;
		}

		if (salesData === null || salesData === undefined) {
			return <Loader/>;
		}

		if (Object.keys(salesData).length === 0) {
			return <Typography>No event data available.</Typography>;
		}

		return (
			<div>
				<EventPromoCodesTable sales={salesData} totals={totals}/>
			</div>
		);
	}

	render() {
		const { printVersion, classes } = this.props;

		if (printVersion) {
			return <div>{this.renderPromoCodes()}</div>;
		}

		return (
			<Card variant={"block"}>
				<div className={classes.root}>
					<div
						style={{
							display: "flex",
							minHeight: 60,
							alignItems: "center"
						}}
					>
						<Typography variant="title">Event promo codes report</Typography>
						<span style={{ flex: 1 }}/>
						<Button
							iconUrl="/icons/csv-active.svg"
							variant="text"
							onClick={this.exportCSV.bind(this)}
						>
							Export CSV
						</Button>
						<Button
							href={`/exports/reports/?type=promo_codes&event_id=${
								this.props.eventId
							}`}
							target={"_blank"}
							iconUrl="/icons/pdf-active.svg"
							variant="text"
						>
							Export PDF
						</Button>
					</div>
					<Divider style={{ marginBottom: 40 }}/>

					{this.renderPromoCodes()}
				</div>
			</Card>
		);
	}
}

EventPromoCodesReport.propTypes = {
	classes: PropTypes.object.isRequired,
	organizationId: PropTypes.string.isRequired,
	eventId: PropTypes.string.isRequired,
	eventName: PropTypes.string,
	printVersion: PropTypes.bool,
	onLoad: PropTypes.func
};

export default withStyles(styles)(EventPromoCodesReport);
