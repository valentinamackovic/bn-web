import React from "react";
import { withStyles, Typography, Hidden } from "@material-ui/core";
import classnames from "classnames";
import { fontFamilyBold } from "../../../config/theme";
import servedImage from "../../../helpers/imagePathHelper";
import RightUserMenu from "../../elements/header/RightUserMenu";
import { observer } from "mobx-react";

import SearchToolBarInput from "../../elements/header/SearchToolBarInput";

const styles = theme => ({
	root: {
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundColor: "#19081e",
		backgroundImage: "url(/images/homepage-bg.png)",
		display: "flex",
		flexDirection: "column",
		minHeight: 800,
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column"
		}
	},
	headingContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		textAlign: "center"
	},
	text: {
		color: "#FFFFFF"
	},
	toolBar: {
		paddingRight: "8vw",
		paddingLeft: "8vw",
		paddingTop: "5vh",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		height: theme.spacing.unit * 10
	},
	heading: {
		fontSize: theme.typography.fontSize * 4,
		fontFamily: fontFamilyBold,
		[theme.breakpoints.down("sm")]: {
			fontSize: theme.typography.fontSize * 2.9
		}
	},
	subheading: {
		fontSize: theme.typography.fontSize * 1.6,
		lineSpace: 1,
		[theme.breakpoints.down("sm")]: {
			fontSize: theme.typography.fontSize * 1.4
		}
	},
	availableOn: {
		fontSize: theme.typography.fontSize * 0.9,
		marginRight: theme.spacing.unit
	},
	appLinkContainer: {
		// borderStyle: "solid",
		// borderColor: "red",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 25,
		[theme.breakpoints.up("sm")]: {
			justifyContent: "flex-center"
		}
	},
	featureImage: {
		flex: 0,
		width: 380,
		[theme.breakpoints.up("sm")]: {
			width: 600
		},
		[theme.breakpoints.down("xs")]: {
			width: 300
		}
	},
	logoImage: {
		maxWidth: 140,
		maxHeight: 43
	}
});

const Hero = observer(props => {
	const { history, classes } = props;

	return (
		<div className={classes.root}>
			<div className={classes.toolBar}>
				<img
					alt="Header logo"
					className={classes.logoImage}
					src={servedImage("/images/logo-white.png")}
				/>
				<span className={classes.rightMenuOptions}>
					<RightUserMenu history={history}/>
				</span>
			</div>
			<div className={classes.headingContainer}>
				<Typography
					className={classnames({
						[classes.text]: true,
						[classes.heading]: true
					})}
				>
					The Future of Ticketing
				</Typography>

				<div className={classes.appLinkContainer}>
					<SearchToolBarInput history={history}/>
				</div>
			</div>
			<div className={classes.appLinkContainer}>
				{/*<Hidden xsDown>*/}
				{/*	<img*/}
				{/*		className={classes.featureImage}*/}
				{/*		src={servedImage("/images/iospreview-chopped.png")}*/}
				{/*	/>*/}
				{/*</Hidden>*/}
				{/*<Hidden smUp>*/}
				{/*	<img*/}
				{/*		className={classes.featureImage}*/}
				{/*		src={servedImage("/images/iospreview-chopped-mobile.png")}*/}
				{/*	/>*/}
				{/*</Hidden>*/}
			</div>
		</div>
	);
});

export default withStyles(styles)(Hero);
