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
			showSMSLinkDialog: false
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

	onClose() {
		const { history } = this.props;
		history.push("/");
	}

	render() {
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
					<SMSLinkForm autoFocus={!!open} onSuccess={this.onClose}/>
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
	}
});

export default withStyles(styles)(withRouter(SMSLinkPage));
