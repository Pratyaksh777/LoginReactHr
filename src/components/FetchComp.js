import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Redirect } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
var moment = require('moment-timezone');
moment().tz("Asia/Kolkata").format();



var arr = [];
const roles = ["client", "admin", "super admin"];

const styles = {
  width: '18rem',
  right: '500px',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  marginTop: '10px'
}






function FetchComp() {




  const [load, setload] = useState(false)
  const [role_change, setRole_change] = useState(false)
  const[A,setA]=useState(false)
  const[B,setB]=useState(false)
  const[C,setC]=useState(false)
  const[D,setD]=useState(false)




  const handleChangeRole = (props) => {
    console.log("the value of role is on change = " + props.Role_id);
    console.log("the corrsponding id is :- " + props.id)
    console.log("the index is :- " + props.index)
    console.log(arr[props.index])
    console.log("values of role changes ")
    if (arr[props.index].Role_id == 1) {
      arr[props.index].Role_id = 0;
    } else {
      arr[props.index].Role_id = 1;
    }
    

    arr[props.index].DOB = arr[props.index].DOB.slice(0, 10);
    console.log(arr[props.index]);


    axios.patch("/interviewees/" + props.id, arr[props.index]).then(response => {

      console.log(response.message);
      setRole_change(!role_change);
     
    })




  };

  const handleChangeRole1 = (props) => {
    if (arr[props.index].A == 1) {
      arr[props.index].A = 0;
    } else {
      arr[props.index].A = 1;
    }
    

    arr[props.index].DOB = arr[props.index].DOB.slice(0, 10);
    console.log(arr[props.index]);
 axios.patch("/interviewees/" + props.id, arr[props.index]).then(response => {
      setA(!A)
    })


    
    }
    const handleChangeRole2 = (props) => {
      if (arr[props.index].B == 1) {
        arr[props.index].B = 0;
      } else {
        arr[props.index].B = 1;
      }
      

    arr[props.index].DOB = arr[props.index].DOB.slice(0, 10);
    console.log(arr[props.index]);
   axios.patch("/interviewees/" + props.id, arr[props.index]).then(response => {
        setB(!B)
      })
  
  
      
      }

      const handleChangeRole3 = (props) => {
        if (arr[props.index].C == 1) {
          arr[props.index].C = 0;
        } else {
          arr[props.index].C = 1;
        }
        

    arr[props.index].DOB = arr[props.index].DOB.slice(0, 10);
    console.log(arr[props.index]);
     axios.patch("/interviewees/" + props.id, arr[props.index]).then(response => {
          setC(!C)
        })
    
    
        
        }
        const handleChangeRole4 = (props) => {
          if (arr[props.index].D == 1) {
            arr[props.index].D = 0;
          } else {
            arr[props.index].D = 1;
          }
          

    arr[props.index].DOB = arr[props.index].DOB.slice(0, 10);
    console.log(arr[props.index]);
       axios.patch("/interviewees/" + props.id, arr[props.index]).then(response => {
            setD(!D)
          })
      
      
          
          }
      
    




  



  var obj = new Object();
  var listItems;
  useEffect(() => {
    let source = axios.CancelToken.source();
    axios.get('/interviewees', { cancelToken: source.token }).then(response => {
      obj = response.data.data;
      for (var i = 0; i < obj.length; i++) {

        // const offset =  moment['tz'](moment(new Date()), "IST").utcOffset() * 60000;
        var dt = moment(obj[i].last_login).format('DD-MM-YYYY HH:MM:SS');
        obj[i].last_login = dt.toString();
        arr.push(obj[i]);

      }
      setload(true)
      console.log("in use effect when roel change is = " + role_change);

      // arr.sort(function(a,b){
      //     return new Date(b.last_login) - new Date(a.last_login);
      //   });
      //   console.log("arr", arr); 

    }).catch(error => {
      console.log(error)
    }).finally(() => {

      console.log(arr)
    })

    return () => {
      arr = [];
      console.log("Unmounting and cleanup");
      source.cancel();
    };

  }, [role_change],[A],[B],[C],[D])


  if (sessionStorage.getItem("userData")) {
    console.log(sessionStorage.userData.toString())
  }
  else {

    return <Redirect to={"/"} />
  }
  
  const ida=parseInt(sessionStorage.Roleid)
  
  const display=(item,index)=>
  {if(ida!=0 && ida!=1)
  {return(
  <Card>
  <Card.Text>is admin ?
    <Switch
      checked={item.Role_id}
      color="primary"
      onChange={() => handleChangeRole({ Role_id: item.Role_id, id: item.id, index: index })}
      inputProps={{ 'aria-label': 'secondary checkbox' }}/></Card.Text>
      <Card.Text>
        Update<Checkbox
      checked={item.A}
      color="primary"
      onChange={() => handleChangeRole1({ A: item.A, id: item.id, index: index })}
      inputProps={{ 'aria-label': 'secondary checkbox' }}
    />Opportunity
       <Checkbox
      checked={item.B}
      color="primary"
     
      onChange={() => handleChangeRole2({ B: item.B, id: item.id, index: index })}
     inputProps={{ 'aria-label': 'secondary checkbox' }}
    />
    </Card.Text>
    <Card.Text>
        Interview <Checkbox
     checked={item.C}
      color="primary"
      onChange={() => handleChangeRole3({ C: item.C, id: item.id, index: index })}
      inputProps={{ 'aria-label': 'secondary checkbox' }}
    />Upload
       <Checkbox
     checked={item.D}
      color="primary"
      onChange={() => handleChangeRole4({ D: item.D, id: item.id, index: index })}
      inputProps={{ 'aria-label': 'secondary checkbox' }}
    />
    </Card.Text></Card>) }}
  return (
    <div>
      {load ? <div style={{ float: 'right' }}>{listItems = arr.map((item, index) =>
        <Card style={styles} key={item.id}><Card.Body><Card.Title>{item.First_Name}&emsp;{item.Last_Name}</Card.Title><Card.Text>Last Login:&ensp;{item.last_login.toString()}
     {display(item,index)}
        </Card.Text></Card.Body><br /></Card>
      )}
      </div> : null}
    </div>
  )
}

export default FetchComp


