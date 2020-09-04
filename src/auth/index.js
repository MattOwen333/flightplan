const axios = require("axios");
// import axios from "./node_modules/axios";

export function storeCurrentUser(token) {
  localStorage.setItem("token", token);
}
export function getCurrentUser() {
  const user = localStorage.getItem("token");
  return user;
}
export function clearCurrentUser() {
  localStorage.removeItem("token");
}

export async function login({ username, password }) {
  try {
    const data = await axios.post("api/users/login", {
      username,
      password,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function register({ username, password }) {
  try {
    const data = await axios.post("api/users/register", {
      username,
      password,
    });
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser({ username, password }) {
  try {
    const data = await axios.delete("api/users/delete", {
      username,
      password,
    });
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

// export async function getComments() {
//   try {
//     const { data } = await axios.get("/api/comments");
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }
