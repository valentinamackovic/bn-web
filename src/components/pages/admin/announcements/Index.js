import React, { Component } from "react";
import PropTypes from "prop-types";
import { Typography, withStyles } from "@material-ui/core";
import classNames from "classnames";
import Button from "../../../elements/Button";
import PageHeading from "../../../elements/PageHeading";
import Bigneon from "../../../../helpers/bigneon";
import notifications from "../../../../stores/notifications";

class AdminAnnouncements extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalOpen: false,
			title: "",
			description: "",
			isSubmitting: false,
			announcement: ""
		};
	}

	onSubmit() {
		this.setState({ isSubmitting: true });
		this.createAnnouncement();
	}

	createAnnouncement() {
		const { announcement } = this.state;
		Bigneon()
			.announcements.create({ message: announcement })
			.then(response => {
				const { data } = response.data;
				this.setState({ announcements: data }, () => {
					notifications.show({
						variant: "success",
						message: "Announcement sent!"
					});
				});
			})
			.catch(error => {
				notifications.showFromErrorResponse({
					error,
					defaultMessage: "Failed to create Announcement"
				});
			});
	}

	render() {
		const { classes } = this.props;
		const { isSubmitting, announcement } = this.state;

		return (
			<div className={classNames.root}>
				<PageHeading>Admin Announcements</PageHeading>

				<form noValidate autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
					<Typography>
						Send announcement to admin users (less than 190 char)
					</Typography>
					<textarea
						maxLength="190"
						className={classes.textAreaStyle}
						value={announcement ? announcement : ""}
						onChange={e => this.setState({ announcement: e.target.value })}
					/>
					<div style={{ display: "flex", marginTop: 20 }}>
						<Button
							disabled={isSubmitting}
							type="submit"
							variant="callToAction"
						>
							{isSubmitting ? "Sending..." : "Send"}
						</Button>
					</div>
				</form>
			</div>
		);
	}
}

const styles = theme => ({
	root: {
		paddingLeft: theme.spacing.unit * 2,
		paddingRight: theme.spacing.unit * 2,
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
		display: "flex",
		alignItems: "center"
	},
	shaded: {
		backgroundColor: "#F5F7FA",
		borderRadius: 8
	},
	textAreaStyle: {
		width: 580,
		minHeight: 200,
		fontSize: 16,
		outline: "none",
		padding: 10
	},
	heading: {
		textTransform: "capitalize"
	}
});

AdminAnnouncements.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminAnnouncements);
