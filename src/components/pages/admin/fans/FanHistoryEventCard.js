import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, Typography, Collapse, Hidden } from "@material-ui/core";

import moment from "moment";
import Card from "../../../elements/Card";
import { fontFamilyDemiBold, secondaryHex } from "../../../../config/theme";
import Loader from "../../../elements/loaders/Loader";
import Grid from "@material-ui/core/Grid";
import FanHistoryActivityCard from "./FanHistoryActivityCard";
import servedImage from "../../../../helpers/imagePathHelper";
import Divider from "../../../common/Divider";

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
		color: secondaryHex
	},
	showHideRow: {
		display: "flex",
		flexDirection: "row",
		cursor: "pointer",
		paddingTop: theme.spacing.unit * 2
	},
	showHideIcon: {
		paddingLeft: theme.spacing.unit,
		paddingBottom: theme.spacing.unit / 2
	},
	mobileCard: {
		borderRadius: 6,
		marginTop: theme.spacing.unit * 2,
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

	renderActivities() {
		const { expandedRowKey } = this.state;
		const { activity_items, event } = this.props;
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
					key={index}
					item={item}
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
			event_start,
			event_id,
			activity_items,
			onExpandChange,
			expanded,
			classes
		} = this.props;

		return (
			<div>
				<div className={classes.root}>
					<Card variant={"raisedLight"} onClick={onExpandChange}>
						<div className={classes.card}>
							<Typography>
								<span className={classes.boldSpan}>{event.name}</span>
							</Typography>
							<Typography className={classes.greySubtitle}>
								{event.venue.address}
							</Typography>
							<Typography className={classes.greySubtitle}>
								{moment(event_start).format("llll")}
							</Typography>
							<Typography className={classes.greySubtitle}>
								{event_loc}
							</Typography>
							{!expanded ? (
								<div className={classes.showHideRow}>
									<Typography className={classes.showHide}>
										Show all details
									</Typography>
									<img
										className={classes.showHideIcon}
										src={servedImage("/icons/down-active.svg")}
									/>
								</div>
							) : (
								<div className={classes.showHideRow}>
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

				{/*MOBILE*/}
				<Hidden mdUp>
					<div className={classes.root}>
						<Card variant={"raisedLight"} onClick={onExpandChange}>
							<div className={classes.mobileCard}>
								<Typography>
									<span className={classes.boldSpan}>{event.name}</span>
								</Typography>
								<Typography className={classes.greySubtitle}>
									{event.venue.address}
								</Typography>
								<Typography className={classes.greySubtitle}>
									{moment(event_start).format("llll")}
								</Typography>
								<Typography className={classes.greySubtitle}>
									{event_loc}
								</Typography>
								{!expanded ? (
									<div className={classes.showHideRow}>
										<Typography className={classes.showHide}>
											Show all details
										</Typography>
										<img
											className={classes.showHideIcon}
											src={servedImage("/icons/down-active.svg")}
										/>
									</div>
								) : (
									<div className={classes.showHideRow}>
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
