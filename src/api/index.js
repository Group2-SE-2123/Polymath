import express from "express";
import questionRouter from "./question";
import userRouter from "./user";
import quizRouter from "./quiz";
import categoryRouter from "./category";
import testRouter from "./test";
import uploadRouter from "./upload";

const router = express.Router();

router.use("/question", questionRouter);
router.use("/user", userRouter);
router.use("/quiz", quizRouter);
router.use("/category", categoryRouter);
router.use("/test", testRouter);
router.use("/upload", uploadRouter);

export default router;
