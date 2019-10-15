import React, { Component } from "react";
import { withStyles, Typography, Grid, Hidden } from "@material-ui/core";
import { observer } from "mobx-react";
import LandingAppBar from "../../elements/header/LandingAppBar";
import user from "../../../stores/user";
import { fontFamilyBold } from "../../../config/theme";
import VenueLandingHero from "./Hero";
import Hero from "../landing/Hero";
import eventResults from "../../../stores/eventResults";
import Loader from "../../elements/loaders/Loader";
import Results from "../landing/cards/Results";
import VenueResults from "./VenueResults";

const styles = theme => ({
	root: {}
});

@observer
class VenueLanding extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

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

				<VenueLandingHero history={history}/>

				<Grid
					container
					justify="center"
					style={{ maxWidth: 1600, margin: "0 auto" }}
				>
					<Grid item xs={11} sm={11} lg={10}>
						{eventResults.isLoading ? (
							<Loader>Finding events...</Loader>
						) : (
							<VenueResults/>
						)}
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(VenueLanding);
