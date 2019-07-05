import React from "react";
import { Typography, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { dollars } from "../../../../../../../helpers/money";
import {
	fontFamilyDemiBold,
	secondaryHex
} from "../../../../../../../config/theme";

const styles = theme => ({
	root: {},
	linkText: {
		color: secondaryHex,
		fontFamily: fontFamilyDemiBold
	},
	orderNumber: {
		fontSize: 28,
		fontFamily: fontFamilyDemiBold
	},
	headerText: {
		[theme.breakpoints.down("xs")]: {
			fontSize: 15
		}
	},
	orderTotalText: {
		fontSize: 17,
		fontFamily: fontFamilyDemiBold,
		textTransform: "uppercase",
		marginTop: 16
	},
	feesText: {
		fontFamily: fontFamilyDemiBold,
		color: "#8b94a7",
		textTransform: "uppercase"
	}
});

const Header = ({
	classes,
	order_number,
	user,
	displayDate,
	payment_method,
	payment_provider,
	platform,
	total_in_cents,
	fees_in_cents
}) => {
	const { first_name, last_name, id: userId } = user;

	return (
		<div>
			<Typography className={classes.orderNumber}>
				Order #{order_number}
			</Typography>

			<Typography className={classes.headerText}>
				Purchased by{" "}
				<Link to={`/admin/fans/${userId}`}>
					<span className={classes.linkText}>
						{first_name} {last_name}
					</span>
				</Link>{" "}
				on {displayDate}
			</Typography>

			<Typography className={classes.headerText}>
				Paid {payment_method ? `by ${payment_method}` : ""}{" "}
				{payment_provider ? `(${payment_provider})` : ""}{" "}
				{platform ? `via ${platform}` : ""}
			</Typography>

			<Typography className={classes.orderTotalText}>
				Order total: {dollars(total_in_cents - fees_in_cents)}{" "}
				<span className={classes.feesText}>
					+ {dollars(fees_in_cents)} fees
				</span>
			</Typography>
		</div>
	);
};

Header.propTypes = {
	classes: PropTypes.object.isRequired,
	order_number: PropTypes.string.isRequired,
	user: PropTypes.object.isRequired,
	displayDate: PropTypes.string.isRequired,
	payment_method: PropTypes.string,
	payment_provider: PropTypes.string,
	platform: PropTypes.string.isRequired,
	total_in_cents: PropTypes.number.isRequired,
	fees_in_cents: PropTypes.number.isRequired
};

export default withStyles(styles)(Header);
