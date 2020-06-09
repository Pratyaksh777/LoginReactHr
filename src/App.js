import React from 'react';
import './App.css';
import SignInSide from './components/LogSign';
import {Redirect} from 'react-router-dom'
import Routes from './routes';

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

