import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import PageHeading from "../../../../../../elements/PageHeading";
import ColorTag from "../../../../../../elements/ColorTag";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
	headerContainer: {
		paddingBottom: 20
	},
	stepContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "flex-end"
	}
});

const Container = ({ title, children, iconUrl, step, classes }) => {
	return (
		<Fragment>
			<Grid
				container
				spacing={0}
				justify={"center"}
				className={classes.headerContainer}
			>
				<Grid item xs={8} sm={8} lg={6}>
					<PageHeading iconUrl={iconUrl}>{title}</PageHeading>
				</Grid>
				<Grid item xs={4} sm={4} lg={6} className={classes.stepContainer}>
					<ColorTag size={"large"} rounded>
						STEP {step} / 2
					</ColorTag>
				</Grid>
			</Grid>

			{children}
		</Fragment>
	);
};

Container.propTypes = {
	title: PropTypes.string.isRequired,
	iconUrl: PropTypes.string.isRequired,
	children: PropTypes.any.isRequired,
	classes: PropTypes.object.isRequired,
	step: PropTypes.number.isRequired
};

export default withStyles(styles)(Container);
