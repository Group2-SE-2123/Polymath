import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import questionRouter from "./api/question";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), "public")));
app.use("/api", questionRouter);

// error handler
app.get("*", (req, res) => {
	res.status(404).send("error");
});

export default app;
