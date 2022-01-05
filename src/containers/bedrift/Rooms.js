import React,{useState} from "react";
import axios from 'axios';
import { api } from "../../urlConfig.js";
import PropTypes from 'prop-types';

// @material-ui/core components
import TableScrollbar from 'react-table-scrollbar';
import { Table,TableHead, TableBody, TableCell, TableRow } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SearchIcon from '@material-ui/icons/Search';

// core components
import GridItem from "../../components/Dashboard/Grid/GridItem.js";
import GridContainer from "../../components/Dashboard/Grid/GridContainer.js";
import Button from "../../components/Dashboard/CustomButtons/Button";

export default function Rooms(props) {
    const boligmappaNumber = props.boligmappaNumber;
    const [searchTerm, setSearchTerm] = useState(""); //for search bar

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }; 

    const [roomId, setRoomId] = React.useState(null);
    const [title, setTitle] = React.useState("");
    const [roomTypeId, setRoomTypeId] = React.useState(null);
    const [roomType, setRoomType] = React.useState("");
    const [description, setDescription] = React.useState("");
    
    const createRoom =() =>{
        const token = window.localStorage.getItem('token');
        axios.post(`${api}plants/${boligmappaNumber}/rooms`,
        {
            id : roomId,
            title : title,
            roomType : {
                id : roomTypeId,
                type : roomType,
            },
            description : description,
        },
        {
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

      //get room details from api
      const [data, setData] = React.useState();
      const getdata =() =>{
          const token = window.localStorage.getItem('token');
          axios.get(`${api}plants/${boligmappaNumber}/rooms`,{
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
        { id: 'title', label: 'Room Name'},
        { id: 'roomType', label: 'roomType'},
    ];
    React.useEffect(()=>{
        getdata();
      },[]);

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
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
                    placeholder="Search by title or room type "
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
                    {data ? data.filter((row)=>{
                    if (searchTerm === "") {
                        return row
                    } else if (row.title.toLowerCase().includes(searchTerm.toLowerCase()) || row.roomType.type.toLowerCase().includes(searchTerm.toLowerCase()) ) {
                    return row
                    }
                    return null;
                    }).map((row,id) => {
                    return(
                    <TableRow key={id}>
                        <TableCell align="left">
                        {row.title}
                        </TableCell>
                        <TableCell align="left">
                        {row.roomType.type}
                        </TableCell>
                    </TableRow>
                    );
                    }
                    )
                    : 
                    <TableRow>
                        <TableCell align="center" colSpan={2}>
                        No records to show
                        </TableCell>
                    </TableRow>
                    }
                </TableBody>
                </Table>
            </TableScrollbar>
                </GridItem>
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
                                Create Room
                            </Button>
                </Box>
            </GridContainer>
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
                        autoComplete="on"
                        padding={1}
                        margin={2}>
                        <input accept="image/*" id="contained-button-file" type="file"/>
                        <TextField id="outlined-size-small" label="Room Id" fullWidth size="small"  onChange={(e)=>setRoomId(e.target.value)}/>
                        <TextField id="outlined-size-small" label="title" fullWidth size="small" onChange={(e)=>setTitle(e.target.value)}/>
                        <TextField id="outlined-size-small" label="roomTypeId" fullWidth size="small" onChange={(e)=>setRoomTypeId(e.target.value)}/>
                        <TextField id="outlined-size-small" label="roomType" fullWidth size="small" onChange={(e)=>setRoomType(e.target.value)}/>
                        <TextField id="outlined-size-small" label="description" fullWidth size="small" onChange={(e)=>setDescription(e.target.value)}/>
                    </Box>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={createRoom} color="primary" size="sm">
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
Rooms.propTypes = {
    boligmappaNumber: PropTypes.any,
};