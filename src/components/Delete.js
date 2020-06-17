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
    const [delhook, setdelhook] = useState(false);
    if(delhook==true){
        return <Redirect to={"/"} />
    }
    if(!sessionStorage.getItem("userData")){
        setdelhook(true)
        
    }

    return (
        <div >
           <Button variant="contained" onClick={() => {
               dbquery();
               sessionStorage.clear();
               setdelhook(true);
               }} >Delete Account</Button> 
        </div>
    )
}

export default Delete
