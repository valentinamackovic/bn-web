import moment from "moment-timezone";
import notifications from "../notifications";
import Bigneon from "../../helpers/bigneon";

//TODO separate artists and ticketTypes into their own stores

class EventUpdate {
	id = null;

	loadDetails(id) {
		this.id = id;

		//TODO
	}
}

export default EventUpdate;
