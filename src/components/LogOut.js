import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

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
        console.log(sessionStorage.userData.toString())
    }
    else{
        setloghook(true)
        return <Redirect to={"/"} />
    }
    return (
        <div>
            <Button  variant="Danger"  onClick={()=>{
                lastTime();
                sessionStorage.clear();
                 setloghook(true); 
                }}>Log out</Button><br />
        </div>
    )
}

export default LogOut
