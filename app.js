import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { db_connection_string, port } from "./src/environment_vars.js";
import router from "./src/routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

try {
	await mongoose.connect(db_connection_string);
	console.log("Connected to database");
	app.listen(port, console.log(`Server is listening on port ${port}`));
} catch (error) {
	console.log(error);
}
