import React, { Component } from "react";
import { withStyles, Typography, Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import notifications from "../../../../stores/notifications";
import Bigneon from "../../../../helpers/bigneon";
import PageHeading from "../../../elements/PageHeading";
import user from "../../../../stores/user";
import Card from "../../../elements/Card";
import { fontFamilyDemiBold } from "../../../../config/theme";
import SocialIconLink from "../../../elements/social/SocialIconLink";
import StyledLink from "../../../elements/StyledLink";
import Loader from "../../../elements/loaders/Loader";
import PropTypes from "prop-types";
import moment from "moment-timezone";
import servedImage from "../../../../helpers/imagePathHelper";
import FanHistoryEventCard from "./FanHistoryEventCard";

const imageSize = 100;

const historyDummy = [
	{
		event_id: "9bdc1bba-7144-4b8b-9446-a095f14e9578",
		event_name: "Simple Event",
		event_start: "2019-08-31T19:00:00",
		event_loc: "Some location",
		event_history: [
			{
				event_name: "Simple Event",
				order_date: "2019-05-27T10:10:50.616616",
				order_id: "e920bef8-6bb8-4131-84c1-7188be4585ba",
				revenue_in_cents: 20655,
				ticket_sales: 1,
				type: "Purchase"
			},
			{
				event_name: "Simple Event",
				order_date: "2019-05-22T15:17:04.181624",
				order_id: "1946606e-8853-4111-99d0-892ae56a5f91",
				revenue_in_cents: 6273,
				type: "CheckIn"
			},
			{
				event_name: "Huge ticket sales",
				order_date: "2019-05-10T15:00:12.087543",
				order_id: "79d359d6-8015-4e10-bd4a-c257d79f2576",
				amount_refunded: 255,
				ticket_sales: 1,
				type: "Refund",
				refunded: "John Smith"
			},
			{
				event_name: "Simple Event",
				order_date: "2019-05-06T16:07:55.878461",
				order_id: "49ad71b3-1971-4d86-a207-b068f60d9cc7",
				revenue_in_cents: 4539,
				ticket_sales: 2,
				type: "Purchase"
			}
		]
	},
	{
		event_id: "c52d9cef-1d18-487c-ad28-597c541953c8",
		event_name: "Open Mike Eagle",
		event_start: "2019-05-09T15:00:00",
		event_loc: "Some location",
		event_history: [
			{
				event_name: "Simple Event",
				order_date: "2019-05-27T10:10:50.616616",
				order_id: "e920bef8-6bb8-4131-84c1-7188be4585ba",
				revenue_in_cents: 20655,
				ticket_sales: 1,
				type: "Purchase"
			},
			{
				event_name: "Simple Event",
				order_date: "2019-05-22T15:17:04.181624",
				order_id: "1946606e-8853-4111-99d0-892ae56a5f91",
				revenue_in_cents: 6273,
				ticket_sales: 1,
				type: "Purchase"
			},
			{
				event_name: "Huge ticket sales",
				order_date: "2019-05-10T15:00:12.087543",
				order_id: "79d359d6-8015-4e10-bd4a-c257d79f2576",
				revenue_in_cents: 255,
				ticket_sales: 1,
				type: "Purchase"
			},
			{
				event_name: "Simple Event",
				order_date: "2019-05-06T16:07:55.878461",
				order_id: "49ad71b3-1971-4d86-a207-b068f60d9cc7",
				revenue_in_cents: 4539,
				ticket_sales: 2,
				type: "Purchase"
			}
		]
	},
	{
		event_id: "d82921d1-7c24-4838-a098-f0235a226af7",
		event_name: "Huge ticket sales",
		event_start: "2019-05-08T19:00:00",
		event_loc: "Some location",
		event_history: [
			{
				event_name: "Simple Event",
				order_date: "2019-05-27T10:10:50.616616",
				order_id: "e920bef8-6bb8-4131-84c1-7188be4585ba",
				revenue_in_cents: 20655,
				ticket_sales: 1,
				type: "Purchase"
			},
			{
				event_name: "Simple Event",
				order_date: "2019-05-22T15:17:04.181624",
				order_id: "1946606e-8853-4111-99d0-892ae56a5f91",
				revenue_in_cents: 6273,
				ticket_sales: 1,
				type: "Purchase"
			},
			{
				event_name: "Huge ticket sales",
				order_date: "2019-05-10T15:00:12.087543",
				order_id: "79d359d6-8015-4e10-bd4a-c257d79f2576",
				revenue_in_cents: 255,
				ticket_sales: 1,
				type: "Purchase"
			},
			{
				event_name: "Simple Event",
				order_date: "2019-05-06T16:07:55.878461",
				order_id: "49ad71b3-1971-4d86-a207-b068f60d9cc7",
				revenue_in_cents: 4539,
				ticket_sales: 2,
				type: "Purchase"
			}
		]
	}
];

const styles = theme => ({
	card: {
		padding: theme.spacing.unit * 5
	},
	profileImage: {
		width: imageSize,
		height: imageSize,
		borderRadius: 100,
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "50% 50%"
	},
	missingProfileImageContainer: {
		borderStyle: "dashed",
		borderWidth: 0.5,
		borderColor: "#d1d1d1",
		width: imageSize,
		height: imageSize,
		borderRadius: 100,
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	missingProfileImage: {
		width: imageSize * 0.35,
		height: "auto"
	},
	profileContainer: {
		display: "flex"
	},
	profileDetails: {
		marginLeft: theme.spacing.unit * 2,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around"
	},
	name: {
		fontFamily: fontFamilyDemiBold,
		fontSize: theme.typography.fontSize * 1.5,
		lineHeight: 1
	},
	email: {
		color: "#9DA3B4",
		lineHeight: 1
	},
	facebookContainer: {
		display: "flex",
		alignItems: "center"
	},
	facebook: {
		fontSize: theme.typography.fontSize * 0.7,
		color: "#9DA3B4",
		marginLeft: theme.spacing.unit,
		lineHeight: 1
	},
	overviewStatsContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-end"
	},
	statsHeading: {
		color: "#9DA3B4"
	},
	statValue: {
		fontFamily: fontFamilyDemiBold
	},
	verticalDivider: {
		borderLeft: "1px solid #DEE2E8",
		height: 45
	},
	verticalDividerSmall: {
		borderLeft: "1px solid #DEE2E8",
		height: 20
	},
	historyHeading: {
		fontFamily: fontFamilyDemiBold,
		fontSize: theme.typography.fontSize * 1.5,
		marginTop: theme.spacing.unit * 4
	}
});

class Fan extends Component {
	constructor(props) {
		super(props);

		this.userId = props.match.params.id;

		this.state = {
			profile: null,
			fanHistory: historyDummy,
			activeHeadings: { sales: true, attendance: false },
			expandedRowKey: null
		};
		this.onExpandChange = this.onExpandChange.bind(this);
	}

	componentDidMount() {
		this.loadFan();
	}

	onExpandChange(expandedRowKey) {
		if (expandedRowKey === this.state.expandedRowKey) {
			this.setState({
				expandedRowKey: null
			});
		} else {
			this.setState({ expandedRowKey });
		}
	}

	loadFan() {
		const organization_id = user.currentOrganizationId;

		if (!organization_id) {
			this.timeout = setTimeout(this.loadFan.bind(this), 500);
			return;
		}

		const user_id = this.userId;

		Bigneon()
			.organizations.fans.read({ user_id, organization_id })
			.then(response => {
				const { attendance_information, ...profile } = response.data;

				this.setState({ profile });
			})
			.catch(error =>
				notifications.showFromErrorResponse({
					error,
					defaultMessage: "Failed to load fan profile."
				})
			);
	}

	renderCards() {
		const { fanHistory, expandedRowKey } = this.state;
		if (fanHistory === null) {
			return <Loader>Loading history...</Loader>;
		}

		return fanHistory.map((item, index) => {
			const expanded = expandedRowKey === index;
			return (
				<FanHistoryEventCard
					onExpandChange={() => this.onExpandChange(index)}
					expanded={expanded}
					key={index}
					{...item}
				/>
			);
		});
	}

	renderProfile() {
		const { classes } = this.props;
		const { profile } = this.state;

		const {
			first_name,
			last_name,
			email,
			facebook_linked,
			profile_pic_url,
			event_count,
			revenue_in_cents,
			ticket_sales
		} = profile;

		const profilePic = profile_pic_url ? (
			<div
				className={classes.profileImage}
				style={{ backgroundImage: `url(${profile_pic_url})` }}
			/>
		) : (
			<div className={classes.missingProfileImageContainer}>
				<img
					className={classes.missingProfileImage}
					src={servedImage("/images/profile-pic-placeholder.png")}
					alt={first_name}
				/>
			</div>
		);

		return (
			<div className={classes.profileContainer}>
				{profilePic}
				<div className={classes.profileDetails}>
					<Typography className={classes.name}>
						{first_name} {last_name}
					</Typography>
					<Typography className={classes.email}>{email}</Typography>
					<div className={classes.facebookContainer}>
						<SocialIconLink icon="facebook" color="black"/>
						<Typography className={classes.facebook}>
							{facebook_linked
								? "Facebook connected"
								: "Facebook not connected"}
						</Typography>
					</div>
				</div>
			</div>
		);
	}

	render() {
		const { profile } = this.state;
		if (profile === null) {
			return <Loader>Loading fan details...</Loader>;
		}
		const { classes } = this.props;

		return (
			<div>
				<PageHeading iconUrl="/icons/my-events-active.svg">
					Fan Profile
				</PageHeading>

				<Card>
					<div className={classes.card}>
						<Grid container spacing={24}>
							<Grid item xs={12} sm={8} lg={8}>
								{this.renderProfile()}
							</Grid>
						</Grid>

						<Grid
							item
							xs={12}
							sm={12}
							md={12}
							lg={12}
							style={{ paddingTop: 20 }}
						>
							{this.renderCards()}
						</Grid>
					</div>
				</Card>
			</div>
		);
	}
}

export default withStyles(styles)(Fan);
