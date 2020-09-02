const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { requireUser } = require("./utils");

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

const {
  getAllUsers,
  createUser,
  getUserByUsername,
  deleteUser,
  getUserById,
} = require("../db");

usersRouter.get("/", async (req, res) => {
  const users = await getAllUsers();

  res.send({
    users,
  });
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      let currentUser = {
        username: `${username}`,
        token: `${token}`,
      };
      // localStorage.setItem("currentUser", currentUser);
      // console.log("CURRENT USER:", currentUser);
      console.log(user.id);
      res.send({ message: `Hello, ${username}`, token });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, name, email, location } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    }

    const user = await createUser({
      username,
      password,
    });

    const token = jwt.sign(
      {
        id: user[0].id,
        username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );
    res.send({
      message: `Thanks for signing up ${username}`,
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.delete("/:userId", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.userId);

    const deleted = await deleteUser(user.id);

    res.send({ user: deleted });
    next();
  } catch ({ name, message }) {
    next({ name, message });
  }
});
module.exports = usersRouter;
