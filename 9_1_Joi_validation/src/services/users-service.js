const users = [];

module.exports = {
  createUser: (userParams) => {
    const findedUser = users.find((user) => user.email === userParams.email);
    if (findedUser === undefined) {
      users.push(userParams);
      return userParams;
    } else {
      return null;
    }
  },
  getUsers: () => users,
  getUserByEmail: (email) => {
    const findedUser = users.find((user) => user.email === email);
	findedUser ? findedUser : null
  },
  getUsersWithOnlyEmails: () => users.map((user) => ({ email: user.email })),

  changeUsersPassword: (id, password) => {
    const user = users[id];
    if (user === undefined) {
      return null
    } else {
      users[id].password = password;
      return users[id]
    }

  },
  deleteUser: (id) => {
    if (users[id]) {
     users.splice(id, 1)
     return users
    } else {
      return null
    }
  }

};
