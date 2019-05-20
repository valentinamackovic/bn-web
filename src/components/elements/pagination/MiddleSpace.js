import React from "react";
import classnames from "classnames";
import { Typography } from "@material-ui/core";

const MiddleSpace = props => {
	const { classes, onClick } = props;
	return (
		<div
			onClick={onClick}
			className={classnames({
				[classes.pageNumberContainer]: true
			})}
			style={{ cursor: onClick ? "pointer" : "default" }}
		>
			<Typography
				className={classnames({
					[classes.pageNumber]: true
				})}
			>
				-
			</Typography>
		</div>
	);
};

export default MiddleSpace;
