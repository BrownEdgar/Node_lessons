const ErrorMessages = {
	NOT_FOUND: "user with :id not found"
}


class Errors {
	static notfound(res, messages) {
		res.status(404).json({
			messages
		})
	}
}

module.exports = {
	Errors,
	ErrorMessages
}

