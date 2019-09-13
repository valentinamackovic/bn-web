import React, { Component } from "react";
import { Provider } from "mobx-react";
import PropTypes from "prop-types";

import eventUpdateStore from "../../../../../stores/event-update/eventUpdateStore";
import Step1 from "./step1/Step1";
import Step2 from "./step2/Step2";
import Container from "./step1/components/Container";

class EventUpdateIndex extends Component {
	constructor(props) {
		super(props);

		this.state = {
			stepNumber: null,
			event_id: null
		};
	}

	componentDidMount() {}

	componentWillUnmount() {
		this.clearEventDetails();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const { event_id } = this.state;

		if (prevState.event_id !== event_id) {
			if (event_id) {
				eventUpdateStore.loadDetails(event_id);
			} else {
				this.clearEventDetails();
			}
		}
	}

	clearEventDetails() {
		//TODO clear eventUpdateStore
	}

	static getDerivedStateFromProps(props, state) {
		const { step, event_id } = props.match.params;

		let stepNumber = 1;
		if (step) {
			stepNumber = Number(step);
		}

		return { stepNumber, event_id };
	}

	render() {
		const { stepNumber, event_id } = this.state;

		let title = "";
		let iconUrl = "";
		if (stepNumber === 1) {
			iconUrl = "/icons/events-multi.svg";
			if (event_id) {
				title = "Update event";
			} else {
				title = "Create event";
			}
		} else if (stepNumber === 2) {
			iconUrl = "/icons/tickets-multi.svg";
			title = "Add tickets";
		}

		return (
			<Provider eventUpdateStore={eventUpdateStore}>
				<Container title={title} iconUrl={iconUrl} step={stepNumber}>
					{stepNumber === 1 ? <Step1/> : null}
					{stepNumber === 2 ? <Step2/> : null}
				</Container>
			</Provider>
		);
	}
}

EventUpdateIndex.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.object
	}).isRequired
};

export default EventUpdateIndex;
