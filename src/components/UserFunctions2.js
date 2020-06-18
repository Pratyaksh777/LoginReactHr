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
import FormEditTest from './FormEditTest2';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

   var moment = require('moment-timezone');
   moment().tz("Asia/Kolkata")
.format();
   var arr=[];
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
    const bull = <span className={classes.bullet}>•</span>;
    const [load, setload] =useState(false)
    const [data, setData] = useState([])
   
    const [max, setMax] = useState(0)
    const [start, setStart] = useState(0)
    const [e_id, setE_id] = useState(0)
const [open, setOpen] = React.useState(false);

    const handleClickOpen = (test) => {
        console.log("value in clickopen" +test)
        setE_id(test)
        console.log("value of e_id in click "+e_id)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }


    
    var obj =new Object();
    var listItems;


    useEffect(() => {
        let source= axios.CancelToken.source();
        axios.get('/interviews',{cancelToken:source.token}).then(response => {
            console.log("getting")
            console.log(response.data.data)
          obj = response.data.data;
          for(var i=0;i<obj.length;i++){
              console.log("before fomrat")
              console.log(obj[i].date_and_time)
              var dt =moment(obj[i].date_and_time).format('DD-MM-YYYY HH:mm:ss');
              obj[i].date_and_time= dt.toString();
              console.log("after fomrat")
              console.log(obj[i].date_and_time)
              arr.push(obj[i]);
              setMax(response.data.data.length)
          }
          setload(true)



        }).catch(error => {
            console.log(error)
        })

        return () =>{
            
            console.log("Unmounting and cleanup");
            source.cancel();
          };
  

 }, [])
 const delete_record = id => {
     console.log("id passed to delete is")
     console.log(id)
    axios.delete(`/interviews/${id}`).then(response => {
        alert(response.data.message)
        
    })
    window.location.reload();
    
}

const [tenp_id,setTemp_id]=useState(0)
var v_id;




            const List=arr.map((item, index) =>
                <Card className={classes.root} variant="outlined" key={item.id}>
                    <CardContent>

                        <Typography variant="h5" component="h2">
                            {item.title}
                        </Typography>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {item.description} description 
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                             Date :- {item.date_and_time.slice(0,10)}  time :- {item.date_and_time.slice(11,19)}  
                        </Typography>
                        <Typography variant="body2" component="p">
                            {item.contact}
                            <br />

                        </Typography>
                    </CardContent>
                    <CardActions style={{float:'right'}}>
                    <Button size="small" onClick={() => {
                        console.log("on click id is "+item.id)
                            console.log(item.id)
                            
                            v_id=item.id;
                            
                            console.log("value assigned to varialbe is "+v_id)
                            handleClickOpen(item.id)
                        }}><EditIcon />&ensp;Edit</Button>
                        <Button size="small" onClick={() => delete_record(item.id)}><DeleteIcon />&ensp;Delete</Button>
                    </CardActions>
                </Card>
 
)
var chunk = [];
    const chunksize = 3;
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






 

<div>

<Dialog fullWidth={true} maxWidth='lg' onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {console.log("value of var in dialog is "+v_id)}
        {console.log("value of e_id in dialog is "+e_id)}
        Update
</DialogTitle>
    <DialogContent dividers>

        <FormEditTest close={handleClose} p_id={e_id} open={handleClickOpen} />

    </DialogContent>
    <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
            close
</Button>
    </DialogActions>
</Dialog>


</div>

  
 </div>
    )


}









export const ShowSelected = (props) => {

    const classes = useStyles();
    const [data, setData] = useState([])

    const [e_id, setE_id] = useState(0)
    const bull = <span className={classes.bullet}>•</span>;
    const [load, setload] =useState(false)
    var obj =new Object();
    var listItems;


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
        let source= axios.CancelToken.source();
        console.log("value of title passed")
        console.log(props.title)
        axios.get(`/interviews/name/${props.title}`,{cancelToken:source.token}).then(response => {
            console.log("getting")
            console.log(response)
            setData(response.data.data)
            setMax(response.data.data.length)



        }).catch(error => {
            console.log(error)
        })

        return () =>{
            
          console.log("Unmounting and cleanup");
          source.cancel();
        };




    }, [])


   

    const delete_record = id => {
        axios.delete(`/interviews/${id}`).then(response => {

            alert(response.data.message)
        })
        window.location.reload();
    }
    
        
            const List=data.map((item) =>
                <Card className={classes.root} variant="outlined" key={item.id}>
                    <CardContent>

                        <Typography variant="h5" component="h2">
                            {item.title}
                        </Typography>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {item.description} description 
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                             Date :- {moment(item.date_and_time).format("DD-MM-YYYY HH:mm").slice(0,10)}  time :- {moment(item.date_and_time).format("DD-MM-YYYY HH:mm").slice(0,10)}  
                        </Typography>
                        <Typography variant="body2" component="p">
                            {item.contact}
                            <br />

                        </Typography>
                    </CardContent>
                    <CardActions style={{float:'right'}}>
                    <Button size="small" onClick={() => {
                            console.log(item.id)
                            setE_id(item.id)
                            console.log("eid assigned is " + e_id)
                            handleClickOpen()
                        }}><EditIcon />&ensp;Edit</Button>
                        <Button size="small" onClick={() => delete_record(item.id)}><DeleteIcon />&ensp;Delete</Button>
                    </CardActions>
                </Card>
 )
 var chunk = [];
 const chunksize = 3;


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
         <Button onClick={() => checkBack()}>back</Button>
         <Button onClick={() => checkFront()}>next</Button>

<div>

<Dialog fullWidth={true} maxWidth='lg' onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Update
</DialogTitle>
    <DialogContent dividers>

        <FormEditTest close={handleClose} p_id={e_id} open={handleClickOpen} />

    </DialogContent>
    <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
            close
</Button>
    </DialogActions>
</Dialog>


</div>

  </div>
 
    )






    
}