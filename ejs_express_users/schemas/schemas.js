import joi from "joi";

export const signInSchema = joi.object({
	email: joi.string().email().lowercase().required(),
	password: joi
		.string()
		.pattern(/^[a-zA-Z0-9]{3,30}$/)
		.required(),
});

export const patchSchema = joi.object({
	id: joi.string().required(),
	name: joi.string().min(3).max(30).required(),
	email: joi.string().email().lowercase().required(),
	password: joi
		.string()
		.pattern(/^[a-zA-Z0-9]{3,30}$/)
		.required(),
	salary: joi.number().min(100).max(10000).required(),
	role: joi.string().valid("administrator", "manager", "driver", "courier").required(),
});

export const signUpSchema = joi.object({
	name: joi.string().min(3).max(30).required(),
	email: joi.string().email().lowercase().required(),
	password: joi
		.string()
		.pattern(/^[a-zA-Z0-9]{3,30}$/)
		.required(),
	repeat_password: joi.ref("password"),
	salary: joi.number().min(100).max(10000).required(),
	role: joi.string().valid("administrator", "manager", "driver", "courier").required(),
});
