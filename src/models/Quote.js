const mongoose = require("mongoose");

const Quote = mongoose.model("Quote", {
	author: { type: String, required: true },
	en: { type: String, required: true },
});

module.exports = Quote;
