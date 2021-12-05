import express from "express";
import questionRouter from "./question";
import userRouter from "./user";

const router = express.Router();

router.use("/question", questionRouter);
router.use("/user", userRouter);

export default router;
