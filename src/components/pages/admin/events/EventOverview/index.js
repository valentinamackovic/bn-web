import React, { Component } from "react";
import { observer } from "mobx-react";
import { Divider, withStyles, Typography } from "@material-ui/core";
import PageHeading from "../../../../elements/PageHeading";
import selectedEvent from "../../../../../stores/selectedEvent";
import notifications from "../../../../../stores/notifications";
import replaceIdWithSlug from "../../../../../helpers/replaceIdWithSlug";
import analytics from "../../../../../helpers/analytics";
import getAllUrlParams from "../../../../../helpers/getAllUrlParams";
import user from "../../../../../stores/user";
import PrivateEventDialog from "../../../events/PrivateEventDialog";
import Loader from "../../../../elements/loaders/Loader";
import NotFound from "../../../../common/NotFound";
import OverviewHeader from "./OverviewHeader";
import optimizedImageUrl from "../../../../../helpers/optimizedImageUrl";
import { fontFamilyDemiBold } from "../../../../../config/theme";
import EventSummaryCard from "../EventSummaryCard";
import moment from "../List";
import Card from "../../../../elements/Card";
import ArtistsOverview from "./ArtistsOverview";
import ArtistSummary from "../../../../elements/event/ArtistSummary";
import DetailsOverview from "./DetailsOverview";

const styles = theme => ({
	paper: {
		marginBottom: theme.spacing.unit,
		paddingBottom: theme.spacing.unit * 5
	},
	paddedContent: {
		paddingRight: theme.spacing.unit * 12,
		paddingLeft: theme.spacing.unit * 12,
		[theme.breakpoints.down("sm")]: {
			paddingRight: theme.spacing.unit * 2,
			paddingLeft: theme.spacing.unit * 2
		}
	},
	spacer: {
		marginBottom: theme.spacing.unit * 10
	},
	eventHeaderInfo: {
		padding: "45px 50px",
		display: "flex",
		flexDirection: "row"
	},
	headerInfo: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		paddingLeft: 25
	},
	headerImage: {
		width: 240,
		height: 160,
		backgroundImage: "linear-gradient(255deg, #e53d96, #5491cc)",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundPosition: "center",
		borderRadius: 3
	},
	dividerStyle: {
		margin: "20px 0"
	},
	headerTitle: {
		fontSize: 22,
		color: "#2C3136",
		fontFamily: fontFamilyDemiBold,
		lineHeight: "25px"
	},
	headerSupportingSubtitle: {
		color: "#979797",
		fontSize: 15,
		fontWeight: fontFamilyDemiBold,
		lineHeight: "18px"
	},
	dateInfoContainer: {
		display: "flex",
		flexDirection: "row"
	},
	headerEventDateInfo: {
		display: "flex",
		flexDirection: "row",
		marginTop: theme.spacing.unit
	},
	icon: {
		width: 17.65,
		height: 17.65
	},
	infoSmallTitle: {
		fontFamily: fontFamilyDemiBold,
		fontSize: 17,
		color: "#2C3136"
	},
	infoSmallContainer: {
		marginLeft: theme.spacing.unit * 2
	},
	infoSmallText: {
		color: "#979797",
		fontSize: 15,
		lineHeight: "18px"
	},
	justifyBetween: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	eventAllDetailsContainer: {
		marginTop: 20,
		padding: "65px"
	},
	eventAllDetailsTitle: {
		color: "#2C3136",
		fontSize: 28,
		fontFamily: fontFamilyDemiBold,
		marginBottom: 25,
		marginTop: 50,
		lineHeight: "32px"
	},
	artistImage: {
		width: 61,
		height: 56,
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundPosition: "center",
		borderRadius: 3,
		marginRight: 20
	},
	detailsCardStyle: {
		padding: "22px 30px",
		marginBottom: 10,
		boxShadow: "0 4px 15px 2px rgba(112,124,237,0.13)"
	},
	artistsOverviewCard: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center"
	},
	smallGreyCapTitle: {
		opacity: 0.2,
		color: "#000000",
		fontSize: 12,
		fontFamily: fontFamilyDemiBold,
		lineHeight: "14px",
		textTransform: "uppercase",
		marginBottom: 10
	},
	smallTitle: {
		fontFamily: fontFamilyDemiBold,
		color: "#000000",
		fontSize: 16,
		lineHeight: "18px"
	},
	detailsTopRow: {
		display: "flex"
	}
});

@observer
class EventOverview extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		if (
			this.props.match &&
			this.props.match.params &&
			this.props.match.params.id
		) {
			const { id } = this.props.match.params;

			selectedEvent.refreshResult(
				id,
				errorMessage => {
					notifications.show({
						message: errorMessage,
						variant: "error"
					});
				},
				() => {
					const {
						id: selectedEventId,
						slug,
						organization_id: organizationId,
						name,
						event_type
					} = selectedEvent.event;

					//Replace the id in the URL with the slug if we have it and it isn't currently set
					if (id === selectedEventId && slug) {
						replaceIdWithSlug(id, slug);
					}

					analytics.viewContent(
						[selectedEventId],
						getAllUrlParams(),
						name,
						selectedEvent.organization.id,
						event_type
					);
					if (user.isAuthenticated) {
						const { organizations } = user;
						if (organizations.hasOwnProperty(organizationId)) {
							user.setCurrentOrganizationRolesAndScopes(organizationId, false);
						}
					}
				}
			);
		} else {
			//TODO return 404
		}
	}

	render() {
		const { classes } = this.props;
		const {
			event,
			venue,
			artists,
			organization,
			id,
			ticket_types,
			hasAvailableTickets
		} = selectedEvent;
		if (event === null) {
			return (
				<div>
					<Loader style={{ height: 400 }}/>
				</div>
			);
		}

		if (event === false) {
			return <NotFound>Event not found.</NotFound>;
		}
		const { name } = event;

		const promo_image_url = event.promo_image_url
			? optimizedImageUrl(event.promo_image_url)
			: null;

		return (
			<div>
				<PageHeading iconUrl="/icons/events-multi.svg">{name}</PageHeading>
				<OverviewHeader
					event={event}
					classes={classes}
					artists={artists}
					venue={venue}
				/>
				<Card className={classes.eventAllDetailsContainer}>
					{artists ? (
						<div>
							<Typography
								style={{ marginTop: 0 }}
								className={classes.eventAllDetailsTitle}
							>
								Artists
							</Typography>
							{artists.map(({ artist, importance }, index) => (
								<ArtistsOverview
									key={index}
									classes={classes}
									headliner={importance === 0}
									artist={artist}
								/>
							))}
						</div>
					) : null}

					<Typography className={classes.eventAllDetailsTitle}>
						Event Details
					</Typography>
					<DetailsOverview classes={classes} venue={venue} event={event}/>
				</Card>
			</div>
		);
	}
}

export default withStyles(styles)(EventOverview);
