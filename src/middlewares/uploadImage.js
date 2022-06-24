import multer from "multer";
import crypto from "crypto";

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, "./uploads/"),
	filename: (req, file, cb) => {
		const fileExtension = file.originalname.split(".")[1];
		const newFilename = crypto.randomBytes(64).toString("hex");
		cb(null, `${newFilename}.${fileExtension}`);
	},
	fileFilter: (req, file, cb) => {
		const extensionImg = ["image/png", "image/jpg", "image/jpeg"].find(
			acceptedFormat => acceptedFormat === file.mimetype
		);

		if (extensionImg) {
			return cb(null, true);
		}
		return cb(null, false);
	},
});
const upload = multer({ storage });

export { storage, upload };
