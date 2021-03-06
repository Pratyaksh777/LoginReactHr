import React from 'react';
import axios from 'axios'
import {useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import FetchComp from "./components/FetchComp"
import LogOut from './components/LogOut';
import Delete from './components/Delete';
import history from './history';
import UpdateIcon from '@material-ui/icons/Update';
import PersistentDrawerLeft from "./components/PersistentDrawerLeft";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import ViewListIcon from '@material-ui/icons/ViewList';
import BackupIcon from '@material-ui/icons/Backup';
import HomeIcon from '@material-ui/icons/Home';

function Display1(A,B,C,D) {
    if(A==0 && B==0 && C==0 && D==0)
    {
        const rt = [
            {name:'Home', url:"/Homepage", icon:<HomeIcon />}]
            return rt
        }
    

else if(A==0 && B==0 && C==0 && D==1)
    {
      const rt = [
            {name:'Upload Resume', url:"/FileUpload", icon:<BackupIcon />},
            {name:'Home', url:"/Homepage", icon:<HomeIcon />}]
            return rt}
    

else if(A==0 && B==0 && C==1 && D==0)
    {
        const rt = [
            {name:"Interview", url:"/Interv", icon:<PersonAddIcon />},
             {name:'Home', url:"/Homepage", icon:<HomeIcon />}]
             return rt}
    

else if(A==0 && B==0 && C==1 && D==1)
    {
       const rt = [
            {name:"Interview", url:"/Interv", icon:<PersonAddIcon />},
            {name:'Upload Resume', url:"/FileUpload", icon:<BackupIcon />},
            {name:'Home', url:"/Homepage", icon:<HomeIcon />}]
            return rt }
    

else if(A==0 && B==1 && C==0 && D==0)
    {
       const rt = [
            {name:"Opportunity", url:"/Iview",icon:<LabelImportantIcon /> },
            {name:'Home', url:"/Homepage", icon:<HomeIcon />}]
   
            return rt }

else if(A==0 && B==1 && C==0 && D==1)
    {
       const rt = [
            {name:"Opportunity", url:"/Iview",icon:<LabelImportantIcon /> },
           
            {name:'Upload Resume', url:"/FileUpload", icon:<BackupIcon />},
            {name:'Home', url:"/Homepage", icon:<HomeIcon />}]
    
            return rt}
    

else if(A==0 && B==1 && C==1 && D==0)
    {
         const rt = [
            {name:"Opportunity", url:"/Iview",icon:<LabelImportantIcon /> },
            {name:"Interview", url:"/Interv", icon:<PersonAddIcon />},
            {name:'Home', url:"/Homepage", icon:<HomeIcon />}]
   
            return rt }
    


else if(A==0 && B==1 && C==1 && D==1)
    {
        const rt = [
            {name:"Opportunity", url:"/Iview",icon:<LabelImportantIcon /> },
            {name:"Interview", url:"/Interv", icon:<PersonAddIcon />},
            {name:'Upload Resume', url:"/FileUpload", icon:<BackupIcon />},
            {name:'Home', url:"/Homepage", icon:<HomeIcon />}]
   
            return rt }
   
else if(A==1 && B==0 && C==0 && D==0)
    {
        const rt = [{name:"Update", url:"/Update", icon:<UpdateIcon />},
            {name:'Home', url:"/Homepage", icon:<HomeIcon />}]
   
            return rt }
    
else if(A==1 && B==0 && C==0 && D==1)
    {
        const rt = [{name:"Update", url:"/Update", icon:<UpdateIcon />},
            {name:'Upload Resume', url:"/FileUpload", icon:<BackupIcon />},
            {name:'Home', url:"/Homepage", icon:<HomeIcon />}]
   
            return rt }
  
else if(A==1 && B==0 && C==1 && D==0)
    {
        const rt = [{name:"Update", url:"/Update", icon:<UpdateIcon />},
            {name:"Interview", url:"/Interv", icon:<PersonAddIcon />},
            {name:'Home', url:"/Homepage", icon:<HomeIcon />}]
   
            return rt }
  
else if(A==1 && B==0 && C==1 && D==1)
    {
        const rt = [{name:"Update", url:"/Update", icon:<UpdateIcon />},
            {name:"Interview", url:"/Interv", icon:<PersonAddIcon />},
            {name:'Upload Resume', url:"/FileUpload", icon:<BackupIcon />},
            {name:'Home', url:"/Homepage", icon:<HomeIcon />}]
   
            return rt }
  
else if(A==1 && B==1 && C==0 && D==0)
    {
       const rt = [{name:"Update", url:"/Update", icon:<UpdateIcon />},
            {name:"Opportunity", url:"/Iview",icon:<LabelImportantIcon /> },
            {name:'Home', url:"/Homepage", icon:<HomeIcon />}]
  
            return rt  }
  
else if(A==1 && B==1 && C==0 && D==1)
    {
        const rt = [{name:"Update", url:"/Update", icon:<UpdateIcon />},
            {name:"Opportunity", url:"/Iview",icon:<LabelImportantIcon /> },
            {name:"Interview", url:"/Interv", icon:<PersonAddIcon />},
            {name:'Home', url:"/Homepage", icon:<HomeIcon />}]
   
            return rt }
  
else if(A==1 && B==1 && C==1 && D==0)
    {
        const rt = [{name:"Update", url:"/Update", icon:<UpdateIcon />},
            {name:"Opportunity", url:"/Iview",icon:<LabelImportantIcon /> },
            {name:"Interview", url:"/Interv", icon:<PersonAddIcon />},
            {name:'Home', url:"/Homepage", icon:<HomeIcon />}]
   
            return rt }
   
else if(A==1 && B==1 && C==1 && D==1)
    {
       const rt = [{name:"Update", url:"/Update", icon:<UpdateIcon />},
            {name:"Opportunity", url:"/Iview",icon:<LabelImportantIcon /> },
            {name:"Interview", url:"/Interv", icon:<PersonAddIcon />},
            {name:'Upload Resume', url:"/FileUpload", icon:<BackupIcon />},
            {name:'Home', url:"/Homepage", icon:<HomeIcon />}]
    
            return rt}
 else
 {
     return []
 }           
            
    
}


function Homepage(props) {
   
    const [viewList, setviewList] = useState(false);
 
    history.push("/Homepage")
   // console.log(navigation.getParam('Role'))
     // const id=navigation.get('isclient')
    const id=parseInt(sessionStorage.Roleid)
    const A=parseInt(sessionStorage.A)
    const B=parseInt(sessionStorage.B)
    const C=parseInt(sessionStorage.C)
    const D=parseInt(sessionStorage.D)
    const display=()=>
    {if(id!=0)
    {return(   <Button variant="contained" style={{float:'right'}} color="primary" onClick={() =>{
                
        setviewList(true)
    
}}><ViewListIcon />
    &ensp;View Users
    </Button>  )}}
    return (
        
        <div>
           
            <PersistentDrawerLeft pages={Display1(A,B,C,D)} title="Welcome"/>
          
            <h1>Home</h1>
            
            
          
            
               {display()}
         
               <br/>
                <br /> <Delete/>
                <br /> <LogOut /> <br /> 
                {viewList ? <FetchComp />:null} 
                
                
        </div>
    )
}

export default Homepage
