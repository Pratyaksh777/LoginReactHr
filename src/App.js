import React from 'react';
import './App.css';
import {Button,Form,FormGroup,Lable,Input} from 'reactstrap';
import { GoogleLoginButton } from "react-social-login-buttons";

function App() {
  const start = "/";
  return (
    <Form className="App">
      <Routes name={start}/>
      {/* <SignInSide /> */}
    </Form>
  );
}

export default App;

