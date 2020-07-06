import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

export class ExperienceForm extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };
    
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };
    render() {
        const { values, handleChange } = this.props;
        return (
            <div>
                <form style={{margin: 30}}>
                    <Grid container>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        placeholder="Enter Your Job Title"
                        label="Job Title"
                        onChange={handleChange('jobTitle')}
                        defaultValue={values.jobTitle}
                        margin='normal'
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        placeholder="Enter Your Company Name"
                        label="Company Name"
                        onChange={handleChange('compName')}
                        defaultValue={values.compName}
                        margin="normal"
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        placeholder="Enter Your Industry"
                        label="Industry"
                        onChange={handleChange('industry')}
                        defaultValue={values.industry}
                        margin="normal"
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        placeholder="Enter Your Company Location"
                        label="Company Location"
                        onChange={handleChange('compLocation')}
                        defaultValue={values.compLocation}
                        margin="normal"
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={this.back}
                    >Back</Button>
                    </Grid>
                    <Grid item xs={12} sm={3}> 
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.continue}
                    >Continue</Button>
                    </Grid>
                    </Grid>
                </form>
            </div>
        )
    }
}

export default ExperienceForm
