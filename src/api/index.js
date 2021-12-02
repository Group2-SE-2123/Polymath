import express from "express";
import questionRouter from "./question";
import userRouter from "./user";

const apiRouter = express.Router();

apiRouter.use("/question", questionRouter);
apiRouter.use("/user", userRouter);

export default apiRouter;
