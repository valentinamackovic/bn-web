import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";

import Dialog from "../../../../../elements/Dialog";
import InputGroup from "../../../../../common/form/InputGroup";
import Bigneon from "../../../../../../helpers/bigneon";
import Button from "../../../../../elements/Button";
import notifications from "../../../../../../stores/notifications";
import { Typography } from "@material-ui/core";
import user from "../../../../../../stores/user";

const styles = theme => ({
	root: {},
	subText: {
		textAlign: "center",
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit
	}
});

class FBPixelDialog extends React.Component {
	constructor(props) {
		super(props);

		this.defaultValues = {
			facebook_pixel_key: "",
			errors: {},
			isSubmitting: false,
			wasSuccess: false,
			showApiKeys: true
		};

		this.state = this.defaultValues;
	}

	validateFields() {
		const { facebook_pixel_key } = this.state;
		const isNum = /^\d+$/.test(facebook_pixel_key);
		//Don't validate every field if the user has not tried to submit at least once
		if (!this.submitAttempted) {
			return true;
		}

		const errors = {};

		if (!isNum) {
			errors.facebook_pixel_key = "Please enter a valid Pixel ID";
		}

		this.setState({ errors });

		if (Object.keys(errors).length > 0) {
			return false;
		}

		return true;
	}

	componentDidMount() {
		//If we're editing an existing org then load the current details
		//"/organizations/{id}"

		const { organizationId } = this.props;

		if (organizationId) {
			Bigneon()
				.organizations.read({ id: organizationId })
				.then(response => {
					const { owner_user_id, facebook_pixel_key } = response.data;

					this.setState({
						owner_user_id: owner_user_id || "",
						facebook_pixel_key: facebook_pixel_key || ""
					});
				})
				.catch(error => {
					console.error(error);

					let message = "Loading organization details failed.";
					if (
						error.response &&
						error.response.data &&
						error.response.data.error
					) {
						message = error.response.data.error;
					}

					this.setState({ isSubmitting: false });
					notifications.show({
						message,
						variant: "error"
					});
				});
		}
	}

	updateOrganization(id, params, onSuccess) {
		this.setState({ isSubmitting: true });

		//Remove owner_user_id
		Bigneon()
			.organizations.update({ id, ...params })
			.then(() => {
				onSuccess(id);
				this.props.onClose();
			})
			.catch(error => {
				this.setState({ isSubmitting: false });

				let message = "Update organization failed.";
				if (
					error.response &&
					error.response.data &&
					error.response.data.error
				) {
					message = error.response.data.error;
				}

				notifications.show({
					message,
					variant: "error"
				});
			});
	}

	onSubmit(e) {
		e.preventDefault();

		this.submitAttempted = true;

		if (!this.validateFields()) {
			return false;
		}

		const { facebook_pixel_key } = this.state;
		const { organizationId } = this.props;

		const orgDetails = {
			facebook_pixel_key
		};

		//If we're updating an existing org
		if (organizationId) {
			this.updateOrganization(organizationId, orgDetails, () => {
				this.setState({ isSubmitting: false, wasSuccess: true });

				notifications.show({
					message: "Integrations updated",
					variant: "success"
				});
			});

			return;
		}
	}

	render() {
		const { organizationId, onClose, open } = this.props;

		const { classes } = this.props;
		const {
			owner_user_id,
			errors,
			facebook_pixel_key,
			isSubmitting,
			wasSuccess
		} = this.state;
		const isCurrentOwner = !!(owner_user_id && owner_user_id === user.id);

		return (
			<Dialog
				onClose={onClose}
				iconUrl={"/icons/link-white.svg"}
				title={"Facebook Pixel ID"}
				open={open}
			>
				<Typography className={classes.subText}>
					Assign a Facebook Pixel ID to this event.
				</Typography>
				<br/>
				<form noValidate autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
					<InputGroup
						error={errors.facebook_pixel_key}
						value={facebook_pixel_key}
						name="facebook_pixel_key"
						label="Facebook Pixel ID "
						labelProps={{
							superText: `(how do I find my ID?)`,
							onSuperTextClick: () => {
								window.open(
									"https://www.facebook.com/business/help/952192354843755"
								);
							}
						}}
						type="number"
						onChange={e =>
							this.setState({ facebook_pixel_key: e.target.value })
						}
						onBlur={this.validateFields.bind(this)}
					/>
					<div style={{ display: "flex" }}>
						<Button
							size="large"
							style={{ marginRight: 10, flex: 1 }}
							onClick={onClose}
							color="primary"
							disabled={isSubmitting}
						>
							{wasSuccess ? "Done" : "Cancel"}
						</Button>
						<Button
							disabled={isSubmitting}
							type="submit"
							style={{ marginRight: 10, flex: 1 }}
							variant="callToAction"
						>
							{isSubmitting
								? organizationId
									? "Creating..."
									: "Updating..."
								: organizationId
									? "Update"
									: "Create"}
						</Button>
					</div>
				</form>
			</Dialog>
		);
	}
}

FBPixelDialog.propTypes = {
	classes: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	eventId: PropTypes.string.isRequired
};

export default withStyles(styles)(FBPixelDialog);
