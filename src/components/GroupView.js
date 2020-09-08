import React, { useState, useEffect } from "react";
import { getMyGroups, joinGroup, getAllGroups } from "../api";
import { Link } from "react-router-dom";

const Grouplist = () => {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    getAllGroups
      .then((groupList) => {
        setGroups(groupList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div Id="group-list">
      {groups.map((group) => (
        <>
          <Link to={`/groups/${group.id}`}>{group.name}</Link>

          {group.title}
          {group.location}

          <button
            onClick={() => {
              joinGroup;
            }}
          >
            Sign Up!
          </button>
        </>
      ))}
    </div>
  );
};

export default Grouplist;
