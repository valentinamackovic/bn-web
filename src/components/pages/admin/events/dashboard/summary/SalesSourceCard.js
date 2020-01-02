import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Hidden } from "@material-ui/core";
import PropTypes from "prop-types";
import CollapseCard from "./CollapseCard";
import { fontFamilyDemiBold } from "../../../../../../config/theme";
import PageViewsTable from "./charts/PageViewsTable";
import CustomCard from "../../../../../elements/Card";
import getScreenWidth from "../../../../../../helpers/getScreenWidth";

const styles = theme => {
	return {
		// forcedWidth: {
		// 	[theme.breakpoints.down("xs")]: {
		// 		maxWidth: getScreenWidth() - 40
		// 	}
		// },
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
		scroll: {
			display: "flex",
			flexWrap: "nowrap",
			overflowX: "auto",
			WebkitOverflowScrolling: "touch",

			[theme.breakpoints.down("xs")]: {
				maxWidth: getScreenWidth() - 60
			}
		},
		block: {
			flex: 1
		},
		titleText: {
			fontFamily: fontFamilyDemiBold,
			fontSize: 19,
			marginBottom: 20
		}
	};
};

const SalesSourceCard = ({ classes, token, on_sale, cubeApiUrl, ...rest }) => {
	const title = "Sales Source";

	return (
		<CollapseCard title={title} className={classes.root}>
			<Hidden smDown>
				<Typography className={classes.titleText}>{title}</Typography>
			</Hidden>

			<div className={classes.scroll}>
				<div className={classes.block}>
					<PageViewsTable
						cubeApiUrl={cubeApiUrl}
						token={token}
						startDate={on_sale}
					/>
				</div>
			</div>
		</CollapseCard>
	);
};

SalesSourceCard.propTypes = {
	classes: PropTypes.object.isRequired,
	token: PropTypes.string.isRequired,
	on_sale: PropTypes.string.isRequired,
	cubeApiUrl: PropTypes.string.isRequired
};

export default withStyles(styles)(SalesSourceCard);
