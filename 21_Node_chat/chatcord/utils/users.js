const users = [];

// այստեղ պահում ենք բոլոր "user"-րին
function userJoin(id, username, room) {
	const user = { id, username, room };

	users.push(user);

	return user;
}

// Ստանում ենք "user"-ին
function getCurrentUser(id) {
	return users.find(user => user.id === id);
}

// Եթե "user"-ը դուր է գալիս սենյակից ջնջում ենք
function userLeave(id) {
	const index = users.findIndex(user => user.id === id);

	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
}

// Այստեղ Ստանում ենք "room"-ի "user"-ին
function getRoomUsers(room) {
	return users.filter(user => user.room === room);
}

module.exports = {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers
};
