import moment from "moment-timezone";
import notifications from "../notifications";
import Bigneon from "../../helpers/bigneon";
import { formatEventDataForInputs } from "../../components/pages/admin/events/update/step1/Step1";

//TODO separate artists and ticketTypes into their own stores
const freshEvent = formatEventDataForInputs({});

class EventUpdate {
	id = null;

	eventDetails = freshEvent;

	artists = [];

	loadDetails(id) {
		this.id = id;

		//TODO
	}

	updateEvent(eventDetails) {
		this.eventDetails = { ...this.eventDetails, ...eventDetails };

		//If they're updating the ID, update the root var
		const { id } = eventDetails;
		if (id) {
			this.id = id;
		}

		//Update the timezone if venue changes
		if (eventDetails.hasOwnProperty("venueId")) {
			const { venueId } = eventDetails;
			this.loadTimezone(venueId);
		}
	}

	loadTimezone(id) {
		Bigneon()
			.venues.read({ id })
			.then(response => {
				const { timezone } = response.data;
				//this.setTimezone(timezone);
			})
			.catch(error => {
				console.error(error);
				notifications.showFromErrorResponse({
					error,
					defaultMessage: "Failed to update event timezone."
				});
			});
	}

	addArtist(id) {
		const artists = this.artists;
		artists.push({
			id,
			setTime: null,
			importance: artists.length === 0 ? 0 : 1
		});

		this.artists.replace(artists);
	}
}

export default EventUpdate;
