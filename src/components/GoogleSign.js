import React from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';
var flag=false;
const CLIENT_ID = '51527806993-p7adkqpbc3ufg2dum8gimhf0bt396k2h.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBBkJllROH4170MachQsGF0yht_qWrUaZI';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/people/v1/rest"];
function login(response){
    console.log(response)
axios.post('/googlesign', {"idToken":response.tokenId}).then(res =>{
    console.log(res);
}).catch(err =>{
    console.log("error", err);
})



}

function logout(response){
    console.log('Logged out');
}


function GoogleSign() {



    return (
        <div>
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
        <GoogleLogout
          clientId={ CLIENT_ID }
          buttonText='Logout'
          onLogoutSuccess={ logout }
        //   onFailure={ handleLogoutFailure }
        >
        </GoogleLogout>

        </div>
    )
}

export default GoogleSign
