const usersRouter = require("express").Router();
const usersService = require("../../services/users-service");

const createUser = (req, res) => {
  const createdUser = usersService.createUser(req.body);
  if (createdUser !== null) {
    res.json(createdUser);
  } else {
    res.status(409).json({
      message: "user olready exists",
    });
  }
};

const getUsers = (req, res) => {
  const users = usersService.getUsers();
  res.json(users);
};

const getUserByEmail = (req, res) => {
  const user = usersService.getUserByEmail(req.params.email);
  if (user !== null) {
    res.json(user);
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
};

const getUsersWithOnlyEmails = (req, res) => {
  const users = usersService.getUsersWithOnlyEmails();
  res.json(users)
};

const changePassword = (req, res) => {
  const user = usersService.changeUsersPassword(req.params.id, req.body.password)
  if (user === null) {
    res.status(404).json({
      message: "user not found"
    })
  } else {
    res.json(user)
  }
}

const deleteUser = (req,res) => {
  const user = usersService.deleteUser(req.params.id);
   if (user === null) {
    res.status(404).json({
      message: "user not found"
    })
   }else{
     res.json(user)
   }
}

usersRouter.get("/", getUsers);
usersRouter.get("/emails/:email", getUserByEmail);
usersRouter.get("/emails", getUsersWithOnlyEmails);
usersRouter.post("/", createUser);
usersRouter.put("/change/:id", changePassword);
usersRouter.delete("/delete/:id", deleteUser)

module.exports = usersRouter;
