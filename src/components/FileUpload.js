import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import UpdateIcon from '@material-ui/icons/Update';
import PersistentDrawerLeft from "./PersistentDrawerLeft";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import ViewListIcon from '@material-ui/icons/ViewList';
import BackupIcon from '@material-ui/icons/Backup';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';

const rt = [{name:"Update", url:"/Update", icon:<UpdateIcon />},
            {name:"Opportunity", url:"/Iview",icon:<LabelImportantIcon /> },
            {name:"Interview", url:"/Interv", icon:<PersonAddIcon />},
            {name:'Upload Resume', url:"/FileUpload", icon:<BackupIcon />},
            {name:'Home', url:"/Homepage", icon:<HomeIcon />}
]



const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  // const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('resume', file, filename);
    const url = 'http://localhost:8000/';
    try {
      const res = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      }).then(res => {
        console.log(res)
        const { fileName, filePath } = res.data;

        setUploadedFile({ fileName, filePath });
        toast.success('File Uploaded successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        // setMessage('File Uploaded');
       
      })

     
    } catch (err) {
      if (err.response.status === 500) {
        // setMessage('There was a problem with the server');
        toast.error('There was a problem with the server', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      } else {
        toast.error(err.response.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        // setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <div style={{position: 'absolute', marginTop:'100px', marginLeft:'540px'}}>
      <PersistentDrawerLeft pages={rt} title="Resume Upload"/>
      {/* {message ? <Message msg={message} /> : null} */}
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
       
          <input 
            type='file'
            className='custom-file-input'
            id='resume'
            onChange={onChange}
           / > 
          
        </div>

        <Progress percentage={uploadPercentage} />
        <br />
        <Button variant="contained"
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        >Upload</Button>
      </form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
     
    </div>
  );
};

export default FileUpload;
