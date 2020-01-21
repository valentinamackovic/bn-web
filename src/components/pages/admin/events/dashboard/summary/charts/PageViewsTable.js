import React, { Component } from "react";
import cubejs from "@cubejs-client/core";
import { QueryRenderer } from "@cubejs-client/react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import PageViewsRow from "./PageViewsRow";
import Loader from "../../../../../../elements/loaders/Loader";

const upperFirstChar = string =>
	string ? string[0].toUpperCase() + string.slice(1) : "";

const columnHeadingMap = {
	"PageViews.uniqueViews": "Unique Page Views",
	"PageViews.source": "Source",
	"PageViews.medium": "Medium",
	"PageViews.tickets": "Tickets Sold",
	"PageViews.conversionRate": "Order Conversion Rate"
};

const formatValueFunctions = {
	"PageViews.uniqueViews": row => {
		return row["PageViews.uniqueViews"];
	},
	"PageViews.source": row => {
		const val = row["PageViews.source"];

		if (!val) {
			return "Direct";
		}

		return upperFirstChar(val);
	},
	"PageViews.medium": row => {
		const val = row["PageViews.medium"];

		if (val == "venuewebsite") {
			return "Venue Website";
		}

		return upperFirstChar(val);
	},
	"PageViews.conversionRate": row => {
		const percent = Number(row["PageViews.conversionRate"]);

		return `${Math.round(percent * 100) / 100}%`;
	}
};

const TableRender = ({ resultSet, classes }) => {
	const rows = resultSet.tablePivot();

	if (rows.length === 0) {
		return <Typography>No results found</Typography>;
	}

	return (
		<div>
			<PageViewsRow heading>
				{resultSet.tableColumns().map(c => columnHeadingMap[c.key] || c.title)}
			</PageViewsRow>
			{rows.map((row, index) => {
				return (
					<PageViewsRow key={index} gray={!!(index % 2)}>
						{Object.keys(row).map(key => {
							let value = "";
							const formatFunc = formatValueFunctions[key];
							value = formatFunc ? formatFunc(row) : row[key];

							return value;
						})}
					</PageViewsRow>
				);
			})}
		</div>
	);
};

const ChartRender = ChartComponent => ({ resultSet, error }) =>
	(resultSet && <ChartComponent resultSet={resultSet}/>) ||
	(error && error.toString()) || <Loader/>;

class PageViewsTable extends Component {
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
		const { startDate, endDate, timezone } = this.props;

		const filters = [];

		if (startDate) {
			filters.push({
				dimension: "PageViews.date",
				operator: "gt",
				values: [
					startDate
						.clone()
						.utc()
						.format()
				]
			});
		}

		if (endDate) {
			filters.push({
				dimension: "PageViews.date",
				operator: "lt",
				values: [
					endDate
						.clone()
						.utc()
						.format()
				]
			});
		}

		return (
			<QueryRenderer
				query={{
					measures: [
						"PageViews.tickets",
						"PageViews.uniqueViews",
						"PageViews.conversionRate"
					],
					dimensions: ["PageViews.source", "PageViews.medium"],
					segments: [],
					order: {
						"PageViews.tickets": "desc",
						"PageViews.uniqueViews": "desc"
					},
					filters,
					timezone
				}}
				cubejsApi={cubeJsApi}
				render={ChartRender(TableRender)}
			/>
		);
	}
}

PageViewsTable.propTypes = {
	token: PropTypes.string.isRequired,
	cubeApiUrl: PropTypes.string.isRequired,
	startDate: PropTypes.object,
	endDate: PropTypes.object,
	timezone: PropTypes.string.isRequired
};

export default PageViewsTable;
