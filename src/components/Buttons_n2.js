
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { ShowAll, ShowSelected } from './UserFunctions2'
import '../App.css';
import Form from './Form2'
import { Formik } from 'formik'
import TextField from '@material-ui/core/TextField';


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);
// var master_key=0;
export default function CustomizedDialogs() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }

    const [sopen, setSopen] = useState(false);

    const handleClickOpenS = () => {
        setSopen(true);
    };
    const handleCloseS = () => {
        setSopen(false);
    }

    const [displayall, setDisplayall] = useState(false);
    const [displayByName, setDisplayByName] = useState(false);


    const [nameSelect, setNameSelect] = useState('')


    // const disA = () => {

    //     if (displayall)
    //         return <ShowAll />
    // }

    // const disByName = () => {
    //     console.log('in display function and nameselect = ' + nameSelect)
        // if (displayByName){
        // setDisplayByName(false);
        //     return <ShowSelected title={nameSelect} />
        // }
    // }

    const submit = (values) => {

        console.log("in submit")
        setNameSelect(values.names)
        console.log(nameSelect);
        handleCloseS();
        setDisplayByName(true);
    }

    return (
        <div>
            {/* // choices of operations */}

            <div className="App">
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button onClick={() => {
                        setDisplayall(true)
                        setDisplayByName(false)
                    }}>Show all</Button>
                    <Button onClick={() => {
                        handleClickOpenS()
                        setDisplayall(false)
                        document.getElementById("dispdiv").innerHTML="";
                       
                    }}>Search</Button>
                    <Button onClick={handleClickOpen}>Add</Button>
                </ButtonGroup>
            </div>

            <div className="App">

                {/* // displaing the lis
                
                */}


                <div id="dispdiv" align="center">
                    {displayall ?  <ShowAll />:null}
                    {displayByName ? <ShowSelected title={nameSelect} />: null }

                    {/* {displayall ? <ShowAll /> : disA()} */}
                    {/* // Showall is in UserFunctions.js */}
                </div>



            </div>


            <div>
                <Dialog fullWidth={true} maxWidth='lg' onClose={handleCloseS} aria-labelledby="customized-dialog-title" open={sopen}>
                    <DialogTitle id="customized-dialog-title" onClose={handleCloseS}>
                        Enter title
        </DialogTitle>
                    <DialogContent dividers>


                        <Formik initialValues={{ names: '' }} onSubmit={submit}>
                            {(formik) => (
                                <form onSubmit={formik.handleSubmit}>
                                    <TextField
                                        value={formik.values.names}
                                        required
                                        name="names"
                                        id="names"
                                        label="title"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />

                                    <Button padding='10' type="submit" variant="contained" color="primary">submit</Button>
                                </form>
                            )}
                        </Formik>


                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleCloseS} color="primary">
                            close
          </Button>
                    </DialogActions>
                </Dialog>
            </div>



            <Dialog fullWidth={true} maxWidth='lg' onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add Interview
        </DialogTitle>
                <DialogContent dividers>


                    <Form close={handleClose} />


                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        close
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}