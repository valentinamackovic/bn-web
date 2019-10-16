import React from "react";
import { Helmet } from "react-helmet";

//Reference: https://github.com/nfl/react-helmet

const Meta = props => {
	return (
		<Helmet
			title={`Concert Tickets ${props.orgName} ${
				props.cityName
			}- Big Neon`}
			meta={[
				{
					property: "og:title",
					content: "Big Neon - The new standard in event ticketing"
				},
				{ property: "og:type", content: "website" },
				{ property: "og:url", content: "https://www.bigneon.com" },
				{
					property: "og:description",
					content:
						"Big Neon - Mobile-first event ticketing. We’re relentlessly focused on serving the needs of independent live music promoters."
				},
				{
					property: "og:image",
					content: "https://www.bigneon.com/site/images/bigneon-screen-app.png"
				},
				{ name: "twitter:site", content: "bigneon.com" },
				{ name: "twitter:creator", content: "bigneon" },
				{
					name: "twitter:title",
					content: "Big Neon - The new standard in event ticketing"
				},
				{
					name: "twitter:image",
					content: "https://www.bigneon.com/site/images/bigneon-screen-app.png"
				},
				{
					name: "description",
					content: `Concert Tickets ${props.orgName} ${
						props.cityName
					}- Find tickets to live events and concerts on Big Neon.`
				}
			]}
			link={[
				{ rel: "canonical", href: "https://www.bigneon.com" },
				{
					rel: "image_src",
					href: "https://www.bigneon.com/site/images/home-logo.png"
				}
			]}
		/>
	);
};

export default Meta;
