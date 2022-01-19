import React,{useState} from "react";
import axios from 'axios';
import { api } from "../../urlConfig.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@boligmappa/web-components';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import Button from "../../components/Dashboard/CustomButtons/Button";
import { height } from "@mui/system";

export default function SearchProperty () {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }; 
  const notifyCreateError = (createError) => toast.info(`${createError}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
    const notifyCreateSuccess = () => toast.success("plant created successfully!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  

  // create plant 
  const createPlant =(bN) =>{
    const token = window.localStorage.getItem('token');
    console.log("current value of boligmappa number :",bN);
    axios.post(`${api}plants`,{
      boligmappaNumber : bN
      },{
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Access-Control-Allow-Origin': '*',
      }
      })
    .then(res =>{
      const results =  res.data.response;
      console.log("plant created successfully!!!",results);
      notifyCreateSuccess();
      handleClose();
    }).catch(error =>{
      console.log("pland not created becouse",error.response.data.message.en);
      notifyCreateError(error.response.data.message.en);
    });
}

//bolig search component
const token = window.localStorage.getItem('token');
  let config = {
    idObject: '{"userId": "michelleF"}',
    integrationPartnerHandlesTokens: true,
    pageSizes: {
      streets: 10,
      buildings: 10,
      projects: 10,
      height:'100%'
    },
    access_token : token
  };
  //custom event listener
React.useEffect(()=>{
  window.addEventListener('property-confirmed', (e) => {
    // console.log(e);
    const result = e.detail.selectedProperties;
    const b = (result.building ? result.building.boligmappaNumber : result.properties[0].boligmappaNumber);
    createPlant(b);
  })
},['property-confirmed']);  // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} style={{float: 'right'}}>
        Search Component
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Search for property with Addresses/Cadastral records/project
        </DialogTitle>
        <DialogContent dividers>
          <div style={{height:"300px"}}>
          <br/>
            <boligmappa-search 
              development="true" 
              config={JSON.stringify(config)} 
            ></boligmappa-search>
          <br/>
            <br/>
          </div>
            
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary" size="sm">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
            /> 
    </div>
  );
}
