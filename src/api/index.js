import axios from "axios";
import { json } from "express";

// this is the FRONT END API FILE

export async function getSomething() {
  try {
    const { data } = await axios.get("/api");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllGroups() {
  try {
    const { data } = await axios.get("/api/groups");
    console.log("this is getAllGroups", data);
    return data;
  } catch (error) {
    throw error;
  }
}

// export async function getMyGroups({ id }) {
//   userToken = localStorage.getItem("token");
//   userTokenData = json.parse(userToken);
//   userTokenId = userTokenData.id;
//   id = userTokenId;
//   try {
//     const data = await axios.post("api/groups/mine", {
//       id,
//     });
//     console.log(data);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

// JSON.sign JSON.verify

// fetch('https://strangers-things.herokuapp.com/api/COHORT-NAME/posts', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer TOKEN_STRING_HERE'
//   },
//   body: JSON.stringify({ /* whatever things you need to send to the API */ })
// })

export async function getMygroups() {
  const token = localStorage.getItem("token");

  return fetch(`/api/groups/mine`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch(console.error);
}

export async function getMyGroups() {
  const token = localStorage.getItem("token");
  // const getId = JSON.parse(token);
  // const tokenId = token.map((theId) => theId.id);
  // do i need to map the token??
  // read token from localstorage
  // and send it in the axios request...
  return fetch(`/api/groups/mine`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({
      post: {
        id: token,
      },
    }),
  })
    .then((response) => response.json())

    .catch(console.error);
}

// need to send the userId to the server

// export async function getMyGroups() {
//   const token = localStorage.getItem("token");
//   const storedId = token.id;
//   // read token from localstorage
//   // and send it in the axios request...
//   try {
//     const { data } = await axios.get(`/api/groups/mine`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         post: {
//           id: storedId,
//         },
//         // need to send the userId to the server
//       }),
//     });
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

// export get groups from here
