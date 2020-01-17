import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Hidden } from "@material-ui/core";
import classnames from "classnames";
import optimizedImageUrl from "../../../../../../helpers/optimizedImageUrl";
import { fontFamilyDemiBold } from "../../../../../../config/theme";
import SupportingArtistsLabel from "../../../../events/SupportingArtistsLabel";
import Divider from "../../../../../common/Divider";
import servedImage from "../../../../../../helpers/imagePathHelper";
import Card from "../../../../../elements/Card";

const styles = theme => {
	return {
		root: {
			[theme.breakpoints.up("sm")]: {
				display: "flex",
				padding: 51
			},
			[theme.breakpoints.down("md")]: {
				padding: 30
			},
			[theme.breakpoints.down("sm")]: {
				padding: 20
			}
		},
		promoImage: {
			borderRadius: 3,
			[theme.breakpoints.up("sm")]: {
				height: 160,
				width: "auto"
			},
			[theme.breakpoints.down("xs")]: {
				height: "auto",
				width: "100%",
				marginBottom: 20
			}
		},
		detailsContainer: {
			flex: 1,

			[theme.breakpoints.up("sm")]: {
				paddingLeft: 25
			},
			[theme.breakpoints.down("xs")]: {}
		},
		dateAndAddressContainer: {
			[theme.breakpoints.up("md")]: {
				display: "flex"
			},
			[theme.breakpoints.down("xs")]: {}
		},
		titleText: {
			fontFamily: fontFamilyDemiBold,
			fontSize: 22
		},
		lineUpText: {
			fontSize: 15,
			color: "#979797",
			fontFamily: fontFamilyDemiBold
		},
		icon: {
			width: 17,
			height: "auto",
			marginRight: 14
		},
		detailContainer: {
			display: "flex",
			alignItems: "flex-start",
			marginTop: 25,
			[theme.breakpoints.up("md")]: {
				marginRight: 60
			},
			[theme.breakpoints.down("sm")]: {
				marginRight: 20
			}
		},
		detailTitleText: {
			fontFamily: fontFamilyDemiBold,
			fontSize: 17,
			marginBottom: 6
		},
		detailText: {
			fontSize: 15,
			color: "#2C3136",
			opacity: 0.6
		}
	};
};

const Details = ({ classes, iconUrl, lines }) => {
	return (
		<div className={classes.detailContainer}>
			<img
				alt="Event Details Icon"
				className={classes.icon}
				src={servedImage(iconUrl)}
			/>
			<div>
				{lines.map((text, index) => (
					<Typography
						key={index}
						className={classnames({
							[classes.detailTitleText]: index == 0,
							[classes.detailText]: index != 0
						})}
					>
						{text}
					</Typography>
				))}
			</div>
		</div>
	);
};

const EventSummaryCard = ({
	classes,
	name,
	artists,
	promo_image_url,
	venue,
	displayEventDate,
	displayDoorsOpenTime,
	displayShowStartTime,
	...rest
}) => {
	const imageUrl = optimizedImageUrl(promo_image_url);

	return (
		<Card className={classes.root}>
			<img src={imageUrl} className={classes.promoImage}/>
			<div className={classes.detailsContainer}>
				<Typography className={classes.titleText}>{name}</Typography>
				<Typography className={classes.lineUpText}>
					<SupportingArtistsLabel artists={artists}/>
				</Typography>

				<Hidden xsDown>
					<Divider/>
				</Hidden>

				<div className={classes.dateAndAddressContainer}>
					<Details
						classes={classes}
						iconUrl={"/icons/events-black.svg"}
						lines={[
							displayEventDate,
							`Doors open at ${displayDoorsOpenTime}`,
							`Show starts at ${displayShowStartTime}`
						]}
					/>
					<Details
						classes={classes}
						iconUrl={"/icons/location-black.svg"}
						lines={[
							venue.name,
							venue.address,
							`${venue.city}, ${venue.state} ${venue.postal_code}`
						]}
					/>
				</div>
			</div>
		</Card>
	);
};

//TODO prop types

export default withStyles(styles)(EventSummaryCard);
