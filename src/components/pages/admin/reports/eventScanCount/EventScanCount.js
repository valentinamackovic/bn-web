import React, { Component } from "react";
import { Typography, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Divider from "../../../../common/Divider";
import Button from "../../../../elements/Button";
import { fontFamilyDemiBold, secondaryHex } from "../../../../../config/theme";
import ticketCountReport from "../../../../../stores/reports/ticketCountReport";
import { observer } from "mobx-react";
import Loader from "../../../../elements/loaders/Loader";
import EventScanCountTable from "./EventScanCountTable";
import Bigneon from "../../../../../helpers/bigneon";
import downloadCSV from "../../../../../helpers/downloadCSV";
import notification from "../../../../../stores/notifications";

@observer
class ScanCounts extends Component {
	constructor(props) {
		super(props);

		this.state = {
			scanData: [],
			totals: [],
			isLoading: false
		};
	}

	componentDidMount() {
		this.refreshData();
	}

	componentWillUnmount() {}

	refreshData() {
		const { eventId, organizationId } = this.props;
		if (eventId) {
			const queryParams = {
				organization_id: organizationId,
				event_id: eventId
			};

			this.setState({ isLoading: true });

			Bigneon()
				.reports.scanCount(queryParams)
				.then(response => {
					const { data } = response.data;

					let scannedTotal = 0;
					let unScannedTotal = 0;
					data.forEach(item => {
						scannedTotal = scannedTotal + item.scanned_count;
						unScannedTotal = unScannedTotal + item.not_scanned_count;
					});
					const totals = {
						scannedTotal: scannedTotal,
						unScannedTotal: unScannedTotal
					};
					this.setState({ isLoading: false, scanData: data, totals });
				})
				.catch(e => {
					console.error(e);
					this.setState({ isLoading: false });
					notification.showFromErrorResponse({
						e,
						defaultMessage: "Failed to load Scan data",
						variant: "error"
					});
				});
		}
	}

	exportCSV() {
		const { scanData, totals } = this.state;

		const csvRows = [];

		csvRows.push(["Ticket Scan Count Report"]);
		csvRows.push([""]);
		csvRows.push([""]);

		csvRows.push(["Ticket Type Name", "Scanned", "Not Scanned (No Shows)"]);
		csvRows.push([""]);

		scanData.forEach(ticket => {
			const { ticket_type_name, scanned_count, not_scanned_count } = ticket;
			csvRows.push([ticket_type_name, scanned_count, not_scanned_count]);
		});

		csvRows.push([""]);
		csvRows.push(["Grand total", totals.scannedTotal, totals.unScannedTotal]);

		downloadCSV(csvRows, "scan-count");
	}

	render() {
		const { eventId, classes, eventName, printVersion } = this.props;
		const { scanData, totals, isLoading } = this.state;

		if (isLoading) {
			return <Loader/>;
		}
		return (
			<div className={classes.root}>
				<div className={classes.header}>
					<Typography className={classes.pageTitle}>
						Scan Count Report
					</Typography>
					<span style={{ flex: 1 }}/>
					{eventId && !printVersion && (
						<div className={classes.btnHolder}>
							<Button
								iconUrl="/icons/csv-active.svg"
								variant="text"
								onClick={() => this.exportCSV(eventId)}
							>
								Export CSV
							</Button>
							<Button
								href={`/exports/reports/?type=scan_count&event_id=${eventId}`}
								target={"_blank"}
								iconUrl="/icons/pdf-active.svg"
								variant="text"
							>
								Export PDF
							</Button>
						</div>
					)}
				</div>

				{eventId && (
					<EventScanCountTable totals={totals} scanCounts={scanData}/>
				)}
			</div>
		);
	}
}

const styles = theme => ({
	root: {},
	pageTitle: {
		fontSize: 30,
		fontFamily: fontFamilyDemiBold
	},
	header: {
		display: "flex",
		flexDirection: "row",
		minHeight: 45,
		alignItems: "center",
		marginBottom: theme.spacing.unit * 2,
		[theme.breakpoints.down("sm")]: {
			justifyContent: "flex-center",
			flexDirection: "column",
			alignItems: "flex-start"
		}
	},
	btnHolder: {
		display: "flex",
		flexDirection: "row",
		marginBottom: theme.spacing.unit * 2,
		[theme.breakpoints.down("sm")]: {
			justifyContent: "flex-center",
			flexDirection: "column",
			alignItems: "flex-start"
		}
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
		fontSize: 20,
		marginBottom: theme.spacing.unit
	},
	capTitleSmall: {
		textTransform: "uppercase",
		fontFamily: fontFamilyDemiBold,
		fontSize: 12,
		color: secondaryHex
	}
});

ScanCounts.propTypes = {
	classes: PropTypes.object.isRequired,
	organizationId: PropTypes.string.isRequired,
	eventId: PropTypes.string,
	eventName: PropTypes.string,
	printVersion: PropTypes.bool,
	onLoad: PropTypes.func
};

export default withStyles(styles)(ScanCounts);
