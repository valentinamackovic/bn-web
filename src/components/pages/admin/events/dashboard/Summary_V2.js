import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import classNames from "classnames";
import moment from "moment-timezone";
import { observer } from "mobx-react";

import TicketTypeSalesBarChart from "../../../../elements/charts/TicketTypeSalesBarChart";
import Card from "../../../../elements/Card";
import Divider from "../../../../common/Divider";
import { fontFamilyDemiBold } from "../../../../../config/theme";
import Container from "./Container";
import Bigneon from "../../../../../helpers/bigneon";
import notifications from "../../../../../stores/notifications";
import user from "../../../../../stores/user";
import Loader from "../../../../elements/loaders/Loader";
import servedImage from "../../../../../helpers/imagePathHelper";
import TicketSalesChart from "./summary/charts/TicketSalesChart";
import TotalSalesChart from "./summary/charts/TotalSalesChart";
import TransfersChart from "./summary/charts/TransfersChart";
import AttendanceChart from "./summary/charts/AttendanceChart";
import PageViewsTable from "./summary/charts/PageViewsTable";
import EventSummaryCard from "./summary/EventSummaryCard";
import EventAtAGlanceCard from "./summary/EventAtAGlanceCard";
import TicketSalesCard from "./summary/TicketSalesCard";
import SalesSourceCard from "./summary/SalesSourceCard";
import settings from "../../../../../config/settings";

const styles = theme => {
	return {
		spacer: {
			marginTop: 20
		}
	};
};

const CUBE_API_URL = settings().cubeApiUrl;

@observer
class Summary extends Component {
	constructor(props) {
		super(props);

		this.state = {
			event: null,
			activeNumbersCard: null,
			venueTimeZone: ""
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
				const { event, cube_js_token, ...rest } = response.data;

				this.setState({
					event,
					cube_js_token
				});
				user.setCurrentOrganizationRolesAndScopes(event.organization_id, false);

				this.loadArtistsAndVenue(id);
			})
			.catch(error => {
				console.error(error);
				notifications.showFromErrorResponse({
					defaultMessage: "Loading event details failed.",
					error
				});
			});
	}

	//TODO if artists and venues gets added to dashboard endpoint, this can be removed
	loadArtistsAndVenue(id) {
		Bigneon()
			.events.read({ id })
			.then(response => {
				const { artists, venue, event_start, door_time } = response.data;

				this.setState({
					event: {
						...this.state.event,
						artists,
						venue,
						displayEventDate: moment(event_start)
							.tz(venue.timezone)
							.format("MMM, D, YYYY"),
						displayDoorsOpenTime: moment(door_time)
							.tz(venue.timezone)
							.format("MMM, D, YYYY"),
						displayShowStartTime: moment(event_start)
							.tz(venue.timezone)
							.format("MMM, D, YYYY")
					}
				});
			})
			.catch(error => {
				console.error(error);
				notifications.showFromErrorResponse({
					defaultMessage: "Loading event artists failed.",
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

	renderCubeData() {
		const { event, cube_js_token } = this.state;
		return (
			<div>
				<p>Sales</p>
				<TotalSalesChart token={cube_js_token} startDate={event.on_sale}/>
				<p>Transfers</p>
				<TransfersChart token={cube_js_token} startDate={event.on_sale}/>
				<p>Attendance</p>
				<AttendanceChart token={cube_js_token} startDate={event.on_sale}/>
				<p>Page Views</p>
				<PageViewsTable token={cube_js_token} startDate={event.on_sale}/>
			</div>
		);
	}

	render() {
		const { event, cube_js_token } = this.state;
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
							src={servedImage("/images/no_sales_data_illustration.png")}
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
				<Container
					eventId={event.id}
					subheading={"summary"}
					layout={"childrenOutsideNoCard"}
				>
					<div className={classes.spacer}/>
					<EventSummaryCard {...event}/>
					<div className={classes.spacer}/>
					<EventAtAGlanceCard
						cubeApiUrl={CUBE_API_URL}
						{...event}
						token={cube_js_token}
					/>
					<div className={classes.spacer}/>
					<TicketSalesCard
						cubeApiUrl={CUBE_API_URL}
						{...event}
						token={cube_js_token}
					/>
					<div className={classes.spacer}/>
					<SalesSourceCard
						cubeApiUrl={CUBE_API_URL}
						{...event}
						token={cube_js_token}
					/>
				</Container>
			);
		}
	}
}

export default withStyles(styles)(Summary);
