import React, { useState } from "react";
import { getAllGroups, getMyGroups } from "../api";
import { Link } from "react-router-dom";

const GroupList = () => {
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
            }}
          >
            Sign Up!
          </button>
        </div>
      ))}
    </div>
  );
};

export default groupList;

// will group.content pull up my comments
