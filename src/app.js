import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import apiRouter from "./api";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api", apiRouter);

// error handler
app.get("*", (req, res) => {
	res.status(404).send("error");
});

export default app;
