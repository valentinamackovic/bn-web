import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import Button from "../../../elements/Button";
import notifications from "../../../../stores/notifications";
import user from "../../../../stores/user";
import Bigneon from "../../../../helpers/bigneon";
import servedImage from "../../../../helpers/imagePathHelper";
import { isReactNative, sendReactNativeMessage, useNewMessaging, MESSAGE_TYPES } from "../../../../helpers/reactNative";

const styles = theme => ({
	leftIcon: {
		marginRight: theme.spacing.unit
	},
	iconSmall: {
		height: 22,
		marginBottom: 2
	}
});

let facebookInitialized = false;

export const initFB = onLoginStatus => {
	//Setup facebook auth
	window.fbAsyncInit = function() {
		window.FB.init({
			appId: process.env.REACT_APP_FACEBOOK_APP_ID,
			xfbml: true,
			version: "v3.1"
		});
		window.FB.AppEvents.logPageView();

		window.FB.getLoginStatus(onLoginStatus);

		facebookInitialized = true;
	}.bind(this);

	(function(d, s, id) {
		const fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {
			return;
		}
		const js = d.createElement(s);
		js.id = id;
		js.src = "https://connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	})(document, "script", "facebook-jssdk");
};

export const logoutFB = (onLogoutCallback = () => {}) => {
	if (!process.env.REACT_APP_FACEBOOK_APP_ID) {
		onLogoutCallback();
	}

	const logoutCallback = () => {
		//Don't logout if not accessToken is set
		if (window.FB.getAccessToken()) {
			window.FB.logout(onLogoutCallback);
		}
	};

	if (!facebookInitialized) {
		initFB(logoutCallback);
	} else {
		logoutCallback();
	}
};

class FacebookButtonDisplay extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);

		this.state = {
			authenticated: false,
			isAuthenticating: false
		};
	}

	componentDidMount() {
		this._isMounted = true;
		initFB(this.onFBSignIn.bind(this));
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	onFBSignIn(response) {
		const { status, authResponse } = response;
		const authenticated = status === "connected";

		if (this._isMounted) {
			this.setState({ authenticated });
		}

		if (authenticated) {
			const { linkToUser } = this.props;
			authResponse.linkToUserId = linkToUser;
			Bigneon()
				.external.facebookLogin(authResponse)
				.then(response => {
					this.setState({ isAuthenticating: false });

					const { access_token, refresh_token } = response.data;
					if (access_token) {
						localStorage.setItem("access_token", access_token);
						localStorage.setItem("refresh_token", refresh_token);

						if (isReactNative() && useNewMessaging()) {
							const loginData = {
								refresh_token,
								access_token
							};
							sendReactNativeMessage(loginData, MESSAGE_TYPES.AUTH);
						}

						//Pull user data with our new token
						user.refreshUser(({ email }) => {
							this.props.onSuccess();
						});
					} else {
						notifications.show({
							message: "Missing token.",
							variant: "error"
						});
					}
				})
				.catch(error => {
					//If facebook was successful but retrieving our token fails
					this.fbLogout();
					this.setState({ isAuthenticating: false });
					console.error(error);

					notifications.showFromErrorResponse({
						defaultMessage: "Sign in failed.",
						variant: "error"
					});
				});
		} else {
			if (status !== "unknown") {
				notifications.show({
					message: "Facebook authentication failed.",
					variant: "error"
				});
			}

			if (this._isMounted) {
				this.setState({ isAuthenticating: false });
			}
		}
	}

	fbLogout() {
		logoutFB(this.onFBSignIn.bind(this));
	}

	render() {
		const { classes, children, scopes } = this.props;
		const { authenticated, isAuthenticating } = this.state;

		let text = children || "Continue with facebook";
		let style = { background: "#4267B2", color: "white" };
		let onClick = () => {
			this.setState({ isAuthenticating: true });
			window.FB.login(this.onFBSignIn.bind(this), {
				scope: scopes.join(",")
			});
		};

		if (authenticated) {
			text = "Logout";
			onClick = () => {
				this.setState({ isAuthenticating: true });
				this.fbLogout();
			};
		}

		if (isAuthenticating) {
			style = null;
		}

		return (
			<div>
				<Button
					size="large"
					style={{ ...style, width: "100%", marginTop: 20 }}
					onClick={onClick}
					disabled={isAuthenticating}
				>
					<img
						className={classNames(classes.leftIcon, classes.iconSmall)}
						src={servedImage("/images/social/facebook-icon-white.svg")}
					/>
					{text}
				</Button>
			</div>
		);
	}
}

FacebookButtonDisplay.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.string,
	onSuccess: PropTypes.func.isRequired,
	scopes: PropTypes.arrayOf(PropTypes.string),
	linkToUser: PropTypes.bool
};

FacebookButtonDisplay.defaultProps = {
	scopes: ["email"],
	linkToUser: false
};

export const FacebookButton = withStyles(styles)(FacebookButtonDisplay);
