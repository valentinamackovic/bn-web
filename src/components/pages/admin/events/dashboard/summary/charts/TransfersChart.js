import React, { Component } from "react";
import cubejs from "@cubejs-client/core";
import { QueryRenderer } from "@cubejs-client/react";
import PropTypes from "prop-types";
import DoughnutWithLegend from "./DoughnutWithLegend";

class TransfersChart extends Component {
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

		return (
			<QueryRenderer
				query={{
					measures: ["Transfers.count"],
					timeDimensions: [],
					dimensions: ["Transfers.status"],
					filters: []
				}}
				cubejsApi={cubeJsApi}
				render={DoughnutWithLegend}
			/>
		);
	}
}

TransfersChart.propTypes = {
	token: PropTypes.string.isRequired,
	cubeApiUrl: PropTypes.string.isRequired
};

export default TransfersChart;
