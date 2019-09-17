import checkWebPFeature from "../helpers/checkWebPFeature";

let settings;

export const settingsFactory = () => {
	if (!settings) {
		let webUrl = process.env.REACT_APP_WEB_URL;
		if (webUrl.substring(webUrl.length - 1) == "/") {
			webUrl = webUrl.substring(0, webUrl.length - 1);
		}
		const { REACT_APP_SUPPORT_URL } = process.env;

		settings = {
			promoImageAspectRatio: 1920 / 1080,
			webPSupported: null, //Does the browser support next gen image formats
			webUrl,
			genericAppDownloadLink: process.env.REACT_APP_DOWNLOAD_APP,
			facebookLink: process.env.FACEBOOK_URL,
			instagramLink: process.env.INSTAGRAM_URL,
			reactAppSupportLink: process.env.REACT_APP_SUPPORT_URL,
			reactAppStoreIos: process.env.REACT_APP_STORE_IOS,
			reactAppStoreAndroid: process.env.REACT_APP_STORE_ANDROID
			//TODO add all process.env variables here
		};

		checkWebPFeature("lossy", isSupported => {
			settings.webPSupported = isSupported;
		});
	}

	return settings;
};

export default settingsFactory;
