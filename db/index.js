// Connect to DB
const { Client } = require("pg");
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
        VALUES($1, $2, $3, $4) 
        ON CONFLICT (username) DO NOTHING 
        RETURNING *;
      `,
      [username, password, name, location]
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
        VALUES($1, $2, $3, $4) 
        RETURNING *;

      `,
      [userId, groupId, content]
    );

    return comments;
  } catch (error) {
    throw error;
  }
}

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
  addComment,
  // db methods
};
