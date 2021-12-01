import express from "express";
import questionRouter from "./question";

const apiRouter = express.Router();

apiRouter.use("/questions", questionRouter);

export default apiRouter;
