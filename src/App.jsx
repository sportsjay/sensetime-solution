import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// import components
import TopBar from "./common/navbar";

// import routes
import { routes } from "./routes";

function App() {
  return (
    <div>
      <Router>
        <TopBar routes={routes} />
        <Switch>
          <Route exact path="/">
            <Redirect to="/task-one" />
          </Route>
          {routes.map((route) => (
            <Route
              key={route.id + route.name}
              path={route.path}
              exact
              component={route.component}
            />
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
