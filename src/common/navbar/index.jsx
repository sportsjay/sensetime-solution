import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: "10%",
    paddingLeft: "10%",
    height: "10vh",
    minHeight: 50,
    width: "100%",
    display: "flex",
    backgroundColor: "#e0c57b",
    justifyContent: "space-between",
    boxSizing: "border-box",
  },
  logo: {
    height: "100%",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  links: {
    height: "100%",
    width: "50%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      // display: "none",
      width: "100%",
    },
  },
  link: {
    height: "50%",
    textDecoration: "none",
    fontWeight: "700",
    textTransform: "uppercase",
  },
}));

export default function TopBar(props) {
  const classes = useStyles();
  const routes = props.routes;
  const [activeRoute, setActiveRoute] = useState("");

  function onMouseInFunction(name) {
    setActiveRoute(name);
  }

  function onMouseOutFunction() {
    setActiveRoute("");
  }

  return (
    <div className={classes.root}>
      <div className={classes.logo}></div>
      <div className={`${classes.links}`}>
        {routes.map((route) => (
          <Link
            key={route.id + route.name}
            to={route.path}
            className={classes.link}
            onMouseEnter={() => onMouseInFunction(route.name)}
            onMouseLeave={() => onMouseOutFunction()}
          >
            <Typography
              variant="h6"
              className={classes.link}
              style={{
                color: activeRoute === route.name ? "#423d00" : "black",
              }}
            >
              {route.name}
            </Typography>
          </Link>
        ))}
      </div>
    </div>
  );
}
