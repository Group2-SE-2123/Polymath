import express from "express";
import { uploadMiddleware } from "../middleware";

const router = express.Router();

router.post("/file", uploadMiddleware.single("upload"), (req, res) => {
	res.send("File uploaded");
});

export default router;
