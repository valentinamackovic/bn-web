import React from "react";
import Card from "../../../../elements/Card";
import Grid from "@material-ui/core/Grid";
import ArtistSummary from "../../../../elements/event/ArtistSummary";
import Divider from "../../../../common/Divider";
import optimizedImageUrl from "../../../../../helpers/optimizedImageUrl";

const ArtistsOverview = ({ classes, artist }) => {
	const { thumb_image_url, image_url } = artist;

	let imageSrc =
		thumb_image_url || image_url || "/images/artist-placeholder.png";
	imageSrc = optimizedImageUrl(imageSrc);
	return (
		<Card variant={"form"} className={classes.artistsOverviewCard}>
			<div
				className={classes.artistImage}
				style={{
					backgroundImage: `url(${imageSrc})`
				}}
			/>
		</Card>
	);
};
export default ArtistsOverview;
