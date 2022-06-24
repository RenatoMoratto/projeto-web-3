import express from "express";
import { postUser, authenticateUser, findAllUsers, findUserById } from "./controllers/user.js";
import { postQuote, findAllQuotes, findQuoteById, findRandomQuote } from "./controllers/quote.js";

const router = express.Router();

// User Endpoints
router.post("/register", postUser);
router.post("/login", authenticateUser);
router.get("/users", findAllUsers);
router.get("/user/:id", findUserById);

// Quotes Endpoints
router.post("/quote", postQuote);
router.get("/quotes", findAllQuotes);
router.get("/quote/:id", findQuoteById);
router.get("/quotes/random", findRandomQuote);

export default router;
