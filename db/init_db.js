// code to build and initialize DB goes here
const {
  client,
  // other db methods
} = require("./index");

async function buildTables() {
  try {
    client.connect();

    await client.query(
      ` DROP TABLE IF EXISTS reminder;
        DROP TABLE IF EXISTS groups;
        DROP TABLE IF EXISTS users;
      `
    );
    await client.query(`
            CREATE TABLE users (
              id SERIAL PRIMARY KEY,
              username varchar(255) UNIQUE NOT NULL,
              password varchar(255) NOT NULL
            );
            CREATE TABLE group (
              id SERIAL PRIMARY KEY,
              name varchar(255) UNIQUE NOT NULL,
              time varchar(255) NOT NULL,
              location varchar(255),
            );
            CREATE TABLE user_groups(
              id SERIAL PRIMARY KEY, 
              "userId" INTEGER REFERENCES users(id),
              "groupId" INTEGER REFERENCES group(id),
              );
            CREATE TABLE reminder (
              id SERIAL PRIMARY KEY
              reminder varchar(255) NOT NULL
              "userId" INTEGER REFERENCES user(id)
              "groupId" INTEGER REFERENCES group(id)
            );
            CREATE TABLE comments (
              id SERIAL PRIMARY KEY
              content varchar(255) NOT NULL
              "userId" INTEGER REFERENCES user(id)
              "groupId" INTEGER REFERENCES group(id)
            );
          `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
