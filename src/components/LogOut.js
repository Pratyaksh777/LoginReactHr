import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';

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
            <Button  variant="outlined" color="secondary"  onClick={()=>{
                lastTime();
                sessionStorage.clear();
                 setloghook(true); 
                }}>Log out</Button><br />
        </div>
    )
}

export default LogOut
