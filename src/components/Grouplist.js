import React from "react";
import { useState, useEffect } from "react";
import { Card } from "@material-ui/core/Card";
import { Grid } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import GroupCard from "./Group";
import { getMyGroups, joinGroup, getAllGroups } from "../api";

const Grouplist = () => {
  const [myGroups, setMyGroups] = useState([]);
  const getGroupCard = (groupCardObj) => {
    return (
      <Grid item xs={12} sm={4}>
        <GroupCard {...groupCardObj} />
      </Grid>
    );
  };
  useEffect(() => {
    getMyGroups()
      .then((myGroupList) => {
        console.log("MATT myGroupList", myGroupList);
        setMyGroups(myGroupList.groups);
      })
      .catch((error) => {
        console.error("MATT myGroupList", error);
      });
  }, []);

  return (
    <Grid container spacing={2}>
      {myGroups.map((groupCardObj) => getGroupCard(groupCardObj))}
    </Grid>
  );
};

export default Grouplist;

// import React, { useState, useEffect } from "react";
// import { getMyGroups, joinGroup } from "../api";

// const Grouplist = () => {
//   const [groups, setGroups] = useState([]);
//   useEffect(() => {
//     getMyGroups()
//       .then((groupList) => {
//         console.log("MATT LOOK HERE", groupList);
//         setGroups(groupList.groups);
//       })
//       .catch((error) => {
//         console.error("MATT LOOK HERE ", error);
//       });
//   }, []);

//   return (
//     <div Id="group-list">
//       {groups.map((group) => (
//         <>
//           {group.title}
//           {group.location}
//           {group.content}
//           <button
// onClick={() => {
//   // joinGroup;
// }}
//           >
//             Sign Up!
//           </button>
//         </>
//       ))}
//     </div>
//   );
// };

// export default Grouplist;
