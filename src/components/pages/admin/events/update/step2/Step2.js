import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import EventUpdate from "../../../../../../stores/event-update/EventUpdate";

class Step2 extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>Step 2</div>;
	}
}

Step2.propTypes = {
	eventUpdateStore: PropTypes.instanceOf(EventUpdate).isRequired
};

export default inject("eventUpdateStore")(observer(Step2));
