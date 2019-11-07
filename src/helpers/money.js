const numberWithCommas = x => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const dollars = (cents, trimDecimalIfZero = false, prefix = "$") => {
	if (!cents && cents !== 0) {
		return `${prefix}0`;
	}

	//Prepend the minus operator to currency symbol if cents is a negative value
	if (cents < 0) {
		prefix = `-${prefix}`;
		cents = cents * -1;
	}

	const dollars = cents / 100;

	if (trimDecimalIfZero && dollars % 1 === 0) {
		return `${prefix}${numberWithCommas(dollars.toFixed(0))}`;
	}

	return `${prefix}${numberWithCommas((cents / 100).toFixed(2))}`;
};
