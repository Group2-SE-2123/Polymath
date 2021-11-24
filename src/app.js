import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import questionRouter from "./api/question";
import termsRouter from "./routes/terms-of-service";

const app = express();

// view engine setup
app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/terms", termsRouter);
app.use("/api", questionRouter);

// error handler
app.get("*", (req, res) => {
	res.status(404).send("error");
});

export default app;
