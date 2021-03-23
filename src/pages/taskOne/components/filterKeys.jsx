import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

// import component
import Key from "./key";

export default function FilterKey(props) {
  const classes = useStyles();
  const keysName = props.keyName;
  const data = props.data;
  const selectFilter = props.selectFilter;

  return (
    <>
      <div className={classes.header}>
        <Typography
          variant="h6"
          style={{ fontWeight: "800", color: "#dfe5e8" }}
        >
          {keysName}
        </Typography>
      </div>
      <div className={classes.values}>
        {Object.keys(data).map((_data) => (
          <Key
            key={parseInt(Math.random() * 10000)}
            selectFilter={selectFilter}
            listOfKey={data[_data].listOfKey}
            selected={data[_data].selected}
            amount={data[_data].amount}
            keyName={_data}
            keyCategory={keysName}
          />
        ))}
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: 30,
    marginBottom: 10,
  },
  values: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  value: {
    width: "40%",
    height: 20,
    margin: 2,
    [theme.breakpoints.down("sm")]: {
      width: "20%",
      minWidth: 60,
    },
  },
}));
