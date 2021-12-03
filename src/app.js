import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import passportConfig from "./utils/passport-config";

import apiRouter from "./api";
import authRouter from "./auth";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

// apis
app.use("/api", apiRouter);
app.use("/auth", authRouter);

// error handler
app.get("*", (req, res) => {
	res.status(404).send("error");
});

export default app;
