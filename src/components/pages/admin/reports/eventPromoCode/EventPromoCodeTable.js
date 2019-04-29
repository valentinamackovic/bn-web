import React from "react";
import PropTypes from "prop-types";
import { withStyles, Typography } from "@material-ui/core";
import { dollars } from "../../../../../helpers/money";
import EventSummaryRow from "../eventSummary/EventSummaryRow";

export const EVENT_PROMO_CODE_HEADINGS = [
	"Promotion",
	"Code",
	"Face Value",
	"Discount Value",
	"Discounted Face",
	"Qty Sold",
	"% of Total Qty Sold",
	"Total Discounted Value",
	"Total Value",
	"% of Total Sales",
	"Total Orders",
	"Total Customers"
];

const styles = theme => {
	return {
		root: {}
	};
};

const EventPromoCodesTableView = props => {
	const { classes, sales, totals } = props;

	const columnStyles = [
		{ flex: 1, textAlign: "left" },
		{ flex: 1, textAlign: "left" },
		{ flex: 1, textAlign: "left" },
		{ flex: 1, textAlign: "left" },
		{ flex: 1, textAlign: "left" },
		{ flex: 0.6, textAlign: "left" },
		{ flex: 1.2, textAlign: "left" },
		{ flex: 1.2, textAlign: "left" },
		{ flex: 1, textAlign: "left" },
		{ flex: 1, textAlign: "left" },
		{ flex: 1, textAlign: "left" },
		{ flex: 1, textAlign: "left" }
	];

	return (
		<div>
			<EventSummaryRow heading column_styles={columnStyles}>
				{EVENT_PROMO_CODE_HEADINGS}
			</EventSummaryRow>
			{Object.keys(sales).map(key => {
				return (
					<div key={key}>
						<EventSummaryRow
							ticketTypeRow
							gray={true}
							column_styles={columnStyles}
						>
							{[
								sales[key].promo_code_name,
								sales[key].redemption_code,
								" ",
								" ",
								" ",
								sales[key].quantity,
								sales[key].percent_of_total_quantity + " %",
								dollars(sales[key].total_discounted_value),
								dollars(sales[key].total_value),
								sales[key].percent_of_total_value + " %",
								sales[key].total_orders,
								sales[key].total_customers
							]}
						</EventSummaryRow>
						{sales[key].ticket_types.map((tt, index) => {
							return (
								<EventSummaryRow key={index} column_styles={columnStyles}>
									{[
										tt.ticket_type_name,
										" ",
										dollars(tt.face_value),
										dollars(tt.discount_value),
										dollars(tt.discounted_face),
										tt.quantity,
										tt.percent_of_total_quantity + " %",
										dollars(tt.total_discounted_value),
										dollars(tt.total_value),
										tt.percent_of_total_value + " %",
										tt.total_orders,
										tt.total_customers
									]}
								</EventSummaryRow>
							);
						})}
					</div>
				);
			})}
			<EventSummaryRow ticketTypeRow total column_styles={columnStyles}>
				{[
					"Totals",
					" ",
					" ",
					" ",
					" ",
					totals.quantity,
					totals.percent_of_total_quantity + " %",
					dollars(totals.total_discounted_value),
					dollars(totals.total_value),
					totals.percent_of_total_value + " %",
					totals.total_orders,
					totals.total_customers
				]}
			</EventSummaryRow>
		</div>
	);
};

EventPromoCodesTableView.propTypes = {
	classes: PropTypes.object.isRequired,
	sales: PropTypes.object.isRequired,
	totals: PropTypes.object.isRequired
};

export const EventPromoCodesTable = withStyles(styles)(
	EventPromoCodesTableView
);
