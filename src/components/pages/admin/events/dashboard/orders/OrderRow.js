import React from "react";
import PropTypes from "prop-types";
import {
	withStyles,
	Typography,
	Hidden,
	Tooltip,
	Collapse
} from "@material-ui/core";
import { Link } from "react-router-dom";
import classNames from "classnames";
import {
	fontFamilyDemiBold,
	secondaryHex,
	textColorPrimary
} from "../../../../../../config/theme";
import Card from "../../../../../elements/Card";

import ellipsis from "../../../../../../helpers/ellipsis";
import { dollars } from "../../../../../../helpers/money";

const styles = theme => {
	return {
		desktopCard: {
			display: "flex",
			height: 70,
			alignItems: "center",
			marginTop: theme.spacing.unit * 2,
			paddingLeft: theme.spacing.unit * 2,
			paddingRight: theme.spacing.unit * 2
		},
		mobileCard: {
			borderRadius: 6,
			marginTop: theme.spacing.unit * 2,
			padding: theme.spacing.unit * 2
		},
		linkText: {
			fontFamily: fontFamilyDemiBold,
			color: secondaryHex,
			cursor: "pointer"
		},
		emailText: {
			fontFamily: fontFamilyDemiBold
		}
	};
};

const OrderRow = props => {
	const {
		classes,
		eventId,
		columnStyles,
		id,
		order_number,
		displayDate,
		ticketCount,
		total_in_cents,
		...rest
	} = props;

	return (
		<React.Fragment>
			{/*DESKTOP*/}
			<Hidden smDown>
				<Card variant={"raisedLight"} className={classes.desktopCard}>
					<Link
						style={columnStyles[0]}
						to={`/admin/events/${eventId}/dashboard/orders/manage/${id}`}
					>
						<Typography className={classes.linkText}>{order_number}</Typography>
					</Link>

					<Typography style={columnStyles[1]}>{displayDate}</Typography>

					<Link
						style={columnStyles[2]}
						to={`/admin/events/${eventId}/dashboard/users/${id}`}
					>
						<Typography>
							<span className={classes.linkText}>
								{ellipsis(`Todo TodotodoTodotodo`, 15)}
							</span>{" "}
							<span className={classes.emailText}>
								{ellipsis(`(todoTodotodo@todo.todo)`, 15)}
							</span>
						</Typography>
					</Link>

					<Typography style={columnStyles[3]}>{ticketCount}</Typography>

					<Typography style={columnStyles[4]}>
						{dollars(total_in_cents)}
					</Typography>

					<Typography style={columnStyles[5]}>TODO</Typography>
				</Card>
			</Hidden>

			{/*MOBILE TODO*/}
			<Hidden mdUp>
				<Card variant={"block"} className={classes.mobileCard}>
					<Typography> </Typography>
				</Card>
			</Hidden>
		</React.Fragment>
	);
};

OrderRow.propTypes = {
	classes: PropTypes.object.isRequired,
	eventId: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	columnStyles: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(OrderRow);
