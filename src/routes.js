import express from "express";
import { postUser, authenticateUser, findAllUsers, findUserById } from "./controllers/user.js";
import { postQuote, findAllQuotes, findQuoteById, findRandomQuote } from "./controllers/quote.js";
import { postPost, findAllPosts, findPostById } from "./controllers/post.js";
import { verifyToken } from "./middlewares/authenticate.js";
import { upload } from "./middlewares/uploadImage.js";

const router = express.Router();

// User Endpoints
router.post("/register", verifyToken, postUser);
router.post("/login", authenticateUser);
router.get("/users", verifyToken, findAllUsers);
router.get("/user/:id", verifyToken, findUserById);

// Quotes Endpoints
router.post("/quote", verifyToken, postQuote);
router.get("/quotes", findAllQuotes);
router.get("/quote/:id", findQuoteById);
router.get("/quotes/random", findRandomQuote);

// Quotes Endpoints
router.post("/post", verifyToken, upload.single("file"), postPost);
router.get("/posts", findAllPosts);
router.get("/post/:id", findPostById);

export default router;
