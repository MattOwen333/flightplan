const express = require("express");
const groupsRouter = express.Router();
const jwt = require("jsonwebtoken");
const { requireUser } = require("./utils");
const {
  getAllGroups,
  createGroup,
  getGroupById,
  addUserToGroup,
  deleteGroupById,
} = require("../db");

groupsRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

groupsRouter.get("/", async (req, res, next) => {
  try {
    console.log("THIS IS GROUPS CONSOLE LOG");
    const groups = await getAllGroups();

    res.send({
      groups,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/groups/mine
groupsRouter.get("/mine", requireUser, async (req, res, next) => {
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

groupsRouter.post("/:id/join", requireUser, async (req, res, next) => {
  const creatorId = req.user.id;
  try {
    const joinGroup = await addUserToGroup(creatorId);
    res.send({ joinGroup });
  } catch (error) {
    next(error);
  }
});

groupsRouter.delete("/:id", requireUser, async (req, res, next) => {
  const id = req.params.id;
  try {
    const deleteGroup = await deleteGroupById(id);
    res.send({ deleteGroup });
  } catch (error) {
    next(error);
  }
});

module.exports = groupsRouter; // from /index.js to /routes/index.js we get /api/groups/

/**
 * You'll do this in index.js:
 *
 * const groupRoutes = require('./groups');
 * server.use('/groups', groupRoutes);
 *
 * GET /api/groups/3 => should give me a group with id 3
 * GET /api/users => should give me all users
 * POST /api/comments => should make a new comment
 * PATCH /api/users/7 => should update user 7's info
 */
