import React from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import {Redirect, Link} from 'react-router-dom';
import { toast } from 'react-toastify';

var flag=false;
const CLIENT_ID = '51527806993-p7adkqpbc3ufg2dum8gimhf0bt396k2h.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBBkJllROH4170MachQsGF0yht_qWrUaZI';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/people/v1/rest"];


  
function resp( bdate){
  
      let gUser = window.gapi.auth2.getAuthInstance().currentUser.le.wc.id_token;
      
     axios.post("/googlesign", {"idToken":gUser}).then(response =>{
         console.log(response);
     }).catch(error =>{
         console.log("Error", error)
     })

    }

function login(googleUser){

  let gUser = window.gapi.auth2.getAuthInstance().currentUser.le.wc.id_token;
      
  axios.post("/googlesign", {"idToken":gUser}).then(response =>{
      console.log(response);
      if(response.data.success=="True"){
        sessionStorage.setItem('userData',response.data.person);
        sessionStorage.setItem("Social", "Google");
        window.location.replace("http://localhost:3000/Homepage")
      }
      else{
        
        window.location.replace("http://localhost:3000/?error=static")
      }
      
      // return <Redirect to={"/"} />
  }).catch(error =>{
      console.log("Error", error)
  })

    
    console.log("Signing In")
    
  
}

function logout(response){
    console.log('Logged out');
}




function GoogleSign(props) {



    return (
        <div style={{position:'absolute',right:'270px', marginRight:'20px'}}>
            

            <GoogleLogin
          clientId={CLIENT_ID}
          
          scope="profile email "
          buttonText='Login'
          onSuccess={(googleUser) =>{
              login(googleUser);
              props.erf({errorval:false, loading:true})
            }}
          cookiePolicy={ 'single_host_origin' }
          responseType='code,token'
         
        />
        <br />
        {/* <GoogleLogout
          clientId={ CLIENT_ID }
          buttonText='Logout'
          onLogoutSuccess={ logout }
        //   onFailure={ handleLogoutFailure }
        >
        </GoogleLogout> */}

        </div>
    )
}

export default GoogleSign
