import React from "react";
import PropTypes from "prop-types";
import { Typography, withStyles } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";

import DateTimePickerGroup from "../../../../../../common/form/DateTimePickerGroup";
import FormatInputLabel from "../../../../../../elements/form/FormatInputLabel";
import IconButton from "../../../../../../elements/IconButton";
import CheckBox from "../../../../../../elements/form/CheckBox";

const styles = theme => ({
	root: {
		display: "flex"
	},
	image: {
		height: 138,
		width: 176,
		borderRadius: 0
	},
	content: {
		padding: 10,
		display: "flex",
		flex: 2,

		[theme.breakpoints.down("sm")]: {
			paddingLeft: theme.spacing.unit,
			paddingBottom: theme.spacing.unit / 2
		}
	},
	leftColumn: {
		flex: 1,
		[theme.breakpoints.down("sm")]: {
			flex: 4
		}
	},
	rightColumn: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end",
		justifyContent: "space-between"
	},
	icon: {
		width: 10,
		height: 10
	}
});

const ArtistCard = props => {
	const {
		classes,
		imgUrl,
		title,
		setTime,
		onChangeSetTime,
		onDelete,
		error,
		onBlur,
		socialAccounts,
		importance,
		onChangeImportance
	} = props;

	return (
		<div className={classes.root}>
			<CardMedia className={classes.image} image={imgUrl} title={"Artist"}/>
			<div className={classes.content}>
				<div className={classes.leftColumn}>
					<Typography>{title}</Typography>
				</div>

				<div className={classes.rightColumn}>
					<IconButton
						iconClass={classes.icon}
						onClick={onDelete}
						iconUrl="/icons/delete-active.svg"
					>
						Delete
					</IconButton>

					<CheckBox
						size={"small"}
						active={importance === 0}
						onClick={() => {
							onChangeImportance(importance);
						}}
					>
						Headline act
					</CheckBox>
				</div>
			</div>
		</div>
	);
};

ArtistCard.propTypes = {
	classes: PropTypes.object.isRequired,
	imgUrl: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	setTime: PropTypes.object,
	onChangeSetTime: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	error: PropTypes.object,
	onBlur: PropTypes.func,
	socialAccounts: PropTypes.object.isRequired,
	importance: PropTypes.number.isRequired,
	onChangeImportance: PropTypes.func
};

export default withStyles(styles)(ArtistCard);
