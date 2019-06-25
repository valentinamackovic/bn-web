export default str => {
	//Derived from: https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
	//Improved to add iOS device compatibility
	const el = document.createElement("textarea");

	const storeContentEditable = el.contentEditable;
	const storeReadOnly = el.readOnly;

	el.value = str;
	el.contentEditable = "true";
	el.readOnly = false;
	el.setAttribute("readonly", false);
	el.setAttribute("contenteditable", true);
	el.style.position = "absolute";
	el.style.left = "-9999px";
	document.body.appendChild(el);
	const selected =
		document.getSelection().rangeCount > 0
			? document.getSelection().getRangeAt(0)
			: false;
	el.select();
	el.setSelectionRange(0, 999999);
	document.execCommand("copy");
	document.body.removeChild(el);
	if (selected) {
		document.getSelection().removeAllRanges();
		document.getSelection().addRange(selected);
	}

	el.contentEditable = storeContentEditable;
	el.readOnly = storeReadOnly;
};
