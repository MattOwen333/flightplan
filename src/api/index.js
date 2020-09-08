import axios from "axios";
import { getGroupById, destroyUserGroup } from "../../db";

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

export async function joinGroup() {
  fetch(`/api/groups/${group.id}/join`, {
    method: "POST",
    body: JSON.stringify(),
  })
    .then((response) => response.json())
    .catch(console.error);
}

export async function deleteUserGroup({ userId, groupId }) {
  try {
    const data = await axios.delete("api/groups/delete", {
      userId,
      groupId,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
