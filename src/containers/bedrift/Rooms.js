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
import Autocomplete from '@material-ui/lab/Autocomplete';

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

    // create room
    const [roomId, setRoomId] = React.useState(null);
    const [title, setTitle] = React.useState("");
    const [roomTypeId, setRoomTypeId] = React.useState(null);
    const [roomType, setRoomType] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [error, setError] = React.useState("");
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
        }).catch(error =>{
            console.log(error.response.data.message.en);
            setError(error.response.data.message.en);
          });
      }

      //get current room details from api
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

        // get room types
      const [roomTypes, setRoomTypes] = React.useState([]);
      const [roomTypeError, setRoomTypeError] = React.useState("");
      const getRoomTypes =() =>{
          const token = window.localStorage.getItem('token');
          axios.get(`${api}types/roomTypes`,{
            headers: {
              'Authorization': token ? `Bearer ${token}` : '',
              'Access-Control-Allow-Origin': '*',
            }
            })
            .then(res =>{
              const results =  res.data.response;
              console.log(results);
              setRoomTypes(results);               
          }).catch(error =>{
            console.log(error);
          });
        }
    const handlechange = (event, value) => {
        setRoomTypeId(value.id);
        setRoomType(value.name);
    }
    const options = roomTypes.map((option) => {
        const firstLetter = option.name[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

      const Columns = [
        { id: 'title', label: 'Room Name'},
        { id: 'roomType', label: 'roomType'},
    ];
    React.useEffect(()=>{
        getdata();
        getRoomTypes();
      },[]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <Box
                        component="form"
                        noValidate
                        sx={{
                        '& .MuiTextField-root': { m: 1, width: '90%' },
                        }}
                        autoComplete="off"
                        border={0}
                        padding={1}
                        margin={2}
                        align={'right'}
                        >
                                <Button variant="contained" component="span" onClick={handleClickOpen}>          
                                    Create Room
                                </Button>
                    </Box>
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
            </GridContainer>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Create Room
                <p style={{color: "red",fontSize:'12px'}}>{error}</p>

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
                             <Autocomplete
                                disableClearable
                                options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                groupBy={(option) => option.firstLetter}
                                getOptionLabel={(option) => option.id + " - " + option.name}
                                renderInput={(params) => <TextField {...params} label="Room Type" required />}
                                size="small"
                                onChange={(event, value) => handlechange(event, value)}
                            />
                        <TextField id="outlined-size-small" label="Room Id" fullWidth size="small"  onChange={(e)=>setRoomId(e.target.value)}/>
                        <TextField id="outlined-size-small" label="title" fullWidth size="small" onChange={(e)=>setTitle(e.target.value)}/>

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