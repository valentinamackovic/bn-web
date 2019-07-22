import React, { Component } from "react";
import PropTypes from "prop-types";
import {
	withStyles,
	Typography,
	Collapse,
	Hidden,
	Divider
} from "@material-ui/core";

import moment from "moment-timezone";
import Card from "../../../elements/Card";
import { fontFamilyDemiBold, secondaryHex } from "../../../../config/theme";
import Loader from "../../../elements/loaders/Loader";
import Grid from "@material-ui/core/Grid";
import FanHistoryActivityCard from "./FanHistoryActivityCard";
import servedImage from "../../../../helpers/imagePathHelper";
import user from "../../../../stores/user";

const styles = theme => ({
	root: {
		marginTop: theme.spacing.unit
	},
	card: { padding: theme.spacing.unit * 2 },
	greySubtitle: {
		color: "#9DA3B4",
		fontSize: theme.typography.fontSize * 0.9
	},
	boldSpan: {
		fontFamily: fontFamilyDemiBold
	},
	linkText: {
		color: secondaryHex,
		fontFamily: fontFamilyDemiBold
	},
	verticalDividerSmall: {
		borderLeft: "1px solid #DEE2E8",
		height: 20,
		marginLeft: 15,
		marginRight: 15
	},
	bold: {
		fontFamily: fontFamilyDemiBold
	},
	bottomRow: {
		display: "flex"
	},
	showHide: {
		// color: "#9DA3B4"
		fontFamily: fontFamilyDemiBold
	},
	linkBox: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	showHideRow: {
		display: "flex",
		flexDirection: "row",
		cursor: "pointer",
		paddingTop: theme.spacing.unit * 2
		// marginBottom: theme.spacing.unit * 2
	},
	showHideIcon: {
		paddingLeft: theme.spacing.unit,
		paddingBottom: theme.spacing.unit / 2
	},
	mobileCard: {
		borderRadius: 6,
		marginTop: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit * 2,
		padding: theme.spacing.unit * 2
	}
});

class FanHistoryEventCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			// profile: null,
			expandedRowKey: null
		};
		this.onExpandChange = this.onExpandChange.bind(this);
	}

	onExpandChange(expandedRowKey) {
		if (expandedRowKey === this.state.expandedRowKey) {
			this.setState({
				expandedRowKey: null
			});
		} else {
			this.setState({ expandedRowKey });
		}
	}

	displayOrderDate(date, timezone) {
		return moment
			.utc(date)
			.tz(timezone)
			.format("l hh:mmA");
	}

	renderActivities() {
		const { expandedRowKey } = this.state;
		const { activity_items, event, eventStart, eventTimeZone } = this.props;
		if (activity_items === null) {
			return <Loader>Loading history...</Loader>;
		}

		return activity_items.map((item, index) => {
			const expanded = expandedRowKey === index;
			return (
				<FanHistoryActivityCard
					profile={this.props.profile}
					onExpandChange={() => this.onExpandChange(index)}
					expanded={expanded}
					eventStart={eventStart}
					key={index}
					item={item}
					occurredAt={this.displayOrderDate(item.occurred_at, eventTimeZone)}
					event={event}
				/>
			);
		});
	}

	render() {
		const {
			order_date,
			event,
			event_loc,
			onExpandChange,
			eventStart,
			expanded,
			classes
		} = this.props;

		return (
			<div>
				<Hidden smDown>
					<div className={classes.root}>
						<Card variant={"raisedLight"}>
							<div className={classes.card}>
								<Typography>
									<span className={classes.boldSpan}>{event.name}</span>
								</Typography>
								<Typography className={classes.greySubtitle}>
									{event.venue.address}
								</Typography>
								<Typography className={classes.greySubtitle}>
									{eventStart}
								</Typography>
								<Typography className={classes.greySubtitle}>
									{event_loc}
								</Typography>
								{!expanded ? (
									<div onClick={onExpandChange} className={classes.showHideRow}>
										<Typography className={classes.showHide}>
											Show all details
										</Typography>
										<img
											className={classes.showHideIcon}
											src={servedImage("/icons/down-active.svg")}
										/>
									</div>
								) : (
									<div onClick={onExpandChange} className={classes.showHideRow}>
										<Typography className={classes.showHide}>
											Hide details
										</Typography>
										<img
											className={classes.showHideIcon}
											src={servedImage("/icons/up-active.svg")}
										/>
									</div>
								)}
							</div>
						</Card>
						<Collapse in={expanded}>
							<div>
								<Grid
									item
									xs={12}
									sm={12}
									md={12}
									lg={12}
									style={{ paddingTop: 20 }}
								>
									{this.renderActivities()}
								</Grid>
							</div>
						</Collapse>
					</div>
				</Hidden>

				{/*MOBILE*/}
				<Hidden mdUp>
					<div className={classes.root}>
						<Card className={classes.mobileCard} variant={"plain"}>
							<div>
								<Typography>
									<span className={classes.boldSpan + " " + classes.linkText}>
										{event.name}
									</span>
								</Typography>
								<Typography className={classes.greySubtitle}>
									{event.venue.address}
								</Typography>
								<Typography className={classes.greySubtitle}>
									{eventStart}
								</Typography>
								<Typography className={classes.greySubtitle}>
									{event_loc}
								</Typography>
								{!expanded ? (
									<div onClick={onExpandChange} className={classes.showHideRow}>
										<Typography className={classes.showHide}>
											Show all details
										</Typography>
										<img
											className={classes.showHideIcon}
											src={servedImage("/icons/down-gray.svg")}
										/>
									</div>
								) : (
									<div onClick={onExpandChange} className={classes.showHideRow}>
										<Typography className={classes.showHide}>
											Hide details
										</Typography>
										<img
											className={classes.showHideIcon}
											src={servedImage("/icons/up-gray.svg")}
										/>
									</div>
								)}
							</div>
							<Collapse in={expanded}>
								<div>
									<Grid
										item
										xs={12}
										sm={12}
										md={12}
										lg={12}
										style={{ paddingTop: 20 }}
									>
										{this.renderActivities()}
									</Grid>
								</div>
							</Collapse>
						</Card>
					</div>
				</Hidden>
			</div>
		);
	}
}
FanHistoryEventCard.propTypes = {
	event: PropTypes.object,
	onExpandChange: PropTypes.func.isRequired,
	expanded: PropTypes.bool.isRequired,
	activity_items: PropTypes.array
};
export default withStyles(styles)(FanHistoryEventCard);
