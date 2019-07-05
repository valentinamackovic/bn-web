export const dollars = (cents, trimDecimalIfZero = false, prefix = "$") => {
	if (!cents) {
		return `${prefix}0`;
	}

	const dollars = cents / 100;

	if (trimDecimalIfZero && dollars % 1 === 0) {
		return `${prefix}${dollars.toFixed(0)}`;
	}

	return `${prefix}${(cents / 100).toFixed(2)}`;
};
