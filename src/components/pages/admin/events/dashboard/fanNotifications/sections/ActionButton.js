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
			notificationTriggered
		} = this.props;

		this.defaultState = {
			scheduledAt,
			isSending,
			isNotificationAfter,
			isEventEnded,
			isCustom,
			onAction,
			notificationTriggered
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
			notificationTriggered
		} = props;

		return {
			scheduledAt,
			isSending,
			isNotificationAfter,
			isEventEnded,
			onAction,
			notificationTriggered
		};
	}

	render() {
		const {
			scheduledAt,
			isSending,
			isNotificationAfter,
			isEventEnded,
			onAction,
			notificationTriggered
		} = this.props;

		if (scheduledAt && !notificationTriggered) {
			return (
				<Button
					variant={"whiteCTA"}
					size={"large"}
					onClick={onAction}
				>
					{scheduledAt || notificationTriggered ? "Change" : "Send now"}
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
	onAction: PropTypes.func.isRequired
};

export default ActionButton;
