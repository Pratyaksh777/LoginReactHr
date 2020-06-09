import React from 'react';
import {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';

function Homepage() {

    const [loghook, setloghook] = useState(false);

    if(sessionStorage.getItem("userData")){
        console.log("ok")
    }
    else{
        if(loghook==true)
        return <Redirect to={"/"} />
    }

    return (
        <div>
            <h1>Hello</h1>
            <Button  variant="contained" color="secondary" onClick={()=>{
                sessionStorage.clear();
                 setloghook(true); 
                }}>Log out</Button> 
        </div>
    )
}

export default Homepage
