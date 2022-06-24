import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Post = mongoose.model("Post", {
	title: {
		type: String,
		required: true,
	},
	text: String,
	fileoriginalname: String,
	filename: String,
	filepath: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

export default Post;
