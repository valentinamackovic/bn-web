import React, { Component } from "react";
import PropTypes from "prop-types";
import { Typography, withStyles } from "@material-ui/core";
import classNames from "classnames";
import Button from "../../../elements/Button";
import PageHeading from "../../../elements/PageHeading";

class AdminAnnouncements extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalOpen: false,
			paging: null,
			slugs: null,
			slugId: null,
			title: "",
			description: "",
			isSubmitting: false,
			slugType: "Genre",
			slugHref: "genres"
		};
	}

	onSubmit() {
		this.setState({ isSubmitting: true });
	}

	render() {
		const { classes } = this.props;
		const { isSubmitting, slugId, title, announcement } = this.state;

		return (
			<div className={classNames.root}>
				<PageHeading>Admin Announcements</PageHeading>

				<form noValidate autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
					<Typography>Send announcement to admin users</Typography>
					<textarea
						className={classes.textAreaStyle}
						value={announcement ? announcement : ""}
						onChange={e => this.setState({ description: e.target.value })}
					/>
					<div style={{ display: "flex", marginTop: 20 }}>
						<Button
							disabled={isSubmitting}
							type="submit"
							variant="callToAction"
						>
							{isSubmitting ? "Updating..." : "Update"}
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
