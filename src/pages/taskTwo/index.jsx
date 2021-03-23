import React, { useEffect, useState } from "react";
import { Typography, makeStyles, Container, Button } from "@material-ui/core";

import tree from "./tree.json";

// 2. Parse tree data in ./tree.json, display in the form of tree
// on a new page with showing proper parent and children relationship.

function Child(props) {
  const [hover, setHover] = useState(false);
  const classes = useStyles();
  const type = props.type;
  const children = props.children;
  const height = props.height;
  const width = props.width;
  return (
    <div
      className={classes.child}
      onMouseEnter={() => setHover(!hover)}
      onMouseLeave={() => setHover(!hover)}
      style={
        hover
          ? {
              height: height,
              width: width,
              transform: "scale(1.05, 1.05)",
              transition: "0.3s",
            }
          : { height: height, width: width, transition: "0.3s" }
      }
    >
      <div>
        <Typography>{type}</Typography>
      </div>
      <div className={classes.tree}>
        {children.length > 0 ? (
          children.map((_child) => {
            return (
              <Child
                type={_child.Type}
                children={_child.children}
                height={height * 0.48}
                width={width * 0.45}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

function ChildDropDown(props) {
  const [hover, setHover] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const classes = useStyles();
  const type = props.type;
  const children = props.children;

  return (
    <div
      style={{ borderStyle: "solid", borderWidth: 1, borderColor: "black" }}
      onMouseEnter={() => setHover(!hover)}
      onMouseLeave={() => setHover(!hover)}
    >
      <div className={classes.header2}>
        <Typography>{type}</Typography>
        <Button
          onClick={() => setDropDown(!dropDown)}
          style={{ width: 30, height: 30 }}
        >
          {dropDown ? "^" : "v"}
        </Button>
      </div>
      <div className={classes.tree} style={dropDown ? {} : { display: "none" }}>
        {children.length > 0 ? (
          children.map((_child) => {
            return (
              <ChildDropDown type={_child.Type} children={_child.children} />
            );
          })
        ) : (
          <Typography>No more child</Typography>
        )}
      </div>
    </div>
  );
}

export default function TaskTwo() {
  const [styling, setStyling] = useState("containers");
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container className={classes.header}>
        <Typography
          variant="h4"
          style={{
            margin: 40,
            textAlign: "center",
            alignSelf: "center",
            fontWeight: "700",
          }}
        >
          Choose your box styling
        </Typography>
        <div className={classes.buttonContainer}>
          <Button
            disabled={styling === "containers"}
            className={classes.button}
            onClick={() => setStyling("containers")}
          >
            Containers
          </Button>
          <Button
            disabled={styling === "dropdowns"}
            className={classes.button}
            onClick={() => setStyling("dropdowns")}
          >
            Dropdowns
          </Button>
        </div>
      </Container>

      <Container className={classes.tree}>
        {tree.map((subTree) =>
          styling === "containers" ? (
            <Child
              type={subTree.Type}
              children={subTree.children}
              height={300}
              width={700}
            />
          ) : (
            <div className={classes.child2}>
              <ChildDropDown type={subTree.Type} children={subTree.children} />
            </div>
          )
        )}
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {},
  button: {
    backgroundColor: "#9bc2d1",
    textDecoration: "none",
    textTransform: "none",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 30,
  },
  tree: {
    transition: "0.3s",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  child: {
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "black",
    marginBottom: 20,
  },
  child2: {
    padding: 20,
    minWidth: 800,
    transition: "0.5s",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    marginBottom: 30,
  },
  header2: {
    width: 220,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    margin: 20,
  },
}));
