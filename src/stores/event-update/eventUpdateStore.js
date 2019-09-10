import { observable, computed, action, decorate } from "mobx";
import EventUpdate from "./EventUpdate";

decorate(EventUpdate, {
	id: observable
});

const eventUpdateStore = new EventUpdate();

export default eventUpdateStore;
