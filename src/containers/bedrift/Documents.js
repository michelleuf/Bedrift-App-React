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

export default function Documents(props) {
    const boligmappaNumber = props.boligmappaNumber;

    const [searchTerm, setSearchTerm] = useState(""); //for search bar
    
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
            margin={2}
            >
                <h4> Upload File</h4>
            <input accept="image/*" id="contained-button-file" type="file"/>

            </Box>
        </div>
    )
}
Documents.propTypes = {
    boligmappaNumber: PropTypes.any,
};