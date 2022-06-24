import Post from "../models/Post.js";
import { isEmpty } from "../utils/documentoUtils.js";

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
		post.filepath = file.destination;
	}
	try {
		await Post.create(post);
		res.status(201).json({ message: "Post created with success!" });
	} catch (error) {
		const errorMessage = isEmpty(error) ? "Internal server error." : error;
		res.status(500).json({ erro: errorMessage });
	}
};

export const findAllPosts = async (req, res) => {
	try {
		const posts = await Post.find();
		res.status(201).json(posts);
	} catch (error) {
		const errorMessage = isEmpty(error) ? "Internal server error." : error;
		res.status(500).json({ erro: errorMessage });
	}
};

export const findPostById = async (req, res) => {
	const id = req.params.id;

	try {
		const post = await Post.findOne({ _id: id });

		if (!post) {
			res.state(422).json({ message: "Post not found!" });
			return;
		}

		res.status(200).json(post);
	} catch (error) {
		const errorMessage = isEmpty(error) ? "Internal server error." : error;
		res.status(500).json({ erro: errorMessage });
	}
};
