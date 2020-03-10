import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Typography, withStyles } from "@material-ui/core";
import classNames from "classnames";
import { urlPageParam } from "../pagination";
import Bigneon from "../../../helpers/bigneon";
import notifications from "../../../stores/notifications";

class AnnouncementBanner extends Component {
	constructor(props) {
		super(props);

		this.state = {
			announcements: []
		};
	}

	componentDidMount() {
		this.refreshAnnouncement();
	}

	refreshAnnouncement() {
		this.setState({ paging: null });
		Bigneon()
			.announcements.index()
			.then(response => {
				const { data } = response.data;
				this.setState({ announcements: data });
			})
			.catch(error => {
				notifications.showFromErrorResponse({
					error,
					defaultMessage: "Failed to load Announcements"
				});
			});
	}

	render() {
		const { classes } = this.props;
		const { announcements } = this.state;

		return (
			<div className={classes.root}>
				{announcements && announcements.length > 0
					? announcements.map((a, index) => {
						return (
							<div className={classes.bannerContainer} key={index}>
								<Typography className={classNames.bannerText}>
									{a.message}
								</Typography>
							</div>
						);
					  })
					: null}
			</div>
		);
	}
}

const styles = theme => ({
	root: {},
	bannerContainer: {
		paddingLeft: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit * 2,
		borderBottom: "1px solid #ececec",
		marginBottom: theme.spacing.unit * 2
	}
});

AnnouncementBanner.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.array.isRequired,
	heading: PropTypes.bool,
	shaded: PropTypes.bool
};

export default withStyles(styles)(AnnouncementBanner);
