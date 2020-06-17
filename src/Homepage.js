import React from 'react';
import {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FetchComp from "./components/FetchComp"
import LogOut from './components/LogOut';
import Delete from './components/Delete';
import history from './history';
import UpdateIcon from '@material-ui/icons/Update';
import PersistentDrawerLeft from "./components/PersistentDrawerLeft";

const rt = [{name:"Update", url:"/Update", icon:<UpdateIcon />}]



function Homepage() {

    // const [loghook, setloghook] = useState(false);
    const [viewList, setviewList] = useState(false);
    // const [upd, setupd] =useState(false)
   
    // if(upd==true){
    //     history.push("/Homepage")
    //     return <Redirect to={"/Update"} />
    // }

    return (
        
        <div>
           
            <PersistentDrawerLeft pages={rt}/>
          
            <h1>Home</h1>
            
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
               <br /> 
                <br /> <Delete /> 
                <br /> <LogOut /> <br /> 
                {viewList ? <FetchComp />:null} 
                
                
        </div>
    )
}

export default Homepage
