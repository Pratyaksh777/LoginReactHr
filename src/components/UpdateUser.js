import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Redirect} from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import LogOut from './LogOut';


var moment = require('moment'); // require
moment().format(); 

function Copyright() {
   

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialValues ={
  First_Name:'',
  Last_Name:'',
  DOB:'',
  email:"",
  password:""
}


var rsp;


function formatDate(date) { 
  var day = date.getDate(); 
  if (day < 10) { 
      day = "0" + day; 
  } 
  var month = date.getMonth() + 1; 
  if (month < 10) { 
      month = "0" + month; 
  } 
  var year = date.getFullYear(); 
  return year + "-" + month + "-" + day; 
} 

const validationSchema= Yup.object({
  First_Name:Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('required'),
  Last_Name:Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('required'),
  DOB:Yup.string().test(
    "DOB",
    "You must be at least 18 or above",
    value => {
      return moment().diff(moment(value),'years') >= 18;
    }
  ),
  email:Yup.string().email('Invalid email Format').required('required'),
  password:Yup.string().required("Required")
})


var x;
var formik;
export default function UpdateUser() {
  
  useEffect(() =>{
    let source= axios.CancelToken.source();
    axios.get('/interviewees/'+x).then(response =>{
        rsp=response.data.data;
        formik.values.First_Name=rsp.First_Name;
        formik.values.Last_Name = rsp.Last_Name;
   
        formik.values.email= rsp.email;
        formik.values.password = rsp.password;
           var currentTimex = rsp.DOB;
   
        var currentTime = new Date(currentTimex)
        var dateval = formatDate(currentTime)
        console.log(dateval)
        formik.values.DOB =dateval;
       
        
        
        setload(true)
        // console.log(formik.values.First_Name)
        
      }).catch(error =>{
        console.log(error)
      })

      return () =>{
        console.log("Unmounting and cleanup");
        source.cancel();
      };

}, []);
 

  const classes = useStyles();
  const [selDate, setselDate] = useState(null);
  const [loghook, setloghook] = useState(false);
  const [load, setload] =useState(false)
  const [back, setback] =useState(false)
  const onSubmit = values => {
    console.log(values)
    axios.patch("/interviewees/"+x, values).then(response =>{
      
        // console.log(response)
      }).catch(error =>{
        console.log(error)
      })
      
  }; 
  
  
  formik =   useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })
  
    if(loghook==true){
        return <Redirect to={"/"} />
    }
    if(sessionStorage.getItem("userData")){
        // const item = sessionStorage.getItem("userData");
        x = sessionStorage.userData;
        // console.log(item)
    }
    else{
        setloghook(true)
        return <Redirect to={"/"} />
    }  
    if(back==true){
      return <Redirect to={"/Homepage"} />
    }
    
    
  return (
    <div>{load ? 
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Profile
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              
              <TextField
                variant="outlined"
                fullWidth
                defaultValue={formik.values.First_Name}
                name="First_Name"
                required
                id="First_Name"
                label="First Name"
                onChange={event => formik.values.First_Name=event.target.value}
                autoFocus
              />
              
            </Grid>
            <Grid item xs={12} sm={6}>
               
              <TextField
                variant="outlined"
                fullWidth
                required
                defaultValue={formik.values.Last_Name}
                id="Last_Name"
                label="Last Name"
                name="Last_Name"
                onChange={event => formik.values.Last_Name=event.target.value}
              />
              
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                defaultValue={formik.values.email}
                onChange={event => formik.values.email=event.target.value}

              />
            </Grid>
            <Grid item xs={12}>
              <label>
                Date of Birth &ensp;
              <DatePicker name="DOB" id="DOB" value = {formik.values.DOB} selected={selDate} onChange={date => {setselDate(date)
             var ty =formatDate(date);
             console.log(moment().diff(moment(ty), 'years'))
              formik.values.DOB=ty}} 
              dateFormat='yyyy/MM/dd' maxDate={new Date()}
              
              showYearDropdown scrollableMonthYearDropdown/>
            </label>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={event => formik.values.password=event.target.value}
                defaultValue = {formik.values.password}
              />
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update
          </Button>
          <Grid container justify="flex-end">
            {/* <FetchComp /> */}
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      <Button variant="contained" onClick={() =>{
      setback(true);
    }}>Back To Home</Button>
      </Box>
      <br/>
      <LogOut />
    </Container> :<LogOut />}
    
    </div>
  );


}