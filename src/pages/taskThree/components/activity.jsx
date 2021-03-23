import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    width: 700,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    boxSizing: "border-box",
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detail: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  key: {
    minWidth: 50,
  },
  activity: {
    minWidth: 150,
  },
  type: {
    minWidth: 60,
  },
  participants: {
    minWidth: 30,
  },
  price: {
    minWidth: 20,
  },
  link: {
    minWidth: 100,
  },
}));

export default function Activity(props) {
  const classes = useStyles();
  const [dropDown, setDropDown] = useState(false);
  const [hover, setHover] = useState(false);

  const activity = props.activity;
  const type = props.type;
  const participants = props.participants;
  const price = props.price;
  const link = props.link;
  const key = props.key;

  return (
    <div
      className={classes.root}
      onClick={() => setDropDown(!dropDown)}
      onMouseEnter={() => setHover(!hover)}
      onMouseLeave={() => setHover(!hover)}
      style={
        hover
          ? { backgroundColor: "#637f8a", transition: "0.35s" }
          : { backgroundColor: "#9bc2d1", transition: "0.35s" }
      }
    >
      <div className={classes.header}>
        <span className={classes.activity}>{activity}</span>
        <span>{dropDown ? "v" : "^"}</span>
      </div>
      {dropDown ? (
        <div className={classes.detail}>
          <span className={classes.type}>Type: {type}</span>
          <span className={classes.participants}>
            Participants: {participants}
          </span>
          <span className={classes.key}>Key: {key ? key : "none"}</span>
          <span className={classes.price}>Price:{price}</span>
          <span className={classes.link}>
            Link: {link.length > 0 ? link : "none"}
          </span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
