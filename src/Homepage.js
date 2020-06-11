import React from 'react';
import {useState} from 'react';
import {Redirect} from 'react-router-dom';
import { Button } from 'reactstrap';
import FetchComp from "./components/FetchComp"
import LogOut from './components/LogOut';
import Delete from './components/Delete';

function Homepage() {

    // const [loghook, setloghook] = useState(false);
    const [viewList, setviewList] = useState(false);
    const [upd, setupd] =useState(false)
   
    if(upd==true){
        return <Redirect to={"/Update"} />
    }

    return (
        <div>
            <h1>Hello</h1>
            
            <Button variant="contained" color="primary" onClick={() =>{
                
                    setviewList(true)
                
            }}>
                View Users
                </Button> 
                <br/>   
            
            {/* <Button  variant="Danger"  onClick={()=>{
                sessionStorage.clear();
                 setloghook(true); 
                }}>Log out</Button><br /> */}
               <br /> <LogOut /> <br />
            <Button variant="contained" onClick={() =>{
               setupd(true)
            }}>
                Update Profile
                </Button> <br /> 
                <br /> <Delete />  
                {viewList ? <FetchComp />:null} 
                
                
        </div>
    )
}

export default Homepage
