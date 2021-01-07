import React from "react";
import { useState, useEffect } from "react";
import { Card } from "@material-ui/core/Card";
import { Grid } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import GroupCard from "./Group";
import { getMyGroups, joinGroup, getAllGroups } from "../api";

const Groupview = () => {
  const [groups, setGroups] = useState([]);
  const getGroupCard = (groupCardObj, index) => {
    return (
      //TODO Make this value a unique id of the group
      <React.Fragment key={index}>
        <GroupCard {...groupCardObj} />
      </React.Fragment>
    );
  };
  useEffect(() => {
    getAllGroups()
      .then((groupList) => {
        console.log("MATT LOOK HERE", groupList);
        setGroups(groupList.groups);
      })
      .catch((error) => {
        console.error("MATT LOOK HERE", error);
      });
  }, []);

  return (
    <Grid container spacing={2}>
      {groups.map((groupCardObj) => getGroupCard(groupCardObj))}
    </Grid>
  );
};

export default Groupview;
