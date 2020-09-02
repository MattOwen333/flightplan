const express = require("express");
const groupsRouter = express.Router();
const jwt = require("jsonwebtoken");
const { requireUser } = require("./utils");
const {
  getAllGroups,
  createGroup,
  getGroupById,
  addUserToGroup,
} = require("../db");

groupsRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

groupsRouter.get("/", async (req, res) => {
  try {
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

// need a route to JOIN a group
groupsRouter.post("/:id/join", requireUser, async (req, res, next) => {
  const creatorId = req.user.id;
  try {
    const joinGroup = await addUserToGroup(creatorId);
    // read the user id off of req.user.id
    // in here you will use a DB function called addUserToGroup(id)
    // return the result of the user signing up
    res.send({ joinGroup });
  } catch (error) {
    next(error);
  }
});

// groupsRouter.delete(':id', requireUser, async (req, res, next) =>
//     const id = req.params.id;
//     // you'd want to use deleteGroupById(id);
//     // when a user hits /api/groups/7 with a DELETE request...
// })

routinesRouter.post(
  "/:routineId/activities",
  requireUser,
  async (req, res, next) => {
    const { activityId, count, duration } = req.body;
    const { routineId } = req.params;

    // await getRoutineById and then use next?

    const routine = await addActivityToRoutine({
      routineId,
      activityId,
      count,
      duration,
    });

    res.send({
      routine,
    });
  }
);

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
