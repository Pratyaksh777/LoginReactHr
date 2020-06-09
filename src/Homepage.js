import React from 'react';
import {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AllInterviewees from "./components/AllInterviewees"

function Homepage() {

    const [loghook, setloghook] = useState(false);

    if(loghook==true){
        return <Redirect to={"/"} />
    }
    if(sessionStorage.getItem("userData")){
        console.log("ok")
    }
    else{
        setloghook(true)
        return <Redirect to={"/"} />
    }
    

    return (
        <div>
            <h1>Hello</h1>
            <AllInterviewees />
            <Button  variant="contained" color="secondary" onClick={()=>{
                sessionStorage.clear();
                 setloghook(true); 
                }}>Log out</Button> 
        </div>
    )
}

export default Homepage
