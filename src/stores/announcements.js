import { observable, action } from "mobx";
import Bigneon from "../helpers/bigneon";
import notifications from "./notifications";

class Announcement {
	@observable
	messages = null;

	@observable
	message = null;

	@action
	refreshAnnouncements() {
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

	@action
	async getOrgAnnouncements() {
		try {
			const organization_id = localStorage.getItem("currentOrganizationId");
			const { data } = await Bigneon().organizations.announcements.index({
				organization_id
			});
			data.forEach(orgMsg => {
				this.message = orgMsg;
			});
		} catch (error) {
			notifications.showFromErrorResponse({
				error,
				defaultMessage: "Failed to load Announcements"
			});
		}
	}
}

const announcement = new Announcement();

export default announcement;
