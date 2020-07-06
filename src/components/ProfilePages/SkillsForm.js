import React, { Component } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

export class SkillsForm extends Component {
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };
    close = e => {
        e.preventDefault();
        axios.post( "/profiles", this.props.values)
        .then(response => {console.log(response)})
        .catch(error => {console.log(error)})
        this.props.closeHandler();
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
                        placeholder="Enter Your Skills"
                        label="Skills"
                        onChange={handleChange('skills')}
                        defaultValue={values.skills}
                        margin='normal'
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        placeholder="Enter Your Field of Intrests"
                        label="Field of Intrests"
                        onChange={handleChange('interests')}
                        defaultValue={values.interests}
                        margin="normal"
                        multiline
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
                        onClick={this.close}
                    >Submit</Button>
                    </Grid>
                    </Grid>    
                </form>
            </div>
        )
    }
}

export default SkillsForm
