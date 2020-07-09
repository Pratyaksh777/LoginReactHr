import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
var x;
if(sessionStorage.getItem("userData")){
    // const item = sessionStorage.getItem("userData");
    x = sessionStorage.userData;
    // console.log(item)
}
export class ContactForm extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    render() {
        const { values, handleChange } = this.props;
        return (
            <div>
                <form style={{margin: 30}}>
                    <Grid container>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        placeholder="Enter Your First Name"
                        label="First Name"
                        onChange={handleChange('firstName')}
                        defaultValue={values.firstName}
                        margin="normal"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        placeholder="Enter Your Last Name"
                        label="Last Name"
                        onChange={handleChange('lastName')}
                        defaultValue={values.lastName}
                        margin="normal"
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        placeholder="Enter Your Email"
                        label="Email"
                        onChange={handleChange('email')}
                        defaultValue={values.email}
                        margin="normal"
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        placeholder="Enter Your Contact Number"
                        label="Contact Number"
                        onChange={handleChange('mobile_number')}
                        defaultValue={values.mobile_number}
                        margin="normal"
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        placeholder="Enter Your City"
                        label="City"
                        onChange={handleChange('city')}
                        defaultValue={values.city}
                        margin="normal"
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        placeholder="Enter Your State"
                        label="State"
                        onChange={handleChange('state')}
                        defaultValue={values.state}
                        margin="normal"
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.continue}
                    >Continue</Button>
                    </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}

export default ContactForm
