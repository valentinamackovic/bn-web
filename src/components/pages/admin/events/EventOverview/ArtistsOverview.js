import React from "react";
import Card from "../../../../elements/Card";
import optimizedImageUrl from "../../../../../helpers/optimizedImageUrl";
import { Typography } from "@material-ui/core";
import classnames from "classnames";

const ArtistsOverview = ({ classes, artist }) => {
	const { thumb_image_url, image_url } = artist;

	let imageSrc =
		thumb_image_url || image_url || "/images/artist-placeholder.png";
	imageSrc = optimizedImageUrl(imageSrc);
	return (
		<Card
			variant={"form"}
			className={classnames({
				[classes.detailsCardStyle]: true,
				[classes.artistsOverviewCard]: true
			})}
		>
			<div
				className={classes.artistImage}
				style={{
					backgroundImage: `url(${imageSrc})`
				}}
			/>
			<div>
				<Typography className={classes.smallGreyCapTitle}>
					{artist.importance === 0 ? "Headline " : "Supporting "}act
				</Typography>
				<Typography className={classes.smallTitle}>{artist.name}</Typography>
			</div>
		</Card>
	);
};
export default ArtistsOverview;
