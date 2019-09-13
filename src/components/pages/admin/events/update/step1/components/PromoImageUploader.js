import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Hidden } from "@material-ui/core";

import notifications from "../../../../../../../stores/notifications";
import cloudinaryWidget from "../../../../../../../helpers/cloudinaryWidget";
import MaintainAspectRatio from "../../../../../../elements/MaintainAspectRatio";
import CheckBox from "../../../../../../elements/form/CheckBox";
import { fontFamily } from "../../../../../../../config/theme";
import Settings from "../../../../../../../config/settings";
import servedImage from "../../../../../../../helpers/imagePathHelper";

const height = 480;

const styles = theme => ({
	root: {
		paddingBottom: theme.spacing.unit * 2
	},
	media: {
		height: "100%",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundPosition: "center",
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "flex-end",
		padding: theme.spacing.unit * 2
	},
	noMedia: {
		cursor: "pointer",
		height: height * 0.6,
		backgroundImage:
			"linear-gradient(270deg, #E53D96 0%, #E43E96 0%, #5491CC 100%)",
		[theme.breakpoints.down("xs")]: {
			height: height * 0.3
		}
	},
	noMediaContent: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	},
	captionContainer: {
		textAlign: "right",
		paddingTop: 1,
		paddingRight: theme.spacing.unit * 2,
		paddingLeft: theme.spacing.unit,

		display: "flex",
		alignItems: "center"
	},
	caption: {
		fontSize: 12,
		color: "#FFF",
		fontFamily: fontFamily
	},
	iconDiv: {
		display: "flex",
		justifyContent: "flex-end"
	},
	iconOuter: {
		cursor: "pointer",
		width: 48,
		height: 48,
		borderRadius: 30,
		backgroundColor: "rgba(255,255,255,0.3)",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	icon: {
		width: 23,
		height: 23,
		position: "relative",
		right: -1,
		top: 1
	},
	noMediaIcon: {
		width: 28,
		height: 28,
		marginBottom: theme.spacing.unit * 2,

		[theme.breakpoints.down("xs")]: {
			marginBottom: 0
		}
	},
	noMediaTitle: {
		color: "#FFF",
		fontSize: 20,
		marginTop: 10
	},
	bottomRowContainer: {
		display: "flex",
		justifyContent: "space-between",

		[theme.breakpoints.down("sm")]: {
			justifyContent: "flex-end"
		},

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
	},
	checkboxContainer: {
		display: "flex",
		justifyContent: "flex-start",
		paddingTop: theme.spacing.unit * 2
		// paddingLeft: theme.spacing.unit * 2

		// [theme.breakpoints.down("sm")]: {
		// 	justifyContent: "flex-end",
		// 	paddingTop: 0,
		// 	paddingBottom: theme.spacing.unit * 4,
		// 	paddingLeft: theme.spacing.unit
		// }
	},
	showCoverImageCaption: {
		fontSize: 12,
		paddingTop: 4
	}
});

const uploadWidget = onSuccess => {
	cloudinaryWidget(
		result => {
			const imgResult = result[0];
			const { secure_url } = imgResult;
			onSuccess(secure_url);
		},
		error => {
			console.error(error);
			if (error !== "User closed widget") {
				notifications.show({
					message: "Image failed to upload.",
					variant: "error"
				});
			}
		},
		["event-images"],
		{
			cropping: true,
			cropping_coordinates_mode: "custom",
			cropping_aspect_ratio: Settings().promoImageAspectRatio
		}
	);
};

const PromoImageUploader = props => {
	const {
		classes,
		src,
		onUrlUpdate,
		showCoverImage,
		onChangeCoverImage
	} = props;

	const onUploadClick = () => {
		uploadWidget(url => onUrlUpdate(url));
	};

	if (src) {
		return (
			<div className={classes.root}>
				<MaintainAspectRatio aspectRatio={Settings().promoImageAspectRatio}>
					<div
						className={classes.media}
						style={{
							backgroundImage: `url("${src}"`
						}}
					>
						<div className={classes.iconDiv}>
							<div className={classes.captionContainer}>
								{/*<Typography className={classes.caption}>*/}
								{/*	Recommended*/}
								{/*	<br/>*/}
								{/*	image size {recommendedSizeText}*/}
								{/*</Typography>*/}
							</div>

							<div className={classes.iconOuter} onClick={onUploadClick}>
								<img
									src={servedImage("/icons/camera-white.svg")}
									className={classes.icon}
								/>
							</div>
						</div>
					</div>
				</MaintainAspectRatio>
				<div className={classes.bottomRowContainer}>
					<div className={classes.checkboxContainer}>
						<CheckBox
							labelClass={classes.showCoverImageCaption}
							active={showCoverImage}
							onClick={onChangeCoverImage}
						>
							Use frosted event image as event cover image on the web
						</CheckBox>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={classes.noMedia} onClick={onUploadClick}>
			<div className={classes.noMediaContent}>
				<div className={classes.iconOuter} onClick={onUploadClick}>
					<img
						src={servedImage("/icons/camera-white.svg")}
						className={classes.icon}
					/>
				</div>
				<Typography className={classes.noMediaTitle}>
					Upload event image
				</Typography>
				<Typography className={classes.caption}>
					Recommended image size 1920 * 1080
				</Typography>
			</div>
		</div>
	);
};

PromoImageUploader.propTypes = {
	classes: PropTypes.object.isRequired,
	src: PropTypes.string,
	onUrlUpdate: PropTypes.func.isRequired,
	showCoverImage: PropTypes.bool.isRequired,
	onChangeCoverImage: PropTypes.func.isRequired
};

export default withStyles(styles)(PromoImageUploader);
