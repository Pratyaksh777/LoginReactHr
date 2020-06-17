import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';
import CustomizedDialogs from './Buttons_n2'

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
class MainPage extends Component {
    render() {
        return (<div>
               <div>
             <CustomizedDialogs/>
            </div>
        </div>
            
        )
    }
}

export default MainPage
