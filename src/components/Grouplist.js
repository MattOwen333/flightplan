import React, { useState } from "react";
import { getAllGroups } from "../api";

const GroupList = () => {
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
        <div>
          key={group.id}
          {group.title}
        </div>
      ))}
    </div>
  );
};
