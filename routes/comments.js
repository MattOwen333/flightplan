const express = require("express");
const commentsRouter = express.Router();
const jwt = require("jsonwebtoken");
const { requireUser } = require("./utils");
const { getAllComments, createComment } = require("../db");

commentsRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

commentsRouter.get("/", async (req, res) => {
  const users = await getAllComments();

  res.send({
    users,
  });
});

groupsRouter.post("/", requireUser, async (req, res, next) => {
  try {
    const { userId, groupId, content } = req.body;
    const createdGroup = await createComment({ userId, groupId, content });
    res.send(createdGroup);
  } catch (error) {
    next(error);
  }
});

module.exports = commentsRouter;
