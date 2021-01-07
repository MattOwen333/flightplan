import axios from "axios";

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

export async function getMyGroups() {
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

export async function joinGroup(group) {
  fetch(`/api/groups/${group.id}/join`, {
    method: "POST",
    body: JSON.stringify(),
  })
    .then((response) => response.json())
    .catch(console.error);
}

export async function deleteUserGroup({ userId, groupId }) {
  try {
    const data = await axios.delete("api/groups/mine/delete", {
      userId,
      groupId,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
