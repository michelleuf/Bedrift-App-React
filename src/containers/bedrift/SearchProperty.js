import React,{useState} from "react";
import axios from 'axios';
import { api } from "../../urlConfig.js";

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Button from "../../components/Dashboard/CustomButtons/Button";

export default function SearchProperty () {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };  


  const [boligmappaNumber, setBoligmappaNumber] = useState();
  const [plantDetails, setPlantDetails] = useState([]);

  const getPlantByBlogmappaNumber =(boligmappa_number) =>{
      const token = window.sessionStorage.getItem('token');
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
              {(() => {
                if (plantDetails){
                  if (plantDetails.type === 'property'){
                    return (
                      <div>
                        <b>plantId</b>{plantDetails.plantId}
                        <b>createdDate</b>{plantDetails.createdDate}
                        <b>type</b>{plantDetails.type}
                        <b>address</b>
                            {plantDetails.property.address.houseNumber}
                            {plantDetails.property.address.houseSubNumber}
                            {plantDetails.property.address.streetName}
                            {plantDetails.property.address.postalCode}
                            {plantDetails.property.address.postalPlace}
                      </div>
                    )
                  } else{
                    return (
                      <div>
                        <b>plantId</b>{plantDetails.plantId}
                        <b>createdDate</b>{plantDetails.createdDate}
                        <b>type</b>{plantDetails.type}
                        <b>building address</b>
                            {plantDetails.building.address.houseNumber}
                            {plantDetails.building.address.houseSubNumber}
                            {plantDetails.building.address.streetName}
                            {plantDetails.building.address.postalCode}
                            {plantDetails.building.address.postalPlace}
                      </div>
                    )
                  }
                } 
              })}
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
    </div>
  );
}
