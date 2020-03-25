import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import ScanCountRow from "./EventScanCountRow";

const EventScanCountTable = props => {
	const { scanCounts, classes, totals } = props;
	return (
		<div className={classes.root}>
			<ScanCountRow heading>
				{["Ticket", "Scanned", "Not Scanned"]}
			</ScanCountRow>

			{scanCounts.map((item, index) => {
				const { ticket_type_name, scanned_count, not_scanned_count } = item;

				return (
					<ScanCountRow key={index}>
						{[ticket_type_name, scanned_count, not_scanned_count]}
					</ScanCountRow>
				);
			})}

			<ScanCountRow total>
				{["TOTAL", totals.scannedTotal, totals.unScannedTotal]}
			</ScanCountRow>
		</div>
	);
};

const styles = theme => {
	return {
		root: {
			[theme.breakpoints.down("xs")]: {
				maxWidth: "90vw"
			}
		}
	};
};

EventScanCountTable.propTypes = {
	classes: PropTypes.object.isRequired,
	hideDetails: PropTypes.bool
};

export default withStyles(styles)(EventScanCountTable);
