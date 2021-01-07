const { client, createGroup, createUser } = require("./index");

async function buildTables() {
  try {
    client.connect();

    await client.query(
      ` DROP TABLE IF EXISTS user_groups;
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
            CREATE TABLE groups (
              id SERIAL PRIMARY KEY,
              title TEXT NOT NULL,
              time TEXT NOT NULL,
              location TEXT NOT NULL
            );
            CREATE TABLE user_groups (
              id SERIAL PRIMARY KEY,
              "userId" INTEGER REFERENCES users(id),
              "groupId" INTEGER REFERENCES groups(id)
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
    await createGroup({
      title: "attend an NFL football game",
      time: "1pm",
      location: "Jacksonville Florida",
    });
    await createGroup({
      title: "attend the Kentucky Derby",
      time: "1pm",
      location: "Churchill Downs Lousiville Kentucky",
    });
    await createGroup({
      title: "attend the Kentucky Derby2",
      time: "2pm",
      location: "Churchill Downs Lousiville Kentucky",
    });
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
