import Routes from "./routes/Routes";
import React from "react";
import { Helmet } from "react-helmet";

class Application extends React.Component {
	render() {
		return (
			<div>
				<Helmet>
					{process.env.NODE_ENV !== "production" ? (
						<meta name="robots" content="noindex"/>
					) : null}
				</Helmet>
				<Routes/>
			</div>
		);
	}
}
export default Application;
