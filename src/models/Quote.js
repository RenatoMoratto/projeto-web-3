import mongoose from "mongoose";

const Quote = mongoose.model("Quote", {
	author: { type: String, required: true },
	en: { type: String, required: true },
});

export default Quote;
