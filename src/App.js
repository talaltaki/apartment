import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Components/MainDashboard/Dashboard/Dashboard";
import Home from "./Components/Home/Home";
import LoginMain from "./Components/LoginMain/LoginMain";
import HomeDetails from "./Components/HomeDetails/HomeDetails";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

export const AllContext = createContext();

const App = () => {
  const [signedUser, setSignedUser] = useState({});

  return (
    <AllContext.Provider value={[signedUser, setSignedUser]}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/dashboard">
            <Dashboard />
          </Route>

          <Route path="/login">
            <LoginMain />
          </Route>

          <PrivateRoute path="/details">
            <HomeDetails />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </AllContext.Provider>
  );
};

export default App;
