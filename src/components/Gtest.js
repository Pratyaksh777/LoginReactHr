import React from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import '../Social.css';
import {Redirect, Link} from 'react-router-dom';
import {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import DatePicker from 'react-datepicker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import '../App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingOverlay from 'react-loading-overlay';
var flag=false;


const CLIENT_ID = '51527806993-p7adkqpbc3ufg2dum8gimhf0bt396k2h.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBBkJllROH4170MachQsGF0yht_qWrUaZI';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/people/v1/rest"];


function loadClient() {
    window.gapi.client.setApiKey("AIzaSyBBkJllROH4170MachQsGF0yht_qWrUaZI");
    return window.gapi.client.load("https://people.googleapis.com/$discovery/rest?version=v1")
        .then(function() { console.log("GAPI client loaded for API"); 
        execute();},
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return window.gapi.client.people.people.get({
      "resourceName": "people/me",
      "personFields": "birthdays"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                var bdt = response.result.birthdays[0].date;
                var Bday = bdt.year+"-"+bdt.month+"-"+bdt.day;
                console.log(Bday)
                resp( Bday);
              },
              function(err) { console.error("Execute error", err); });
  }
  
function resp( bday){
      let gUser = window.gapi.auth2.getAuthInstance().currentUser.le.wc.id_token;
      let uid = window.gapi.auth2.getAuthInstance().currentUser.le.Qt.JU;
    //   let propic = window.gapi.auth2.getAuthInstance().currentUser.le.Qt.MK;
    //   let email = window.gapi.auth2.getAuthInstance().currentUser.le.Qt.Au;
    //   let fname = window.gapi.auth2.getAuthInstance().currentUser.le.Qt.nW;
    //   let lname = window.gapi.auth2.getAuthInstance().currentUser.le.Qt.nU;
      console.log(window.gapi.auth2.getAuthInstance().currentUser)
     axios.post("/googleup", {"idToken":gUser, "DOB":bday, "UserId":uid}).then(response =>{
         console.log(response);
         if(response.data.success=="True"){
            sessionStorage.setItem('userData',response.data.person);
            sessionStorage.setItem("Social", "Google");
            window.location.replace("http://localhost:3000/Homepage")
          }
        //  return <Redirect to={"/"} />
     }).catch(error =>{
         console.log("Error", error)
     })

    }

function login(googleuser){

    
    console.log(googleuser)
    // authenticate().then(loadClient)
    loadClient();
    
  
}

function logout(response){
    console.log('Logged out');
}

// function authenticate() {

//     window.gapi.load("client:auth2", function() {
//         window.gapi.auth2.init({client_id: "51527806993-p7adkqpbc3ufg2dum8gimhf0bt396k2h.apps.googleusercontent.com"});
        
//       });
    

//     return window.gapi.auth2.getAuthInstance()
//         .signIn({scope: "https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
            
//       })
//         .then(function() { console.log("Sign-in successful"); 
//                              },
//               function(err) { console.error("Error signing in", err); });
//   }



// function Gtest(props) {



//     return (
//         <div>
//             {/* <Button variant="contained" className="customBtn" onClick={() =>{
//               login();
//               props.modf(false);
//               // props.erf({errorval:false, loading:true})
//               }} ></Button>
//              */}

             
//             <GoogleLogin
//           clientId={CLIENT_ID}
//           apiKey ={API_KEY}
//           scope="profile email https://www.googleapis.com/auth/user.birthday.read"
//           buttonText='Login'
//           onSuccess={(googleUser) =>{
//               login(googleUser);
//               props.modf(false);
//               props.erf({errorval:false, loading:true});
//             }}
//           cookiePolicy={ 'single_host_origin' }
//           responseType='code,token'
//           discoveryDocs ={DISCOVERY_DOCS}
//         />
          
        
//         <br />
        

//         </div>
//     )
// }

// export default Gtest


var moment = require('moment'); // require
moment().format(); 

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



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

const initialValues ={
  First_Name:'',
  Last_Name:'',
  DOB:'',
  email:"",
  password:""
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
  password:Yup.string().required("Required").min(8, 'Too Short'),
  Cpassword:Yup.string().when("password", {
    is: val => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    )
  })


})



var formik;


export default function Gtest() {
  const classes = useStyles();
  const [selDate, setselDate] = useState(null);
  const[error, seterror] = useState({errorval:false, loading:false})
  const [sign, setsign] = useState(false);
  const onSubmit = values => {
    console.log(values)
    axios.post("/interviewees", values).then(response =>{
        if(response.data.success==="false"){
          // seterror(true)
          seterror({errorval:true, loading:false})
          toast.error('Error! An Account with that email already exists', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

        }
        else{
          setsign(true)
          // seterror(false)
          seterror({errorval:false, loading:false})
        }

        console.log(response)
      }).catch(error =>{
        console.log(error)
      })
      
      
  }; 
  

  formik =   useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })
  
  if(sign==true){
    // return <Redirect to={"/"} />
  }
  if(sessionStorage.getItem("userData")){
    setsign(true);
    return <Redirect to={"/Homepage"} />
  }

  return (
    <LoadingOverlay
        active={error.loading}
        spinner
        text='Signing In...'
        >
    <Container component="main" maxWidth="xs">
        <GoogleLogin
          clientId={CLIENT_ID}
          apiKey ={API_KEY}
          scope="profile email https://www.googleapis.com/auth/user.birthday.read"
          buttonText='Sign In with Google'
          onSuccess={(googleUser) =>{
            seterror({errorval:false, loading:true});  
            login(googleUser);
              
            }}
          cookiePolicy={ 'single_host_origin' }
          responseType='code,token'
          discoveryDocs ={DISCOVERY_DOCS}
        />
       
        
      <CssBaseline />
      <div className={classes.paper}>
      <h3>OR</h3>
        <Avatar className={classes.avatar}>
          
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
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
                onBlur={formik.handleBlur}
                
              />
              {formik.errors.First_Name && formik.touched.First_Name ? <div className="error">{formik.errors.First_Name}</div>:null}
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
                onBlur={formik.handleBlur}
                onChange={event => formik.values.Last_Name=event.target.value}
              />
              {formik.errors.Last_Name && formik.touched.Last_Name ? <div className="error">{formik.errors.Last_Name}</div>:null}
            </Grid>
            <Grid item xs={12}>
              <label>
                Date of Birth &ensp;
              <DatePicker name="DOB" id="DOB" value = {formik.values.DOB} selected={selDate} onChange={date => {setselDate(date)
             var ty =formatDate(date);
              formik.values.DOB=ty}} 
              dateFormat='yyyy/MM/dd' maxDate={new Date()}  onBlur={formik.handleBlur}            
              showYearDropdown scrollableMonthYearDropdown/>
            </label>
            {formik.errors.DOB && formik.touched.DOB ? <div className="error">{formik.errors.DOB}</div>:null}
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
                onBlur={formik.handleBlur}
                onChange={event => formik.values.email=event.target.value}

              />
              {formik.errors.email && formik.touched.email ? <div className="error">{formik.errors.email}</div>:null}
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
                onBlur={formik.handleBlur}
                autoComplete="current-password"
                onChange={event => formik.values.password=event.target.value}
                defaultValue = {formik.values.password}
              />
              {formik.errors.password && formik.touched.password ? <div className="error">{formik.errors.password}</div>:null}
            </Grid>
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                name="Cpassword"
                label="Password"
                type="password"
                id="Cpassword"
                onBlur={formik.handleBlur}
                autoComplete="current-password"
                onChange={event => formik.values.Cpassword=event.target.value}
                defaultValue = {formik.values.Cpassword}
              />
              {formik.errors.Cpassword && formik.touched.Cpassword ? <div className="error">{formik.errors.Cpassword}</div>:null}
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <br />
          
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/" >
                Already have an account? Sign in
              </Link>
              {/* <div className="g-signin2" data-onsuccess="onSignIn" data-scope="https://www.googleapis.com/auth/user.birthday.read"></div> */}
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      { error.errorval ?  <Alert severity="error" onClick={() => seterror(false)}>Error! Account already exists</Alert>:null}
      </Box>
    </Container>
    </LoadingOverlay>
  );
}