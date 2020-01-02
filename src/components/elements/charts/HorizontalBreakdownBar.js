import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import { fontFamilyDemiBold } from "../../../config/theme";
import Tooltip from "../Tooltip";

const styles = {
	root: {
		flex: 1
	},
	title: {
		fontFamily: fontFamilyDemiBold
	},
	bar: {
		flex: 1,
		display: "flex",
		borderRadius: 10,
		height: 14,
		overflow: "auto"
	},
	section: {
		height: "100%"
	}
};

const colors = ["#707ced", "#afc6d4", "#ff22b2"];

const HorizontalBreakdownBar = props => {
	const { title, classes, values } = props;

	return (
		<div className={classes.root}>
			{title ? (
				<Typography className={classes.title}>{title}</Typography>
			) : null}
			<div className={classes.bar}>
				{values.map(({ label, value }, index) => {
					let marginRight = 0;

					//Dont add spacing to last element and if next value is a zero value
					const nextEntry = values[index + 1];
					if (value && nextEntry && nextEntry.value > 0) {
						marginRight = 4;
					}

					return (
						<Tooltip key={index} title={`${value}`} text={label}>
							<div
								className={classes.section}
								style={{
									flex: value,
									backgroundColor: colors[index],
									marginRight
								}}
							/>
						</Tooltip>
					);
				})}
			</div>
		</div>
	);
};

HorizontalBreakdownBar.propTypes = {
	classes: PropTypes.object.isRequired,
	title: PropTypes.string,
	values: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			value: PropTypes.number.isRequired
		}).isRequired
	)
};

export default withStyles(styles)(HorizontalBreakdownBar);
