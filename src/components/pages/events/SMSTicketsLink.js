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
			linkExpired: false
		};
		this.onClose = this.onClose.bind(this);
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

	renderExpired() {
		const { classes } = this.props;

		return (
			<div className={classes.formHolder} style={{ padding: 50 }}>
				<Typography className={classes.cardTitle}>
					Your Link has Expired
				</Typography>
				<Typography className={classes.cardExplainerText}>
					Not to worry! We just sent you an email with a new link you can use to
					access your tickets.
				</Typography>
			</div>
		);
	}

	onClose() {
		const { history } = this.props;
		history.push("/");
	}

	render() {
		const { classes } = this.props;
		const { linkExpired } = this.state;
		return (
			<div>
				<Card variant={"form"} className={classes.smsCard}>
					<img
						className={classes.dialogImg}
						src={servedImage("/images/app-promo-background.png")}
						alt="Dialog Background Image"
					/>
					{linkExpired ? (
						this.renderExpired()
					) : (
						<div className={classes.formHolder}>
							<img
								className={classes.dialogIcon}
								src={servedImage("/icons/tickets-multi.svg")}
								alt="Dialog Icon"
							/>
							<SMSLinkForm autoFocus={!!open} onSuccess={this.onClose}/>
						</div>
					)}
				</Card>
			</div>
		);
	}
}

const styles = theme => ({
	smsCard: {
		width: 448,
		margin: "0 auto",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	},
	formHolder: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	},
	dialogImg: {
		width: "100%",
		position: "relative",
		bottom: 60,
		marginBottom: -60
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
	}
});

export default withStyles(styles)(withRouter(SMSLinkPage));
