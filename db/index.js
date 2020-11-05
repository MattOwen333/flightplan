// Connect to DB
const { Client } = require("pg");
const DB_NAME = "localhost:5432/flightplan";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);

// database methods

async function createUser({ username, password }) {
  try {
    const { rows } = await client.query(
      `
      INSERT INTO users(username, password)
      VALUES($1, $2)
      RETURNING *;
    `,
      [username, password]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function createGroup({ title, time, location }) {
  try {
    const { rows } = await client.query(
      `
      INSERT INTO groups(title, time, location)
      VALUES($1, $2, $3)
      RETURNING *;
    `,
      [title, time, location]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

// async function createUser({ username, password }) {
//   try {
//     const {
//       rows: [user],
//     } = await client.query(
//       `
//         INSERT INTO users(username, password)
//         VALUES($1, $2)
//         ON CONFLICT (username) DO NOTHING
//         RETURNING *;
//       `,
//       [username, password]
//     );

//     return user;
//   } catch (error) {
//     throw error;
//   }
// }

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

async function deleteGroupById(groupId) {
  await client.query(
    `
      DELETE FROM group
      WHERE id=${groupId}
      RETURNING *`
  );
}

async function getAllGroups() {
  try {
    const { rows } = await client.query(`
      SELECT title, time, location 
      FROM groups;
    `);

    return rows;
  } catch (error) {
    console.log("getAllGroups", error);
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

async function addUserToGroup(userId, groupId) {
  try {
    const { rows } = await client.query(
      `
    UPDATE user_groups
    SET ID=${userId}
    WHERE user."userId"=${userId} AND group."groupId"=${groupId}
    RETURNING *
      `,
      [userId, groupId]
    );
  } catch (error) {
    throw error;
  }
}

async function destroyUserGroup(id) {
  try {
    await client.query(
      `
          DELETE FROM user_groups
          WHERE user_groups.id = ${id}
        `
    );
  } catch (error) {
    throw error;
  }
}

// async function addUserToGroup({ userId, groupId }) {
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
  deleteGroupById,
  destroyUserGroup,
  // db methods
};
