import React from "react";

const Content = () => {
  return <h1>This is our content</h1>;
};

export default Content;

import React, { useState, useEffect } from "react";
import { getMyGroups, joinGroup, getAllGroups } from "../api";

const Groupview = () => {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    getAllGroups()
      .then((groupList) => {
        console.log("MATT LOOK HERE", groupList);
        setGroups(groupList.groups);
      })
      .catch((error) => {
        console.error("MATT LOOK HERE ", error);
      });
  }, []);

  return (
    <div id="group-list">
      {groups.map((group) => (
        <>
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

export default Groupview;
