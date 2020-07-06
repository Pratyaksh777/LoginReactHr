import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

export class EducationForm extends Component {
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
                        placeholder="Enter Your School Name"
                        label="School Name"
                        onChange={handleChange('schoolName')}
                        defaultValue={values.schoolName}
                        margin='normal'
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        placeholder="Enter Your Field of Study"
                        label="Field of Study"
                        onChange={handleChange('studyField')}
                        defaultValue={values.studyField}
                        margin="normal"
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        placeholder="Enter Your Degree"
                        label="Degree"
                        onChange={handleChange('degree')}
                        defaultValue={values.degree}
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

export default EducationForm
