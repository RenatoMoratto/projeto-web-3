const router = require("express").Router();
const quoteRouter = require("./quote");

router.use(quoteRouter);

module.exports = router;
