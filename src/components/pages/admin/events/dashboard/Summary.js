import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import classNames from "classnames";
import moment from "moment-timezone";

import TicketTypeSalesBarChart from "../../../../elements/charts/TicketTypeSalesBarChart";
import Card from "../../../../elements/Card";
import Divider from "../../../../common/Divider";
import { fontFamilyDemiBold } from "../../../../../config/theme";
import VerticalBarChart from "../../../../elements/charts/VerticalBarChart";
import Container from "./Container";
import Bigneon from "../../../../../helpers/bigneon";
import notifications from "../../../../../stores/notifications";
import Loader from "../../../../elements/loaders/Loader";
import { observer } from "mobx-react";
import SelectGroup from "../../../../common/form/SelectGroup";
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	ZAxis,
	Bar,
	BarChart,
	Tooltip,
	LineChart,
	CartesianGrid,
	Line,
	Brush,
	AreaChart,
	Area,
	Legend,
	PieChart,
	Pie,
	Sector,
	Cell
} from "recharts";

const data01 = [
	{ hour: "12a", index: 1, value: 170 },
	{ hour: "1a", index: 1, value: 180 },
	{ hour: "2a", index: 1, value: 150 },
	{ hour: "3a", index: 1, value: 120 },
	{ hour: "4a", index: 1, value: 120 },
	{ hour: "5a", index: 1, value: 120 },
	{ hour: "6a", index: 1, value: 120 },
	{ hour: "7a", index: 1, value: 700 },
	{ hour: "8a", index: 1, value: 600 },
	{ hour: "9a", index: 1, value: 150 },
	{ hour: "10a", index: 1, value: 800 },
	{ hour: "11a", index: 1, value: 850 },
	{ hour: "12p", index: 1, value: 900 },
	{ hour: "1p", index: 1, value: 1000 },
	{ hour: "2p", index: 1, value: 800 },
	{ hour: "3p", index: 1, value: 145 },
	{ hour: "4p", index: 1, value: 150 },
	{ hour: "5p", index: 1, value: 170 },
	{ hour: "6p", index: 1, value: 180 },
	{ hour: "7p", index: 1, value: 165 },
	{ hour: "8p", index: 1, value: 700 },
	{ hour: "9p", index: 1, value: 800 },
	{ hour: "10p", index: 1, value: 170 },
	{ hour: "11p", index: 1, value: 180 }
];

const data02 = [
	{ hour: "12a", index: 1, value: 160 },
	{ hour: "1a", index: 1, value: 180 },
	{ hour: "2a", index: 1, value: 150 },
	{ hour: "3a", index: 1, value: 120 },
	{ hour: "4a", index: 1, value: 120 },
	{ hour: "5a", index: 1, value: 120 },
	{ hour: "6a", index: 1, value: 100 },
	{ hour: "7a", index: 1, value: 120 },
	{ hour: "8a", index: 1, value: 100 },
	{ hour: "9a", index: 1, value: 150 },
	{ hour: "10a", index: 1, value: 160 },
	{ hour: "11a", index: 1, value: 160 },
	{ hour: "12p", index: 1, value: 800 },
	{ hour: "1p", index: 1, value: 600 },
	{ hour: "2p", index: 1, value: 300 },
	{ hour: "3p", index: 1, value: 145 },
	{ hour: "4p", index: 1, value: 200 },
	{ hour: "5p", index: 1, value: 320 },
	{ hour: "6p", index: 1, value: 400 },
	{ hour: "7p", index: 1, value: 700 },
	{ hour: "8p", index: 1, value: 800 },
	{ hour: "9p", index: 1, value: 140 },
	{ hour: "10p", index: 1, value: 160 },
	{ hour: "11p", index: 1, value: 180 }
];

const parseDomain = () => [
	0,
	Math.max(
		Math.max.apply(null, data01.map(entry => entry.value)),
		Math.max.apply(null, data02.map(entry => entry.value))
	)
];

const styles = theme => {
	return {
		root: {
			padding: theme.spacing.unit * 4,
			marginBottom: theme.spacing.unit
		},
		numbersCardContent: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			padding: theme.spacing.unit * 2,
			height: 100
		},
		numbersCardContentActive: {
			backgroundColor: theme.palette.primary.main
		},
		numbersCardLabel: {
			color: "#868f9b",
			textTransform: "uppercase",
			fontSize: theme.typography.fontSize * 0.8,
			fontFamily: fontFamilyDemiBold
		},
		numbersCardRow: {
			display: "flex",
			alignContent: "flex-start"
		},
		numbersCardValue: {
			fontSize: theme.typography.fontSize * 2.2
		},
		numbersCardActiveText: {
			color: "#FFFFFF"
		},
		numbersCardIcon: {
			width: 28,
			marginRight: theme.spacing.unit,
			marginBottom: theme.spacing.unit
		},
		emptyStateIllustration: {
			width: 200,
			justifyContent: "center"
		}
	};
};

const NumberCard = ({ classes, label, active, value, iconName }) => {
	return (
		<Card variant="subCard">
			<div
				className={classNames({
					[classes.numbersCardContent]: true,
					[classes.numbersCardContentActive]: !!active
				})}
			>
				<Typography
					className={classNames({
						[classes.numbersCardLabel]: true,
						[classes.numbersCardActiveText]: !!active
					})}
				>
					{label}
				</Typography>

				<div className={classes.numbersCardRow}>
					<img
						className={classes.numbersCardIcon}
						src={`/icons/${iconName}-${active ? "white" : "active"}.svg`}
						alt={iconName}
					/>
					<Typography
						className={classNames({
							[classes.numbersCardValue]: true,
							[classes.numbersCardActiveText]: !!active
						})}
					>
						{value}
					</Typography>
				</div>
			</div>
		</Card>
	);
};

@observer
class Summary extends Component {
	constructor(props) {
		super(props);

		this.state = {
			event: null,
			activeNumbersCard: null,
			chartValues: [],
			dayStats: [],
			eventCompareOption: null,
			venueTimeZone: "",
			graphOption: "salesByDay",
			eventCompareType: "data1"
		};
	}

	componentDidMount() {
		//TODO make bn-api issue for date required

		const id = this.props.match.params.id;
		this.loadEventDetails(id);
		this.loadTimeZone(id);
	}

	loadEventDetails(id) {
		Bigneon()
			.events.dashboard({ id })
			.then(response => {
				const { day_stats, event, venue } = response.data;

				this.setState({
					event,
					dayStats: day_stats,
					chartValues: this.getDailyBreakdownValues(day_stats)
				});
			})
			.catch(error => {
				console.error(error);
				notifications.showFromErrorResponse({
					defaultMessage: "Loading event details failed.",
					error
				});
			});
	}

	loadTimeZone(id) {
		Bigneon()
			.events.read({ id })
			.then(response => {
				const { venue } = response.data;
				if (venue.timezone) {
					this.setState({ venueTimeZone: venue.timezone });
				}
			})
			.catch(error => {
				console.error(error);
				notifications.showFromErrorResponse({
					defaultMessage: "Loading time zone for event failed.",
					error
				});
			});
	}

	getDailyBreakdownValues(dayStats) {
		const venueTimezone = this.state.venueTimeZone || "America/Los_Angeles";

		const result = [];
		for (let index = 0; index < dayStats.length; index++) {
			const dayOfMonth = moment
				.utc(dayStats[index].date)
				.tz(venueTimezone)
				.format("D");

			result.push({
				x: Number(dayOfMonth),
				y: dayStats[index].revenue_in_cents / 100, //  + Math.random() * 100,
				tooltipTitle: `$${(dayStats[index].revenue_in_cents / 100).toFixed(2)}`,
				tooltipText: `${dayStats[index].ticket_sales} Tickets`
			});
		}

		return result;
	}

	renderBarChart() {
		const { chartValues } = this.state;
		return <VerticalBarChart values={chartValues}/>;
	}

	renderNumbers() {
		const { activeNumbersCard, event } = this.state;
		const { classes } = this.props;
		return (
			<Grid container spacing={32}>
				<Grid
					item
					xs={12}
					sm={6}
					lg={3}
					onMouseEnter={() => this.setState({ activeNumbersCard: "revenue" })}
					onMouseLeave={() => this.setState({ activeNumbersCard: null })}
				>
					<NumberCard
						active={activeNumbersCard === "revenue"}
						label="Face value sales"
						value={"$" + (event.sales_total_in_cents / 100).toFixed(2)}
						iconName="chart"
						classes={classes}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}
					lg={3}
					onMouseEnter={() => this.setState({ activeNumbersCard: "sold" })}
					onMouseLeave={() => this.setState({ activeNumbersCard: null })}
				>
					<NumberCard
						active={activeNumbersCard === "sold"}
						label="Tickets sold"
						value={event.sold_held + event.sold_unreserved}
						iconName="ticket"
						classes={classes}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}
					lg={3}
					onMouseEnter={() => this.setState({ activeNumbersCard: "open" })}
					onMouseLeave={() => this.setState({ activeNumbersCard: null })}
				>
					<NumberCard
						active={activeNumbersCard === "open"}
						label="Tickets open"
						value={event.tickets_open}
						iconName="ticket"
						classes={classes}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}
					lg={3}
					onMouseEnter={() =>
						this.setState({ activeNumbersCard: "attendance" })
					}
					onMouseLeave={() => this.setState({ activeNumbersCard: null })}
				>
					<NumberCard
						active={activeNumbersCard === "attendance"}
						label="Attendance"
						value={event.tickets_redeemed}
						iconName="ticket"
						classes={classes}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}
					lg={3}
					onMouseEnter={() => this.setState({ activeNumbersCard: "daysLeft" })}
					onMouseLeave={() => this.setState({ activeNumbersCard: null })}
				>
					<NumberCard
						active={activeNumbersCard === "daysLeft"}
						label="Days left"
						value={Math.max(
							0,
							moment(event.event_start).diff(moment(), "days")
						)}
						iconName="events"
						classes={classes}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}
					lg={3}
					onMouseEnter={() =>
						this.setState({ activeNumbersCard: "sellThrough" })
					}
					onMouseLeave={() => this.setState({ activeNumbersCard: null })}
				>
					<NumberCard
						active={activeNumbersCard === "sellThrough"}
						label="Sell through rate"
						value="0%"
						iconName="ticket"
						classes={classes}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}
					lg={3}
					onMouseEnter={() => this.setState({ activeNumbersCard: "avgFace" })}
					onMouseLeave={() => this.setState({ activeNumbersCard: null })}
				>
					<NumberCard
						active={activeNumbersCard === "avgFace"}
						label="Avg Face"
						value="$0"
						iconName="ticket"
						classes={classes}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}
					lg={3}
					onMouseEnter={() =>
						this.setState({ activeNumbersCard: "avgTixPerDay" })
					}
					onMouseLeave={() => this.setState({ activeNumbersCard: null })}
				>
					<NumberCard
						active={activeNumbersCard === "avgTixPerDay"}
						label="Tickets Sold/Day"
						value="0"
						iconName="tickets"
						classes={classes}
					/>
				</Grid>
			</Grid>
		);
	}

	renderMarketingSnapshot() {
		const { activeNumbersCard, event } = this.state;
		const { classes } = this.props;
		return (
			<Grid container spacing={32}>
				<Grid
					item
					xs={12}
					sm={6}
					lg={3}
					onMouseEnter={() => this.setState({ activeNumbersCard: "dayOfWeek" })}
					onMouseLeave={() => this.setState({ activeNumbersCard: null })}
				>
					<NumberCard
						active={activeNumbersCard === "dayOfWeek"}
						label="Top promo day"
						value="Tues"
						iconName="events"
						classes={classes}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}
					lg={3}
					onMouseEnter={() =>
						this.setState({ activeNumbersCard: "salesSource" })
					}
					onMouseLeave={() => this.setState({ activeNumbersCard: null })}
				>
					<NumberCard
						active={activeNumbersCard === "salesSource"}
						label="Top sales source"
						value="fb-event"
						iconName="tickets"
						classes={classes}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}
					lg={3}
					onMouseEnter={() => this.setState({ activeNumbersCard: "topPromo" })}
					onMouseLeave={() => this.setState({ activeNumbersCard: null })}
				>
					<NumberCard
						active={activeNumbersCard === "topPromo"}
						label="Top promo"
						value="promo25"
						iconName="tickets"
						classes={classes}
					/>
				</Grid>
			</Grid>
		);
	}

	renderTicketVolumes() {
		const ticketTypes = this.state.event.ticket_types;

		return (
			<Grid container spacing={32}>
				{ticketTypes.map((ticketType, index) => {
					const remainingHeld = ticketType.held - ticketType.sold_held;
					// const valueDisplay = ticketType.held > 0 ? `${remainingHeld} / ${ticketType.held}` : "";
					return (
						<Grid key={index} item xs={12} sm={6} lg={4}>
							<TicketTypeSalesBarChart
								name={ticketType.name}
								totalRevenueInCents={ticketType.sales_total_in_cents}
								values={[
									{
										label: "Sold",
										value: ticketType.sold_held + ticketType.sold_unreserved
									},
									{ label: "Open", value: ticketType.open },
									{ label: "Held", value: remainingHeld }
								]}
							/>
						</Grid>
					);
				})}
			</Grid>
		);
	}

	renderTooltip = props => {
		const { active, payload } = props;

		if (active && payload && payload.length) {
			const data = payload[0] && payload[0].payload;

			return (
				<div
					style={{
						backgroundColor: "#fff",
						border: "1px solid #999",
						margin: 0,
						padding: 10
					}}
				>
					<p>{data.hour}</p>
					<p>
						<span>value: </span>
						{data.value}
					</p>
				</div>
			);
		}

		return null;
	};

	renderScatterPlot() {
		const domain = parseDomain();
		const range = [16, 225];

		return (
			<div>
				<ScatterChart
					width={800}
					height={60}
					margin={{
						top: 10,
						right: 0,
						bottom: 0,
						left: 0
					}}
				>
					<XAxis
						type="category"
						dataKey="hour"
						interval={0}
						tick={{ fontSize: 0 }}
						tickLine={{ transform: "translate(0, -6)" }}
					/>
					<YAxis
						type="number"
						dataKey="index"
						name="sunday"
						height={10}
						width={80}
						tick={false}
						tickLine={false}
						axisLine={false}
						label={{ value: "Sunday", position: "insideRight" }}
					/>
					<ZAxis type="number" dataKey="value" domain={domain} range={range}/>
					<Tooltip
						cursor={{ strokeDasharray: "3 3" }}
						wrapperStyle={{ zIndex: 100 }}
						content={this.renderTooltip}
					/>
					<Scatter data={data01} fill="#8884d8"/>
				</ScatterChart>

				<ScatterChart
					width={800}
					height={60}
					margin={{
						top: 10,
						right: 0,
						bottom: 0,
						left: 0
					}}
				>
					<XAxis
						type="category"
						dataKey="hour"
						name="hour"
						interval={0}
						tick={{ fontSize: 0 }}
						tickLine={{ transform: "translate(0, -6)" }}
					/>
					<YAxis
						type="number"
						dataKey="index"
						height={10}
						width={80}
						tick={false}
						tickLine={false}
						axisLine={false}
						label={{ value: "Monday", position: "insideRight" }}
					/>
					<ZAxis type="number" dataKey="value" domain={domain} range={range}/>
					<Tooltip
						cursor={{ strokeDasharray: "3 3" }}
						wrapperStyle={{ zIndex: 100 }}
						content={this.renderTooltip}
					/>
					<Scatter data={data01} fill="#8884d8"/>
				</ScatterChart>

				<ScatterChart
					width={800}
					height={60}
					margin={{
						top: 10,
						right: 0,
						bottom: 0,
						left: 0
					}}
				>
					<XAxis
						type="category"
						dataKey="hour"
						name="hour"
						interval={0}
						tick={{ fontSize: 0 }}
						tickLine={{ transform: "translate(0, -6)" }}
					/>
					<YAxis
						type="number"
						dataKey="index"
						height={10}
						width={80}
						tick={false}
						tickLine={false}
						axisLine={false}
						label={{ value: "Tuesday", position: "insideRight" }}
					/>
					<ZAxis type="number" dataKey="value" domain={domain} range={range}/>
					<Tooltip
						cursor={{ strokeDasharray: "3 3" }}
						wrapperStyle={{ zIndex: 100 }}
						content={this.renderTooltip}
					/>
					<Scatter data={data01} fill="#8884d8"/>
				</ScatterChart>

				<ScatterChart
					width={800}
					height={60}
					margin={{
						top: 10,
						right: 0,
						bottom: 0,
						left: 0
					}}
				>
					<XAxis
						type="category"
						dataKey="hour"
						name="hour"
						interval={0}
						tick={{ fontSize: 0 }}
						tickLine={{ transform: "translate(0, -6)" }}
					/>
					<YAxis
						type="number"
						dataKey="index"
						height={10}
						width={80}
						tick={false}
						tickLine={false}
						axisLine={false}
						label={{ value: "Wednesday", position: "insideRight" }}
					/>
					<ZAxis type="number" dataKey="value" domain={domain} range={range}/>
					<Tooltip
						cursor={{ strokeDasharray: "3 3" }}
						wrapperStyle={{ zIndex: 100 }}
						content={this.renderTooltip}
					/>
					<Scatter data={data01} fill="#8884d8"/>
				</ScatterChart>

				<ScatterChart
					width={800}
					height={60}
					margin={{
						top: 10,
						right: 0,
						bottom: 0,
						left: 0
					}}
				>
					<XAxis
						type="category"
						dataKey="hour"
						name="hour"
						interval={0}
						tick={{ fontSize: 0 }}
						tickLine={{ transform: "translate(0, -6)" }}
					/>
					<YAxis
						type="number"
						dataKey="index"
						height={10}
						width={80}
						tick={false}
						tickLine={false}
						axisLine={false}
						label={{ value: "Thursday", position: "insideRight" }}
					/>
					<ZAxis type="number" dataKey="value" domain={domain} range={range}/>
					<Tooltip
						cursor={{ strokeDasharray: "3 3" }}
						wrapperStyle={{ zIndex: 100 }}
						content={this.renderTooltip}
					/>
					<Scatter data={data02} fill="#8884d8"/>
				</ScatterChart>

				<ScatterChart
					width={800}
					height={60}
					margin={{
						top: 10,
						right: 0,
						bottom: 0,
						left: 0
					}}
				>
					<XAxis
						type="category"
						dataKey="hour"
						name="hour"
						interval={0}
						tick={{ fontSize: 0 }}
						tickLine={{ transform: "translate(0, -6)" }}
					/>
					<YAxis
						type="number"
						dataKey="index"
						height={10}
						width={80}
						tick={false}
						tickLine={false}
						axisLine={false}
						label={{ value: "Friday", position: "insideRight" }}
					/>
					<ZAxis type="number" dataKey="value" domain={domain} range={range}/>
					<Tooltip
						cursor={{ strokeDasharray: "3 3" }}
						wrapperStyle={{ zIndex: 100 }}
						content={this.renderTooltip}
					/>
					<Scatter data={data02} fill="#8884d8"/>
				</ScatterChart>

				<ScatterChart
					width={800}
					height={60}
					margin={{
						top: 10,
						right: 0,
						bottom: 0,
						left: 0
					}}
				>
					<XAxis
						type="category"
						dataKey="hour"
						name="hour"
						interval={0}
						tickLine={{ transform: "translate(0, -6)" }}
					/>
					<YAxis
						type="number"
						dataKey="index"
						height={10}
						width={80}
						tick={false}
						tickLine={false}
						axisLine={false}
						label={{ value: "Saturday", position: "insideRight" }}
					/>
					<ZAxis type="number" dataKey="value" domain={domain} range={range}/>
					<Tooltip
						cursor={{ strokeDasharray: "3 3" }}
						wrapperStyle={{ zIndex: 100 }}
						content={this.renderTooltip}
					/>
					<Scatter data={data02} fill="#8884d8"/>
				</ScatterChart>
			</div>
		);
	}

	renderComparison() {
		const data1 = [
			{
				name: "T - 42",
				uv: 4000,
				pv: 2400,
				amt: 2400
			},
			{
				name: "T - 35",
				uv: 3000,
				pv: 1398,
				amt: 2210
			},
			{
				name: "T - 28",
				uv: 2000,
				pv: 9800,
				amt: 2290
			},
			{
				name: "T - 21",
				uv: 2780,
				pv: 3908,
				amt: 2000
			},
			{
				name: "T - 14",
				uv: 1890,
				pv: 4800,
				amt: 2181
			},
			{
				name: "T - 7",
				uv: 2390,
				amt: 2500
			},
			{
				name: "T - 0",
				uv: 3490,
				amt: 2100
			}
		];
		const data2 = [
			{
				name: "T - 42",
				uv: 4000,
				pv: 4000,
				amt: 2400
			},
			{
				name: "T - 35",
				uv: 2423,
				pv: 3000,
				amt: 2210
			},
			{
				name: "T - 28",
				uv: 1329,
				pv: 2492,
				amt: 2290
			},
			{
				name: "T - 21",
				uv: 1123,
				pv: 2301,
				amt: 2000
			},
			{
				name: "T - 14",
				uv: 987,
				pv: 2100,
				amt: 2181
			},
			{
				name: "T - 7",
				uv: 635,
				amt: 2500
			},
			{
				name: "T - 0",
				uv: 32,
				amt: 2100
			}
		];

		return (
			<div>
				<h4>Current Event: {this.state.event.name}</h4>
				<LineChart
					width={950}
					height={200}
					data={
						this.state.eventCompareType == "data1"
							? data1
							: this.state.eventCompareType == "data2"
								? data2
								: data1
					}
					syncId="anyId"
					margin={{
						top: 10,
						right: 30,
						left: 0,
						bottom: 0
					}}
				>
					<CartesianGrid strokeDasharray="3 3"/>
					<XAxis dataKey="name"/>
					<YAxis/>
					<Tooltip/>
					<Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8"/>
				</LineChart>
				<h4>Compared: {this.state.eventCompareOption}</h4>
				<LineChart
					width={950}
					height={200}
					data={
						this.state.eventCompareType == "data1"
							? data1
							: this.state.eventCompareType == "data2"
								? data2
								: data1
					}
					syncId="anyId"
					margin={{
						top: 10,
						right: 30,
						left: 0,
						bottom: 0
					}}
				>
					<CartesianGrid strokeDasharray="3 3"/>
					<XAxis dataKey="name"/>
					<YAxis/>
					<Tooltip/>
					<Line type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d"/>
					<Brush/>
				</LineChart>
			</div>
		);
	}

	renderSalesPie() {
		const dataPie = [
			{ name: "Group A", value: 400 },
			{ name: "Group B", value: 300 },
			{ name: "Group C", value: 300 },
			{ name: "Group D", value: 200 }
		];
		const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
		const dataBarComp = [
			{
				name: "FB Event",
				Current: 47,
				Compared: 56,
				amt: 2210
			},
			{
				name: "FB CPC",
				Current: 19,
				Compared: 23,
				amt: 2290
			},
			{
				name: "Google Organic",
				Current: 17,
				Compared: 9,
				amt: 2000
			},
			{
				name: "Google CPC",
				Current: 13,
				Compared: 0,
				amt: 2181
			},
			{
				name: "FB Social",
				Current: 4,
				Compared: 12,
				amt: 2500
			}
		];
		return (
			<BarChart
				width={900}
				height={300}
				data={dataBarComp}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5
				}}
			>
				<CartesianGrid strokeDasharray="3 3"/>
				<XAxis dataKey="name"/>
				<YAxis/>
				<Tooltip/>
				<Legend/>
				<Bar dataKey="Current" fill="#8884d8"/>
			</BarChart>
		);
	}

	renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
		index
	}) => {
		const RADIAN = Math.PI / 180;
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text
				x={x}
				y={y}
				fill="black"
				textAnchor={x > cx ? "start" : "end"}
				dominantBaseline="central"
			>
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		);
	};

	renderSalesPieCompare() {
		const dataPie = [
			{ name: "Group A", value: 400 },
			{ name: "Group B", value: 300 },
			{ name: "Group C", value: 300 },
			{ name: "Group D", value: 200 }
		];
		const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
		const dataBarComp = [
			{
				name: "FB Event",
				Current: 47,
				Compared: 56,
				amt: 2210
			},
			{
				name: "FB CPC",
				Current: 19,
				Compared: 23,
				amt: 2290
			},
			{
				name: "Google Organic",
				Current: 17,
				Compared: 9,
				amt: 2000
			},
			{
				name: "Google CPC",
				Current: 13,
				Compared: 0,
				amt: 2181
			},
			{
				name: "FB Social",
				Current: 4,
				Compared: 12,
				amt: 2500
			}
		];
		return (
			<BarChart
				width={900}
				height={300}
				data={dataBarComp}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5
				}}
			>
				<CartesianGrid strokeDasharray="3 3"/>
				<XAxis dataKey="name"/>
				<YAxis/>
				<Tooltip/>
				<Legend/>
				<Bar dataKey="Current" fill="#8884d8"/>
				<Bar dataKey="Compared" fill="#FF20B1"/>
			</BarChart>
		);
	}

	render() {
		const { event } = this.state;
		const { classes } = this.props;

		if (!event) {
			return <Loader/>;
		}

		if (event.is_external) {
			return (
				<Container
					eventId={event.id}
					subheading={"summary"}
					layout={"childrenInsideCard"}
				>
					<Grid
						container
						direction="column"
						justify="center"
						alignItems="center"
					>
						<img
							src="/images/no_sales_data_illustration.png"
							style={{ margin: 50, width: 200 }}
						/>
						<Typography variant="title">
							This event is externally hosted.
						</Typography>
					</Grid>
				</Container>
			);
		} else {
			return (
				<Container eventId={event.id} subheading={"summary"} useCardContainer>
					<Grid container spacing={32}>
						<Grid item xs={12} sm={6} lg={3}>
							<SelectGroup
								value={this.state.graphOption || "custom"}
								items={[
									{ value: "salesByDay", label: "Sales Velocity" },
									{ value: "compare", label: "Compare Events" }
								]}
								name={"sales-graph-option"}
								label={"Select Dashboard Graph"}
								onChange={e => {
									this.setState({ graphOption: e.target.value });
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6} lg={3}>
							{this.state.graphOption == "compare" ? (
								<SelectGroup
									value={this.state.eventCompareOption || "custom"}
									items={[
										{
											value: "Jay Wilson Band - 2/25/19",
											label: "Jay Wilson Band - 2/25/19"
										},
										{
											value: "Tie Lawson - 3/21/19",
											label: "Tie Lawson - 3/21/19"
										},
										{
											value: "Red Cap Tap - 3/24/19",
											label: "Red Cap Tap - 3/24/19"
										}
									]}
									name={"sales-graph-option"}
									label={"Select Event to Compare"}
									onChange={e => {
										this.setState({ eventCompareOption: e.target.value });
									}}
								/>
							) : null}
						</Grid>
						<Grid item xs={12} sm={6} lg={3}>
							{this.state.graphOption == "compare" &&
							this.state.eventCompareOption ? (
									<SelectGroup
										value={this.state.eventCompareType || "custom"}
										items={[
											{ value: "data1", label: "Weekly Sales Volume" },
											{ value: "data2", label: "Inventory Burndown" },
											{ value: "data3", label: "Sales By Source" }
										]}
										name={"sales-graph-option"}
										label={"Select Chart to Compare"}
										onChange={e => {
											this.setState({ eventCompareType: e.target.value });
										}}
									/>
								) : null}
						</Grid>
					</Grid>
					{this.state.graphOption == "salesByDay"
						? this.renderBarChart()
						: null}
					{this.state.graphOption == "dayTimeHeatmap"
						? this.renderScatterPlot()
						: null}
					{this.state.graphOption == "salesBySource"
						? this.renderSalesPie()
						: null}
					{this.state.graphOption == "compare" &&
					!this.state.eventCompareOption ? (
							<Grid
								container
								direction="column"
								justify="center"
								alignItems="center"
							>
								<img
									src="/images/no_sales_data_illustration.png"
									style={{ margin: 50, width: 200 }}
								/>
								<Typography variant="title">
								Select an event to compare
								</Typography>
							</Grid>
						) : null}
					{this.state.graphOption == "compare" &&
					this.state.eventCompareOption &&
					this.state.eventCompareType != "data3"
						? this.renderComparison()
						: null}
					{this.state.graphOption == "compare" &&
					this.state.eventCompareOption &&
					this.state.eventCompareType == "data3"
						? this.renderSalesPieCompare()
						: null}
					<div style={{ marginTop: 60 }}/>

					{this.renderNumbers()}
					<Divider style={{ marginTop: 40, marginBottom: 40 }}/>

					<Typography variant="title">Marketing and Promotions</Typography>
					<div style={{ marginTop: 60 }}/>
					{this.renderMarketingSnapshot()}
					<div style={{ marginTop: 60 }}/>
					<Typography variant="subheading">
						Sales Heatmap by Day of Week and Time
					</Typography>
					{this.renderScatterPlot()}
					<div style={{ marginTop: 60 }}/>
					<Typography variant="subheading">Sales By Source</Typography>
					{this.renderSalesPie()}

					<Divider style={{ marginTop: 40, marginBottom: 40 }}/>

					<Typography variant="title">Ticket Volumes</Typography>
					{this.renderTicketVolumes()}
				</Container>
			);
		}
	}
}

export default withStyles(styles)(Summary);
