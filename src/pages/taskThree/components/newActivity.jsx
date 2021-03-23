import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "5vh",
    minWidth: 300,
    width: 700,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#637f8a",
    transition: "0.35s",
    zIndex: 3,
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
  activity: {
    width: "70%",
    textAlign: "center",
    color: "#e1eaeb",
    fontWeight: "700",
  },
  exit: {
    height: 25,
    width: 30,
    textAlign: "center",
    borderRadius: 5,
    backgroundColor: "white",
  },
}));

export default function NewActivity(props) {
  const classes = useStyles();
  const [display, setDisplay] = useState(true);
  const activity = props.activity;
  useEffect(() => {
    setDisplay(true);
    setTimeout(() => {
      setDisplay(false);
    }, 5000);
  }, [activity]);

  return (
    <div
      className={classes.root}
      style={
        display
          ? { display: "flex", transition: "0.35s" }
          : { display: "none", transition: "0.35s" }
      }
    >
      <div className={classes.header}>
        <span style={{ color: "#e1eaeb" }}>New Activity!</span>
        <span className={classes.activity}>{activity}</span>
        <span
          className={classes.exit}
          style={{ cursor: "pointer" }}
          onClick={() => setDisplay(false)}
        >
          x
        </span>
      </div>
    </div>
  );
}
