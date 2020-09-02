// Connect to DB
const { Client } = require("pg");
const groupsRouter = require("../routes/groups");
const DB_NAME = "flightplan";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);

// database methods

async function createUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(username, password) 
        VALUES($1, $2) 
        ON CONFLICT (username) DO NOTHING 
        RETURNING *;
      `,
      [username, password]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM users;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username=$1
    `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE id=$1
    `,
      [userId]
    );
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
}

async function getGroupById(id) {
  try {
    const {
      rows: [group],
    } = await client.query(
      `
      SELECT * FROM group
      WHERE id = $1
    `,
      [id]
    );
    return group;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(userId) {
  await client.query(
    `
      DELETE FROM users
      WHERE id=${userId}
      RETURNING *`
  );
}

async function createGroup({ name, time, location }) {
  try {
    const rows = await client.query(
      `
      INSERT INTO products(name, time, location)
      VALUES($1, $2, $3);
    `,
      [name, time, location]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllGroups() {
  try {
    const { rows } = await client.query(`
      SELECT name, time, location 
      FROM group;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function addComment({ userId, groupId, content }) {
  try {
    const {
      rows: [comments],
    } = await client.query(
      `
        INSERT INTO comments("userId", "groupId", content )
        VALUES($1, $2, $3) 
        RETURNING *;

      `,
      [userId, groupId, content]
    );

    return comments;
  } catch (error) {
    throw error;
  }
}

async function getUserGroupWithComments(userId) {
  const dbResponse = await client.query(
    `SELECT * FROM user_groups
    WHERE "userId"=$1;`,
    [userId]
  );
  const userGroups = dbResponse.rows;

  const groupIds = userGroups.map((userGroup) => userGroup.groupId);

  const dbResponse2 = await client.query(
    `SELECT * FROM groups
    WHERE id IN (${groupIds.join(",")});`
  );

  const groups = dbResponse2.rows;

  const dbResponse3 = await client.query(
    `SELECT * FROM comments
    WHERE "groupId" IN (${groupIds.join(", ")});`
  );
  const comments = dbResponse3.rows;

  groups.forEach((group) => {
    group.comments = comments.filter((comment) => group.id === comment.groupId);
  });

  return groups;
}

// function addUserToGroup(userId) {}

function addUserToGroup(userId) {
  const retrievedUser = await getUserById(userId)
}

// async function addUserToGroup(userId, groupId }) {
//   try {
//     const {
//       rows: [user_Group],
//     } = await client.query(
//       `
//     INSERT INTO user_groups ( "userId", "groupId")
//     VALUES($1, $2)
//     ON CONFLICT ("routineId", "activityId") DO NOTHING
//     RETURNING *;
//       `,
//       [userId, groupId]
//     );
//     return user_Group;
//   } catch (error) {
//     throw error;
//   }
// }

// export
module.exports = {
  client,
  getAllUsers,
  createUser,
  createGroup,
  getAllGroups,
  addComment,
  getUserByUsername,
  getUserById,
  deleteUser,
  getGroupById,
  addUserToGroup,
  addComment,
  getUserGroupWithComments,
  // db methods
};
