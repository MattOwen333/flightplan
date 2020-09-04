import React, { useState, useEffect } from "react";
import { getAllGroups, getMyGroups, getUserGroupWithComments } from "../api";
import { Link } from "react-router-dom";
import { Groupview } from ".";
// this would be a SINGLE group, with comments and all that jazz

const GroupView = () => {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    getMyGroups
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
        <div>
          <Link to={`/groups/${group.id}`}>{group.name}</Link>

          {group.title}
          {group.location}
          <h3>{group.content}</h3>
          <button
            onClick={() => {
              fetch(`/api/groups/${group.id}/join`, {
                method: "POST",
                body: JSON.stringify(),
              });
              // api call to sign up for a group
              // need to move the above into the api layer?
            }}
          >
            Sign Up!
          </button>
        </div>
      ))}
    </div>
  );
};

export default Groupview;
