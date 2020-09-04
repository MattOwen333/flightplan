// code to build and initialize DB goes here

const {
  client,
  createGroup,
  createUser,
  // other db methods
} = require("./index");

async function buildTables() {
  try {
    console.log("Starting to drop tables...");
    client.connect();

    await client.query(
      ` DROP TABLE IF EXISTS comments;
        DROP TABLE IF EXISTS user_groups;
        DROP TABLE IF EXISTS group;
        DROP TABLE IF EXISTS users;
      `
    );

    console.log("Starting to Build tables...");
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
              location varchar(255)
            );
            CREATE TABLE user_groups(
              id SERIAL PRIMARY KEY, 
              "userId" INTEGER REFERENCES users(id),
              "groupId" INTEGER REFERENCES group(id)
            );
            CREATE TABLE comments (
              id SERIAL PRIMARY KEY,
              content varchar(255) NOT NULL,
              "userId" INTEGER REFERENCES user(id),
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
    await createUser({
      username: "maximilian",
      password: "max123",
    });
    await createUser({
      username: "therock",
      password: "rocky",
    });
    await createUser({
      username: "tomthemailman",
      password: "tom123",
    });
    await createUser({
      username: "adminuser",
      password: "adminpassword",
    });
    await createUser({
      username: "adminuser2",
      password: "adminpassword2",
    });

    await createGroup({
      name: "attend an opera",
      time: "8pm",
      location: "Sydney Australia",
    });

    await createGroup({
      name: "attend an NFL football game",
      time: "1pm",
      location: "Jacksonville Florida",
    });

    await createGroup({
      name: "attend an NFL football game",
      time: "1pm",
      location: "Jacksonville Florida",
    });
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
