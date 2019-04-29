import { observable, computed, action, extendObservable } from "mobx";
import notifications from "../notifications";
import Bigneon from "../../helpers/bigneon";
import user from "../user";
import { dollars } from "../../helpers/money";
import EventSummaryRow from "../../components/pages/admin/reports/eventSummary/EventSummaryRow";
import React from "react";
import { EVENT_PROMO_CODE_HEADINGS } from "../../components/pages/admin/reports/eventPromoCode/EventPromoCodeTable";

const salesRows = sales => {
	return sales;
};

export class PromoCodeReport {
	@observable
	salesData = {
		name: "Loading",
		sales: []
	};

	@observable
	isLoading = false;

	@action
	fetchSalesData(queryParams, onSuccess) {
		this.setSalesData();

		if (!user.isAuthenticated) {
			return;
		}

		this.isLoading = true;

		return Bigneon()
			.reports.promoCodeSales({ ...queryParams })
			.then(response => {
				this.setSalesData(response.data);

				onSuccess ? onSuccess() : null;

				this.isLoading = false;
			})
			.catch(error => {
				notifications.showFromErrorResponse({
					error,
					defaultMessage: "Loading promo code sales failed."
				});

				this.isLoading = false;
			});
	}

	setSalesData(sales = []) {
		this.salesData = {
			name: "Loading",
			sales: salesRows(sales)
		};
	}

	@computed
	get salesByPromoCode() {
		const { sales } = this.salesData;

		const salesData = {};
		const ticket_type_totals = {};
		const event_totals = { quantity: 0, value: 0 };
		sales.forEach(row => {
			const {
				promo_redemption_code,
				hold_name,
				ticket_name,
				ticket_pricing_price_in_cents,
				promo_code_discounted_ticket_price,
				user_count,
				box_office_order_count,
				online_order_count,
				box_office_sale_count,
				online_sale_count,
				box_office_sales_in_cents,
				online_sales_in_cents
			} = row;

			event_totals.quantity += box_office_sale_count + online_sale_count;
			event_totals.value += box_office_sales_in_cents + online_sales_in_cents;

			if (ticket_type_totals[ticket_name]) {
				ticket_type_totals[ticket_name].quantity +=
					box_office_sale_count + online_sale_count;
				ticket_type_totals[ticket_name].total_value +=
					box_office_sales_in_cents + online_sales_in_cents;
			} else {
				ticket_type_totals[ticket_name] = {
					quantity: box_office_sale_count + online_sale_count,
					total_value: box_office_sales_in_cents + online_sales_in_cents
				};
			}

			const ticket_entry = {
				ticket_type_name: ticket_name,
				face_value: ticket_pricing_price_in_cents,
				discount_value: -promo_code_discounted_ticket_price,
				discounted_face:
					ticket_pricing_price_in_cents + promo_code_discounted_ticket_price,
				quantity: box_office_sale_count + online_sale_count,
				percent_of_total_quantity: -1,
				total_discounted_value:
					(box_office_sale_count + online_sale_count) *
					-promo_code_discounted_ticket_price,
				total_value:
					(box_office_sale_count + online_sale_count) *
					(ticket_pricing_price_in_cents + promo_code_discounted_ticket_price),
				percent_of_total_value: -1,
				total_orders: box_office_order_count + online_order_count,
				total_customers: user_count
			};

			if (Object.keys(salesData).includes(promo_redemption_code)) {
				const ticket_type = salesData[
					promo_redemption_code
				].ticket_types.filter(tt => tt.ticket_type_name === ticket_name);
				if (ticket_type.length === 0) {
					salesData[promo_redemption_code].ticket_types.push(ticket_entry);
				} else {
					ticket_type[0].quantity += box_office_sale_count + online_sale_count;
					ticket_type[0].total_discounted_value =
						ticket_type[0].quantity * -promo_code_discounted_ticket_price;
					ticket_type[0].total_value =
						ticket_type[0].quantity *
						(ticket_pricing_price_in_cents +
							promo_code_discounted_ticket_price);
					ticket_type[0].total_orders +=
						box_office_order_count + online_order_count;
					ticket_type[0].total_customers += user_count;
				}

				salesData[promo_redemption_code].quantity += ticket_entry.quantity;
				salesData[promo_redemption_code].total_discounted_value +=
					ticket_entry.total_discounted_value;
				salesData[promo_redemption_code].total_value +=
					ticket_entry.total_value;
				salesData[promo_redemption_code].total_orders +=
					box_office_order_count + online_order_count;
				salesData[promo_redemption_code].total_customers += user_count;
			} else if (promo_redemption_code !== null) {
				salesData[promo_redemption_code] = {
					promo_code_name: hold_name,
					redemption_code: promo_redemption_code,
					quantity: ticket_entry.quantity,
					total_discounted_value: ticket_entry.total_discounted_value,
					total_value: ticket_entry.total_value,
					total_orders: ticket_entry.total_orders,
					total_customers: ticket_entry.total_customers,
					ticket_types: [ticket_entry]
				};
			}
		});

		const totals = {
			quantity: 0,
			percent_of_total_quantity: 0,
			total_discounted_value: 0,
			total_value: 0,
			percent_of_total_value: 0,
			total_orders: 0,
			total_customers: 0
		};

		// Sort keys to be in alphabetical order and calculate final percentages and totals
		Object.keys(salesData).forEach(key => {
			salesData[key].ticket_types.sort((a, b) =>
				a.ticket_type_name > b.ticket_type_name
					? 1
					: a.ticket_type_name < b.ticket_type_name
						? -1
						: 0
			);
			salesData[key].ticket_types.forEach(tt => {
				tt.percent_of_total_value = Math.floor(
					(100 * tt.total_value) /
						ticket_type_totals[tt.ticket_type_name].total_value
				);
				tt.percent_of_total_quantity = Math.floor(
					(100 * tt.quantity) / ticket_type_totals[tt.ticket_type_name].quantity
				);
			});

			salesData[key].percent_of_total_quantity = Math.floor(
				(100 * salesData[key].quantity) / event_totals.quantity
			);
			salesData[key].percent_of_total_value = Math.floor(
				(100 * salesData[key].total_value) / event_totals.value
			);

			totals.quantity += salesData[key].quantity;
			totals.total_discounted_value += salesData[key].total_discounted_value;
			totals.total_value += salesData[key].total_value;
			totals.total_orders += salesData[key].total_orders;
			totals.total_customers += salesData[key].total_customers;
		});

		totals.percent_of_total_quantity = Math.floor(
			(100 * totals.quantity) / event_totals.quantity
		);
		totals.percent_of_total_value = Math.floor(
			(100 * totals.total_value) / event_totals.value
		);

		return { salesData: salesData, totals: totals };
	}

	csv(data) {
		const { salesData, totals } = data;
		const csvRows = [];
		csvRows.push(EVENT_PROMO_CODE_HEADINGS);
		Object.keys(salesData).map(key => {
			csvRows.push([
				salesData[key].promo_code_name,
				salesData[key].redemption_code,
				" ",
				" ",
				" ",
				salesData[key].quantity,
				salesData[key].percent_of_total_quantity + " %",
				dollars(salesData[key].total_discounted_value),
				dollars(salesData[key].total_value),
				salesData[key].percent_of_total_value + " %",
				salesData[key].total_orders,
				salesData[key].total_customers
			]);

			salesData[key].ticket_types.map((tt, index) => {
				csvRows.push([
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
				]);
			});
		});
		csvRows.push([
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
		]);
		return csvRows;
	}
}

const promoCodeReport = new PromoCodeReport();
export default promoCodeReport;
