import React, { Component } from "react";
import { Card, Typography, withStyles } from "@material-ui/core";
import { observer } from "mobx-react";
import servedImage from "../../../helpers/imagePathHelper";
import SMSLinkForm from "../../elements/SMSLinkForm";
import { withRouter } from "react-router-dom";
import { fontFamilyBold } from "../../../config/theme";

@observer
class SMSLinkPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showSMSLinkDialog: false,
			showConfirm: false
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

	renderConfirmation() {
		const { classes } = this.props;
		return (
			<div className={classes.contentHolder}>
				<Typography className={classes.cardTitle}>
					please confirm your number
				</Typography>
			</div>
		);
	}

	renderEnterNumber() {
		const { classes } = this.props;
		return (
			<div className={classes.contentHolder}>
				<Typography className={classes.cardTitle}>
					Enter Your Phone Number
				</Typography>
				<Typography className={classes.cardExplainerText}>
					We’ll send you a link to download the Big Neon App to View your
					Tickets. Don’t want to download the app? Just bring your photo ID to
					the event instead.
				</Typography>
				<SMSLinkForm autoFocus={!!open} onSuccess={this.onClose}/>
			</div>
		);
	}

	render() {
		const { showSMSLinkDialog, showConfirm } = this.state;

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
					{showConfirm ? this.renderConfirmation() : this.renderEnterNumber()}
				</Card>
			</div>
		);
	}
}

const styles = theme => ({
	formHolder: {
		width: 448,
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
		lineHeight: "34px",
		fontFamily: fontFamilyBold,
		marginTop: 20
	},
	cardExplainerText: {
		fontSize: 16,
		color: "#9BA3B5",
		textAlign: "center",
		lineHeight: "18px",
		marginBottom: theme.spacing.unit * 2,
		marginTop: theme.spacing.unit * 2
	},
	contentHolder: {
		paddingLeft: theme.spacing.unit * 4,
		paddingRight: theme.spacing.unit * 4,
		paddingBottom: theme.spacing.unit * 4,
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	}
});

export default withStyles(styles)(withRouter(SMSLinkPage));
