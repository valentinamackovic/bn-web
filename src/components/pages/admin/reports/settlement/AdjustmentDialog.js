import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Bn from "bn-api-node";

import notifications from "../../../../../stores/notifications";
import Bigneon from "../../../../../helpers/bigneon";
import Dialog from "../../../../elements/Dialog";
import Button from "../../../../elements/Button";
import InputGroup from "../../../../common/form/InputGroup";
import SelectGroup from "../../../../common/form/SelectGroup";

const styles = theme => ({});

class AdjustmentDialog extends React.Component {
	constructor(props) {
		super(props);

		this.defaultValue = {
			adjustmentDollarValue: "",
			adjustmentNotes: "",
			adjustmentType: "none",
			isSubmitting: false,
			errors: {},
			valueOperator: null
		};

		this.state = {
			...this.defaultValue
		};

		this.adjustmentTypes = [
			{
				value: "none",
				label: "Select a type",
				disabled: true
			}
		];

		const typeEnums = Bn.Enums.ADJUSTMENT_TYPES;

		Object.keys(typeEnums).forEach(key => {
			this.adjustmentTypes.push({
				value: key,
				label: typeEnums[key]
			});
		});
	}

	validateFields() {
		//Don't validate every field if the user has not tried to submit at least once
		if (!this.submitAttempted) {
			return true;
		}
		const errors = {};

		const {
			adjustmentDollarValue,
			adjustmentNotes,
			adjustmentType
		} = this.state;

		if (!adjustmentDollarValue || Number(adjustmentDollarValue) <= 0) {
			errors.adjustmentDollarValue = "Missing value.";
		}

		if (!adjustmentType || adjustmentType === "none") {
			errors.adjustmentType = "Missing adjustment type.";
		}

		this.setState({ errors });

		if (Object.keys(errors).length > 0) {
			return false;
		}

		return true;
	}

	onSubmit() {
		this.submitAttempted = true;

		if (!this.validateFields()) {
			notifications.show({
				variant: "warning",
				message: "There are invalid adjustment details."
			});
			return false;
		}

		this.setState({ isSubmitting: true });

		const { settlementId, onSuccess } = this.props;

		const {
			adjustmentDollarValue,
			adjustmentNotes,
			adjustmentType,
			valueOperator
		} = this.state;

		const amount_in_cents =
			Math.floor(Number(adjustmentDollarValue) * 100) * valueOperator;

		Bigneon()
			.settlements.adjustments.create({
				settlement_id: settlementId,
				amount_in_cents,
				note: adjustmentNotes,
				settlement_adjustment_type: adjustmentType
			})
			.then(response => {
				onSuccess();

				notifications.show({
					message: "Adjustment added.",
					variant: "success"
				});

				this.setState(this.defaultValue);
			})
			.catch(error => {
				this.setState({ isSubmitting: false });

				console.error(error);
				notifications.showFromErrorResponse({
					error,
					defaultMessage: "Saving adjustment failed."
				});
			});
	}

	onTypeChange(e) {
		const adjustmentType = e.target.value;
		const valueOperator = adjustmentType === "ManualCredit" ? +1 : -1;
		this.setState({ adjustmentType, valueOperator });
	}

	render() {
		const { open, onClose, classes } = this.props;
		const {
			isSubmitting,
			adjustmentDollarValue,
			adjustmentNotes,
			adjustmentType,
			errors,
			valueOperator
		} = this.state;

		return (
			<Dialog
				title={"New adjustment"}
				open={open}
				iconUrl="/icons/edit-white.svg"
				onClose={onClose}
			>
				<div>
					<SelectGroup
						label={"Adjustment type"}
						name={"adjustment-type"}
						value={adjustmentType}
						onChange={this.onTypeChange.bind(this)}
						items={this.adjustmentTypes}
						error={errors.adjustmentType}
					/>

					<InputGroup
						name="settlement-adjustment-value"
						InputProps={{
							startAdornment: (
								<InputAdornment
									position="start"
									style={{
										display: "flex",
										flexDirection: "row",
										marginBottom: 10
									}}
								>
									{valueOperator !== null ? (
										<span>{valueOperator === -1 ? "-" : "+"}&nbsp;</span>
									) : null}
									$
								</InputAdornment>
							)
						}}
						label={"Adjustment amount ($)"}
						type="number"
						placeholder="0.00"
						value={adjustmentDollarValue}
						onChange={e =>
							this.setState({ adjustmentDollarValue: e.target.value })
						}
						error={errors.adjustmentDollarValue}
					/>

					<InputGroup
						value={adjustmentNotes}
						name="settlement-adjustment-notes"
						label="Adjustment notes"
						type="text"
						placeholder="Describe these adjustments"
						onChange={e => this.setState({ adjustmentNotes: e.target.value })}
						multiline
						error={errors.adjustmentNotes}
					/>

					<div style={{ display: "flex" }}>
						<Button style={{ flex: 1, marginRight: 5 }} onClick={onClose}>
							Cancel
						</Button>
						<Button
							disabled={isSubmitting}
							style={{ flex: 1, marginLeft: 5 }}
							variant="secondary"
							onClick={this.onSubmit.bind(this)}
						>
							{isSubmitting ? "Updating..." : "Update"}
						</Button>
					</div>
				</div>
			</Dialog>
		);
	}
}

AdjustmentDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	settlementId: PropTypes.string.isRequired,
	onSuccess: PropTypes.func.isRequired
};

export default withStyles(styles)(AdjustmentDialog);
