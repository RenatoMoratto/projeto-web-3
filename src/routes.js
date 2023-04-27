import express from "express";
import { postUser, authenticateUser, findUserByEmail, findUserById } from "./controllers/user.js";
import { postQuote, findAllQuotes, findRandomQuote } from "./controllers/quote.js";
import { postPost, findAllPosts, findPostsByTitle } from "./controllers/post.js";
import { verifyToken } from "./middlewares/authenticate.js";
import { upload, uploadFolder } from "./middlewares/uploadImage.js";

const router = express.Router();

// User Endpoints
router.post("/register", postUser);
router.post("/login", authenticateUser);
router.get("/user", verifyToken, findUserByEmail);
router.get("/user/:id", verifyToken, findUserById);

// Quotes Endpoints
router.post("/quote", verifyToken, postQuote);
router.get("/quotes", verifyToken, findAllQuotes);
router.get("/quotes/random", verifyToken, findRandomQuote);

// Posts Endpoints
router.use("/uploads", express.static(uploadFolder));
router.post("/post", verifyToken, upload.single("file"), postPost);
router.get("/posts", verifyToken, findAllPosts);
router.get("/postsByTitle", verifyToken, findPostsByTitle);

export default router;
