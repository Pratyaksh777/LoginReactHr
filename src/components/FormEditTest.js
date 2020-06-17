
import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import DatePicker from 'react-datepicker';
import { Redirect, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import TimePicker from 'react-time-picker'
import '../App.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Formik } from 'formik'


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




const validationSchema = Yup.object({
    name: Yup.string().min(5, 'Too Short!').max(50, 'Too Long!').required('A name is required'),
    location: Yup.string().min(5, 'Too Short!').max(50, 'Too Long!').required('A location is required'),
    type: Yup.string().min(4, 'Too Short!').max(50, 'Too Long!').required('A type is required'),
    start_date: Yup.string().required('A start date is required'),
    end_date: Yup.string().required('A end date required'),
    description: Yup.string().min(10, 'Too Short!').max(50, 'Too Long!').required('A description is required'),
})





function Form({ close, p_id, open }) {

    const classes = useStyles();
    const [selDate, setselDate] = useState(null);
    const [selDate1, setselDate1] = useState(null);
    const [error, seterror] = useState(false);
    const [initial, setInitial] = useState({
        name: '',
        location: '',
        type: '',

        start_date: '',
        end_date: '',
        description: ''

    })






    const onSubmit = values => {
        console.log(p_id)

        axios.patch(`/properties/${p_id}`, values).then(response => {
            console.log(response.data.message)

            close()
            alert(response.data.message)
        })
        window.location.reload();

    };

    var rsp;

    useEffect(() => {
        let source = axios.CancelToken.source();
        axios.get(`/properties/${p_id}`, { cancelToken: source.token }).then(response => {
            rsp = response.data.data;

            const newobj = {
                name: rsp.name,
                location: rsp.location,
                type: rsp.type,
                start_date: rsp.start_date.slice(0, 10),
                end_date: rsp.end_date.slice(0, 10),
                description: rsp.description
            };

            setInitial(newobj);

            console.log(newobj);
            // console.log(formik.values.First_Name)

        });

        return () => {
            console.log("Unmounting and cleanup");
            console.log(initial.end_date)
            source.cancel();

        };



    }, []);










    return (
        <div>
            <Formik initialValues={initial} onSubmit={onSubmit} enableReinitialize>
                {(formik) => (

                    <Container component="main" maxWidth="sm">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>

                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Edit Opportunity Details</Typography>
                            <form className={classes.form} onSubmit={formik.handleSubmit}>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}
                                    >
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            // defaultValue={formik.values.name}
                                            value={formik.values.name}
                                            name="name"
                                            required
                                            id="name"
                                            label="name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            autoFocus
                                        />
                                        {formik.errors.name && formik.touched.name ? <div className="error">{formik.errors.name}</div> : null}
                                    </Grid>
                                    <Grid item xs={12}
                                    >
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            value={formik.values.location}
                                            name="location"
                                            required
                                            id="location"
                                            label="location"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            autoFocus
                                        />
                                        {formik.errors.location && formik.touched.location ? <div className="error">{formik.errors.location}</div> : null}
                                    </Grid>
                                    <Grid item xs={12}
                                    >
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            value={formik.values.type}
                                            name="type"
                                            required
                                            id="type"
                                            label="type"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            autoFocus
                                        />




                                        {formik.errors.type && formik.touched.type ? <div className="error">{formik.errors.type}</div> : null}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <label>
                                            Start of Opportunity &ensp;
      <DatePicker name="start_date" id="start_date" value={formik.values.start_date} selected={selDate} onChange={date => {
                                                setselDate(date)
                                                var ty = formatDate(date);
                                                formik.values.start_date = ty
                                            }}
                                                dateFormat='yyyy/MM/dd' minDate={new Date()} onBlur={formik.handleBlur}
                                                showYearDropdown scrollableMonthYearDropdown />
                                        </label>
                                        {formik.errors.start_date && formik.touched.start_date ? <div className="error">{formik.errors.start_date}</div> : null}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <label>
                                            End of Opportunity &ensp;
      <DatePicker name="end_date" id="end_date" value={formik.values.end_date} selected={selDate1} onChange={date => {
                                                setselDate1(date)
                                                var ts = formatDate(date);
                                                formik.values.end_date = ts
                                            }}
                                                dateFormat='yyyy/MM/dd' minDate={new Date()} onBlur={formik.handleBlur}
                                                showYearDropdown scrollableMonthYearDropdown />
                                        </label>
                                        {formik.errors.end_date && formik.touched.end_date ? <div className="error">{formik.errors.end_date}</div> : null}
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
                                            autoFocus
                                        />
                                        {formik.errors.description && formik.touched.description ? <div className="error">{formik.errors.description}</div> : null}
                                    </Grid>




                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Update Opportunity
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
