const router = require("express").Router();
const quoteRouter = require("./quote");
const userRouter = require("./user");

router.use(quoteRouter);
router.use(userRouter);

module.exports = router;
