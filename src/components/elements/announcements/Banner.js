import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Typography, withStyles } from "@material-ui/core";
import classNames from "classnames";
import { urlPageParam } from "../pagination";
import Bigneon from "../../../helpers/bigneon";
import notifications from "../../../stores/notifications";
import announcements from "../../../stores/announcements";
import { fontFamilyDemiBold } from "../../../config/theme";
import { observer } from "mobx-react";
import user from "../../../stores/user";

@observer
class AnnouncementBanner extends Component {
	constructor(props) {
		super(props);

		this.state = {
			announcements: []
		};
	}

	componentDidMount() {
		if (user.currentOrganizationId) {
			announcements.getOrgAnnouncements();
		}
	}

	render() {
		const { classes } = this.props;
		const { message } = announcements;
		return (
			<div className={classes.root}>
				{message ? (
					<div className={classes.bannerContainer}>
						<Typography className={classes.bannerText}>
							{message.message}
						</Typography>
					</div>
				) : null}
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
	},
	bannerText: {
		fontFamily: fontFamilyDemiBold,
		fontSize: 18
	}
});

AnnouncementBanner.propTypes = {
	classes: PropTypes.object.isRequired,
	heading: PropTypes.bool,
	shaded: PropTypes.bool
};

export default withStyles(styles)(AnnouncementBanner);
