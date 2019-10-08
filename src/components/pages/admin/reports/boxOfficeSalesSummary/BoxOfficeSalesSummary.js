import React, { Component } from "react";
import { Typography, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import notifications from "../../../../../stores/notifications";
import Divider from "../../../../common/Divider";
import Button from "../../../../elements/Button";
import downloadCSV from "../../../../../helpers/downloadCSV";
import {
	fontFamilyBold,
	fontFamilyDemiBold,
	secondaryHex
} from "../../../../../config/theme";
import Loader from "../../../../elements/loaders/Loader";
import Bigneon from "../../../../../helpers/bigneon";
import GrandTotalTable from "./GrandTotalTable";

const styles = theme => ({
	root: {},
	pageTitle: {
		fontSize: 30,
		fontFamily: fontFamilyDemiBold
	},
	header: {
		display: "flex",
		minHeight: 60,
		alignItems: "center"
	},
	multiEventContainer: {
		marginBottom: theme.spacing.unit * 8
	},
	multiEventHeader: {
		display: "flex",
		justifyContent: "space-between"
	},
	multiEventTitle: {
		fontSize: theme.typography.fontSize * 1.4,
		fontFamily: fontFamilyDemiBold
	},
	eventNumber: {
		color: secondaryHex
	},
	subheading: {
		fontFamily: fontFamilyDemiBold,
		marginBottom: theme.spacing.unit
	}
});

class BoxOfficeSalesSummary extends Component {
	constructor(props) {
		super(props);

		this.state = {
			payments: null,
			operators: null
		};
	}

	componentDidMount() {
		this.refreshData();
	}

	exportCSV() {
		//TODO get rows
		downloadCSV([], "box-office-sales-summary");
	}

	refreshData() {
		//TODO date filter
		//start_utc
		//end_utc

		const { organizationId, onLoad } = this.props;

		const queryParams = { organization_id: organizationId };

		Bigneon()
			.reports.boxOfficeSalesSummary(queryParams)
			.then(response => {
				const { payments, operators } = response.data;

				this.setState({ payments, operators });
			})
			.catch(error => {
				console.error(error);
				notifications.showFromErrorResponse({
					error,
					defaultMessage: "Failed to load report."
				});
			});
	}

	renderGrandTotal() {
		const { classes } = this.props;
		const { payments } = this.state;

		if (!payments) {
			return <Loader/>;
		}

		return <GrandTotalTable payments={payments}/>;
	}

	renderOperators() {
		const { classes } = this.props;
		const { operators } = this.state;

		return <div>TODO operators</div>;
	}

	render() {
		const { classes, printVersion } = this.props;

		if (printVersion) {
			return (
				<React.Fragment>
					{this.renderGrandTotal()}
					{this.renderOperators()}
				</React.Fragment>
			);
		}

		return (
			<div className={classes.root}>
				<div className={classes.header}>
					<Typography className={classes.pageTitle}>
						Box office sales summary report
					</Typography>
					<span style={{ flex: 1 }}/>
					<div>
						<Button
							iconUrl="/icons/csv-active.svg"
							variant="text"
							onClick={() => this.exportCSV()}
						>
							Export CSV
						</Button>
						<Button
							href={`/exports/reports/?type=box_office_sales_summary`} //TODO add date range here
							target={"_blank"}
							iconUrl="/icons/pdf-active.svg"
							variant="text"
						>
							Export PDF
						</Button>
					</div>
				</div>
				<Divider style={{ marginBottom: 40 }}/>
				{this.renderGrandTotal()}
				{this.renderOperators()}
			</div>
		);
	}
}

BoxOfficeSalesSummary.propTypes = {
	classes: PropTypes.object.isRequired,
	organizationId: PropTypes.string.isRequired,
	organizationTimezone: PropTypes.string.isRequired,
	printVersion: PropTypes.bool,
	onLoad: PropTypes.func
};

export default withStyles(styles)(BoxOfficeSalesSummary);
