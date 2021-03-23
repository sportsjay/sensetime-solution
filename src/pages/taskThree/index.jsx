import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, makeStyles, Button } from "@material-ui/core";

// import component
import NewActivity from "./components/newActivity";
import Activity from "./components/activity";

// 3. Call api to fetch response and do a simple display, you can choose to write
// an api on your own or use existing free service provided by others from online,
// you may choose free server to achieve this.

export default function TaskThree() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [addData, setAddData] = useState({
    activity: "",
    type: "",
    participants: "",
    price: "",
    link: "",
    key: "",
  });
  const [reqData, setReqData] = useState(false);

  useEffect(() => {
    axios
      .get("https://www.boredapi.com/api/activity")
      .then((_data) => {
        setAddData(_data.data);
        return _data;
      })
      .then((_data) => {
        console.log(_data);
        setData([...data, _data.data]);
      })
      .catch(() => alert("failed to get data!"));
  }, [reqData]);

  return (
    <div className={classes.root}>
      {addData ? <NewActivity activity={addData.activity} /> : <></>}
      <Typography variant="h3" style={{ fontWeight: "700" }}>
        Task three
      </Typography>
      <Typography className={classes.description}>
        Taken from <code className={classes.code}>boredapi.com</code>
      </Typography>
      <div className={classes.container}>
        {data.map((_data) => (
          <Activity
            activity={_data.activity}
            price={_data.price}
            type={_data.type}
            link={_data.link}
            participants={_data.participants}
          />
        ))}
      </div>
      <Button className={classes.request} onClick={() => setReqData(!reqData)}>
        Request Activity!
      </Button>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    marginTop: 20,
    marginBottom: 20,
  },
  code: {
    padding: 6,
    borderRadius: 4,
    backgroundColor: "#dfe5e8",
    fontWeight: "600",
  },
  request: {
    textDecoration: "none",
    textTransform: "none",
    marginTop: 20,
    backgroundColor: "#dfe5e8",
  },
}));
