import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
const CLIENT_ID = '51527806993-p7adkqpbc3ufg2dum8gimhf0bt396k2h.apps.googleusercontent.com';
var soc="";
function lastTime(){
    axios.post("/timeupdate/"+sessionStorage.userData, null).then(response =>{
        // console.log(response)
      }).catch(error =>{
        console.log("Error in updating time")
      })
    
}

function LogOut() {
    const [loghook, setloghook] = useState(false);
   
    if(loghook==true){
        return <Redirect to={"/"} />
    }
    if(sessionStorage.getItem("userData")){
        if(sessionStorage.getItem("Social")){
            if(sessionStorage.Social==="Google"){
                soc = "Google";
            };
        }
        console.log(sessionStorage.userData.toString())
    }
    else{
        setloghook(true)
        return <Redirect to={"/"} />
    }
    return (
        <div>
            {soc=="Google" ? <GoogleLogout
             clientId={ CLIENT_ID }
             buttonText='Logout'
             onLogoutSuccess={ ()=>{ 
                lastTime();
                soc="";
                sessionStorage.clear();
                 setloghook(true); 
             } }
            ></GoogleLogout>:  
            <Button  variant="outlined" color="secondary"  onClick={()=>{
                lastTime();
                sessionStorage.clear();
                 setloghook(true); 
                }}>Log out</Button> }
           
        </div>
    )
}

export default LogOut
