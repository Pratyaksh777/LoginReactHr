import React, {useState} from 'react';
import axios from 'axios'
var arr=[]

function ListGen(){
    console.log(arr)
    const listItems = arr.map((item, index) =>
    <li key={index}>{item}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

function fetchAll(){
    
    var obj =new Object();
    axios.get("/interviewees").then(response =>{
        obj = response.data.data;
        // console.log(response.data.data)
        var currentTime = new Date();

        var currentOffset = currentTime.getTimezoneOffset();

        var ISTOffset = 330;   // IST offset UTC +5:30 

        var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
        
        var ty =ISTTime.toISOString().split('T')[0];
        
        var splitNow = ty.split("-")

        for(var i=0;i<obj.length;i++){
            var dt = obj[i].last_login.split("T")[0];
            dt = dt.split(" ")[0];
            var splittedDate = dt.split("-");
           
            if(parseInt(splitNow[0])==parseInt(splittedDate[0]) && parseInt(splitNow[1])==parseInt(splittedDate[1]) && parseInt(splitNow[2])==parseInt(splittedDate[2])){
                   arr.push(obj[i].First_Name);
                
                }
            
        }
        
        console.log(arr)
        
    }).catch(error =>{
        console.log(error)
    })

}

function AllInterviewees() {
    
    
   fetchAll();

    return (
        <div>
            <h1>Got em</h1>
            {/* render here */}
        </div>
    )
    
}

export default AllInterviewees
