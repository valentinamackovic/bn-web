import { observable, computed, action, decorate } from "mobx";
import EventUpdate from "./EventUpdate";

decorate(EventUpdate, {
	id: observable,
	eventDetails: observable,
	artists: observable,
	addArtist: action
});

const eventUpdateStore = new EventUpdate();

export default eventUpdateStore;
