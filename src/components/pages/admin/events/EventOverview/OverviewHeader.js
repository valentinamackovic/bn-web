import { Typography, Hidden } from "@material-ui/core";
import React from "react";
import Card from "../../../../elements/Card";
import optimizedImageUrl from "../../../../../helpers/optimizedImageUrl";
import Divider from "@material-ui/core/Divider";
import servedImage from "../../../../../helpers/imagePathHelper";
import moment from "moment-timezone";
import ColorTag from "../../../../elements/ColorTag";

const OverviewHeader = ({ classes, event, artists, venue, timezoneAbbr }) => {
	const {
		name,
		event_start,
		door_time,
		cancelled_at,
		publish_date,
		is_external,
		event_end,
		sales_start_date
	} = event;

	const isPublished = moment.utc(publish_date).isBefore(moment.utc());
	const isOnSale =
		isPublished && moment.utc(sales_start_date).isBefore(moment.utc());
	const eventEnded = moment.utc(event_end).isBefore(moment.utc());

	const promo_image_url = event.promo_image_url
		? optimizedImageUrl(event.promo_image_url)
		: null;
	const promoImgStyle = {};
	if (promo_image_url) {
		promoImgStyle.backgroundImage = `url(${promo_image_url})`;
	}
	const shortDate = moment(event_start).format("ddd, MMM D, YYYY");
	const shortDoorTime = moment(door_time).format("LT");
	const shortShowTime = moment(event_start).format("LT");
	let tags = null;
	if (cancelled_at) {
		tags = <Typography className={classes.cancelled}>Cancelled</Typography>;
	} else {
		let onSaleTag = null;

		if (eventEnded) {
			onSaleTag = <ColorTag variant="disabled">Event ended</ColorTag>;
		} else if (isOnSale) {
			onSaleTag = <ColorTag variant="green">On sale</ColorTag>;
		} else if (is_external) {
			onSaleTag = <ColorTag variant="green">External</ColorTag>;
		}

		tags = (
			<div className={classes.statusContainer}>
				<ColorTag
					style={{ marginRight: 10, borderRadius: 3 }}
					variant={isPublished ? "secondary" : "disabled"}
				>
					{isPublished ? "Published" : "Draft"}
				</ColorTag>
				{onSaleTag}
			</div>
		);
	}

	function renderArtistSubtitle() {
		if (artists.length > 1) {
			return (
				<Typography className={classes.headerSupportingSubtitle}>
					With&nbsp;
					{artists.map(({ artist }, index) => {
						if (artist.name != name) {
							return (
								<span key={index}>
									{artist.name}
									{artists.length === index + 1 ? "" : " and "}
								</span>
							);
						}
					})}
				</Typography>
			);
		} else {
			return <div>&nbsp;</div>;
		}
	}

	return (
		<Card className={classes.eventHeaderInfo}>
			<div className={classes.headerImage} style={promoImgStyle}/>
			<div className={classes.headerInfo}>
				<Typography className={classes.headerTitle}>{name}</Typography>
				<div className={classes.justifyBetween}>
					{renderArtistSubtitle()}
					{tags}
				</div>
				<Divider className={classes.dividerStyle}/>
				<div className={classes.headerEventDateInfo}>
					<div className={classes.dateInfoContainer}>
						<img
							alt="Calendar Icon"
							className={classes.icon}
							src={servedImage("/icons/events-black.svg")}
						/>
						<div className={classes.infoSmallContainer}>
							<Typography className={classes.infoSmallTitle}>
								{shortDate}
							</Typography>
							<Typography className={classes.infoSmallText}>
								{`Doors open at ${shortDoorTime} ${timezoneAbbr}`}
							</Typography>
							<Typography className={classes.infoSmallText}>
								{`Show starts at ${shortShowTime} ${timezoneAbbr}`}
							</Typography>
						</div>
					</div>
					<div className={classes.venueInfoContainer}>
						<img
							alt="Location Icon"
							className={classes.icon}
							src={servedImage("/icons/location-black.svg")}
						/>
						<div className={classes.infoSmallContainer}>
							<Typography className={classes.infoSmallTitle}>
								{venue.name}
							</Typography>
							<Typography className={classes.infoSmallText}>
								{venue.address}
							</Typography>
							<Typography className={classes.infoSmallText}>
								{venue.city}, {venue.state} {venue.postal_code}
							</Typography>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};
export default OverviewHeader;
