import React from 'react';
import './App.css';
import {Button,Form,FormGroup,Lable,Input} from 'reactstrap';
import { GoogleLoginButton } from "react-social-login-buttons";

function App() {
  const start = "/";
  return (
    <div className="App">
      <Routes name={start}/>
      {/* <SignInSide /> */}
    </div>
  );
}

export default App;

