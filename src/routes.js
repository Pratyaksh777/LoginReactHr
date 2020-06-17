import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Homepage from "./Homepage";
import LogSign from "./components/LogSign"
import SignUp from "./components/Signup"
import UpdateUser from "./components/UpdateUser"
import FetchComp from "./components/FetchComp";
import LogOut from "./components/LogOut";
import Iview from "./components/Iview";
import App from "./App.js"
import history from './history';
import Interv from "./components/Interv";
import FileUpload from './components/FileUpload';

const Routes = () => (
    <BrowserRouter history={history}>
    <Switch>
        <Route exact path="/" component={LogSign}/>
        <Route path="/LogSign" component={LogSign} />
        <Route path="/Homepage" component={Homepage} />
        <Route path="/Signup" component={SignUp} />
        <Route path="/Update" component={UpdateUser} />
        <Route path="/FetchComp" component={FetchComp} />
        <Route path="/Iview" component={Iview} />
        <Route path="/Interv" component={Interv} />
        <Route path="/FileUpload" component={FileUpload} />
        <Route path="/LogOut" component={LogOut} />
    </Switch>
    </BrowserRouter>
);

export default Routes;