import { Doughnut } from "react-chartjs-2";
import React from "react";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
	fontFamily,
	fontFamilyBold,
	fontFamilyDemiBold,
	primaryHex,
	secondaryHex
} from "../../../../../../../config/theme";
import Loader from "../../../../../../elements/loaders/Loader";

const COLORS_SERIES = ["#00F1B9", "#008CF1", primaryHex, secondaryHex];

const styles = theme => {
	return {
		root: {
			flex: 1,

			[theme.breakpoints.up("sm")]: {
				display: "flex"
			}
		},
		pieContainer: {
			flex: 1
		},
		legendContainer: {
			flex: 3,
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",

			marginTop: 20,
			marginBottom: 30,
			paddingLeft: 0,
			paddingRight: 0,

			//Desktop
			[theme.breakpoints.up("sm")]: {
				marginTop: 0,
				marginBottom: 0,
				paddingLeft: 20,
				paddingRight: 20
			}
		},
		legendRow: {
			display: "flex",
			justifyContent: "space-between"
		},
		legendTitle: {
			fontFamily: fontFamilyDemiBold,
			fontSize: 17,
			marginBottom: 10,
			textAlign: "center",

			[theme.breakpoints.up("sm")]: {
				textAlign: "left",
				marginBottom: 16
			}
		},
		legendDot: {
			height: 11,
			width: 11,
			borderRadius: 10,
			backgroundColor: "gray",
			marginRight: 10
		},
		legendTextContainer: {
			display: "flex",
			alignItems: "center"
		},
		legendKeyText: {
			fontSize: 15,
			opacity: 0.6
		},
		legendValueText: {
			fontSize: 15,
			fontFamily: fontFamilyBold
		},
		legendPercentText: {
			fontSize: 15,
			fontFamily: fontFamily,
			color: "#979797"
		}
	};
};

const DoughnutRender = ({ resultSet }) => {
	const data = {
		labels: resultSet.categories().map(c => c.category),
		datasets: resultSet.series().map(s => ({
			label: s.title,
			data: s.series.map(r => r.value),
			backgroundColor: COLORS_SERIES,
			hoverBackgroundColor: COLORS_SERIES
		}))
	};

	const options = {
		legend: {
			display: false
		},
		cutoutPercentage: 60,
		maintainAspectRatio: false
	};
	return <Doughnut height={100} width={100} data={data} options={options}/>;
};

const ChartContainer = ({ children, resultSet, classes, title }) => {
	const { loadResponse } = resultSet;
	if (!loadResponse) {
		return null;
	}

	const { data, query } = loadResponse;

	if (!data) {
		return null;
	}

	let totalPoints = 0;
	const entries = [];

	data.forEach((entry, index) => {
		const elements = Object.keys(entry);
		if (elements.length != 2) {
			return;
		}

		const label = entry[elements[0]];
		const value = entry[elements[1]];

		totalPoints = totalPoints + Number(value);

		entries.push({ label, value, color: COLORS_SERIES[entries.length] });
	});

	return (
		<div className={classes.root}>
			<div className={classes.pieContainer}>{children}</div>
			<div className={classes.legendContainer}>
				<Typography className={classes.legendTitle}>{title}</Typography>
				{entries.map((entry, index) => {
					const { label, value, color } = entry;

					const percent = Math.round((value / totalPoints) * 100 * 100) / 100;

					return (
						<div key={index} className={classes.legendRow}>
							<div className={classes.legendTextContainer}>
								<div
									className={classes.legendDot}
									style={{ backgroundColor: color }}
								/>
								<Typography className={classes.legendKeyText}>
									{label}
								</Typography>
							</div>
							<Typography className={classes.legendValueText}>
								{value}{" "}
								<span className={classes.legendPercentText}>
									({percent}% of total)
								</span>
							</Typography>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const DoughnutWithLegend = Component => ({ resultSet, error, title }) => {
	const ChartContainerWithStyles = withStyles(styles)(props => (
		<ChartContainer {...props} title={title}/>
	));

	return (
		(resultSet && (
			<ChartContainerWithStyles resultSet={resultSet}>
				<Component resultSet={resultSet}/>
			</ChartContainerWithStyles>
		)) ||
		(error && error.toString()) || <Loader/>
	);
};

export default DoughnutWithLegend(DoughnutRender);
