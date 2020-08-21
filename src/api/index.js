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
    return data;
  } catch (error) {
    throw error;
  }
}

// export get groups from here
