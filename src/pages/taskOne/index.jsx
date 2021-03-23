import React, { useState } from "react";
import { Typography, makeStyles, Button } from "@material-ui/core";

// import components
import FilterKey from "./components/filterKeys";
import DataContainer from "./components/dataContainer";

// load data
import { table } from "./sample.json";

// 1. display all information in table,
// 2. remove data with duplicated ppu,
// 3. the table need to be able to sort,
// 4. filter
// 5. add new record.

export default function TaskOne(props) {
  const classes = useStyles();
  const [data, setData] = useState(_deleteDuplicate(table));
  const [displayData, setDisplayData] = useState(data);
  const [filter, setFilter] = useState([]);
  const [filterValues, setFilterValues] = useState(_filterValues(displayData));
  const [input, setInput] = useState({
    id: parseInt(Math.random() * 10000),
    type: "",
    name: "",
    ppu: "",
    student: "",
  });

  function _deleteDuplicate(data) {
    // remove duplicates
    let temp = new Set();
    let uniqueData = [];
    data.forEach((element) => {
      if (!temp.has(element.ppu)) {
        uniqueData.push(element);
      }
      temp.add(element.ppu);
    });
    return uniqueData;
  }

  function _filterValues(data) {
    // filter values
    let values = Object.keys(data[0]).map((key) =>
      data.reduce((_keys, element) => {
        if (element[key] in _keys) {
          _keys[element[key]].amount += 1;
          _keys[element[key]].listOfKey.push(element.id);
        } else {
          _keys[element[key]] = {
            amount: 1,
            listOfKey: [element.id],
            selected: false,
          };
        }
        return _keys;
      }, {})
    );
    // substitute filtered keys with original keys
    const replaceKeys = (arr, obj) => {
      const keys = Object.keys(obj);
      const res = {};
      for (let a in arr) {
        res[arr[a]] = obj[keys[a]];
        obj[arr[a]] = obj[keys[a]];
        delete obj[keys[a]];
      }
      return res;
    };
    values = replaceKeys(Object.keys(data[0]), values);
    return values;
  }

  function _selectFilter(keys, status, keyName, keyCategory) {
    let setIDs = new Set(filter);
    let updateSelect = filterValues[keyCategory][keyName];
    updateSelect.selected = status;
    keys.forEach((key) => {
      if (status === false && setIDs.has(key)) {
        setIDs.delete([...keys]);
      } else if (status === true && !setIDs.has(key)) {
        setIDs.add(key);
      }
    });
    setFilterValues(
      { ...filterValues },
      (filterValues[keyCategory][keyName] = updateSelect)
    );
    setFilter(setIDs);
  }

  function _resetFilter() {
    setDisplayData(data);
    setFilterValues(_filterValues(data));
    setFilter(new Set());
  }

  function _filter(ids, data) {
    let temp = [];
    data.forEach((element) => {
      if (ids.has(element.id)) {
        temp.push(element);
      }
    });
    setDisplayData(temp);
    setFilterValues(_filterValues(temp));
    setFilter(new Set());
  }

  function _addValue(_data) {
    if (
      _data.type === "" ||
      _data.name === "" ||
      _data.student === "" ||
      _data.ppu === ""
    ) {
      alert("Insert data please!");
    } else {
      let updatedData = _deleteDuplicate([...displayData, _data]);
      setData([...data, _data]);
      setDisplayData(updatedData);
      setFilterValues(_filterValues(updatedData));
    }
    setInput({
      id: parseInt(Math.random() * 10000),
      type: "",
      name: "",
      ppu: "",
      student: "",
    });
  }

  function _sortByKey(data, key) {
    let temp = [...data];
    temp.sort((data_a, data_b) => {
      if (data_a[key] < data_b[key]) {
        return -1;
      }
      if (data_a[key] > data_b[key]) {
        return 1;
      }
      return 0;
    });
    setDisplayData(temp);
  }

  return (
    <div className={classes.root}>
      {/* Control Unit */}
      <div className={classes.refineTab}>
        {/* filter */}
        <div className={classes.filterTab}>
          <Typography variant="h6" className={classes.filterTabHeader}>
            Filter By
          </Typography>
          {Object.keys(filterValues).map((key) => (
            <FilterKey
              selectFilter={_selectFilter}
              key={parseInt(Math.random() * 10000)}
              keyName={key}
              data={filterValues[key]}
            />
          ))}
          <Button onClick={() => _filter(filter, data)}>Submit Filter</Button>
          <Button onClick={() => _resetFilter()}>Reset Filter</Button>
        </div>
        {/* sort */}
        <div className={classes.sortTab}>
          <Typography variant="h6" className={classes.sortTabHeader}>
            Sort By
          </Typography>
          <div className={classes.sortButtons}>
            <Button
              className={classes.sortButton}
              onClick={() => _sortByKey(displayData, "id")}
            >
              id
            </Button>
            <Button
              className={classes.sortButton}
              onClick={() => _sortByKey(displayData, "type")}
            >
              type
            </Button>
            <Button
              className={classes.sortButton}
              onClick={() => _sortByKey(displayData, "name")}
            >
              name
            </Button>
            <Button
              className={classes.sortButton}
              onClick={() => _sortByKey(displayData, "ppu")}
            >
              ppu
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.dataTab}>
        <Typography variant="h3" style={{ fontWeight: "700" }}>
          Task One
        </Typography>
        <div className={classes.data}>
          <DataContainer type="type" ppu="ppu" name="name" id="id" idx={1} />
          {displayData.map((element, idx) => (
            <div key={parseInt(Math.random() * 10000)}>
              {/* {JSON.stringify(element)} */}
              <DataContainer
                type={element.type}
                ppu={element.ppu}
                name={element.name}
                id={element.id}
                idx={idx}
              />
            </div>
          ))}
          <div className={classes.inputs}>
            <Typography>Add new data:</Typography>
            <input
              type="text"
              placeholder="type"
              value={input.type}
              onChange={(e) => {
                setInput({ ...input, type: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="name"
              value={input.name}
              onChange={(e) => {
                setInput({ ...input, name: e.target.value });
              }}
            />
            <input
              type="number"
              placeholder="ppu"
              value={input.ppu}
              onChange={(e) => {
                setInput({ ...input, ppu: parseFloat(e.target.value) });
              }}
            />
            <input
              type="text"
              placeholder="student"
              value={input.student}
              onChange={(e) => {
                setInput({ ...input, student: e.target.value });
              }}
            />
            <Button onClick={() => _addValue(input)}>Submit new data!</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  refineTab: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "40%",
    minHeight: "80vh",
    marginTop: 40,
    justifyContent: "center",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      width: "90%",
      minWidth: 400,
    },
  },
  filterTab: {
    padding: 10,
    width: "80%",
    minHeight: "70%",
    backgroundColor: "#6aa3c4",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    boxSizing: "border-box",
    marginBottom: 20,
  },
  filterTabHeader: {
    // backgroundColor: "white",
    color: "#dfe5e8",
    paddingLeft: 20,
    width: "40%",
    fontWeight: "700",
  },
  sortTab: {
    padding: 10,
    width: "80%",
    height: "30%",
    backgroundColor: "#49728a",
    flexDirection: "column",
    boxSizing: "border-box",
    marginBottom: 20,
  },
  sortTabHeader: {
    // backgroundColor: "white",
    color: "#dfe5e8",
    paddingLeft: 20,
    width: "40%",
    marginBottom: 10,
    fontWeight: "700",
  },
  sortButtons: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
  },
  sortButton: {
    textDecoration: "none",
    textTransform: "none",
    fontWeight: "700",
    backgroundColor: "#dbdbdb",
  },
  dataTab: {
    width: "55%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      height: "100%",
    },
  },
  data: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
    },
  },
  inputs: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    width: "60%",
  },
}));
