import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { getMyGroups, joinGroup, getAllGroups } from "../api";
import { Grid } from "@material-ui/core";
import { CenterFocusStrong } from "@material-ui/icons";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const GroupCard = ({ title, location, time }) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  useEffect(() => {}, []);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          ></Typography>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {location}
          </Typography>
          <Typography variant="body2" component="p">
            {time}
          </Typography>
        </CardContent>
        <CardActions>
          <Button>Join Now</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default GroupCard;
