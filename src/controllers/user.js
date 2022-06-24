const userRouter = require("express").Router();
const User = require("../models/User");

userRouter.get("/users", async (req, res) => {
	try {
		const users = await User.find();
		res.status(201).json(users);
	} catch (error) {
		const errorMessage = isEmpty(error) ? "Internal server error." : error;
		res.status(500).json({ erro: errorMessage });
	}
});

userRouter.get("/user/:id", async (req, res) => {
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
});

module.exports = userRouter;
