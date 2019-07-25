import React, { Component } from "react";
import { Typography, withStyles } from "@material-ui/core";

import notifications from "../../../../../../stores/notifications";
import Button from "../../../../../elements/Button";
import Bigneon from "../../../../../../helpers/bigneon";
import Container from "../Container";
import {
	fontFamilyDemiBold,
	primaryHex,
	secondaryHex
} from "../../../../../../config/theme";
import Dialog from "../../../../../elements/Dialog";
import Loader from "../../../../../elements/loaders/Loader";
import BoxInput from "../../../../../elements/form/BoxInput";
import InputGroup from "../../../../../common/form/InputGroup";

const styles = theme => ({
	root: {},
	parentHeading: {
		color: secondaryHex,
		fontFamily: fontFamilyDemiBold,
		textTransform: "uppercase",
		fontSize: theme.typography.fontSize * 0.8
	},
	heading: {
		fontFamily: fontFamilyDemiBold,
		fontSize: theme.typography.fontSize * 1.4
	},
	description: {
		fontSize: theme.typography.fontSize * 1.1
	},
	descriptionHeading: {
		fontFamily: fontFamilyDemiBold
	},
	actionButtonContainer: {
		marginTop: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit * 2
	},
	dialogContainer: {
		textAlign: "center",
		marginBottom: theme.spacing.unit * 2,
		marginTop: theme.spacing.unit * 2
	}
});

class LastCall extends Component {
	constructor(props) {
		super(props);

		this.eventId = this.props.match.params.id;

		this.state = {
			canTrigger: null,
			isSending: false,
			openConfirmDialog: false,
			isCustom: false,
			notificationTriggered: false,
			lastCallMessage: "",
			errors: {},
			broadcastData: {},
			customNotificationMessage: ""
		};
	}

	componentDidMount() {
		//TODO check if the event is running before enabling the button
		this.setState({ canTrigger: true });

		Bigneon()
			.events.broadcasts.index({ event_id: this.eventId })
			.then(response => {
				const { data } = response.data;

				let notificationTriggered = false;

				data.forEach(({ id, notification_type, status }) => {
					if (
						(notification_type === "LastCall" && status === "Pending") ||
						(notification_type === "LastCall" && status === "InProgress")
					) {
						notificationTriggered = true;
					}
				});

				this.setState({ notificationTriggered });
			})
			.catch(error => {
				console.error(error);
				notifications.showFromErrorResponse({
					error,
					defaultMessage: "Loading existing notifications failed."
				});
			});
	}

	onSend(e) {
		const { isCustom } = this.state;
		e.preventDefault();
		let broadcastData = {};

		this.submitAttempted = true;

		if (!this.validateFields() && isCustom) {
			notifications.show({
				message: "Invalid field.",
				variant: "warning"
			});
			return false;
		}

		this.setState({ isSending: true });

		if (isCustom) {
			broadcastData = {
				event_id: this.eventId,
				message: this.state.lastCallMessage.trim(),
				channel: "PushNotification",
				notification_type: "Custom"
			};
		} else {
			broadcastData = {
				event_id: this.eventId,
				channel: "PushNotification",
				notification_type: "LastCall"
			};
		}

		Bigneon()
			.events.broadcasts.create(broadcastData)
			.then(response => {
				let notificationTriggered = false;

				if (
					(response.data.notification_type === "LastCall" &&
						response.data.status === "Pending") ||
					(response.data.notification_type === "LastCall" &&
						response.data.status === "InProgress")
				) {
					notificationTriggered = true;

					this.setState({ notificationTriggered });
				}

				this.setState({
					isSending: false,
					openConfirmDialog: false,
					lastCallMessage: "",
					errors: {}
				});
				this.submitAttempted = false;
				notifications.show({
					message: "Notification triggered!",
					variant: "success"
				});
			})
			.catch(error => {
				this.setState({
					isSending: false
				});
				notifications.showFromErrorResponse({
					error,
					defaultMessage: "Failed to trigger notifications."
				});
			});
	}

	onDialogClose() {
		this.setState({
			openConfirmDialog: false,
			errors: {}
		});
	}

	validateFields() {
		const { lastCallMessage } = this.state;
		//Don't validate every field if the user has not tried to submit at least once
		if (!this.submitAttempted) {
			return true;
		}

		const errors = {};

		if (lastCallMessage.length > 255) {
			errors.lastCallMessage = "That message is too long. 255 Char limit";
		}

		if (lastCallMessage.length < 1) {
			errors.lastCallMessage = "That message is too short";
		}

		this.setState({ errors });
		if (Object.keys(errors).length > 0) {
			return false;
		}

		return true;
	}

	renderConfirmDialog() {
		const {
			openConfirmDialog,
			isCustom,
			lastCallMessage,
			errors,
			isSending
		} = this.state;
		const { classes } = this.props;

		const customLabel = "Send custom notification";
		const lastCallLabel = "Send last call notification";
		const customHeading = "Let your guests know what's going on";
		const lastCallHeading = "This can only be sent once during your event.";
		const description = `All attendees who have enabled notifications on their devices will receive the ${
			isCustom ? "custom" : "Last Call"
		} message`;
		return (
			<Dialog
				open={openConfirmDialog}
				title={isCustom ? customLabel : lastCallLabel}
				iconUrl={"/icons/phone-white.svg"}
				onClose={() => {
					this.onDialogClose();
				}}
			>
				<div className={classes.dialogContainer}>
					<Typography className={classes.description}>
						<span className={classes.descriptionHeading}>
							{isCustom ? customHeading : lastCallHeading}
						</span>
						<br/>
						{description}
					</Typography>
				</div>

				{isCustom ? (
					<InputGroup
						placeholder={"Enter your custom message (Max 255 characters)"}
						name={"LastCallMessage"}
						error={errors.lastCallMessage}
						label="Message"
						value={lastCallMessage}
						onChange={e => {
							this.setState({ lastCallMessage: e.target.value });
						}}
						onBlur={this.validateFields.bind(this)}
					/>
				) : (
					<div/>
				)}
				<div style={{ display: "flex" }}>
					<Button
						style={{ flex: 1, marginRight: 5 }}
						onClick={() => this.onDialogClose()}
					>
						Cancel
					</Button>
					<Button
						onClick={this.onSend.bind(this)}
						style={{ flex: 1, marginLeft: 5 }}
						variant={"callToAction"}
						disabled={isSending && isCustom}
					>
						{isCustom && isSending ? "Sending..." : "Send now"}
					</Button>
				</div>
			</Dialog>
		);
	}

	renderActionButton() {
		const {
			canTrigger,
			isSending,
			notificationTriggered,
			isCustom
		} = this.state;

		if (notificationTriggered) {
			return <Button disabled>Notification triggered!</Button>;
		}

		if (canTrigger === null) {
			return <Loader>Checking status...</Loader>;
		}

		if (!canTrigger) {
			return <Button disabled>Not available</Button>;
		}

		if (isSending && !isCustom) {
			return <Button disabled>Sending...</Button>;
		}

		return (
			<Button
				variant={"callToAction"}
				onClick={() =>
					this.setState({ openConfirmDialog: true, isCustom: false })
				}
			>
				Send now
			</Button>
		);
	}

	render() {
		const { classes } = this.props;
		const { canTrigger, isSending, isCustom } = this.state;
		return (
			<Container
				eventId={this.eventId}
				subheading={"tools"}
				layout={"childrenInsideCard"}
			>
				{this.renderConfirmDialog()}
				<Typography className={classes.parentHeading}>Hospitality</Typography>
				<Typography className={classes.heading}>Custom notification</Typography>

				<Typography>
					Custom Notifications are here for anything you'd like to send out to
					your attendees. Whether it be drink specials, letting them know an act
					is starting soon, cancellations, and everything in-between.
				</Typography>

				<div className={classes.actionButtonContainer}>
					<Button
						variant={"callToAction"}
						disabled={isSending}
						onClick={() =>
							this.setState({ openConfirmDialog: true, isCustom: true })
						}
					>
						{isSending && isCustom ? "Sending..." : "Send now"}
					</Button>
				</div>

				<Typography className={classes.heading}>
					Last call notification
				</Typography>

				<Typography>
					Last Call Notifications are optimized to drive food and beverage sales
					by intelligently engaging your attendees prior to the close of service
					to entice them to make a purchase.
				</Typography>

				<div className={classes.actionButtonContainer}>
					{this.renderActionButton()}
				</div>

				{!canTrigger ? (
					<Typography className={classes.description}>
						<span className={classes.descriptionHeading}>Why Not?</span> Last
						call notifications can only be triggered during your event.
					</Typography>
				) : null}

				<br/>
				<br/>

				<Typography className={classes.description}>
					<span className={classes.descriptionHeading}>How does it work?</span>
					<br/>
					All attendees who have enabled notifications on their devices will
					receive the Last Call message on their home screen: “🗣LAST CALL! 🍻The
					bar is closing soon, grab something now before it’s too late!” The
					message will be throttled to control traffic flow to your bar. This
					can only be used once during your event.
				</Typography>
			</Container>
		);
	}
}

export default withStyles(styles)(LastCall);
