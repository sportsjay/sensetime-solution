import React from "react";
import { Button, makeStyles } from "@material-ui/core";

export default function Key(props) {
  const classes = useStyles();

  const keyName = props.keyName;
  const amount = props.amount;
  const listOfKey = props.listOfKey;
  const selectFilter = props.selectFilter;
  const selected = props.selected;
  const keyCategory = props.keyCategory;

  return (
    <Button
      onClick={() => {
        selectFilter(listOfKey, !selected, keyName, keyCategory);
      }}
      className={classes.value}
      style={
        selected
          ? { color: "#1a3a4d", fontWeight: "700", transition: "1s" }
          : { color: "black" }
      }
    >
      {keyName} ({amount})
    </Button>
  );
}

const useStyles = makeStyles((theme) => ({
  value: {
    backgroundColor: "#dbdbdb",
    width: 120,
    height: 30,
    margin: 2,
    textDecoration: "none",
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      height: 40,
    },
  },
}));
