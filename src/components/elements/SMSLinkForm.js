import React, { Component } from "react";
import { Typography, withStyles } from "@material-ui/core";
import { observer } from "mobx-react";
import PropTypes from "prop-types";

import notifications from "../../stores/notifications";
import Button from "./Button";
import InputGroup from "../common/form/InputGroup";
import user from "../../stores/user";
import removePhoneFormatting from "../../helpers/removePhoneFormatting";
import Bigneon from "../../helpers/bigneon";
import { validPhone } from "../../validators";
import BigneonPerksDialog from "../pages/events/BigneonPerksDialog";
import { fontFamily, secondaryHex } from "../../config/theme";

@observer
class SMSLinkForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			phone: "",
			isSubmitting: false,
			isSent: false,
			perksDialogOpen: false
		};
		this.togglePerksDialog = this.togglePerksDialog.bind(this);
	}

	componentDidMount() {
		setTimeout(() => {
			const { phone } = user;
			if (phone) {
				this.setState({ phone });
			}
		}, 500);
	}

	togglePerksDialog(e) {
		e.preventDefault();
		this.setState(prevState => ({
			perksDialogOpen: !prevState.perksDialogOpen
		}));
	}

	onSubmit(e) {
		e.preventDefault();
		const phone = removePhoneFormatting(this.state.phone);

		if (!validPhone(phone)) {
			return notifications.show({
				message: "Invalid phone number.",
				variant: "warning"
			});
		}

		this.setState({ isSubmitting: true });
		Bigneon()
			.sendDownloadLink.create({
				phone
			})
			.then(() => {
				this.setState({ isSubmitting: false, isSent: true });
				notifications.show({ message: "SMS sent!", variant: "success" });

				const { onSuccess } = this.props;
				onSuccess ? onSuccess() : null;
			})
			.catch(err => {
				this.setState({ isSubmitting: false });
				console.error(err);
				notifications.show({
					message: "Sorry, something went wrong.",
					variant: "error"
				});
			});
	}

	render() {
		const { phone, isSubmitting, perksDialogOpen, isSent } = this.state;
		const { classes, autoFocus } = this.props;
		return (
			<div className={classes.smsContainer}>
				<BigneonPerksDialog
					open={perksDialogOpen}
					onClose={() => this.togglePerksDialog}
				/>
				<form noValidate autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
					<InputGroup
						autoFocus={autoFocus}
						label="Phone"
						value={phone}
						placeholder="+1"
						type="phone"
						name="phone"
						onChange={e => this.setState({ phone: e.target.value })}
					/>
					{!isSent ? (
						<Button
							type="submit"
							disabled={isSubmitting}
							style={{ width: "100%" }}
							variant="secondary"
							size={"mediumLarge"}
						>
							{isSubmitting ? "Sending..." : "Continue"}
						</Button>
					) : null}
				</form>
				<div onClick={this.togglePerksDialog}>
					<Typography className={classes.pinkLink}>
						Why Life is Better with the Big Neon App
					</Typography>
				</div>
			</div>
		);
	}
}

SMSLinkForm.propTypes = {
	classes: PropTypes.object.isRequired,
	autoFocus: PropTypes.bool,
	onSuccess: PropTypes.func
};

const styles = theme => ({
	smsContainer: {
		width: "100%"
	},
	pinkLink: {
		color: secondaryHex,
		fontSize: 16,
		fontFamily: fontFamily,
		textDecoration: "none",
		lineHeight: "18px",
		cursor: "pointer",
		marginTop: 20,
		textAlign: "center"
	}
});

export default withStyles(styles)(SMSLinkForm);
