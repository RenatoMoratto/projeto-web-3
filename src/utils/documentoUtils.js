export const isEmpty = value => {
	if (typeof value === "string") {
		return value.trim().length === 0;
	}
	for (let prop in value) {
		if (value.hasOwnProperty(prop)) return false;
	}
	return true;
};

export const diacriticSensitiveRegex = (string = "") => {
	return string
		.replace(/a/g, "[a,á,à,ä,â]")
		.replace(/A/g, "[A,a,á,à,ä,â]")
		.replace(/e/g, "[e,é,ë,è]")
		.replace(/E/g, "[E,e,é,ë,è]")
		.replace(/i/g, "[i,í,ï,ì]")
		.replace(/I/g, "[I,i,í,ï,ì]")
		.replace(/o/g, "[o,ó,ö,ò]")
		.replace(/O/g, "[O,o,ó,ö,ò]")
		.replace(/u/g, "[u,ü,ú,ù]")
		.replace(/U/g, "[U,u,ü,ú,ù]");
};
