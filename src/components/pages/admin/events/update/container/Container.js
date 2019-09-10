import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PageHeading from "../../../../../elements/PageHeading";
import ColorTag from "../../../../../elements/ColorTag";

const Container = ({ title, children, iconUrl }) => {
	return (
		<Grid container spacing={0} alignItems="center">
			<Grid item xs={6} sm={6} lg={6}>
				<div>
					<PageHeading iconUrl={iconUrl}>{title}</PageHeading>
					<ColorTag size={"large"} rounded>
						STEP 1 / 2
					</ColorTag>
				</div>
				{children}
			</Grid>
		</Grid>
	);
};

Container.propTypes = {
	title: PropTypes.string.isRequired,
	iconUrl: PropTypes.string.isRequired
};

export default Container;
