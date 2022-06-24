const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = mongoose.model("User", {
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

module.exports = User;
