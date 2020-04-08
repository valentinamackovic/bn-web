import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, Grid } from "@material-ui/core";

import InputGroup from "../../../common/form/InputGroup";
import Button from "../../../elements/Button";
import user from "../../../../stores/user";
import notifications from "../../../../stores/notifications";
import { validEmail } from "../../../../validators";
import { FacebookButton } from "../social/FacebookButton";
import Divider from "../../../common/Divider";
import PasswordResetDialog from "../PasswordResetDialog";
import Bigneon from "../../../../helpers/bigneon";
import Recaptcha from "../../../common/Recaptcha";
import analytics from "../../../../helpers/analytics";
import { isReactNative, sendReactNativeMessage, useNewMessaging, MESSAGE_TYPES } from "../../../../helpers/reactNative";

const styles = () => ({});

class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: process.env.NODE_ENV === "development" ? "superuser@test.com" : "",
			password: process.env.NODE_ENV === "development" ? "password" : "",
			confirmPassword: "",
			isSubmitting: false,
			errors: {},
			resetOpen: false,
			recaptchaReponse: null
		};

		this.handleRecaptchaVerify = this.handleRecaptchaVerify.bind(this);
		this.handleRecaptchaExpire = this.handleRecaptchaExpire.bind(this);
		this.validateFields = this.validateFields.bind(this);
	}

	validateFields() {
		//Don't validate every field if the user has not tried to submit at least once
		if (!this.submitAttempted) {
			return true;
		}

		const { email, password } = this.state;

		const errors = {};

		if (!email) {
			errors.email = "Missing email address.";
		}

		if (!validEmail(email)) {
			errors.email = "Invalid email address.";
		}

		if (!password) {
			errors.password = "Missing password.";
		}

		this.setState({ errors });

		if (Object.keys(errors).length > 0) {
			return false;
		}

		return true;
	}

	handleRecaptchaVerify(response) {
		this.setState({ recaptchaResponse: response });
	}

	handleRecaptchaExpire() {
		this.setState({ recaptchaResponse: null });
	}

	onSubmit(e) {
		e.preventDefault();

		const { email, password, recaptchaResponse } = this.state;

		this.submitAttempted = true;

		if (!this.validateFields()) {
			return false;
		}

		const params = {
			email,
			password
		};

		if (recaptchaResponse) {
			params["g-recaptcha-response"] = recaptchaResponse;
		}

		this.setState({ isSubmitting: true });
		Bigneon()
			.auth.create(params)
			.then(response => {
				const { access_token, refresh_token } = response.data;
				if (access_token) {
					localStorage.setItem("access_token", access_token);
					localStorage.setItem("refresh_token", refresh_token);

					//Pull user data with our new token
					user.refreshUser(newUser => {
						//Stop prism api users from logging in
						if (user.globalRoles && user.globalRoles.indexOf("PrismIntegration") > -1) {
							this.setState({ isSubmitting: false });
							user.onLogout();

							return notifications.show({
								message:
									"This accounts access is restricted for use with the Big Neon API.",
								variant: "error"
							});
						}

						analytics.identify({ ...newUser, method: "login" });

						if (isReactNative() && useNewMessaging()) {
							const loginData = {
								refresh_token,
								access_token
							};
							sendReactNativeMessage(loginData, MESSAGE_TYPES.AUTH);
						}

						//If we have a security token, send them to the accept invite page first
						const security_token = localStorage.getItem("security_token");
						if (security_token) {
							this.props.onSuccess(`/invites/accept?token=${security_token}`);
						} else {
							this.props.onSuccess();
						}
					});
				} else {
					this.setState({ isSubmitting: false });

					notifications.show({
						message: "Missing token.",
						variant: "error"
					});
				}
			})
			.catch(error => {
				console.error(error);
				this.setState({ isSubmitting: false });
				notifications.showFromErrorResponse({
					defaultMessage: "Login failed.",
					error
				});
			});
	}

	render() {
		const { email, password, resetOpen, isSubmitting, errors } = this.state;

		return (
			<div>
				<PasswordResetDialog
					onClose={() => this.setState({ resetOpen: false })}
					open={resetOpen}
					email={email}
				/>
				<form noValidate autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
					<div>
						{process.env.REACT_APP_FACEBOOK_APP_ID ? (
							<div>
								<FacebookButton onSuccess={this.props.onSuccess}>
									Login with Facebook
								</FacebookButton>

								<Divider style={{ marginTop: 40, marginBottom: 0 }}>Or</Divider>
							</div>
						) : null}

						<InputGroup
							error={errors.email}
							value={email}
							name="email"
							label="Email address"
							type="text"
							onChange={e => this.setState({ email: e.target.value })}
							onBlur={this.validateFields.bind(this)}
						/>
						<InputGroup
							error={errors.password}
							value={password}
							name="password"
							label="Password"
							type="password"
							onChange={e => this.setState({ password: e.target.value })}
							onBlur={this.validateFields.bind(this)}
						/>

						<div style={{ display: "flex", justifyContent: "center" }}>
							<Recaptcha
								callback={this.handleRecaptchaVerify}
								expiredCallback={this.handleRecaptchaExpire}
							/>
						</div>
					</div>
					<br/>
					<div>
						<Button
							disabled={isSubmitting}
							type="submit"
							style={{ width: "100%" }}
							variant="callToAction"
						>
							{isSubmitting ? "Logging in..." : "Login"}
						</Button>
					</div>
					<br/>
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Button
							onClick={() => this.setState({ resetOpen: true })}
							variant="text"
							size={"mediumLarge"}
						>
							Forgot your password?
						</Button>
					</div>
				</form>
			</div>
		);
	}
}

LoginForm.propTypes = {
	onSuccess: PropTypes.func.isRequired
};

export default withStyles(styles)(LoginForm);
