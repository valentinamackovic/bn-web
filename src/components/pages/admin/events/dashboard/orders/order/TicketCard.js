import React from "react";
import { Typography, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Card from "../../../../../../elements/Card";
import { dollars } from "../../../../../../../helpers/money";
import CheckBox from "../../../../../../elements/form/CheckBox";
import {
	fontFamilyDemiBold,
	secondaryHex
} from "../../../../../../../config/theme";
import ColorTag from "../../../../../../elements/ColorTag";
import ellipsis from "../../../../../../../helpers/ellipsis";

const styles = theme => ({
	root: {
		marginTop: 15
	},
	detailsRow: {
		display: "flex",
		paddingTop: 20,
		paddingBottom: 20
	},
	perTicketFeeRow: {
		display: "flex",
		backgroundColor: "rgba(222, 226, 232, 0.3)",
		paddingTop: 10,
		paddingBottom: 10
	},
	col1: {
		display: "flex"
	},
	statusText: {
		color: "#8b8b8b"
	},
	attendeeNameText: {
		color: secondaryHex,
		fontFamily: fontFamilyDemiBold
	},
	subText: {
		color: "#8b94a7",
		fontSize: 14
	}
});

const TicketCard = ({
	classes,
	colStyles,
	refundable,
	total_price_in_cents,
	status,
	fees_price_in_cents,
	ticket_instance_id,
	ticket_price_in_cents,
	isChecked,
	onCheck,
	attendee_id,
	attendee_email,
	attendee_first_name,
	attendee_last_name,
	code,
	code_type,
	ticket_type_name,
	...rest
}) => {
	const checkboxStyle = { marginLeft: 20 };

	const checkbox = (
		<CheckBox
			style={checkboxStyle}
			size={"small"}
			variant={"white"}
			active={isChecked}
			onClick={onCheck}
		/>
	);

	if (ticket_instance_id) {
		return (
			<Card className={classes.root}>
				<div className={classes.detailsRow}>
					<div style={colStyles[0]} className={classes.col1}>
						{checkbox}
						<Typography>{ticket_instance_id.slice(-8)}</Typography>
					</div>

					<div style={colStyles[1]}>
						<Link to={`/admin/fans/${attendee_id}`}>
							<Typography className={classes.attendeeNameText}>
								{attendee_first_name} {attendee_last_name}
							</Typography>
						</Link>
						<Typography className={classes.subText}>
							{attendee_email}
						</Typography>
					</div>
					<div style={colStyles[2]}>
						<ColorTag variant={"green"}>
							{ellipsis(ticket_type_name, 13)}
						</ColorTag>
					</div>
					<div style={colStyles[3]}>
						{code ? (
							<div>
								<Typography>{code}</Typography>
								<Typography className={classes.subText}>{code_type}</Typography>
							</div>
						) : (
							<Typography>-</Typography>
						)}
					</div>
					<Typography style={colStyles[4]}>1</Typography>
					<Typography style={colStyles[5]}>
						{dollars(total_price_in_cents)}
					</Typography>
					<Typography style={colStyles[6]} className={classes.statusText}>
						{status}
					</Typography>
				</div>

				<div className={classes.perTicketFeeRow}>
					<span style={colStyles[0]} className={classes.col1}>
						<CheckBox
							style={checkboxStyle}
							size={"small"}
							variant={"white"}
							active={false}
						/>
						<Typography>Per ticket fee</Typography>
					</span>
				</div>
			</Card>
		);
	}

	return (
		<div className={classes.detailsRow}>
			<div style={colStyles[0]} className={classes.col1}>
				{checkbox}
				<Typography>Per order fee</Typography>
			</div>

			<Typography style={colStyles[1]}/>
			<Typography style={colStyles[2]}/>
			<Typography style={colStyles[3]}/>
			<Typography style={colStyles[4]}>1</Typography>
			<Typography style={colStyles[5]}>
				{dollars(total_price_in_cents)}
			</Typography>
			<Typography style={colStyles[6]} className={classes.statusText}>
				{status}
			</Typography>
		</div>
	);
};

TicketCard.propTypes = {
	classes: PropTypes.object.isRequired,
	onCheck: PropTypes.func.isRequired,
	isChecked: PropTypes.bool.isRequired
};

export default withStyles(styles)(TicketCard);
