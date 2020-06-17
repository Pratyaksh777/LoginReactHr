import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import {Redirect} from 'react-router-dom';
var moment = require('moment-timezone');
moment().tz("Asia/Kolkata").format();

var arr=[];

const styles={
    width: '18rem',
    right:'500px', 
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    marginTop:'10px'
}
function FetchComp() {

   
    const [load, setload] =useState(false)
   
    
    var obj =new Object();
    var listItems;
    useEffect(() =>{
        let source= axios.CancelToken.source();
        axios.get('/interviewees',{cancelToken:source.token}).then(response =>{
            obj = response.data.data;
            for(var i=0;i<obj.length;i++){
                
                // const offset =  moment['tz'](moment(new Date()), "IST").utcOffset() * 60000;
                var dt =moment(obj[i].last_login).format('DD-MM-YYYY HH:MM:SS');
                obj[i].last_login= dt.toString();
                arr.push(obj[i]);
                
            }
            setload(true)
            

            // arr.sort(function(a,b){
            //     return new Date(b.last_login) - new Date(a.last_login);
            //   });
            //   console.log("arr", arr); 

          }).catch(error =>{
            console.log(error)
          })

          return () =>{
              arr=[];
            console.log("Unmounting and cleanup");
            source.cancel();
          };

    }, [])
   
    
    if(sessionStorage.getItem("userData")){
        console.log(sessionStorage.userData.toString())
    }
    else{
        
        return <Redirect to={"/"} />
    }

    return  (
        <div>
            {load ? <div style={{float:'right'}}>{listItems = arr.map((item, index) =>
            <Card  style={styles} key={item.id}><Card.Body><Card.Title>{item.First_Name}&emsp;{item.Last_Name}</Card.Title><Card.Text>Last Login:&ensp;{item.last_login}
            </Card.Text></Card.Body><br/></Card>
          )}
             </div>:null}
        </div>
    )
}

export default FetchComp
