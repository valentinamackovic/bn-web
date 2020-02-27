import React, { Component } from "react";
import { Card, Typography, withStyles } from "@material-ui/core";
import { observer } from "mobx-react";
import servedImage from "../../../helpers/imagePathHelper";
import SMSLinkForm from "../../elements/SMSLinkForm";

@observer
class SMSLinkPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showSMSLinkDialog: false
		};
	}

	componentDidMount() {
		if (
			this.props.match &&
			this.props.match.params &&
			this.props.match.params.eventId
		) {
			this.setState({ expandedEventId: this.props.match.params.eventId });
		}
	}

	onClose() {
		this.props.history.push("/");
	}

	render() {
		const { showSMSLinkDialog } = this.state;

		const { classes } = this.props;

		return (
			<div>
				<Card variant={"form"} className={classes.formHolder}>
					<img
						className={classes.dialogImg}
						src={servedImage("/images/app-promo-background.png")}
						alt="Dialog Background Image"
					/>
					<img
						className={classes.dialogIcon}
						src={servedImage("/icons/tickets-multi.svg")}
						alt="Dialog Icon"
					/>
					<Typography className={classes.cardTitle}>
						Enter Your Phone Number
					</Typography>
					<SMSLinkForm autoFocus={!!open} onSuccess={this.onClose}/>
				</Card>
			</div>
		);
	}
}

const styles = theme => ({
	formHolder: {
		width: 400,
		margin: "0 auto",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	},
	dialogImg: {
		width: "100%"
	},
	dialogIcon: {
		width: 40,
		marginTop: 15
	},
	cardTitle: {
		color: "#2C3136",
		fontSize: 30,
		lineHeight: "34px"
	}
});

export default withStyles(styles)(SMSLinkPage);
