import express from "express";
// import prisma from "~/prisma/db";

import { getLatestSession } from "~/src/controller/user";

const router = express.Router();

router.get("/latest", async (req, res) => {
	const session = await getLatestSession(req.body.id);
	res.send(session);
});

export default router;
