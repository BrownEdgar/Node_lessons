import bcrypt from "bcryptjs";
import express from "express";
import { signInSchema } from "../schemas/schemas.js";

const router = express.Router();

router.get("/", (req, res, next) => {
	return res.render("index");
});

router.post("/", async (req, res, next) => {
	try {
		const { users } = res.locals;
		const { email, password } = await signInSchema.validateAsync(req.body);

		const user = users.find((user) => user.email === email);

		const validPassword = bcrypt.compareSync(password, user.password);

		if (!user || !validPassword) {
			return res.status(400).json({ message: "Invalid email or password" });
		}

		return res.redirect("/users");
	} catch (err) {
		res.status(400).json({ message: "Invalid email or password" });
	}
});

export default router;
