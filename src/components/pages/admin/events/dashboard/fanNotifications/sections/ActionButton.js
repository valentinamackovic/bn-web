import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../../../../../elements/Button";

class ActionButton extends Component {
	constructor(props) {
		super(props);

		const {
			scheduledAt,
			isSending,
			isNotificationAfter,
			isEventEnded,
			isCustom,
			onAction,
			notificationTriggered,
			onSendNow
		} = this.props;

		this.defaultState = {
			scheduledAt,
			isSending,
			isNotificationAfter,
			isEventEnded,
			isCustom,
			onAction,
			notificationTriggered,
			onSendNow
		};

		this.state = this.defaultState;
	}

	static getDerivedStateFromProps(props, state) {
		const {
			scheduledAt,
			isSending,
			isNotificationAfter,
			isEventEnded,
			onAction,
			notificationTriggered,
			onSendNow
		} = props;

		return {
			scheduledAt,
			isSending,
			isNotificationAfter,
			isEventEnded,
			onAction,
			notificationTriggered,
			onSendNow
		};
	}

	render() {
		const {
			scheduledAt,
			isNotificationAfter,
			isEventEnded,
			onAction,
			notificationTriggered,
			onSendNow
		} = this.props;

		if (scheduledAt && !notificationTriggered && isNotificationAfter) {
			return (
				<Button
					variant={"whiteCTA"}
					size={"large"}
					onClick={onAction}
					disabled={isEventEnded}
				>
					Change
				</Button>
			);
		} else if(isNotificationAfter) {
			return (
				<Button
					variant={"whiteCTA"}
					size={"large"}
					onClick={onSendNow}
					disabled={isEventEnded}
				>
					Send now
				</Button>
			);
		} else {
			return null;
		}
	}
}

ActionButton.propTypes = {
	classes: PropTypes.object.isRequired,
	scheduledAt: PropTypes.string,
	isSending: PropTypes.bool.isRequired,
	isNotificationAfter: PropTypes.bool.isRequired,
	isEventEnded: PropTypes.bool.isRequired,
	notificationTriggered: PropTypes.bool,
	onAction: PropTypes.func.isRequired,
	onSendNow: PropTypes.func.isRequired
};

export default ActionButton;
