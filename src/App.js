import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import MainPage from "./Containers/Home/MainPage";
import Login from "./Containers/Login/Login";

import {useSelector} from 'react-redux'



function App() {

  const auth = useSelector(state => state.common.auth)


  return (
    <Router>
      <Switch>
        <Route exact path="/" > { !auth ? <Redirect to='/login' component={Login}/> : <MainPage/>} </Route>
        <Route path="/login" component={Login} />
        <Route path='/inbox' component={MainPage} />
      </Switch>
    </Router>
  );
}

export default App;
