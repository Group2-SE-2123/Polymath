import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import flash from "connect-flash";

import passportStrategy from "./strategy/passport-strategy";
import jwtStrategy from "./strategy/jwt-strategy";
import corsConfig from "./config/cors-config";

import apiRouter from "./api";
import authRouter from "./auth";

if (process.env.NODE_ENV !== "production") {
	// eslint-disable-next-line global-require
	require("dotenv").config();
}

const app = express();

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsConfig));
app.use(flash());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());
passportStrategy(passport);
jwtStrategy(passport);

// apis
app.use("/api", apiRouter);
app.use("/auth", authRouter);

// error handler
app.get("*", (req, res) => {
	res.status(404).send("error");
});

export default app;
