import React, { Component } from "react";
import { Typography, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import notifications from "../../../../../stores/notifications";
import Divider from "../../../../common/Divider";
import Button from "../../../../elements/Button";
import downloadCSV from "../../../../../helpers/downloadCSV";
import { fontFamilyDemiBold } from "../../../../../config/theme";
import Loader from "../../../../elements/loaders/Loader";
import Bigneon from "../../../../../helpers/bigneon";
import GrandTotalTable from "./GrandTotalTable";
import OperatorTable from "./OperatorTable";

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
	subheading: {
		marginBottom: theme.spacing.unit
	},
	boldText: {
		fontFamily: fontFamilyDemiBold
	},
	tableHeading: {
		marginBottom: theme.spacing.unit,
		fontFamily: fontFamilyDemiBold,
		fontSize: 20
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

		return (
			<React.Fragment>
				<Typography className={classes.tableHeading}>Grand total</Typography>
				<GrandTotalTable payments={payments}/>
			</React.Fragment>
		);
	}

	renderOperators() {
		const { classes } = this.props;
		const { operators } = this.state;

		if (!operators) {
			return null;
		}

		return (
			<React.Fragment>
				{operators.map(operator => (
					<React.Fragment key={operator.operator_id}>
						<Typography className={classes.tableHeading}>
							Operator: {operator.operator_name}
						</Typography>
						<OperatorTable {...operator}/>
					</React.Fragment>
				))}
			</React.Fragment>
		);
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
				<Typography className={classes.subheading}>
					Report run: <span className={classes.boldText}>TODO</span> to{" "}
					<span className={classes.boldText}>TODO</span>
				</Typography>
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
