import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import termsRouter from "./routes/terms-of-service";
import privacyRouter from "./routes/privacy_policy";

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
app.use("/privacy", privacyRouter);

// error handler
app.get("*", (req, res) => {
	res.status(404).send("error");
});

export default app;
