import Post from "../models/Post.js";
import { isEmpty } from "../utils/documentoUtils.js";
import { port } from "../environment_vars.js";
import { uploadFolder } from "../middlewares/uploadImage.js";

export const postPost = async (req, res) => {
	const { title, text, user } = req.body;
	const file = req.file;

	if (isEmpty(title)) {
		return res.status(422).send({ message: "Title is required!" });
	}
	if (isEmpty(user)) {
		return res.status(422).send({ message: "A user must be specified!" });
	}
	if (isEmpty(text) && isEmpty(file)) {
		return res.status(422).send({ message: "Some content is required!" });
	}

	const post = { title, text, user };

	if (file) {
		post.fileoriginalname = file.originalname;
		post.filename = file.filename;
		post.filepath = `${uploadFolder}/${file.filename}`;
	}

	try {
		await Post.create(post);
		res.status(201).json({ message: "Post created with success!" });
	} catch (error) {
		const errorMessage = isEmpty(error) ? "Internal server error." : error;
		res.status(500).json({ message: errorMessage });
	}
};

export const findAllPosts = async (req, res) => {
	const { title } = req.query;
	let posts;
	try {
		if (title) {
			posts = await Post.find({ title });
		} else {
			posts = await Post.find();
		}

		if (!posts) {
			res.state(422).json({ message: "Posts not found!" });
			return;
		}

		res.status(200).json(posts);
	} catch (error) {
		const errorMessage = isEmpty(error) ? "Internal server error." : error;
		res.status(500).json({ message: errorMessage });
	}
};
