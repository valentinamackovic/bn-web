import React, { Component } from "react";
import PropTypes from "prop-types";
import { Typography, withStyles } from "@material-ui/core";
import moment from "moment-timezone";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Card from "../Card";
import { fontFamilyDemiBold, secondaryHex } from "../../../config/theme";
import MaintainAspectRatio from "../MaintainAspectRatio";
import optimizedImageUrl from "../../../helpers/optimizedImageUrl";
import Settings from "../../../config/settings";
import getPhoneOS from "../../../helpers/getPhoneOS";
import HoldRow from "../../pages/admin/events/dashboard/holds/children/ChildRow";

const styles = theme => ({
	card: {
		maxWidth: 400,
		boxShadow: "0 2px 7.5px 1px rgba(112, 124, 237, 0.07)"
	},
	media: {
		height: "100%",
		width: "100%",
		backgroundImage: "linear-gradient(255deg, #e53d96, #5491cc)",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundPosition: "center",

		padding: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit,
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "flex-start",
		flexDirection: "column"
	},
	name: {
		marginTop: theme.spacing.unit,
		color: "#000000",
		fontFamily: fontFamilyDemiBold,
		fontSize: 21,
		lineHeight: "21px"
	},
	detailsContent: {
		// height: 105,
		display: "flex",
		paddingLeft: theme.spacing.unit * 2,
		paddingRight: theme.spacing.unit * 2,
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit
	},
	singleDetail: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center"
	},
	label: {
		fontSize: theme.typography.fontSize,
		textTransform: "uppercase",
		color: "#cccfd9"
	},
	date: {
		color: secondaryHex,
		fontSize: theme.typography.fontSize,
		fontWeight: 600,
		lineHeight: "18px"
	},
	value: {
		fontSize: theme.typography.fontSize,
		color: "#9DA3B4",
		fontWeight: 500
	},
	addressHolder: {
		paddingLeft: theme.spacing.unit * 2,
		paddingRight: theme.spacing.unit * 2,
		paddingTop: 0,
		paddingBottom: theme.spacing.unit * 2
	},
	priceTag: {
		backgroundColor: "#fff4fb",
		padding: "6px 6px 4px 6px",
		borderRadius: "6px 6px 6px 0",
		marginBottom: theme.spacing.unit
	},
	priceTagText: {
		color: secondaryHex,
		fontFamily: fontFamilyDemiBold,
		lineHeight: "17px",
		fontSize: 17
	},
	hoverCard: {
		"&:hover": {
			boxShadow: "5px 5px 5px 0 rgba(0,0,0,0.15)",
			transition: "box-shadow .3s ease-out"
		},
		boxShadow: "none",
		transition: "box-shadow .3s ease-in"
	},
	noHover: {
		transition: "box-shadow .3s ease-out"
	}
});

const PriceTag = ({ classes, min, max }) => {
	if (!min || !max) {
		return null;
	}

	const minDollars = Math.round(min / 100);
	const maxDollars = Math.round(max / 100);
	let text = `$${minDollars} - $${maxDollars}`;

	if (min === max) {
		text = `$${minDollars}`;
	}

	return (
		<div className={classes.priceTag}>
			<Typography className={classes.priceTagText}>{text}</Typography>
		</div>
	);
};

class EventResultCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hoverId: null
		};
	}

	render() {
		const {
			classes,
			id,
			name,
			promo_image_url,
			event_start,
			venueName,
			city,
			state,
			door_time,
			min_ticket_price,
			max_ticket_price,
			venueTimezone,
			slug
		} = this.props;
		const { hoverId } = this.state;

		const style = {};
		if (promo_image_url) {
			style.backgroundImage = `linear-gradient(to top, #000000, rgba(0, 0, 0, 0)), url(${optimizedImageUrl(
				promo_image_url,
				"low",
				{ w: 430 }
			)})`;
		}

		const newVenueTimezone = venueTimezone || "America/Los_Angeles";
		const eventStartDateMoment = moment.utc(event_start);

		const displayEventStartDate = eventStartDateMoment
			.tz(newVenueTimezone)
			.format("ddd, MMM Do");
		const displayShowTime = moment(eventStartDateMoment)
			.tz(newVenueTimezone)
			.format("h:mm A");

		return (
			<Link
				onMouseEnter={e => this.setState({ hoverId: id })}
				onMouseLeave={e => this.setState({ hoverId: null })}
				to={`/events/${slug || id}`}
			>
				<Card
					className={classNames({
						[classes.noHover]: true,
						[classes.hoverCard]: hoverId === id
					})}
					borderLess
					variant="default"
				>
					<MaintainAspectRatio aspectRatio={Settings().promoImageAspectRatio}>
						<div className={classes.media} style={style}/>
					</MaintainAspectRatio>
					<div className={classes.detailsContent}>
						<div className={classes.singleDetail} style={{ textAlign: "left" }}>
							<Typography className={classes.value}>
								<span className={classes.date}>{displayEventStartDate}</span>{" "}
								&middot; {displayShowTime}
							</Typography>
							<Typography
								className={classNames({
									[classes.name]: true
								})}
							>
								{name}
							</Typography>
						</div>
						<div style={{ textAlign: "right" }}>
							<PriceTag
								min={min_ticket_price}
								max={max_ticket_price}
								classes={classes}
							/>
						</div>
					</div>
					<div className={classes.addressHolder}>
						<Typography className={classes.value}>
							@ {name}, {city}, {state}
						</Typography>
					</div>
				</Card>
			</Link>
		);
	}
}

EventResultCard.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	promo_image_url: PropTypes.string,
	event_start: PropTypes.string.isRequired,
	door_time: PropTypes.string.isRequired,
	min_ticket_price: PropTypes.number.isRequired,
	max_ticket_price: PropTypes.number.isRequired,
	venueTimezone: PropTypes.string
};

export default withStyles(styles)(EventResultCard);
