import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FormEditTest from './FormEditTest'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

var moment = require('moment-timezone');
moment().tz("Asia/Kolkata").format();


const useStyles = makeStyles({
    root: {
        minWidth: 150,
        maxWidth: 1500
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});







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







export const ShowAll = () => {

    const classes = useStyles();


    const [e_id, setE_id] = useState(0)
    const bull = <span className={classes.bullet}>•</span>;

    const [data, setData] = useState([])

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }



    const [max, setMax] = useState(0)
    const [start, setStart] = useState(0)


    useEffect(() => {
        axios.get('/properties').then(response => {
            console.log("getting")
            console.log(response.data.data)
            setData(response.data.data)
            console.log("the length of data array is " + response.data.data.length)
            setMax(response.data.data.length)

        }).catch(error => {
            console.log(error)
        })





    }, [])







    console.log("data")
    console.log(data)

    const delete_record = id => {
        axios.delete(`/properties/${id}`).then(response => {

            alert(response.data.message);
        })
        window.location.reload();
    }


    const ida=parseInt(sessionStorage.Roleid)
    //parseInt(role)
    const display=(item)=>
    {if(ida!=0)
    {return( <Button size="small" onClick={() => delete_record(item.id)}><DeleteIcon />&ensp;Delete</Button>   )}}
    


    const List = data.map(data =>
        // <div className="card w-75" key={data.id}>
        //     <h5 className="card-header">{data.name}</h5>
        //     <div className="card-body">
        //         <h6 className="card-title" >Type :- {data.type} time |  Location :- {data.location}
        //             <button type="button" className="btn btn-primary btn-sm float-right" onClick={() => console.log(data.id)}>Edit</button>
        //             <button type="button" className="btn btn-primary btn-sm float-right" onClick={() => console.log(data.id)}>Delete</button></h6>

        //         <p className="card-text">{data.description}</p>

        //     </div>
        // </div>



        <Card className={classes.root} variant="outlined" key={data.id}>
            <CardContent>

                <Typography variant="h5" component="h2">
                    {data.name}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Type :- {data.type}  |  Location :- {data.location}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Start Date :- {data.start_date.slice(0, 10)}  |  End Date :- {data.end_date.slice(0, 10)}
                </Typography>
                <Typography variant="body2" component="p">
                    {data.description}
                    <br />

                </Typography>

            </CardContent>
            <CardActions style={{float:'right'}}>
                <Button  size="small" onClick={() => {
                    console.log(data.id)
                    setE_id(data.id)
                    console.log("eid assigned is " + e_id)
                    handleClickOpen()
                }}><EditIcon />&ensp;Edit</Button>
                {display()}
                {/* <Button  size="small" onClick={() => delete_record(data.id)}><DeleteIcon />&ensp;Delete</Button> */}
            </CardActions>
        </Card>




    )


    var chunk = [];
    const chunksize = 2;


    const displayChunk = () => {
        for (var i = start; (i < max) && (i < start + chunksize); i++) {
            chunk.push(List[i])
        }

    }
    const checkBack = () => {
        if (start >= chunksize)
            setStart(start - chunksize)
    }
    const checkFront = () => {
        if (start + chunksize < max)
            setStart(start + chunksize)
    }


    return (
        <div>
            {console.log("value of length iin return is  " + max)}

            {displayChunk()}
            {chunk}
            <Button onClick={() => checkBack()}><NavigateBeforeIcon />&ensp;back</Button>
            <Button onClick={() => checkFront()}>next&ensp;<NavigateNextIcon /></Button>

            {/* {data.map(data => <div>
                {data.name}
            </div>)} */}

            <div>

                <Dialog fullWidth={true} maxWidth='lg' onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Update
        </DialogTitle>
                    <DialogContent dividers>


                        {/* <Form close={handleClose} /> */}


                        {/* {
                            e_id ? <FormEdit close={handleClose} p_id={e_id} /> : console.log("false option eid is " + e_id)
                        } */}




                        {/* <FormEdit close={handleClose} p_id={e_id} open={handleClickOpen} /> */}

                        <FormEditTest close={handleClose} p_id={e_id} open={handleClickOpen} />

                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                            close
          </Button>
                    </DialogActions>
                </Dialog>


            </div>



        </div >
    )


}













export const ShowSelected = (props) => {

    const classes = useStyles();


    const [e_id, setE_id] = useState(0)
    const bull = <span className={classes.bullet}>•</span>;

    const [data, setData] = useState([])

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }






    useEffect(() => {
        let source= axios.CancelToken.source();
        axios.get(`/properties/name/${props.names}` ,{cancelToken:source.token}).then(response => {
            console.log("getting")
            console.log(response)

            setData(response.data.data)
            if (response.data.data.length == 0) {
                alert("No Record Found")

            }

        }).catch(error => {
            console.log(error)
            console.log("not found")
        })

        return () =>{
            
            console.log("Unmounting and cleanup");
            source.cancel();
          };



    }, [])


    console.log("data")
    console.log(data)

    const delete_record = id => {
        axios.delete(`/properties/${id}`).then(response => {

            alert(response.data.message)
        })
        window.location.reload();
    }



    const ida=parseInt(sessionStorage.Roleid)
    //parseInt(role)
    const display=(item)=>
    {if(ida!=0)
    {return( <Button size="small" onClick={() => delete_record(item.id)}><DeleteIcon />&ensp;Delete</Button>   )}}
    


    return (
        <div>
            {data.map(data =>
                // <div className="card w-75" key={data.id}>
                //     <h5 className="card-header">{data.name}</h5>
                //     <div className="card-body">
                //         <h6 className="card-title" >Type :- {data.type} time |  Location :- {data.location}
                //             <button type="button" className="btn btn-primary btn-sm float-right" onClick={() => console.log(data.id)}>Edit</button>
                //             <button type="button" className="btn btn-primary btn-sm float-right" onClick={() => console.log(data.id)}>Delete</button></h6>

                //         <p className="card-text">{data.description}</p>

                //     </div>
                // </div>



                <Card className={classes.root} variant="outlined" key={data.id}>
                    <CardContent>

                        <Typography variant="h5" component="h2">
                            {data.name}
                        </Typography>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Type :- {data.type}  |  Location :- {data.location}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Start Date :- {data.start_date.slice(0, 10)}  |  End Date :- {data.end_date.slice(0, 10)}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {data.description}
                            <br />

                        </Typography>
                    </CardContent>
                    <CardActions style={{float:'right'}}>
                        <Button  size="small" onClick={() => {
                            console.log(data.id)
                            setE_id(data.id)
                            console.log("eid assigned is " + e_id)
                            handleClickOpen()
                        }}><EditIcon />&ensp;Edit</Button>
                        {display()}
                        {/* <Button  size="small" onClick={() => delete_record(data.id)}><DeleteIcon />&ensp;Delete</Button> */}
                    </CardActions>
                </Card>




            )}


            {/* {data.map(data => <div>
                {data.name}
            </div>)} */}

            <div>

                <Dialog fullWidth={true} maxWidth='lg' onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Update
        </DialogTitle>
                    <DialogContent dividers>


                        {/* <Form close={handleClose} /> */}


                        {/* {
                            e_id ? <FormEdit close={handleClose} p_id={e_id} /> : console.log("false option eid is " + e_id)
                        } */}




                        {/* <FormEdit close={handleClose} p_id={e_id} open={handleClickOpen} /> */}

                        <FormEditTest close={handleClose} p_id={e_id} open={handleClickOpen} />

                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                            close
          </Button>
                    </DialogActions>
                </Dialog>


            </div>



        </div >
    )
}