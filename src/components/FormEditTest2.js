
import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import * as Yup from 'yup';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import DateTimePicker from 'react-datetime-picker';
import '../App.css';
import { Formik, useFormik } from 'formik'

var moment = require('moment-timezone');
moment().tz("Asia/Kolkata").format();

function reconvert(value)
{console.log('The value in reconvert value recived')
 console.log(value)
 var arr=[value]
 var t=arr.toString().slice(11,16)
 var y=arr.toString().slice(6,10)
 var m=arr.toString().slice(3,5)
 var d=arr.toString().slice(0,2)
var e="GMT+0530 (India Standard Time)"
console.log(t)
 console.log(y)
 console.log(m)
 console.log(d)
 console.log("value in return in reconvert =" +dayofweek(d,m,y)+" "+month(m)+" "+d+" "+y+" "+t+":00 "+e)
 return(dayofweek(d,m,y)+" "+month(m)+" "+d+" "+y+" "+t+":00 "+e)
}
function month(m)
{ 
  switch(m) {
 
    case '01':
      return('Jan');
    
    case '02':
      return('Feb');

    case '03':
      return('Mar');

    case '04':
      return('Apr') ;

      case '05':
      return('May') ;

      case '06':
      return('Jun') ;

      case '07':
      return('Jul') ;

      case '08':
      return('Aug') ;

      case '09':
      return('Sep') ;

      case '10':
      return('Oct') ;
    
      case '11':
      return('Nov') ;

      case '12':
      return('Dec') ;
     
     
    }
  
}
function leap_year(y)
{console.log("leap year")
    var check=0;
    if(y%4==0)
        if(y%100==0)
            if(y%400==0)
                check=1;
            else
                check=0;
        else
            check=1;
    else
        check=0;
        console.log(check)
    return check;
}

function dayofweek(d, m, y)
{
    var M=[1,4,4,0,2,5,0,3,6,1,4,6];
    var Y=[4,2,0,6];
    console.log(M[m-1])
    var sum=(parseInt(y%100)/4)+parseInt(d)+parseInt(M[m-1]);
    console.log(sum)
    var z=leap_year(y)
    if(z==1){console.log('check is1')}
    if((z==1)&&(m<3))
   {  console.log(leap_year(y)+7)
        sum=sum-1;
    }
    if(y<1700)
    {
        while(y<1700)
        {
            y=y+400;
        }
    }
    else if(y>=2100)
    {
        while(y>=2100)
        {console.log('deleting 400')
            y=y-400;
        }
    }
    console.log(y)
    var i=parseInt(y/100)-parseInt(17)
    var ycode=0;
    switch(i) {
      case 0:
        ycode=4
      case 1:
        ycode=2      
      case 2:
        ycode=0
      case 3:
        ycode=6
      }
    console.log(ycode)
    console.log('Summ')
    sum=parseInt(sum)+parseInt(ycode)+parseInt(y%100);
    console.log(sum)
    sum=parseInt(sum%7)-1;
    if(sum<0)
    {
        while(sum<0)
        {
            sum=sum+7;
        }
    }
    console.log(sum)
    switch(sum) {
		case 0:
		  return("Sun")
		case 1:
      return("Mon")        
		case 2:
      return("Tue")
		case 3:
      return("Wed") 
	  case 4:
      return("Thu") 
    case 5:
      return("Fri") 
	  case 6:
      return("Sat")
}
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    center: { alignItems: 'center' },

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
    }

}));

const validationSchema= Yup.object({
    title:Yup.string().min(10, 'Too Short!').max(50, 'Too Long!').required('A title is required'),
    description:Yup.string().min(10, 'Too Short!').max(50, 'Too Long!').required('A description is required'),
    date_and_time:Yup.string().required('A date and time for interview is required')  ,
    contact:Yup.string().matches('^[0-9]{10}$','A valid phone no. is required').required('Contact No. is required'),
    })
    var formik;



function format1(value){
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
     
    
     return (year + "-" + month + "-" + day+" "+x);}

function Form({ close, p_id, open }) {
    const [selDate, setselDate] = useState(null);
   
    const [error, seterror] = useState(false);
    const [initial, setInitial] = useState({
        title:'',
  description:'',
  contact:'',
  date_and_time:''

    })
    const v_id=p_id;
const onSubmit = values => {
        console.log(p_id)
        console.log("value object is recived in submit is before format "+values)
        values.date_and_time=format1(values.date_and_time);
        console.log("value object is recived in submit is after format "+values)

        axios.patch(`/interviews/${p_id}`, values).then(response => {
            console.log(response.data.message)

            
            alert(response.data.message)
        })
         window.location.reload();

    };

    formik=useFormik({
        onSubmit,
        validationSchema
    })

    var rsp;

    useEffect(() => {
        console.log("id recived is " +p_id)
        let source = axios.CancelToken.source();
        axios.get(`/interviews/${p_id}`, { cancelToken: source.token }).then(response => {
        console.log("response recived is ")  
        console.log(response)  
        rsp = response.data.data;
            console.log("the value recived and is is before reconvert"+rsp.date_and_time)
            var correct=moment(rsp.date_and_time).format('DD-MM-YYYY HH:mm')
           var date=reconvert(correct)
            console.log("value in date after reconert is is " +date)
            console.log("value right before submission  is " +new Date(date))
            const newobj = {
            title: rsp.title,
                contact: rsp.contact,
                
                date_and_time:new Date(date),//call the object
                
                description: rsp.description
            };

            setInitial(newobj);

            console.log(newobj);
            console.log("initial chabged are")
            console.log(initial)
            
           

        });

        return () => {
            console.log("Unmounting and cleanup");
            console.log(initial.date_and_time)
            source.cancel();

        };



    }, []);

    return (
        <div>
            <div>
                {console.log("value in return")}
                {console.log(initial)}
            </div>
            <Formik initialValues={initial} onSubmit={onSubmit} enableReinitialize>
                {(formik) => (
                            
                    <Container component="main" maxWidth="sm">
                        <CssBaseline />
                        <div //className={classes.paper}
                        >
                            <Avatar 
                            //  className={classes.avatar}
                            >

                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Edit Interview Details</Typography>
                            <form 
                            //className={classes.form} 
                            onSubmit={formik.handleSubmit}>
                            <Grid container spacing={5}>
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                fullWidth
                value={formik.values.title}
                name="title"
                required
                id="title"
                label="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                
              />
              {formik.errors.title && formik.touched.title ? <div className="error">{formik.errors.title}</div>:null}
            </Grid>
            <Grid item xs={12} >
            <TextField
                variant="outlined"
                fullWidth
                value={formik.values.description}
                name="description"
                required
                id="description"
                label="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
               />
              {formik.errors.description && formik.touched.description ? <div className="error">{formik.errors.description}</div>:null}
            </Grid>
             <Grid item xs={12}>
               Date and Time(24 hour) of Interview &ensp;
                <DateTimePicker name="date_and_time" id="date_and_time"
                 variant="outlined"
                 fullWidth
                
                value = {formik.values.date_and_time} 
                minDate={new Date()}  onBlur={formik.handleBlur} 
               required 
               format="yyyy-MM-dd HH:mm"
               showYearDropdown scrollableMonthYearDropdown
               onChange={value =>{ formik.values.date_and_time =value
           }}
              />
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
                value={formik.values.contact}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.contact && formik.touched.contact ? <div className="error">{formik.errors.contact}</div>:null}
            </Grid>
            </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                 //  className={classes.submit}
                                >
                                    Update Interview
  </Button>
                                <Grid container justify="flex-end">
                                    <Grid item>

                                    </Grid>
                                </Grid>
                            </form>


                        </div>
                        <Box mt={5}>
                            {error ? <Alert severity="error" onClick={() => seterror(false)}>Error! Interview already exists</Alert> : null}
                        </Box>
                    </Container>

                )}

            </Formik>

        </div>
    )
}

export default Form
