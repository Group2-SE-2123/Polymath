import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";

dotenv.config();

const spacesEndpoint = new aws.Endpoint(process.env.DO_SPACES_ENDPOINT);
const s3 = new aws.S3({
	endpoint: spacesEndpoint,
	accessKeyId: process.env.DO_SPACES_KEY,
	secretAccessKey: process.env.DO_SPACES_SECRET,
});
const uploadMiddleware = multer({
	storage: multerS3({
		s3,
		bucket: process.env.DO_SPACES_NAME,
		acl: "public-read",
		key(req, file, cb) {
			cb(null, `quizImages/${Date.now().toString()}-${file.originalname}`);
		},
	}),
});

function testMiddleware(req, res, next) {
	console.log("Sample middleware");
	next();
}

export { uploadMiddleware, testMiddleware };
