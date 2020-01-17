import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Dialog from "../../../../../elements/Dialog";
import InputGroup from "../../../../../common/form/InputGroup";
import Bigneon from "../../../../../../helpers/bigneon";
import Button from "../../../../../elements/Button";
import notifications from "../../../../../../stores/notifications";
import CustomTooltip from "../../../../../elements/Tooltip";
import copyToClipboard from "../../../../../../helpers/copyToClipboard";
import { Typography } from "@material-ui/core";
import { secondaryHex } from "../../../../../../config/theme";

const styles = theme => ({
	root: {},
	subText: {
		textAlign: "center",
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit
	}
});

class AffiliateLinkGeneratorDialog extends React.Component {
	constructor(props) {
		super(props);

		this.defaultValues = {
			errors: {},
			isSubmitting: false,
			source: "",
			medium: "",
			campaign: "",
			term: "",
			content: "",
			shortLink: "",
			linkCopied: false
		};

		this.state = this.defaultValues;
	}

	validateFields() {
		const { source, medium, campaign, term, content } = this.state;
		if (this.hasSubmitted) {
			//Set error state vars if we need validation for any of the fields
		}

		return true;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.open && !this.props.open) {
			this.setState(this.defaultValues);
		}
	}

	onSubmit() {
		this.hasSubmitted = true;

		if (!this.validateFields()) {
			notifications.show({
				variant: "warning",
				message: "There are invalid details."
			});
			return false;
		}

		this.setState({ isSubmitting: true });
		const { eventId } = this.props;
		const { source, medium, campaign, term, content } = this.state;

		Bigneon()
			.events.createLink({
				id: eventId,
				source,
				medium,
				campaign,
				term,
				content
			})
			.then(response => {
				const { link, long_link: longLink } = response.data;

				this.setState({
					isSubmitting: false,
					shortLink: link,
					longLink
				});
			})
			.catch(error => {
				console.error(error);
				notifications.showFromErrorResponse({
					defaultMessage: "Generating short link failed.",
					error
				});
			});
	}

	onCopyLink() {
		const { shortLink } = this.state;

		copyToClipboard(shortLink);

		this.setState({ linkCopied: true }, () =>
			setTimeout(() => this.setState({ linkCopied: false }), 1000)
		);
	}

	renderShortLink() {
		const { shortLink, longLink,  linkCopied } = this.state;

		if (!shortLink && !longLink) {
			return null;
		}

		const linkComponent = (
			<InputGroup
				InputProps={{ style: { color: secondaryHex } }}
				value={longLink}
				name="longLink"
				label={"Use this link to track your campaign:"}
				type="text"
				onChange={e => {}}
			/>
		);

		return linkComponent;

		//TODO fix clipboard issue and add below back

		// if (linkCopied) {
		// 	return (
		// 		<CustomTooltip
		// 			title={linkCopied ? "Copied to clipboard!" : null}
		// 			forceShow
		// 			placement={"left"}
		// 		>
		// 			{linkComponent}
		// 		</CustomTooltip>
		// 	);
		// } else {
		// 	return (
		// 		<span
		// 			style={{ cursor: "pointer" }}
		// 			onClick={this.onCopyLink.bind(this)}
		// 		>
		// 			{linkComponent}
		// 		</span>
		// 	);
		// }
	}

	render() {
		const { onClose, open, classes, ...other } = this.props;
		const {
			isSubmitting,
			errors,
			source,
			medium,
			campaign,
			term,
			content
		} = this.state;

		return (
			<Dialog
				onClose={onClose}
				iconUrl={"/icons/link-white.svg"}
				title={"Affiliate tracking links"}
				open={open}
			>
				<Typography className={classes.subText}>
					Generate a link to track custom marketing campaigns and affiliate
					performance.
				</Typography>
				<br/>
				<div>
					<InputGroup
						error={errors.source}
						value={source}
						name="source"
						label={"Campaign Source/Channel Name (optional)"}
						placeholder="ie. Facebook, Twitter, Newsletter"
						autofocus={true}
						type="text"
						onChange={e => {
							this.setState({ source: e.target.value });
						}}
						onBlur={this.validateFields.bind(this)}
					/>

					<InputGroup
						error={errors.medium}
						value={medium}
						name="medium"
						label={"Campaign Medium (optional)"}
						placeholder="ie. cpc, social share, email"
						type="text"
						onChange={e => {
							this.setState({ medium: e.target.value });
						}}
						onBlur={this.validateFields.bind(this)}
					/>

					<InputGroup
						error={errors.campaign}
						value={campaign}
						name="campaign"
						label={"Campaign Name (optional)"}
						placeholder="The name of this campaign"
						type="text"
						onChange={e => {
							this.setState({ campaign: e.target.value });
						}}
						onBlur={this.validateFields.bind(this)}
					/>

					<InputGroup
						error={errors.term}
						value={term}
						name="keyword"
						label={"Campaign Keyword/Term/Audience (optional)"}
						placeholder="Something to identify a targeted campaign, like a keyword"
						type="text"
						onChange={e => {
							this.setState({ term: e.target.value });
						}}
						onBlur={this.validateFields.bind(this)}
					/>

					<InputGroup
						error={errors.content}
						value={content}
						name="content"
						label={"Campaign Content Identifier (optional)"}
						placeholder="Something to identify ad content"
						type="text"
						onChange={e => {
							this.setState({ content: e.target.value });
						}}
						onBlur={this.validateFields.bind(this)}
					/>

					{this.renderShortLink()}

					<div style={{ display: "flex" }}>
						<Button
							size="large"
							style={{ marginRight: 10, flex: 1 }}
							onClick={onClose}
							color="primary"
							disabled={isSubmitting}
						>
							Cancel
						</Button>
						<Button
							size="large"
							style={{ marginLeft: 10, flex: 1 }}
							type="submit"
							variant="callToAction"
							onClick={this.onSubmit.bind(this)}
							disabled={isSubmitting}
						>
							{isSubmitting ? "Generating..." : "Generate link"}
						</Button>
					</div>
				</div>
			</Dialog>
		);
	}
}

AffiliateLinkGeneratorDialog.propTypes = {
	classes: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	eventId: PropTypes.string.isRequired
};

export default withStyles(styles)(AffiliateLinkGeneratorDialog);
