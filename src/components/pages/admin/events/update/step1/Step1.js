import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import moment from "moment-timezone";
import { withStyles } from "@material-ui/core";

import EventUpdate from "../../../../../../stores/event-update/EventUpdate";
import PromoImageUploader from "./components/PromoImageUploader";
import Heading from "./components/Heading";
import Artists from "./components/Artists";
import Card from "../../../../../elements/Card";

export const DEFAULT_END_TIME_HOURS_AFTER_SHOW_TIME = 24; //For lack of a better var name

const formatDataForSaving = (event, organizationId) => {
	const {
		name,
		eventDate,
		publishDate,
		venueId,
		doorTime,
		doorTimeHours,
		ageLimit,
		additionalInfo,
		topLineInfo,
		promoImageUrl,
		isExternal,
		externalTicketsUrl,
		override_status,
		videoUrl,
		endTime,
		eventType = "Music",
		showCoverImage,
		privateAccessCode,
		facebookPixelKey
	} = event;

	const eventDetails = {
		name,
		organization_id: organizationId,
		age_limit: ageLimit,
		additional_info: additionalInfo,
		top_line_info: topLineInfo,
		is_external: isExternal,
		external_url: externalTicketsUrl,
		override_status,
		video_url: videoUrl,
		event_type: eventType,
		private_access_code: privateAccessCode,
		facebook_pixel_key: facebookPixelKey
	};

	if (eventDate && moment(eventDate).isValid()) {
		eventDetails.event_start = moment
			.utc(eventDate)
			.format(moment.HTML5_FMT.DATETIME_LOCAL_MS);
	}

	if (eventDate && moment(eventDate).isValid()) {
		// Set doorTime from eventDate and doorTimeHours
		const tmpDoorTime = moment(eventDate).subtract(doorTimeHours, "h");
		eventDetails.door_time = moment
			.utc(tmpDoorTime)
			.format(moment.HTML5_FMT.DATETIME_LOCAL_MS);

		// Set redeemDate from doorTime
		eventDetails.redeem_date = eventDetails.door_time;
	}

	if (publishDate) {
		eventDetails.publish_date = moment
			.utc(publishDate)
			.format(moment.HTML5_FMT.DATETIME_LOCAL_MS);
	} else if (publishDate === null) {
		eventDetails.publish_date = null;
	}

	if (endTime) {
		eventDetails.event_end = moment
			.utc(endTime)
			.format(moment.HTML5_FMT.DATETIME_LOCAL_MS);
	} else {
		//Set default if not set
		const overrideEndTime = moment(eventDate).add(
			DEFAULT_END_TIME_HOURS_AFTER_SHOW_TIME,
			"h"
		);
		eventDetails.event_end = moment
			.utc(overrideEndTime)
			.format(moment.HTML5_FMT.DATETIME_LOCAL_MS);
	}

	if (promoImageUrl) {
		eventDetails.promo_image_url = promoImageUrl;

		if (showCoverImage) {
			eventDetails.cover_image_url = promoImageUrl;
		} else {
			eventDetails.cover_image_url = "";
		}
	}

	if (venueId) {
		eventDetails.venue_id = venueId;
	}

	return eventDetails;
};

const formatDataForInputs = event => {
	const {
		age_limit,
		door_time,
		event_start,
		name,
		venue_id,
		organization_id,
		additional_info,
		top_line_info,
		video_url,
		promo_image_url,
		is_external,
		external_url,
		publish_date,
		redeem_date,
		event_end,
		override_status = "",
		status = "Draft",
		event_type = "Music",
		cover_image_url,
		private_access_code,
		facebook_pixel_key
	} = event;

	const tomorrowNoon = moment
		.utc()
		.add(1, "d")
		.set({
			hour: "12",
			minute: "00",
			second: "00"
		});

	const eventDate = event_start
		? moment.utc(event_start, moment.HTML5_FMT.DATETIME_LOCAL_MS)
		: tomorrowNoon.clone();
	const doorTime = door_time
		? moment.utc(door_time, moment.HTML5_FMT.DATETIME_LOCAL_MS)
		: tomorrowNoon.clone();
	const redeemDate = redeem_date
		? moment.utc(redeem_date, moment.HTML5_FMT.DATETIME_LOCAL_MS)
		: tomorrowNoon.clone();
	const doorTimeHours = door_time
		? eventDate.diff(moment.utc(door_time), "m") / 60
		: 1; // Default: 1 hour
	const publishDate = publish_date
		? moment.utc(publish_date, moment.HTML5_FMT.DATETIME_LOCAL_MS)
		: null;
	const endTime = event_end
		? moment.utc(event_end, moment.HTML5_FMT.DATETIME_LOCAL_MS)
		: eventDate.clone().add(DEFAULT_END_TIME_HOURS_AFTER_SHOW_TIME, "h");

	const eventDetails = {
		override_status, //TODO get from API
		name: name || "",
		eventDate,
		doorTime,
		endTime,
		doorTimeHours,
		publishDate,
		redeemDate,
		ageLimit: age_limit || "0",
		venueId: venue_id || "",
		additionalInfo: additional_info || "",
		topLineInfo: top_line_info ? top_line_info : "",
		videoUrl: video_url || "",
		showEventTypes: !!event_type && event_type !== "Music",
		showTopLineInfo: !!top_line_info,
		showEventStatus: !!override_status,
		showPrivateCode: !!private_access_code,
		showMarketingSettings: !!facebook_pixel_key,
		showEmbeddedMedia: !!video_url,
		promoImageUrl: promo_image_url,
		isExternal: is_external,
		externalTicketsUrl: is_external && external_url ? external_url : "",
		status,
		eventType: event_type,
		showCoverImage: !!cover_image_url,
		privateAccessCode: private_access_code || "",
		facebookPixelKey: facebook_pixel_key || ""
	};

	return eventDetails;
	//return { ...eventDetails, ...updateTimezonesInObjects(eventDetails, "UTC", true) };
};

const styles = theme => ({
	heading: {
		marginTop: 40
	},
	detailsContainer: {
		minHeight: 500,

		paddingLeft: 90,
		paddingRight: 90,

		[theme.breakpoints.down("sm")]: {
			paddingLeft: 45,
			paddingRight: 45
		},

		[theme.breakpoints.down("xs")]: {
			paddingLeft: 15,
			paddingRight: 15
		}
	}
});

class Step1 extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { classes, eventUpdateStore } = this.props;

		return (
			<Card variant={"block"}>
				<PromoImageUploader
					onUrlUpdate={() => alert("onUrlUpdate")}
					onChangeCoverImage={() => alert("onChangeCoverImage")}
					showCoverImage={true}
					src={eventUpdateStore.eventDetails.promoImageUrl}
				/>

				{/*<br/>*/}
				{/*<br/>*/}

				{/*<PromoImageUploader*/}
				{/*	onUrlUpdate={() => alert("onUrlUpdate")}*/}
				{/*	onChangeCoverImage={() => alert("onChangeCoverImage")}*/}
				{/*	showCoverImage={true}*/}
				{/*	src={*/}
				{/*		"https://res.cloudinary.com/dyro9cwim/image/upload/f_auto/q_auto:low/v1563409737/xfvh8r0eh0lj4zmyeelz.jpg"*/}
				{/*	}*/}
				{/*/>*/}

				<div className={classes.detailsContainer}>
					<Heading className={classes.heading}>Artists</Heading>
					<Artists/>
				</div>
			</Card>
		);
	}
}

Step1.propTypes = {
	eventUpdateStore: PropTypes.object.isRequired
};

export default withStyles(styles)(inject("eventUpdateStore")(observer(Step1)));

//export const validateEventFields = validateFields;
export const formatEventDataForSaving = formatDataForSaving;
export const formatEventDataForInputs = formatDataForInputs;
