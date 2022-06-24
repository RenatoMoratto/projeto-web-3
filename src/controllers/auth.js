const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

authRouter.post("/register", async (req, res) => {
	const { name, email, password } = req.body;

	const hashPassword = await bcrypt.hash(password, 10);
	const user = { name, email, password: hashPassword };

	try {
		const userExists = await User.findOne({ email: email });

		if (userExists) {
			return res.status(400).send("Email already in use!");
		}

		await User.create(user);
		res.status(200).json({ message: "User register with success!" });
	} catch (error) {
		res.status(500).json({ erro: error });
	}
});

module.exports = authRouter;
