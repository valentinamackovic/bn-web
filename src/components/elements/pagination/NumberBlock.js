import React from "react";
import classnames from "classnames";
import { Typography } from "@material-ui/core";

const NumberBlock = ({ classes, active, onClick, page }) => {
	return (
		<div
			onClick={onClick}
			className={classnames({
				[classes.pageNumberContainer]: true,
				[classes.activePageNumberContainer]: active
			})}
			style={{ cursor: onClick ? "pointer" : "default" }}
		>
			<Typography
				className={classnames({
					[classes.pageNumber]: true,
					[classes.activePageNumber]: active
				})}
			>
				{page}
			</Typography>
		</div>
	);
};

export default NumberBlock;
