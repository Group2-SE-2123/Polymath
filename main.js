import express from "express";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());
app.get("/", (req, res) => {
	res.send("What's Up");
});
app.listen(5000, () => {
	console.log(`app is listening to port 5000`);
});
