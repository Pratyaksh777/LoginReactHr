import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../App.css';
import axios from 'axios'
import {useState, useEffect} from 'react';
import {Redirect, Link} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import history from '../history';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GoogleSign from './GoogleSign';
import GSignup from './GSignup';
import SignUp from './Signup';
import LoadingOverlay from 'react-loading-overlay';
import Gtest from './Gtest';

var flag=false;
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
   
  },
  image: {
    backgroundImage: 'url("https://wallpaperplay.com/walls/full/5/0/5/89015.jpg")',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },

  
}));

const initialValues ={
    email:'',
    password:''
    
}

function redirectx(){
  window.location.replace("http://localhost:3000/Gtest");
}


const validationSchema  = Yup.object({
    email:Yup.string().email('Invalid email Format').required('required'),
    password:Yup.string().required("Required")
})

export default function SignInSide(props) {

  useEffect(() => {
    const params = new URLSearchParams(props.location.search)
    if(params.get('error')){
      seterror({errorval:true, loading:false})
    }
    return () => {
      console.log("Unmounting")
    }
  }, [])

  
  const classes = useStyles();
  const [isLogged, setisLogged] = useState(false);
  const[error, seterror] = useState({errorval:false, loading:false})
  const [loghook, setloghook] = useState(false);
  const [modOpen, setmodOpen] = useState(false);
 
  
  const onSubmit= values =>{
    // console.log(values);
     axios.post("/interviewees/1", values).then(response =>{
        console.log(response);
        if(response.data.hasOwnProperty('data')){
          sessionStorage.setItem('userData',response.data.data.id)
          
          setisLogged(true)          
        }
        else{
          seterror({errorval:true, loading:false})
        }
        
         //console.log(response);
     }).catch(error =>{
      seterror({errorval:true, loading:false})
         console.log(error);
     });
     
  }

  const formik =   useFormik({
      initialValues,
      onSubmit,
      validationSchema
  })

  if(loghook==true){
    history.push("/")
    return <Redirect to={"/Homepage"} />
    }
    if(sessionStorage.getItem("userData")){
      history.push("/")
      setloghook(true)
      return <Redirect to={"/Homepage"} />
    }
    else{
      
        console.log("ok")
    }
  
    const handleClose = () =>{
      seterror({errorval:false, loading:false})
    }

  if(isLogged==false){
  return (
    <>
    <LoadingOverlay
        active={error.loading}
        spinner
        text='Please wait...'
        >
    <Dialog open={modOpen} onClose={() => {setmodOpen(false); }} >
    
    <DialogContent>      
    <div>
                  <Button variant="contained" color="secondary" onClick={() =>setmodOpen(false)} >
                  Close
                  </Button>
                  <Gtest erf={seterror} modf={setmodOpen} />
                  {/* <SignUp /> */}
                  </div>
                  {/* <Gtest erf={seterror} modf={setmodOpen} /> */}
                 {/* <GSignup erf={seterror} modf={setmodOpen}/> */}
                 
      </DialogContent>
      
    </Dialog>
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <div className="form-control">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              onBlur={formik.handleBlur}
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={formik.handleChange}
              value = {formik.values.email}
             
            />
            {formik.errors.email && formik.touched.email ? <div className="error">{formik.errors.email}</div>:null}
            </div>
            <div className="form-control">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value = {formik.values.password}
              autoComplete="current-password"
            />
            {formik.errors.password && formik.touched.password ? <div className="error">{formik.errors.password}</div>:null}
            </div>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <br />
            <Button  color="primary" onClick={() =>redirectx()}>Don't have and account? Sign Up!</Button>
            <p>OR</p>
            <Grid container>
              <Grid item xs>
              
                  {/* <div className="g-signin2" data-onsuccess="onSignIn" data-scope="https://www.googleapis.com/auth/user.birthday.read"></div> */}
              
                <GoogleSign erf={seterror} />
              </Grid>
              <Grid item>
               
                {/* <Link to="/Gtest" >
                Don't have an account?Sign up
              </Link> */}
                
              </Grid>
            </Grid>
            <Box mt={5}>
              
            </Box>
           { error.errorval ?  <Alert severity="error" onClick={() => seterror(false)}>Invalid Credentials or Account Doesn't exists</Alert>:null}
          </form>
        </div>
      </Grid>
    </Grid>
    </LoadingOverlay>
    </>
  );
  }
  else{

    return <Redirect to={"/Homepage"} />
   
    // return(
    //   <div>
    //     <h1>Signed in</h1>
    //   </div>
    // );
  }
}