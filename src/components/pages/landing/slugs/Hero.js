import React, { Component } from "react";
import { withStyles, Typography, Hidden } from "@material-ui/core";
import LandingAppBar from "../../../elements/header/LandingAppBar";
import user from "../../../../stores/user";
import { fontFamilyBold } from "../../../../config/theme";

const styles = theme => ({
	root: {
		backgroundColor: "#221D27",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		paddingTop: 80,
		paddingBottom: 80,
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column"
		}
	},
	heading: {
		fontSize: 72,
		fontFamily: fontFamilyBold,
		color: "#fff",
		lineHeight: "72px",
		[theme.breakpoints.down("sm")]: {
			fontSize: theme.typography.fontSize * 2.9,
			paddingLeft: theme.spacing.unit * 3,
			paddingRight: theme.spacing.unit * 3
		}
	},
	headingContainer: {
		width: 1400,
		margin: "0 auto"
	},
	subHeading: {
		color: "#9DA3B4",
		fontSize: 21,
		lineSpace: 1,
		[theme.breakpoints.down("sm")]: {
			fontSize: 15,
			lineHeight: "18px",
			paddingLeft: theme.spacing.unit * 3,
			paddingRight: theme.spacing.unit * 3,
			maxWidth: "85vw"
		}
	},
	viewMapLinkText: {
		fontSize: 16,
		marginLeft: theme.spacing.unit * 1.5,
		color: "#fff",
		cursor: "pointer"
	}
});

const SlugLandingHero = props => {
	return (
		<div className={props.classes.root}>
			<Hidden smDown>
				<LandingAppBar
					isAuthenticated={user.isAuthenticated}
					history={history}
				/>
			</Hidden>

			<div className={props.classes.headingContainer}>
				<Typography className={props.classes.heading}>
					{props.pageTitle}
				</Typography>
				<Typography className={props.classes.subHeading}>
					{props.pageSubTitle}
					{props.mapLink ? (
						<a target="_blank" href={props.mapLink}>
							<span className={props.classes.viewMapLinkText}>View on map</span>
						</a>
					) : null}
				</Typography>
			</div>
		</div>
	);
};

export default withStyles(styles)(SlugLandingHero);
