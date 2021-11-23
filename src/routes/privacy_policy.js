import express from "express";

const privacyRouter = express.Router();

privacyRouter.get("/", (req, res) => {
	res.render("privacy_policy", { title: "Express" });
});

export default privacyRouter;
