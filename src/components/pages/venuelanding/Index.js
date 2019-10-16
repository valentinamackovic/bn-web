import React, { Component } from "react";
import { withStyles, Typography, Grid, Hidden } from "@material-ui/core";
import { observer } from "mobx-react";
import LandingAppBar from "../../elements/header/LandingAppBar";
import user from "../../../stores/user";
import VenueLandingHero from "./Hero";
import slugResults from "../../../stores/slugResults";
import Loader from "../../elements/loaders/Loader";
import AltResults from "../../elements/event/AltResults";
import notifications from "../../../stores/notifications";
import getUrlParam from "../../../helpers/getUrlParam";

const styles = theme => ({
	root: {}
});

@observer
class VenueLanding extends Component {
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
				<Hidden smDown>
					<LandingAppBar
						isAuthenticated={user.isAuthenticated}
						history={history}
					/>
				</Hidden>

				{slugResults.isLoading ? (
					<Loader>Finding events...</Loader>
				) : (
					<VenueLandingHero
						pageTitle={
							slugResults.venueInfo
								? slugResults.venueInfo.name
								: "No events for this venue"
						}
						pageSubTitle={
							slugResults.venueInfo ? slugResults.venueInfo.address : ""
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

export default withStyles(styles)(VenueLanding);
