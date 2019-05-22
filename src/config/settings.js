import checkWebPFeature from "../helpers/checkWebPFeature";

let settings;

export const settingsFactory = () => {
	if (!settings) {
		settings = {
			promoImageAspectRatio: 1920 / 1080,
			webPSupported: null //Does the browser support next gen image formats
			//TODO add all process.env variables here
		};

		checkWebPFeature("lossy", isSupported => {
			settings.webPSupported = isSupported;
		});
	}

	return settings;
};

export default settingsFactory;
