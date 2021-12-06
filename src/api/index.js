import express from "express";
import questionRouter from "./question";
import userRouter from "./user";
import testRouter from "./test";

const router = express.Router();

router.use("/question", questionRouter);
router.use("/user", userRouter);
router.use("/test", testRouter);

export default router;
