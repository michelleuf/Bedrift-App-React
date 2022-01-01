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


  const [data, setData] = useState([]);
  const getdata =() =>{
      const token = window.sessionStorage.getItem('token');
      axios.get(`${api}plants`,{
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Access-Control-Allow-Origin': '*',
        }
        })
        .then(res =>{
          const results =  res.data.response;
          console.log(results);
          if (results.length === 0) {
            alert("No plants available");
          }
          else{
            setData(results);
          }
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
            <TextField id="outlined-size-small" label="Housing Folder Number" fullWidth size="small"/>
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
