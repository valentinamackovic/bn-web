import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { Card, withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { observer } from "mobx-react";

import SMSAppLinkDialog from "../../elements/SMSAppLinkDialog";
import SMSLinkForm from "../../elements/SMSLinkForm";

const styles = theme => ({});

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
				<Grid container spacing={24}>
					<Grid item xs={12} sm={12} lg={12}>
						<Card variant={"form"}>
							<SMSLinkForm autoFocus={!!open} onSuccess={this.onClose}/>
						</Card>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(SMSLinkPage);
