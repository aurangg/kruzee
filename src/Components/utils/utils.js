export const callTime = (time) => {
	if (time === 12) {
		return time + ':00 pm';
	} else if (time === 0) {
		return '12:00 am';
	} else if (time > 12) {
		return time - 12 + ':00 pm';
	} else {
		return time + ':00 am';
	}
};

export const calTime = (time) => {
	if (time === 12) {
		return time + ':00 pm';
	} else if (time === 0) {
		return '12:00 am';
	} else if (time > 12) {
		return time - 12 + ':00 pm';
	} else {
		return time + ':00 am';
	}
};

export const applyTax = (price) => {
	const HST_Tax = (price / 100) * 13;
	return price + HST_Tax;
};
