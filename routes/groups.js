const express = require("express");
const groupsRouter = express.Router();
const jwt = require("jsonwebtoken");
const { requireUser } = require("./utils");
const { getAllGroups, createGroup, getGroupById } = require("../db");

groupsRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

groupsRouter.get("/", async (req, res) => {
  const groups = await getAllGroups();

  res.send({
    groups,
  });
});

groupsRouter.get("/", async (req, res, next) => {
  const groups = await getUserGroupWithComments(req.user.id);

  res.send({ groups });
});

groupsRouter.post("/", requireUser, async (req, res, next) => {
  try {
    const { name, time, location } = req.body;
    const createdGroup = await createGroup({ name, time, location });
    res.send(createdGroup);
  } catch (error) {
    next(error);
  }
});

module.exports = groupsRouter;
