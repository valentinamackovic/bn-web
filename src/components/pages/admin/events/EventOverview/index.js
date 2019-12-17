import React, { Component } from "react";
import { observer } from "mobx-react";
import { Divider, withStyles, Typography } from "@material-ui/core";

const styles = theme => ({
	paper: {
		marginBottom: theme.spacing.unit,
		paddingBottom: theme.spacing.unit * 5
	},
	paddedContent: {
		paddingRight: theme.spacing.unit * 12,
		paddingLeft: theme.spacing.unit * 12,
		[theme.breakpoints.down("sm")]: {
			paddingRight: theme.spacing.unit * 2,
			paddingLeft: theme.spacing.unit * 2
		}
	},
	spacer: {
		marginBottom: theme.spacing.unit * 10
	},
	ticketOptions: { display: "flex" },
	actions: {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center"
	},
	publishDateContainer: {
		marginTop: 20,
		display: "flex"
	},
	publishedAt: {
		marginTop: 20
	},
	missingPromoImageError: {
		color: "red",
		textAlign: "center"
	},
	disabledExternalEvent: {
		color: "gray"
	}
});

@observer
class EventOverview extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return <div>HENLO I AM A CAT</div>;
	}
}

export default withStyles(styles)(EventOverview);
