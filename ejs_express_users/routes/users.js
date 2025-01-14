import bcrypt from "bcryptjs";
import express from "express";
import { patchSchema, signUpSchema } from "../schemas/schemas.js";
import { writeFileTo } from "../utils/helpers.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
	const { users } = res.locals;
	const { sort } = req.query;

	if (!sort) {
		return res.render("users", { users });
	}

	const [category, action] = sort.split("_");

	let sortedUsers = [];

	switch (category) {
		case "name":
			sortedUsers = users.toSorted((a, b) =>
				action === "asc"
					? a[category].localeCompare(b[category])
					: b[category].localeCompare(a[category]),
			);
			break;
		case "salary":
			sortedUsers = users.toSorted((a, b) =>
				action === "asc" ? a[category] - b[category] : b[category] - a[category],
			);
			break;
		case "date":
			sortedUsers = users.toSorted((a, b) =>
				action === "asc"
					? Date.parse(a[category]) - Date.parse(b[category])
					: Date.parse(b[category]) - Date.parse(a[category]),
			);
		default:
			break;
	}

	await writeFileTo("users.json", sortedUsers);
	res.locals.users = sortedUsers;
	return res.status(200).render("users", { users: sortedUsers });
});

router.get("/:id", (req, res, next) => {
	const { users } = res.locals;
	const { id } = req.params;

	const user = users.find((user) => user.id === id);

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	return res.status(200).json({ user });
});

router.post("/", async (req, res, next) => {
	try {
		const { users } = res.locals;
		const { password, repeat_password, ...body } = await signUpSchema.validateAsync(req.body);
		const passwordHash = bcrypt.hashSync(password, 10);

		const user = {
			id: crypto.randomUUID(),
			date: new Date(),
			password: passwordHash,
			...body,
		};

		const newUsers = [...users, user];

		await writeFileTo("users.json", newUsers);
		res.locals.users = newUsers;
		return res.status(201).render("users", { users: newUsers });
	} catch (err) {
		return res.status(400).json({ message: err.message });
	}
});

router.put("/", async (req, res, next) => {
	try {
		const newUsers = req.body;

		await writeFileTo("users.json", newUsers);
		res.locals.users = newUsers;
		return res.status(201).render("users", { users: newUsers });
	} catch (err) {
		return res.status(400).json({ message: err.message });
	}
});

router.patch("/:id", async (req, res, next) => {
	try {
		const { users } = res.locals;
		const { password, ...body } = await patchSchema.validateAsync(req.body);
		const user = users.find((user) => user.id === req.params.id);

		const validPassword = bcrypt.compareSync(password, user.password);

		if (!validPassword) {
			return res.status(400).json({ message: "Invalid password" });
		}

		const updatedUsers = users.map((user) => {
			if (user.id === req.params.id) {
				return {
					...user,
					...body,
					date: new Date(),
				};
			}
			return user;
		});

		await writeFileTo("users.json", updatedUsers);
		res.locals.users = updatedUsers;
		return res.status(201).render("users", { users: updatedUsers });
	} catch (err) {
		return res.status(400).json({ message: err.message });
	}
});

router.delete("/:id", async (req, res, next) => {
	const { users } = res.locals;
	const { id } = req.params;

	const user = users.find((user) => user.id === id);

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	const filteredUsers = users.filter((user) => user.id !== id);

	await writeFileTo("users.json", filteredUsers);
	res.locals.users = filteredUsers;
	return res.status(200).render("users", { users: filteredUsers });
});

export default router;
