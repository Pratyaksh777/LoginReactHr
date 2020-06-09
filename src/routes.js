import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Homepage from "./Homepage";
import LogSign from "./components/LogSign"
import SignUp from "./components/Signup"
import UpdateUser from "./components/UpdateUser"

import App from "./App.js"

const Routes = () => (
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={LogSign}/>
        <Route path="/LogSign" component={LogSign} />
        <Route path="/Homepage" component={Homepage} />
        <Route path="/Signup" component={SignUp} />
        <Route path="/Update" component={UpdateUser} />
        
    </Switch>
    </BrowserRouter>
);

export default Routes;