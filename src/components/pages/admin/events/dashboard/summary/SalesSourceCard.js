import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Hidden } from "@material-ui/core";
import PropTypes from "prop-types";
import CollapseCard from "./CollapseCard";
import { fontFamilyDemiBold } from "../../../../../../config/theme";
import PageViewsTable from "./charts/PageViewsTable";
import getScreenWidth from "../../../../../../helpers/getScreenWidth";
import SelectGroup from "../../../../../common/form/SelectGroup";
import moment from "moment-timezone";
import DateTimePickerGroup from "../../../../../common/form/DateTimePickerGroup";

const timePeriods = [
	{
		value: "all",
		label: "All Time"
	},
	{
		value: "today",
		label: "Today"
	},
	{
		value: "yesterday",
		label: "Yesterday"
	},
	{
		value: "30-days",
		label: "Last 30 Days"
	},
	{
		value: "custom",
		label: "Custom"
	}
];

const styles = theme => {
	return {
		root: {
			[theme.breakpoints.up("sm")]: {
				padding: 30
			},
			[theme.breakpoints.down("md")]: {
				padding: 10
			},
			[theme.breakpoints.down("sm")]: {
				padding: 0
			}
		},
		scroll: {
			display: "flex",
			flexWrap: "nowrap",
			overflowX: "auto",
			WebkitOverflowScrolling: "touch",

			[theme.breakpoints.down("xs")]: {
				maxWidth: getScreenWidth() - 60
			}
		},
		block: {
			flex: 1
		},
		titleText: {
			fontFamily: fontFamilyDemiBold,
			fontSize: 19,
			marginBottom: 20
		},
		titleContainer: {
			[theme.breakpoints.up("sm")]: {
				display: "flex",
				justifyContent: "space-between"
			}
		},
		selectContainer: {
			[theme.breakpoints.up("sm")]: {
				maxWidth: 200
			}
		},
		dateRangeRow: {
			[theme.breakpoints.up("sm")]: {
				display: "flex",
				justifyContent: "flex-end"
			},
			[theme.breakpoints.down("sm")]: {
				display: "flex",
				justifyContent: "flex-start"
			}
		},
		dateRangeContainer: {
			[theme.breakpoints.up("sm")]: {
				maxWidth: 200
			}
		}
	};
};

class SalesSourceCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedTimePeriod: "all",
			startDate: null,
			endDate: null,
			showCustomDateRange: false,
			errors: {}
		};

		this.onChangeSelectTime = this.onChangeSelectTime.bind(this);
		this.onChangeStartDate = this.onChangeStartDate.bind(this);
		this.onChangeEndDate = this.onChangeEndDate.bind(this);
	}

	onChangeSelectTime(e) {
		const { on_sale } = this.props;
		const selectedTimePeriod = e.target.value;

		let startDate = null;
		let endDate = null;
		let showCustomDateRange = false;

		switch (selectedTimePeriod) {
			case "today": {
				startDate = moment().startOf("day");
				break;
			}
			case "yesterday": {
				startDate = moment()
					.subtract(1, "days")
					.startOf("day");
				endDate = moment().startOf("day");
				break;
			}
			case "30-days": {
				startDate = moment()
					.subtract(30, "days")
					.startOf("day");
				break;
			}
			case "custom": {
				showCustomDateRange = true;
				break;
			}
			// case "all":
			// default: {
			// }
		}

		this.setState({
			selectedTimePeriod,
			showCustomDateRange,
			startDate,
			endDate
		});
	}

	onChangeStartDate(startDate) {
		//TODO set errors

		this.setState({ startDate });
	}

	onChangeEndDate(endDate) {
		//TODO set errors

		this.setState({ endDate });
	}

	render() {
		const title = "Sales Source";

		const { classes, token, venue, cubeApiUrl, ...rest } = this.props;
		const {
			selectedTimePeriod,
			startDate,
			endDate,
			showCustomDateRange,
			errors
		} = this.state;

		return (
			<CollapseCard title={title} className={classes.root}>
				<div className={classes.titleContainer}>
					<Hidden smDown>
						<Typography className={classes.titleText}>{title}</Typography>
					</Hidden>

					<div className={classes.selectContainer}>
						<SelectGroup
							value={selectedTimePeriod}
							items={timePeriods}
							name={"time-filter"}
							onChange={this.onChangeSelectTime}
						/>
					</div>
				</div>

				{showCustomDateRange ? (
					<div className={classes.dateRangeRow}>
						<div className={classes.dateRangeContainer}>
							<DateTimePickerGroup
								type={"date"}
								error={errors.startDate}
								value={startDate}
								name="startDate"
								label="Start Date"
								onChange={this.onChangeStartDate}
							/>
						</div>
						<span style={{ width: 20 }}/>
						<div className={classes.dateRangeContainer}>
							<DateTimePickerGroup
								type={"date"}
								error={errors.endDate}
								value={endDate}
								name="endDate"
								label="End Date"
								onChange={this.onChangeEndDate}
							/>
						</div>
					</div>
				) : null}

				<div className={classes.scroll}>
					<div className={classes.block}>
						<PageViewsTable
							cubeApiUrl={cubeApiUrl}
							token={token}
							startDate={startDate}
							endDate={endDate}
							timezone={venue.timezone}
						/>
					</div>
				</div>
			</CollapseCard>
		);
	}
}

SalesSourceCard.propTypes = {
	classes: PropTypes.object.isRequired,
	token: PropTypes.string.isRequired,
	on_sale: PropTypes.string.isRequired,
	venue: PropTypes.object.isRequired,
	cubeApiUrl: PropTypes.string.isRequired
};

export default withStyles(styles)(SalesSourceCard);
