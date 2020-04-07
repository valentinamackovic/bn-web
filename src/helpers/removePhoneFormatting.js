export default formatted => {
	return formatted
		.replace(/[\s-.*?^${}()|[\]\\]/g, "");
};
