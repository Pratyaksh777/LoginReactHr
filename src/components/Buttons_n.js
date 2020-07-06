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
import { ShowAll, ShowSelected } from './UserFunctions'
import '../App.css';
import Form from './Form'
import { Formik } from 'formik'
import TextField from '@material-ui/core/TextField';
import PersistentDrawerLeft from "./PersistentDrawerLeft";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import ViewListIcon from '@material-ui/icons/ViewList';
import BackupIcon from '@material-ui/icons/Backup';
import HomeIcon from '@material-ui/icons/Home';
import UpdateIcon from '@material-ui/icons/Update';

const rt = [{ name: "Update", url: "/Update", icon: <UpdateIcon /> },
{ name: "Opportunity", url: "/Iview", icon: <LabelImportantIcon /> },
{ name: "Interview", url: "/Interv", icon: <PersonAddIcon /> },
{ name: 'Upload Resume', url: "/FileUpload", icon: <BackupIcon /> },
{ name: 'Home', url: "/Homepage", icon: <HomeIcon /> }
]

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

    const [displayall, setDisplayall] = useState(true);
    const [displayByName, setDisplayByName] = useState(false);


    const [nameSelect, setNameSelect] = useState('')


    const disA = () => {

        if (displayall)
            return <ShowAll />
    }

    const disByName = () => {
        console.log('in display function and nameselect = ' + nameSelect)
        if (displayByName)
            return <ShowSelected names={nameSelect} />

    }

    const submit = (values) => {


        setNameSelect(values.names)
        console.log(nameSelect);
        setDisplayall(false);
        setDisplayByName(true);
    }

    return (
        <div style={{ position: 'absolute', marginTop: '40px', marginLeft: '400px', width: "800px", }}>
            {/* // choices of operations */}
            <PersistentDrawerLeft pages={rt} title="Opportunity Section" />
            <div align="right">
                <Formik initialValues={{ names: '' }} onSubmit={submit}>
                    {(formik) => (
                        <form onSubmit={formik.handleSubmit} >
                            <TextField
                                value={formik.values.names}
                                required
                                name="names"
                                id="names"
                                label="Title"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />

                            <Button type="submit" variant="contained" color="primary">Search</Button>
                        </form>
                    )}
                </Formik>
            </div>
            <div className="App">
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">


                    <Button onClick={handleClickOpen}>Add Opportunity</Button>
                </ButtonGroup>
            </div>

            <div className="App">

                {/* // displaing the lis
                
                */}


                <div align="center">
                    {disA()}
                    {disByName()}

                    {/* {displayall ? <ShowAll /> : disA()} */}
                    {/* // Showall is in UserFunctions.js */}
                </div>



            </div>






            <Dialog fullWidth={true} maxWidth='lg' onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Form for new Opportunity
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