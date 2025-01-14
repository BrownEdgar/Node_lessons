import cookieParser from "cookie-parser";
import express from "express";
import createError from "http-errors";
import logger from "morgan";
import { resolve } from "path";

import { getUsers } from "./middlewares/getUsers.js";
import indexRouter from "./routes/index.js";
import signUpRouter from "./routes/signUp.js";
import usersRouter from "./routes/users.js";

const app = express();

app.set("views", resolve("views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(resolve("public")));
app.use(getUsers);

app.use("/", indexRouter);
app.use("/signUp", signUpRouter);
app.use("/users", usersRouter);

app.use((req, res, next) => {
	next(createError(404));
});

app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	res.status(err.status || 500);
	res.render("error");
});

export default app;
