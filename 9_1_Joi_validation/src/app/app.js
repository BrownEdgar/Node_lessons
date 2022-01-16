const express = require("express");
const usersRouter = require("./api/users.router");

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use("/users",usersRouter)





app.listen(8000, () => {
  console.log("Server starts");
});
