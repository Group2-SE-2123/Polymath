import express from "express";

import { createCategory, editCategory } from "../controller/category";

const router = express.Router();

router.post("/createCategory", (req, res) => {
	const category = req.body;
	createCategory(category)
		.then((newCategory) => res.send(newCategory))
		.catch((err) => res.status(400).send(err));
});

router.put("/editCategory", (req, res) => {
	const { categoryId, newName } = req.body;
	editCategory(categoryId, newName)
		.then((edittedCategory) => res.send(edittedCategory))
		.catch((err) => res.status(400).send(err));
});

export default router;
