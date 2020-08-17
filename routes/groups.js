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
  const users = await getAllGroups();

  res.send({
    users,
  });
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
