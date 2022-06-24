import jwt from "jsonwebtoken";
import { jwt_secret } from "../environment_vars.js";

export const isEmpty = value => {
	if (typeof value === "string") {
		return value.trim().length === 0;
	}
	for (let prop in value) {
		if (value.hasOwnProperty(prop)) return false;
	}
	return true;
};

export const verifyToken = (req, res, next) => {
	const authorization = req.headers.authorization;
	const token = authorization?.split(" ")[1];

	if (!token) {
		return res.status(401).send({ message: "Unauthorized: Access token is missing." });
	}

	try {
		jwt.verify(token, jwt_secret);
		next();
	} catch (error) {
		res.status(400).send({ message: "Invalid access token!" });
	}
};
