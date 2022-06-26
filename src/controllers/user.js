import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { jwt_secret } from "../environment_vars.js";
import { isEmpty } from "../utils/documentoUtils.js";

export const postUser = async (req, res) => {
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
};

export const authenticateUser = async (req, res) => {
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
			return res.status(401).send("Incorrect password!");
		}

		const token = await jwt.sign({ id: user._id }, jwt_secret);

		res.status(200).send({ access_token: token });
	} catch (error) {
		const errorMessage = isEmpty(error) ? "Internal server error." : error;
		res.status(500).json({ erro: errorMessage });
	}
};

export const findAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(201).json(users);
	} catch (error) {
		const errorMessage = isEmpty(error) ? "Internal server error." : error;
		res.status(500).json({ erro: errorMessage });
	}
};

export const findUserById = async (req, res) => {
	const id = req.params.id;

	try {
		const user = await User.findOne({ _id: id });

		if (!user) {
			res.state(422).json({ message: "User not found!" });
			return;
		}

		res.status(200).json(user);
	} catch (error) {
		const errorMessage = isEmpty(error) ? "Internal server error." : error;
		res.status(500).json({ erro: errorMessage });
	}
};
