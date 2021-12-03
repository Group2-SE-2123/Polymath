import express from "express";
import questionRouter from "./question";
import userRouter from "./user";
import userDetailRouter from "./userdetail";

const apiRouter = express.Router();

apiRouter.use("/questions", questionRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/userdetail", userDetailRouter);

export default apiRouter;
