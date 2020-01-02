import "antd/dist/antd.css";
import React, { Component } from "react";
import cubejs from "@cubejs-client/core";
import { QueryRenderer } from "@cubejs-client/react";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import moment from "moment-timezone";
import Loader from "../../../../../../elements/loaders/Loader";

const COLORS_SERIES = ["#707CED"];
const FILL_SERIES = ["rgba(112,124,237,0.06)"];

const lineRender = ({ resultSet, startDate, endDate }) => {
	const data = {
		labels: resultSet.categories().map(c => c.category),
		datasets: resultSet.series().map((s, index) => ({
			label: s.title,
			data: s.series.map(r => r.value),
			borderColor: COLORS_SERIES[index],
			backgroundColor: FILL_SERIES[index],
			// fill: false,
			lineTension: 0
		}))
	};
	const options = {
		legend: {
			display: false
		},
		elements: {
			point: {
				radius: 0
			}
		},
		scales: {
			xAxes: [
				{
					type: "time",
					gridLines: {
						display: false
					},
					ticks: {
						min: startDate,
						max: endDate,
					 lineHeight: "14px",
						fontColor: "#2C3136",
						fontSize: "12px"
						// fontWeight: "600" // Not supported
						// callback: function(label, index, labels) {
						// 	return moment(label).format("MMM YYYY");
						// }
					}
				}
			],
			yAxes: [
				{
					gridLines: {
						color: "rgba(112,124,237,0.1)",
						borderDash: [5, 2],
						drawBorder: false
					},
					ticks: {
						min: 0,
						callback: function(label, index, labels) {
							return label;
						}
					}
				}
			]
		}
	};
	return <Line data={data} options={options}/>;
};

const renderChart = Component => ({ resultSet, error }) =>
	(resultSet && <Component resultSet={resultSet}/>) ||
	(error && error.toString()) || <Loader/>;

class TicketSalesChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cubeJsApi: cubejs(props.token, {
				apiUrl: `${props.cubeApiUrl}/cubejs-api/v1`
			})
		};
	}

	render() {
		const { cubeJsApi } = this.state;
		const { startDate, endDate } = this.props;
		return (
			<QueryRenderer
				query={{
					measures: ["OrderItems.ticketCount"],
					timeDimensions: [
						{
							dimension: "Orders.paidAt",
							granularity: "day"
						}
					]
					// filters: [
					// 	{
					// 		dimension: "Orders.paidAt",
					// 		operator: "gt",
					// 		values: [startDate]
					// 	}
					// ]
				}}
				cubejsApi={cubeJsApi}
				render={renderChart((vals) => lineRender({ ...vals, startDate, endDate }))}
			/>
		);
	}
}

TicketSalesChart.propTypes = {
	token: PropTypes.string.isRequired,
	startDate: PropTypes.string,
	endDate: PropTypes.string.isRequired,
	cubeApiUrl: PropTypes.string.isRequired
};

export default TicketSalesChart;
