import express from "express";

const termsRouter = express.Router();

termsRouter.get("/", (req, res) => {
	res.render("terms-of-service", { title: "Express" });
});

export default termsRouter;
