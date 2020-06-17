
import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {Redirect, Link} from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import DateTimePicker from 'react-datetime-picker';
import '../App.css';

var moment = require('moment-timezone');
moment().tz("Asia/Kolkata").format();
var arr=[];

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


const initialValues ={
  title:'',
  description:'',
  contact:'',
  date_and_time:''
 
}
function format(value) {
  console.log('Original value')
  console.log(value)
  var arr=[value]
  var x=arr.toString().slice(16,21)
   var day = value.getDate();
   if (day < 10) {
       day = "0" + day;
   }
   var month = value.getMonth() + 1;
   if (month < 10) {
       month = "0" + month;
   }
   var year = value.getFullYear();
  
   return (year + "-" + month + "-" + day+" "+x);
  
}


const validationSchema= Yup.object({
  title:Yup.string().min(10, 'Too Short!').max(50, 'Too Long!').required('A title is required'),
  description:Yup.string().min(10, 'Too Short!').max(50, 'Too Long!').required('A description is required'),
  date_and_time:Yup.string().required('A date and time for interview is required')  ,
  contact:Yup.string().length(10,"Please Enter a number").required('Contact No. is required'),//matches('^[0][1-9]\d{9}$|^[1-9]\d{9}$').
  })

  var formik;

 function Form({close}) {
  const classes = useStyles();
  const [error, seterror] =useState(false);
  const [sign, setsign] = useState(false);
  var obj =new Object();
  var listItems;
  const onSubmit = values => {
    // console.log(format(values.date_and_time))
    // console.log("this is before submit in form "+values)
     values.date_and_time=format(values.date_and_time);
    // console.log(values)
    // console.log(formik.erros)
    axios.post("/interviews", values).then(response =>{
      console.log(response.data.message)

      // close()
      alert(response.data.message)
      }).finally(() =>{
        // alert("Hello")
        
      })
      
      window.location.reload();
      
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
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Interview
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                fullWidth
                defaultValue={formik.values.title}
                name="title"
                required
                id="title"
                label="title"
                onChange={event => formik.values.title=event.target.value}
                onBlur={formik.handleBlur}
                autoFocus
              />
               {formik.errors.title && formik.touched.title ? <div className="error">{formik.errors.title}</div>:null} 
            </Grid>
            <Grid item xs={12} >
            <TextField
                variant="outlined"
                fullWidth
                defaultValue={formik.values.description}
                name="description"
                required
                id="description"
                label="description"
                onChange={event => formik.values.description=event.target.value}
                onBlur={formik.handleBlur}
                autoFocus/>
              {formik.errors.description && formik.touched.description ? <div className="error">{formik.errors.description}</div>:null}
            </Grid>
             <Grid item xs={12}>
               Date and Time(24 hour) of Interview &ensp;
                <DateTimePicker name="date_and_time" id="date_and_time"
                 label="date_and_time"
                 variant="outlined"
                 fullWidth
                value = {formik.values.date_and_time} 
                minDate={new Date()}  onBlur={formik.handleBlur} 
               required
                format="yyyy-MM-dd HH:mm"
               showYearDropdown scrollableMonthYearDropdown
               onChange={value => {formik.values.date_and_time =value
              console.log("this is in date form "+value)}}
               autoFocus/>
                 {formik.errors.date_and_time && formik.touched.date_and_time ? <div className="error">{formik.errors.date_and_time}</div>:null}
            
            </Grid>
            <Grid item xs={12}>
            <TextField 
                variant="outlined"
                required
                fullWidth
                id="contact"
                label="contact"
                name="contact"
                autoComplete="contact"
                defaultValue={formik.values.contact}
                onBlur={formik.handleBlur}
                onChange={event => formik.values.contact=event.target.value}
                />
              {formik.errors.contact && formik.touched.contact ? <div className="error">{formik.errors.contact}</div>:null}
            </Grid>
            </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Add Interview
          </Button>
        </form>
      </div>
      <Box mt={5}>
      { error ?  <Alert severity="error" onClick={() => seterror(false)}>Error! Interview already exists</Alert>:null}
      </Box>
    </Container>
  );
}
export default Form