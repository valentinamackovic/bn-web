import React, { Component } from "react";
import { observer } from "mobx-react";
import {
	withStyles,
	Typography,
	Grid,
	IconButton,
	MenuItem,
	Menu,
	ListItemIcon,
	ListItemText
} from "@material-ui/core";
import PageHeading from "../../../../elements/PageHeading";
import selectedEvent from "../../../../../stores/selectedEvent";
import notifications from "../../../../../stores/notifications";
import replaceIdWithSlug from "../../../../../helpers/replaceIdWithSlug";
import analytics from "../../../../../helpers/analytics";
import getAllUrlParams from "../../../../../helpers/getAllUrlParams";
import user from "../../../../../stores/user";
import Loader from "../../../../elements/loaders/Loader";
import NotFound from "../../../../common/NotFound";
import OverviewHeader from "./OverviewHeader";
import optimizedImageUrl from "../../../../../helpers/optimizedImageUrl";
import {
	fontFamily,
	fontFamilyBold,
	fontFamilyDemiBold
} from "../../../../../config/theme";
import Card from "../../../../elements/Card";
import moment from "moment-timezone";

import ArtistsOverview from "./ArtistsOverview";
import DetailsOverview from "./DetailsOverview";
import TicketingOverview from "./TicketingOverview";
import Bigneon from "../../../../../helpers/bigneon";
import PublishedOverview from "./PublishedOverview";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DashboardIcon from "@material-ui/icons/Dashboard";
import EditIcon from "@material-ui/icons/Edit";
import ViewIcon from "@material-ui/icons/Link";
import CancelIcon from "@material-ui/icons/Cancel";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Button from "../../../../elements/Button";

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
		flexDirection: "row",
		[theme.breakpoints.down("sm")]: {
			padding: 0,
			display: "block"
		}
	},
	headerInfo: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		paddingLeft: 25,
		[theme.breakpoints.down("sm")]: {
			padding: "25px 25px 5px 25px"
		}
	},
	headerImage: {
		width: 240,
		height: 160,
		backgroundImage: "linear-gradient(255deg, #e53d96, #5491cc)",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundPosition: "center",
		borderRadius: 3,
		[theme.breakpoints.down("sm")]: {
			width: "100%"
		}
	},
	statusContainer: {
		[theme.breakpoints.down("sm")]: {
			paddingTop: 20
		}
	},
	dividerStyle: {
		margin: "25px 0",
		backgroundColor: "#DEE2E8"
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
		flexDirection: "row",
		[theme.breakpoints.down("sm")]: {
			marginBottom: 25
		}
	},
	headerEventDateInfo: {
		display: "flex",
		flexDirection: "row",
		marginTop: theme.spacing.unit,
		[theme.breakpoints.down("sm")]: {
			display: "block",
			marginTop: 0
		}
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
		alignItems: "center",
		[theme.breakpoints.down("sm")]: {
			display: "block",
			paddingTop: 5
		}
	},
	eventAllDetailsContainer: {
		marginTop: 20,
		padding: "65px",
		[theme.breakpoints.down("sm")]: {
			padding: "0px",
			border: 0,
			background: "none",
			boxShadow: "none"
		}
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
		marginRight: 20,
		float: "left",
		[theme.breakpoints.down("sm")]: {
			width: 60
		}
	},
	detailsCardStyle: {
		padding: "22px 30px",
		marginBottom: 10,
		boxShadow: "0 4px 15px 2px rgba(112,124,237,0.13)",
		[theme.breakpoints.down("sm")]: {
			boxShadow: "none",
			border: "1px solid #DEE2E8",
			borderRadius: 6,
			padding: "25px 26px"
		}
	},
	expandIconRow: {
		cursor: "pointer",
		paddingBottom: theme.spacing.unit * 2,
		paddingRight: theme.spacing.unit * 2,
		position: "absolute",
		right: 20,
		zIndex: 500
	},
	expandIcon: {
		width: 20
	},
	ticketsCardStyle: {
		padding: "22px 30px",
		margin: 5,
		width: "95%",
		boxShadow: "0 4px 15px 2px rgba(112,124,237,0.13)"
	},
	artistsOverviewCard: {
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
		fontFamily: fontFamily,
		fontWeight: 500,
		color: "#000000",
		fontSize: 16,
		lineHeight: "18px",
		[theme.breakpoints.down("sm")]: {
			marginBottom: 15
		}
	},
	detailsTopRow: {
		display: "flex"
	},
	detailsContainer: {
		marginBottom: 10
	},
	menuButton: {
		float: "right",
		marginBottom: 15,
		[theme.breakpoints.down("sm")]: {
			float: "none",
			width: "100%"
		}
	}
});

@observer
class EventOverview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			venueTimezone: null,
			ticket_types_info: [],
			optionsAnchorEl: null,
			eventMenuSelected: this.props.match.params.id,
			expandedCardId: null
		};
		this.formatDateL = this.formatDateL.bind(this);
		this.handleExpandTicketCard = this.handleExpandTicketCard.bind(this);
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
					this.getTickets(selectedEvent.event.id);

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

	getTickets(event_id) {
		Bigneon()
			.events.ticketTypes.index({ event_id })
			.then(response => {
				this.setState({ ticket_types_info: response.data.data });
			})
			.catch(error => {
				console.error(error);
			});
	}

	formatDateL(date, tz) {
		return moment
			.utc(date)
			.tz(tz)
			.format("L");
	}

	handleMenuClick = event => {
		this.setState({ optionsAnchorEl: event.currentTarget });
	};

	handleOptionsClose = () => {
		this.setState({ optionsAnchorEl: null });
	};

	handleExpandTicketCard(expandedCardId) {
		this.setState({ expandedCardId: expandedCardId });
	}

	render() {
		const { classes } = this.props;
		const { ticket_types_info, expandedCardId } = this.state;
		const { event, venue, artists, ticket_types } = selectedEvent;

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

		const { name, event_start, event_end } = event;

		const displayEventStart = this.formatDateL(event_start, venue.timezone);
		const displayEventEnd = this.formatDateL(event_end, venue.timezone);
		const displayEventEndTime = moment
			.utc(event_end)
			.tz(venue.timezone)
			.format("hh:mm A");

		const promo_image_url = event.promo_image_url
			? optimizedImageUrl(event.promo_image_url)
			: null;

		const timezoneAbbr = moment
			.utc(event_start)
			.tz(venue.timezone)
			.format("z");

		const { optionsAnchorEl, eventMenuSelected } = this.state;

		const eventOptions = [
			{
				text: "Dashboard",
				onClick: () =>
					this.props.history.push(
						`/admin/events/${eventMenuSelected}/dashboard`
					),
				MenuOptionIcon: DashboardIcon
			},
			{
				text: "Edit event",
				onClick: () =>
					this.props.history.push(`/admin/events/${eventMenuSelected}/edit`),
				MenuOptionIcon: EditIcon
			},
			{
				text: "View event",
				onClick: () => this.props.history.push(`/tickets/${eventMenuSelected}`),
				// onClick: () =>
				// 	this.props.history.push(`/events/${eventMenuSelected}`),
				MenuOptionIcon: ViewIcon
			},
			{
				text: "Event overview",
				disabled: !user.hasScope("event:write"),
				onClick: () =>
					this.props.history.push(
						`/admin/events/${eventMenuSelected}/event-overview`
					),
				MenuOptionIcon: EditIcon
			},
			{
				text: "Cancel event",
				disabled: !user.hasScope("event:write") || this.cancelMenuItemDisabled,
				onClick: () =>
					this.setState({
						deleteCancelEventId: eventMenuSelected,
						isDelete: false
					}),
				MenuOptionIcon: CancelIcon
			},
			{
				text: "Delete event",
				disabled: !user.hasScope("event:write"),
				onClick: () =>
					this.setState({
						deleteCancelEventId: eventMenuSelected,
						isDelete: true
					}),
				MenuOptionIcon: CancelIcon
			}
		];

		return (
			<div style={{ padding: 10 }}>
				<Grid container>
					<Grid item xs={12} md={9}>
						<PageHeading iconUrl="/icons/events-multi.svg">{name}</PageHeading>
					</Grid>
					<Grid item xs={12} md={3}>
						<div>
							<Button
								className={classes.menuButton}
								onClick={e => {
									this.setState({ eventMenuSelected: eventMenuSelected });
									this.handleMenuClick(e);
								}}
								variant="callToAction"
							>
								Event <KeyboardArrowDownIcon/>
							</Button>

							<Menu
								id="long-menu"
								anchorEl={optionsAnchorEl}
								open={Boolean(optionsAnchorEl)}
								onClose={this.handleOptionsClose}
							>
								{eventOptions.map(
									({ text, onClick, MenuOptionIcon, disabled }) => {
										return (
											<MenuItem
												key={text}
												onClick={() => {
													this.handleOptionsClose();
													onClick();
												}}
												disabled={disabled}
											>
												<ListItemIcon>
													<MenuOptionIcon/>
												</ListItemIcon>
												<ListItemText inset primary={text}/>
											</MenuItem>
										);
									}
								)}
							</Menu>
						</div>
					</Grid>
				</Grid>
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
									artist={artist}
									importance={importance}
								/>
							))}
						</div>
					) : null}

					<Typography className={classes.eventAllDetailsTitle}>
						Event Details
					</Typography>
					<DetailsOverview
						classes={classes}
						venue={venue}
						event={event}
						displayEventStart={displayEventStart}
						displayEventEnd={displayEventEnd}
						displayEventEndTime={displayEventEndTime}
						timezoneAbbr={timezoneAbbr}
					/>

					{ticket_types_info ? (
						<div>
							<Typography className={classes.eventAllDetailsTitle}>
								Ticketing
							</Typography>
							{ticket_types_info.map((ticket_type, index) => (
								<TicketingOverview
									key={index}
									classes={classes}
									ticket_type={ticket_type}
									timezoneAbbr={timezoneAbbr}
									timezone={venue.timezone}
									isExpanded={expandedCardId === ticket_type.id}
									onExpandClick={this.handleExpandTicketCard}
								/>
							))}
						</div>
					) : null}
					<Typography className={classes.eventAllDetailsTitle}>
						Publish Options
					</Typography>
					<PublishedOverview
						classes={classes}
						event={event}
						timezoneAbbr={timezoneAbbr}
					/>
				</Card>
			</div>
		);
	}
}

export default withStyles(styles)(EventOverview);
