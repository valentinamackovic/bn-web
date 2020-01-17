import React, { Component } from "react";
import cubejs from "@cubejs-client/core";
import { QueryRenderer } from "@cubejs-client/react";
import { Row, Col, Statistic, Table } from "antd";
import PropTypes from "prop-types";
import Loader from "../../../../../../elements/loaders/Loader";

const numberRender = ({ resultSet }) => (
	<Row type="flex" justify="center" align="middle" style={{ height: "100%" }}>
		<Col>
			{resultSet.seriesNames().map(s => (
				<Statistic value={resultSet.totalRow()[s.key]}/>
			))}
		</Col>
	</Row>
);

const renderChart = Component => ({ resultSet, error }) =>
	(resultSet && <Component resultSet={resultSet}/>) ||
	(error && error.toString()) || <Loader/>;

class TotalSalesChart extends Component {
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
		const { timezone } = this.props;
		return (
			<QueryRenderer
				query={{
					measures: ["Orders.faceValueRevenue"],
					timeDimensions: [
						{
							dimension: "Orders.orderDate"
						}
					],
					dimensions: ["Events.name"],
					filters: [
						{
							dimension: "Orders.status",
							operator: "equals",
							values: ["Paid"]
						}
					],
					timezone
				}}
				cubejsApi={cubeJsApi}
				render={renderChart(numberRender)}
			/>
		);
	}
}

TotalSalesChart.propTypes = {
	token: PropTypes.string.isRequired,
	timezone: PropTypes.string.isRequired
};

export default TotalSalesChart;
