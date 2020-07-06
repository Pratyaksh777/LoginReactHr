import React from 'react'

import axios from 'axios';
import Button from '@material-ui/core/Button';
import '../Social.css';
import {Redirect, Link} from 'react-router-dom';
var flag=false;
const CLIENT_ID = '51527806993-p7adkqpbc3ufg2dum8gimhf0bt396k2h.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBBkJllROH4170MachQsGF0yht_qWrUaZI';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/people/v1/rest"];

function loadClient() {
    window.gapi.client.setApiKey("AIzaSyBBkJllROH4170MachQsGF0yht_qWrUaZI");
    return window.gapi.client.load("https://people.googleapis.com/$discovery/rest?version=v1")
        .then(function() { console.log("GAPI client loaded for API"); 
        execute();},
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return window.gapi.client.people.people.get({
      "resourceName": "people/me",
      "personFields": "birthdays"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                var bdt = response.result.birthdays[0].date;
                var Bday = bdt.year+"-"+bdt.month+"-"+bdt.day;
                resp( Bday);
              },
              function(err) { console.error("Execute error", err); });
  }
  
function resp( bday){
      let gUser = window.gapi.auth2.getAuthInstance().currentUser.le.wc.id_token;
      let uid = window.gapi.auth2.getAuthInstance().currentUser.le.Qt.JU;
    //   let propic = window.gapi.auth2.getAuthInstance().currentUser.le.Qt.MK;
    //   let email = window.gapi.auth2.getAuthInstance().currentUser.le.Qt.Au;
    //   let fname = window.gapi.auth2.getAuthInstance().currentUser.le.Qt.nW;
    //   let lname = window.gapi.auth2.getAuthInstance().currentUser.le.Qt.nU;
      console.log(window.gapi.auth2.getAuthInstance().currentUser)
     axios.post("/googleup", {"idToken":gUser, "DOB":bday, "UserId":uid}).then(response =>{
         console.log(response);
         if(response.data.success=="True"){
            sessionStorage.setItem('userData',response.data.person);
            sessionStorage.setItem("Social", "Google");
            window.location.replace("http://localhost:3000/Homepage")
          }
        //  return <Redirect to={"/"} />
     }).catch(error =>{
         console.log("Error", error)
     })

    }

function login(){

    
    console.log("Signing In")
    authenticate().then(loadClient)
  
    
  
}

function logout(response){
    console.log('Logged out');
}

function authenticate() {

    window.gapi.load("client:auth2", function() {
        window.gapi.auth2.init({client_id: "51527806993-p7adkqpbc3ufg2dum8gimhf0bt396k2h.apps.googleusercontent.com"});
        
      });
    

    return window.gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
            
      })
        .then(function() { console.log("Sign-in successful"); 
                             },
              function(err) { console.error("Error signing in", err); });
  }



function GSignup(props) {



    return (
        <div>
            <Button variant="contained" className="customBtn" onClick={() =>{
              login();
              props.modf(false);
              // props.erf({errorval:false, loading:true})
              }} ></Button>
            

            {/* <GoogleLogin
          clientId={CLIENT_ID}
          apiKey ={API_KEY}
          scope="profile email https://www.googleapis.com/auth/user.birthday.read"
          buttonText='Login'
          onSuccess={login}
          cookiePolicy={ 'single_host_origin' }
          responseType='code,token'
          discoveryDocs ={DISCOVERY_DOCS}
        /> */}
        <br />
        

        </div>
    )
}

export default GSignup
