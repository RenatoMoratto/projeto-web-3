const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../environment_vars");
const { isEmpty } = require("../utils/documentoUtils");
const User = require("../models/User");

authRouter.post("/register", async (req, res) => {
	const { name, email, password } = req.body;

	if (isEmpty(name)) {
		return res.status(422).send({ message: "Name is required!" });
	}
	if (isEmpty(email)) {
		return res.status(422).send({ message: "Email is required!" });
	}
	if (isEmpty(password)) {
		return res.status(422).send({ message: "Password is required!" });
	}

	try {
		const userExists = await User.findOne({ email: email });

		if (userExists) {
			return res.status(400).send("Email already in use!");
		}

		const hashPassword = await bcrypt.hash(password, 10);
		const user = { name, email, password: hashPassword };

		await User.create(user);
		res.status(201).json({ message: "User register with success!" });
	} catch (error) {
		const errorMessage = isEmpty(error) ? "Internal server error." : error;
		res.status(500).json({ erro: errorMessage });
	}
});

authRouter.post("/login", async (req, res) => {
	const { email, password } = req.body;

	if (isEmpty(email)) {
		return res.status(422).send({ message: "Name is required!" });
	}
	if (isEmpty(password)) {
		return res.status(422).send({ message: "Email is required!" });
	}

	try {
		const user = await User.findOne({ email: email });

		if (!user) {
			return res.status(404).send("User not found!");
		}

		const validatePassword = await bcrypt.compare(password, user.password);

		if (!validatePassword) {
			return res.status(401).send("Email and/or password are incorrect!");
		}

		const token = await jwt.sign({ id: user._id }, jwt_secret);

		res.status(200).send({ access_token: token });
	} catch (error) {
		const errorMessage = isEmpty(error) ? "Internal server error." : error;
		res.status(500).json({ erro: errorMessage });
	}
});

module.exports = authRouter;
