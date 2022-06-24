const express = require("express");
const mongoose = require("mongoose");
const { db_connection_string, port } = require("./src/environment_vars");
const router = require("./src/controllers/index");

const app = express();

app.use(express.json());

app.use("/", router);

mongoose
	.connect(db_connection_string)
	.then(() => {
		console.log("Connected to database");

		app.listen(port, () => console.log(`Server is listening on port ${port}`));
	})
	.catch(error => console.log(error));
