import React, { Component } from "react";
import { withStyles, Typography, Grid, Hidden } from "@material-ui/core";
import { observer } from "mobx-react";
import LandingAppBar from "../../elements/header/LandingAppBar";
import user from "../../../stores/user";
import OrgLandingHero from "./Hero";
import slugResults from "../../../stores/slugResults";
import Loader from "../../elements/loaders/Loader";
import AltResults from "../../elements/event/AltResults";
import notifications from "../../../stores/notifications";
import getUrlParam from "../../../helpers/getUrlParam";
import Organization from "../admin/organizations/Organization";
import Meta from "../organizationlanding/Meta";

const styles = theme => ({
	root: {}
});

@observer
class OrganizationLanding extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageTitle: ""
		};
	}

	componentWillMount() {
		if (
			this.props.match &&
			this.props.match.params &&
			this.props.match.params.id
		) {
			const { id } = this.props.match.params;
			slugResults.refreshResults(
				id,
				() => {},
				() => {},
				message => {
					notifications.show({
						message,
						variant: "error"
					});
				}
			);
		} else {
			// 404 ....
			console.error("Could not find id");
		}
	}

	render() {
		const { history, classes } = this.props;
		return (
			<div className={classes.root}>
				<Meta
					cityName={
						slugResults.orgInfo
							? slugResults.orgInfo.city
								? `in ${slugResults.orgInfo.city} `
								: ""
							: ""
					}
					orgName={slugResults.orgInfo ? `to ${slugResults.orgInfo.name}` : ""}
				/>
				<Hidden smDown>
					<LandingAppBar
						isAuthenticated={user.isAuthenticated}
						history={history}
					/>
				</Hidden>

				{slugResults.isLoading ? (
					<Loader>Finding events...</Loader>
				) : (
					<OrgLandingHero
						pageTitle={
							slugResults.orgInfo
								? slugResults.orgInfo.name
								: "No events for this organization"
						}
						history={history}
					/>
				)}

				<Grid
					container
					justify="center"
					style={{ maxWidth: 1600, margin: "0 auto" }}
				>
					<Grid item xs={11} sm={11} lg={10}>
						{slugResults.isLoading ? (
							<Loader>Finding events...</Loader>
						) : (
							<AltResults/>
						)}
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(OrganizationLanding);
