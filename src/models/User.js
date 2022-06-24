const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
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

userSchema.method("compare", async (enteredPassword, userPassword) => bcrypt.compare(enteredPassword, userPassword));

const User = mongoose.model("User", userSchema);

module.exports = User;
