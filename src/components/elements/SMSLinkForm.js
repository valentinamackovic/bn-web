import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { observer } from "mobx-react";
import PropTypes from "prop-types";

import notifications from "../../stores/notifications";
import Button from "./Button";
import InputGroup from "../common/form/InputGroup";
import user from "../../stores/user";
import removePhoneFormatting from "../../helpers/removePhoneFormatting";
import Bigneon from "../../helpers/bigneon";
import { validPhone } from "../../validators";

const styles = theme => ({
	smsContainer: {
		padding: theme.spacing.unit * 2
	}
});

@observer
class SMSLinkForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			phone: "",
			isSubmitting: false,
			isSent: false
		};
	}

	componentDidMount() {
		setTimeout(() => {
			const { phone } = user;
			if (phone) {
				this.setState({ phone });
			}
		}, 500);
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
		const { phone, isSubmitting, isSent } = this.state;
		const { classes, autoFocus } = this.props;
		return (
			<div className={classes.smsContainer}>
				<form noValidate autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
					<InputGroup
						autoFocus={autoFocus}
						label="Mobile number"
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
						>
							{isSubmitting ? "Sending..." : "Text me the link"}
						</Button>
					) : null}
				</form>
			</div>
		);
	}
}

SMSLinkForm.propTypes = {
	classes: PropTypes.object.isRequired,
	autoFocus: PropTypes.bool,
	onSuccess: PropTypes.func
};

export default withStyles(styles)(SMSLinkForm);
