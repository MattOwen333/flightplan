import React, { useState, useEffect } from "react";
import { getMyGroups, joinGroup } from "../api";
import { Link } from "react-router-dom";

const Grouplist = () => {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    getMyGroups
      .then((groupList) => {
        console.log("MATT LOOK HERE", groupList);
        setGroups(groupList.groups);
      })
      .catch((error) => {
        console.error("MATT LOOK HERE ", error);
      });
  }, []);

  return (
    <div Id="group-list">
      {groups.map((group) => (
        <>
          <Link to={`/groups/${group.id}`}>{group.name}</Link>

          {group.title}
          {group.location}
          {group.content}
          <button
            onClick={() => {
              // joinGroup;
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
