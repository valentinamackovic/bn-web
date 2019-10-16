import React, { Component } from "react";
import { withStyles, Typography, Grid, Hidden } from "@material-ui/core";
import { observer } from "mobx-react";
import LandingAppBar from "../../elements/header/LandingAppBar";
import user from "../../../stores/user";
import CityLandingHero from "./Hero";
import slugResults from "../../../stores/slugResults";
import Loader from "../../elements/loaders/Loader";
import AltResults from "../../elements/event/AltResults";
import notifications from "../../../stores/notifications";
import getUrlParam from "../../../helpers/getUrlParam";
import VenueLandingHero from "../venuelanding/Hero";

const styles = theme => ({
	root: {}
});

@observer
class CityLanding extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		if (
			this.props.match &&
			this.props.match.params &&
			this.props.match.params.id
		) {
			const { id } = this.props.match.params;
			// eventResults.changeFilter("city", "New York");
			// eventResults.changeFilter("state", venueFromUrl);
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
					<CityLandingHero
						pageTitle={slugResults.venueInfo.city}
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

export default withStyles(styles)(CityLanding);
