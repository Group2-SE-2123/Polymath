import express from "express";
var router = express.Router();


/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("privacy_policy", );
});

export { router as privacyRouter };
