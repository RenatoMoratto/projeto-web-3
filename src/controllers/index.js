const router = require("express").Router();
const quoteRouter = require("./quote");
const userRouter = require("./user");
const authRouter = require("./auth");

router.use(quoteRouter);
router.use(userRouter);
router.use(authRouter);

module.exports = router;
