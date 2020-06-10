import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

function dbquery(){
    axios.get("/remove/"+sessionStorage.userData).then(response =>{
        sessionStorage.clear();
        console.log(response)
      }).catch(error =>{
        console.log(error)
      })
      

}


function Delete() {

    if(!sessionStorage.getItem("userData")){
        return <Redirect to={"/"} />
    }

    return (
        <div>
           <Button variant="contained" onClick={dbquery} >Delete Account</Button> 
        </div>
    )
}

export default Delete
