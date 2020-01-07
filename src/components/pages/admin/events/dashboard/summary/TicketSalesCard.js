import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Hidden } from "@material-ui/core";
import PropTypes from "prop-types";

import CollapseCard from "./CollapseCard";
import { fontFamilyDemiBold } from "../../../../../../config/theme";
import TicketSalesChart from "./charts/TicketSalesChart";
import moment from "moment";

const styles = theme => {
	return {
		root: {
			[theme.breakpoints.up("sm")]: {
				padding: 30
			},
			[theme.breakpoints.down("md")]: {
				padding: 10
			},
			[theme.breakpoints.down("sm")]: {
				padding: 0
			}
		},
		titleText: {
			fontFamily: fontFamilyDemiBold,
			fontSize: 19,
			marginBottom: 20
		}
	};
};

const TicketSalesCard = ({ classes, token, on_sale, event_end, cubeApiUrl, ...rest }) => {
	const title = "Ticket Sales";

	return (
		<CollapseCard title={title} className={classes.root}>
			<div className={classes.root}>
				<Hidden smDown>
					<Typography className={classes.titleText}>{title}</Typography>
				</Hidden>

				<TicketSalesChart
					cubeApiUrl={cubeApiUrl}
					token={token}
					endDate={event_end}
				/>
			</div>
		</CollapseCard>
	);
};

TicketSalesCard.propTypes = {
	classes: PropTypes.object.isRequired,
	token: PropTypes.string.isRequired,
	on_sale: PropTypes.string.isRequired,
	event_end: PropTypes.string.isRequired,
	cubeApiUrl: PropTypes.string.isRequired
};

export default withStyles(styles)(TicketSalesCard);
