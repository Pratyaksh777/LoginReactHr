import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import DatePicker from 'react-datepicker';
import {Redirect, Link} from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import '../App.css';


var moment = require('moment'); // require
moment().format(); 



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


export default function SignUp() {
  const classes = useStyles();
  const [selDate, setselDate] = useState(null);
  const [error, seterror] =useState(false);
  const [sign, setsign] = useState(false);
  const onSubmit = values => {
    console.log(values)
    axios.post("/interviewees", values).then(response =>{
        if(response.data.success==="false"){
          seterror(true)
          
        }
        else{
          setsign(true)
          seterror(false)
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
    return <Redirect to={"/"} />
  }
  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
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
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/" >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      { error ?  <Alert severity="error" onClick={() => seterror(false)}>Error! Account already exists</Alert>:null}
      </Box>
    </Container>
  );
}