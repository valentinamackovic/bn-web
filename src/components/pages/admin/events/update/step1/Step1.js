import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import EventUpdate from "../../../../../../stores/event-update/EventUpdate";

class Step1 extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>Step 1</div>;
	}
}

Step1.propTypes = {
	eventUpdateStore: PropTypes.instanceOf(EventUpdate).isRequired
};

export default inject("eventUpdateStore")(observer(Step1));
