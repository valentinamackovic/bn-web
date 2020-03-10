import { observable, computed, action } from "mobx";
import Bigneon from "../helpers/bigneon";
import notifications from "./notifications";

class Announcement {
	@observable
	messages = "";

	@action
	refreshAnnouncement() {
		Bigneon()
			.announcements.index()
			.then(response => {
				const { data } = response.data;
				this.messages = data;
			})
			.catch(error => {
				notifications.showFromErrorResponse({
					error,
					defaultMessage: "Failed to load Announcements"
				});
			});
	}
}

const announcement = new Announcement();

export default announcement;
