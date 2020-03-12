import React, { Component } from "react";
import PropTypes from "prop-types";
import { Typography, withStyles } from "@material-ui/core";
import classNames from "classnames";
import Button from "../../../elements/Button";
import PageHeading from "../../../elements/PageHeading";
import Bigneon from "../../../../helpers/bigneon";
import notifications from "../../../../stores/notifications";
import DeleteAnnouncementDialog from "./DeleteAnnouncementDialog";
import { observer } from "mobx-react";
import announcements from "../../../../stores/announcements";

@observer
class AdminAnnouncements extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dialogOpen: false,
			isSubmitting: false,
			announcement: "",
			isUpdate: false,
			announcements: null,
			currentId: null
		};
		this.toggleDialog = this.toggleDialog.bind(this);
	}

	componentDidMount() {
		this.refreshAnnouncement();
	}

	refreshAnnouncement() {
		Bigneon()
			.announcements.index()
			.then(response => {
				const { data } = response.data;
				if (data.length > 0) {
					this.setState({
						announcements: data,
						currentId: data[0].id,
						announcement: data[0].message,
						isUpdate: true
					});
				}
			})
			.catch(error => {
				notifications.showFromErrorResponse({
					error,
					defaultMessage: "Failed to load Announcements"
				});
			});
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ isSubmitting: true });
		this.updateAnnouncement();
	}

	updateAnnouncement() {
		const { announcement, isUpdate, currentId } = this.state;

		const announcementFunc = isUpdate
			? Bigneon().announcements.update
			: Bigneon().announcements.create;

		const params = isUpdate
			? { id: currentId, message: announcement }
			: { message: announcement };

		announcementFunc(params)
			.then(response => {
				const { data } = response.data;
				this.setState({ announcements: data, isSubmitting: false }, () => {
					notifications.show({
						variant: "success",
						message: "Announcement set!"
					});
					announcements.refreshAnnouncements();
					announcements.getOrgAnnouncements();
				});
			})
			.catch(error => {
				this.setState({ isSubmitting: false });

				notifications.showFromErrorResponse({
					error,
					defaultMessage: "Failed to create Announcement"
				});
			});
	}

	toggleDialog(e) {
		e.preventDefault();
		this.setState(prevState => ({
			dialogOpen: !prevState.dialogOpen
		}));
	}

	render() {
		const { classes } = this.props;
		const {
			isSubmitting,
			announcement,
			isUpdate,
			dialogOpen,
			currentId
		} = this.state;

		const explainerText = isUpdate
			? "There is already an existing Admin Announcment. You can either update it below, or delete it."
			: "There is currently no Admin Announcement. You can create one below.";

		return (
			<div className={classNames.root}>
				<DeleteAnnouncementDialog
					open={dialogOpen}
					onClose={() => this.toggleDialog}
					id={currentId}
				/>
				<PageHeading>Admin Announcements</PageHeading>

				<div className={classes.infoContainer}>
					<Typography>{explainerText}</Typography>
				</div>

				{isUpdate ? (
					<div style={{ display: "flex", marginTop: 20, marginBottom: 60 }}>
						<Button
							type="submit"
							variant="callToAction"
							onClick={this.toggleDialog}
						>
							Remove Announcement
						</Button>
					</div>
				) : null}

				<form noValidate autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
					<Typography>There is a 190 character limit.</Typography>
					<textarea
						maxLength="190"
						className={classes.textAreaStyle}
						value={announcement ? announcement : ""}
						onChange={e => this.setState({ announcement: e.target.value })}
					/>
					<div style={{ display: "flex", marginTop: 20 }}>
						<Button
							disabled={isSubmitting || !announcement}
							type="submit"
							variant="callToAction"
						>
							{isUpdate
								? isSubmitting
									? "Updating..."
									: "Update"
								: isSubmitting
									? "Sending..."
									: "Send"}
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
		padding: 10,
		borderRadius: 5
	},
	heading: {
		textTransform: "capitalize"
	},
	infoContainer: {
		marginBottom: theme.spacing.unit * 2
	}
});

AdminAnnouncements.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminAnnouncements);
