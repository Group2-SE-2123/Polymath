import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import flash from "connect-flash";
import path from "path";
import dotenv from "dotenv";

import passportStrategy from "./strategy/passport-strategy";
import jwtStrategy from "./strategy/jwt-strategy";
import corsConfig from "./config/cors-config";

import apiRouter from "./api";
import authRouter from "./auth";

const app = express();
dotenv.config();

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

// dev/prod cases
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/dist"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
	});
}

export default app;
