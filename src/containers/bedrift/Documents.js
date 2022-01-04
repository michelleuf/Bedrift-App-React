import React,{useState} from "react";
import axios from 'axios';
import { api } from "../../urlConfig.js";
import PropTypes from 'prop-types';

// @material-ui/core components
import TableScrollbar from 'react-table-scrollbar'
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Table,TableHead, TableBody, TableCell, TableRow, Button } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const Input = styled('input')({
  display: 'none',
});




export default function Documents(props) {
    const boligmappaNumber = props.boligmappaNumber;

    const [searchTerm, setSearchTerm] = useState(""); //for search bar
    
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };  

    const uploadFile = () => {
        const token = window.localStorage.getItem('token');
        axios.post(`${api}plants/${boligmappaNumber}/files`,{
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Access-Control-Allow-Origin': '*',
          }
          })
          .then(res =>{
            const results =  res.data.response;
            console.log(results);
        });
    }

    const [data, setData] = React.useState();
    const getdata =() =>{
        const token = window.localStorage.getItem('token');
        axios.get(`${api}plants/${boligmappaNumber}/files`,{
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Access-Control-Allow-Origin': '*',
          }
          })
          .then(res =>{
            const results =  res.data.response;
            console.log(results);
            setData(results);               
        });
      }
      
    const Columns = [
        { id: 'FileName', label: 'fileName'},
        { id: 'title', label: 'title'},
        { id: 'description', label: 'description'},
        { id: 'orderNumber', label: 'orderNumber'},
        { id: 'downloadLink', label: 'download'},

    ];

    React.useEffect(()=>{
        getdata();
      },[]);
      
    return (
        <div>
            <div>
                <FormControl fullWidth variant="outlined" size="small">
                <OutlinedInput
                    endAdornment={
                    <InputAdornment position="end">
                        <SearchIcon/>
                    </InputAdornment>
                    }
                    onChange={(event)=>{
                    setSearchTerm(event.target.value);
                    }}
                    placeholder="Search by title or file name "
                    fontSize="small"
                    size="sm"
                />
                </FormControl>
            </div>
            <TableScrollbar rows={20}>
                <Table>
                <TableHead>
                    <TableRow>
                    {Columns.map((column) => (
                        <TableCell style={{color:'primary',backgroundColor: "white"}}
                        key={column.id}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                
                <TableBody >
                    {data && data.filter((row)=>{
                    if (searchTerm === "") {
                        return row
                    } else if (row.fileName.toLowerCase().includes(searchTerm.toLowerCase()) || row.title.toLowerCase().includes(searchTerm.toLowerCase()) ) {
                    return row
                    }
                    return null;
                    }).map((row,id) => {
                    return(
                    <TableRow key={id}>
                        <TableCell align="left">
                        {row.fileName}
                        </TableCell>
                        <TableCell align="left">
                        {row.title}
                        </TableCell>
                        <TableCell align="left">
                        {row.description}
                        </TableCell>
                        <TableCell align="left">
                        {row.orderNumber}
                        </TableCell>
                        <TableCell align="left">
                        {row.uploadLink}
                        </TableCell>
                        <TableCell align="left">
                            <Button onClick={()=>{
                                // props.history.push(`/viewoneplant/${row.fileName}`);
                                window.location.href = row.downloadLink;
                            }} size="small" variant="outlined" color="primary">Download</Button>
                        </TableCell>
                    </TableRow>
                    );
                    }
                    )
                    }
                </TableBody>
                </Table>
            </TableScrollbar>
            <Box
            component="form"
            noValidate
            sx={{
              '& .MuiTextField-root': { m: 1, width: '90%' },
            }}
            autoComplete="off"
            border={0}
            padding={1}
            marginTop={5}
            margin={2}
            >
                    <Button variant="contained" component="span" onClick={handleClickOpen}>          
                        <PhotoCamera />Upload File
                    </Button>
            </Box>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Upload File
                </DialogTitle>
                <DialogContent dividers>
                <Box
                    component="form"
                    noValidate
                    sx={{
                    '& .MuiTextField-root': { m: 1, width: '90%' },
                    }}
                    autoComplete="off"
                    padding={1}
                    margin={2}
                >
                    <input accept="image/*" id="contained-button-file" type="file"/>
                    </Box>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={uploadFile} color="primary" size="sm">
                    Upload
                </Button>
                <Button autoFocus onClick={handleClose} color="primary" size="sm">
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
Documents.propTypes = {
    boligmappaNumber: PropTypes.any,
};