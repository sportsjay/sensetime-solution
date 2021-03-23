import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

export default function DataContainer(props) {
  const classes = useStyles();

  const id = props.id;
  const idx = props.idx;
  const type = props.type;
  const name = props.name;
  const ppu = props.ppu;
  const student = props.student;
  return (
    <div
      className={classes.root}
      style={
        idx % 2 === 0
          ? { backgroundColor: "#dbdbdb" }
          : { backgroundColor: "white" }
      }
    >
      <Typography className={classes.id}>{id.toString()}</Typography>
      <Typography className={classes.type}>{type}</Typography>
      <Typography className={classes.name}>{name}</Typography>
      <Typography className={classes.ppu}>{ppu.toString()}</Typography>
      <Typography className={classes.student}>{student}</Typography>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    maxHeight: 40,
  },
  id: {
    minWidth: 70,
  },
  type: {
    minWidth: 150,
  },
  name: {
    minWidth: 100,
  },
  ppu: {
    minWidth: 30,
  },
  student: {
    minWidth: 100,
  },
}));
