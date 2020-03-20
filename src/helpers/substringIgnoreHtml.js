export default (string, length) => {
	const regex = /<([^>\s]*)[^>]*>/g,
		stack = [];
	let search,
		lastIndex = 0,
		result = "";

	//for each tag, while we don't have enough characters
	while ((search = regex.exec(string)) && length) {
		//get the text substring between the last tag and this one
		const temp = string.substring(lastIndex, search.index).substr(0, length);
		//append to the result and count the number of characters added
		result += temp;
		length -= temp.length;
		lastIndex = regex.lastIndex;

		if (length) {
			result += search[0];
			if (search[1].indexOf("/") === 0) {
				//if this is a closing tag, than pop the stack (does not account for bad html)
				stack.pop();
			} else if (search[1].lastIndexOf("/") !== search[1].length - 1) {
				//if this is not a self closing tag than push it in the stack
				stack.push(search[1]);
			}
		}
	}

	//add the remainder of the string, if needed (there are no more tags in here)
	result += string.substr(lastIndex, length) + "...";

	//fix the unclosed tags
	while (stack.length) {
		result += "</" + stack.pop() + ">";
	}

	return result;
};