import { Typography } from "@material-ui/core";
import React from "react";
import Card from "../../../../elements/Card";
import optimizedImageUrl from "../../../../../helpers/optimizedImageUrl";
import MaintainAspectRatio from "../../../../elements/MaintainAspectRatio";
import Settings from "../../../../../config/settings";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import ArtistSummary from "../../../../elements/event/ArtistSummary";
import Divider from "@material-ui/core/Divider";
import servedImage from "../../../../../helpers/imagePathHelper";
import moment from "moment-timezone";

const OverviewHeader = ({ classes, event, artists }) => {
	const { name, event_start, door_time } = event;
	const promo_image_url = event.promo_image_url
		? optimizedImageUrl(event.promo_image_url)
		: null;
	const promoImgStyle = {};
	if (promo_image_url) {
		promoImgStyle.backgroundImage = `url(${promo_image_url})`;
	}
	const shortDate = moment(event_start).format("MMM, D YYYY");
	const shortDoorTime = moment(door_time).format("LT");
	const shortShowTime = moment(event_start).format("LT");
	return (
		<Card className={classes.eventHeaderInfo}>
			<div className={classes.headerImage} style={promoImgStyle}/>
			<div className={classes.headerInfo}>
				<Typography className={classes.headerTitle}>{name}</Typography>
				{artists ? (
					<Typography className={classes.headerSupportingSubtitle}>
						With&nbsp;
						{artists.map(({ artist }, index) => (
							<span key={index}>
								{artist.name}
								{artists.length === index + 1 ? "" : " and "}
							</span>
						))}
					</Typography>
				) : null}
				<Divider className={classes.dividerStyle}/>
				<div className={classes.headerEventDateInfo}>
					<div className={classes.dateInfoContainer}>
						<img
							alt="Event Details Icon"
							className={classes.icon}
							src={servedImage("/icons/events-black.svg")}
						/>
						<div className={classes.infoSmallContainer}>
							<Typography className={classes.infoSmallTitle}>
								{shortDate}
							</Typography>
							<Typography className={classes.infoSmallText}>
								Doors open at {shortDoorTime}
							</Typography>
							<Typography className={classes.infoSmallText}>
								Show starts at {shortShowTime}
							</Typography>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};
export default OverviewHeader;
