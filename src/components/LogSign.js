import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../App.css';
import axios from 'axios'
import {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';


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
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialValues ={
    email:'',
    password:''
}



const validationSchema  = Yup.object({
    email:Yup.string().email('Invalid email Format').required('required'),
    password:Yup.string().required("Required")
})

export default function SignInSide() {
  const classes = useStyles();
  const [isLogged, setisLogged] = useState(false);
  const[error, seterror] = useState(false)
  const onSubmit= values =>{
    // console.log(values);
     axios.post("/interviewees/1", values).then(response =>{
        if(response.data.hasOwnProperty('data')){
          sessionStorage.setItem('userData', response.data.data)
          setisLogged(true)
          
        }
        else{
          seterror(true)
        }
        
         //console.log(response);
     }).catch(error =>{
         console.log(error);
     });
     console.log(isLogged);
  }

  const formik =   useFormik({
      initialValues,
      onSubmit,
      validationSchema
  })

  //console.log('Form vals', formik.values);
  if(isLogged==false){
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
              autoFocus
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              
            </Box>
           { error ?  <Alert severity="error" onClick={() => seterror(false)}>Invalid Credentials</Alert>:null}
          </form>
        </div>
      </Grid>
    </Grid>
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