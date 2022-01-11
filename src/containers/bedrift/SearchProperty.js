import React,{useState} from "react";
import axios from 'axios';
import { api } from "../../urlConfig.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Button from "../../components/Dashboard/CustomButtons/Button";

export default function SearchProperty () {
  const [open, setOpen] = useState(false);
  const [isToggle, setIsToggle] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };  

  // get plant details by boligmappa number
  const [boligmappaNumber, setBoligmappaNumber] = useState();
  const [plantDetails, setPlantDetails] = useState([]);
  const notifySearchError = (searchError) => toast.info(`${searchError}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
  const getPlantByBlogmappaNumber =(boligmappa_number) =>{
      const token = window.localStorage.getItem('token');
      axios.get(`${api}plants/${boligmappa_number}`,{
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Access-Control-Allow-Origin': '*',
        }
        })
        .then(res =>{
          const results =  res.data.response;
          console.log(results);
          setPlantDetails(results);
          setIsToggle(true);
        }).catch(error =>{
          console.log(error.response.data.message.en);
          notifySearchError(error.response.data.message.en);
        });
    }

  // create plant 
  const notifyCreateError = (createError) => toast.info(`${createError}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
  const createPlant =() =>{
    const token = window.localStorage.getItem('token');
    axios.post(`${api}plants`,{
      boligmappaNumber : boligmappaNumber
      },{
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Access-Control-Allow-Origin': '*',
      }
      })
    .then(res =>{
      const results =  res.data.response;
      console.log(results);
    }).catch(error =>{
      console.log(error.response.data.message.en);
      notifyCreateError(error.response.data.message.en);
    });
}
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} style={{float: 'right'}}>
        Search Component
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Search Property
        </DialogTitle>
        <DialogContent dividers>
          <Box
             component="form"
             noValidate
             sx={{
               '& .MuiTextField-root': { m: 1, width: '90%' },
             }}
             autoComplete="off"
             border={1}
             padding={1}
             margin={2}
          >
            <b>Search property by address</b>
            <TextField id="outlined-size-small" label="Street Address" fullWidth size="small"/>
            <TextField id="outlined-size-small" label="House Number" fullWidth size="small"/>
            <TextField id="outlined-size-small" label="Letter" fullWidth size="small"/>
            <TextField id="outlined-size-small" label="Postnr" fullWidth size="small"/>
            <TextField id="outlined-size-small" label="Place" fullWidth size="small"/>

            <Button color="primary" size="sm">Search</Button>
          </Box>
          <Box
            component="form"
            noValidate
            sx={{
              '& .MuiTextField-root': { m: 1, width: '90%' },
            }}
            autoComplete="off"
            border={1}
            padding={1}
            margin={2}

          >
            <b>Search for property with Boligmappanummer</b>
            <TextField 
              id="outlined-size-small" 
              label="Housing Folder Number" 
              fullWidth size="small"
              onChange={(e) => setBoligmappaNumber(e.target.value)}//onClick={()=>updatemedicine()}
              />
            <Button color="primary" size="sm" onClick={()=>getPlantByBlogmappaNumber(boligmappaNumber)}>Search</Button>
            <div>
              {(isToggle) && (
                  (plantDetails.type === 'property') ?
                      (<Box
                        component="span"
                        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
                      >
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>plantId</Typography>
                        <Typography variant="body2">{plantDetails.plantId}</Typography>

                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>createdDate</Typography>
                        <Typography variant="body2">{plantDetails.createdDate}</Typography>

                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>type</Typography>
                        <Typography variant="body2">{plantDetails.type}</Typography>
                        
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>address</Typography>
                        <Typography variant="body2"> 
                          {plantDetails.property.address? plantDetails.property.address.houseNumber : "-"}&nbsp;
                          {plantDetails.property.address? plantDetails.property.address.houseSubNumber : null}&nbsp;
                          {plantDetails.property.address? plantDetails.property.address.streetName : null}&nbsp;
                          {plantDetails.property.address? plantDetails.property.address.postalCode : null}&nbsp;
                          {plantDetails.property.address? plantDetails.property.address.postalPlace : null}</Typography>
                           
                      <Button onClick={createPlant}>Create</Button>
                      </Box>)
                    : (plantDetails.type === 'building') &&
                      (<Box
                        component="span"
                        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
                      >
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>plantId</Typography>
                        <Typography variant="body2">{plantDetails.plantId}</Typography>

                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>createdDate</Typography>
                        <Typography variant="body2">{plantDetails.createdDate}</Typography>

                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>type</Typography>
                        <Typography variant="body2">{plantDetails.type}</Typography>
                        
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>building address</Typography>
                        <Typography variant="body2"> 
                          {plantDetails.building.address? plantDetails.building.address.houseNumber : "-"}&nbsp;
                          {plantDetails.building.address? plantDetails.building.address.houseSubNumber : null}&nbsp;
                          {plantDetails.building.address? plantDetails.building.address.streetName : null}&nbsp;
                          {plantDetails.building.address? plantDetails.building.address.postalCode : null}&nbsp;
                          {plantDetails.building.address? plantDetails.building.address.postalPlace : null}</Typography>
                          
                      <Button onClick={createPlant}>hello</Button>
                      </Box>)
                    )
                  }
            </div>
          </Box>
          <Box
             component="form"
             noValidate
             sx={{
               '& .MuiTextField-root': { m: 1, width: '90%' },
             }}
             autoComplete="off"
             border={1}
             padding={1}
             margin={2}
          >
            <b>Apply for property with cadastre</b>
            <TextField id="outlined-size-small" label="Knr." fullWidth size="small"/>
            <TextField id="outlined-size-small" label="Gnr." fullWidth size="small"/>
            <TextField id="outlined-size-small" label="Bnr." fullWidth size="small"/>
            <TextField id="outlined-size-small" label="Fnr." fullWidth size="small"/>
            <TextField id="outlined-size-small" label="Snr." fullWidth size="small"/>

            <Button color="primary" size="sm" >Search</Button>
          </Box>
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
