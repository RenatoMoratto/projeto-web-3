const isEmpty = value => {
	if (typeof value === "string") {
		return value.trim().length === 0;
	}
	for (let prop in value) {
		if (value.hasOwnProperty(prop)) return false;
	}
	return true;
};

module.exports = { isEmpty };
