import React,{useState} from "react";
import axios from 'axios';
import { api } from "../../urlConfig.js";
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export default function Projects(props) {
    // const boligmappaNumber = props.boligmappaNumber;
    const [searchTerm, setSearchTerm] = useState(""); //for search bar

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }; 
    //create project
    const [projectName, setprojectName] = React.useState(null);
    const [contactPersonName, setcontactPersonName] = React.useState("");
    const [contactEmailAddress, setcontactEmailAddress] = React.useState(null);
    const [contactNumber, setcontactNumber] = React.useState("");
    const [projectDescription, setprojectDescription] = React.useState("");
    const [estimatedEndDate, setestimatedEndDate] = React.useState(new Date());
    const [error, setError] = React.useState("");
    const notifyError = () => toast.info(`${error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    const notifySucccess = () => toast.success(`Room Created Successfully`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    const createProject =() =>{
        const token = window.localStorage.getItem('token');
        axios.post(`${api}projects`,
        {
            projectName : projectName,
            contactPersonName : contactPersonName,
            contactEmailAddress : contactEmailAddress,
            contactNumber : contactNumber,
            projectDescription : projectDescription,
            estimatedEndDate : estimatedEndDate,
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
            notifySucccess();
            handleClose();
        }).catch(error =>{
            console.log(error.response.data.message.en);
            setError(error.response.data.message.en);
            notifyError();
          });;
      }

      //get Project details from api
    //   const [data, setData] = React.useState();
    //   const getdata =() =>{
    //       const token = window.localStorage.getItem('token');
    //       axios.get(`${api}plants/${boligmappaNumber}/projects`,{
    //         headers: {
    //           'Authorization': token ? `Bearer ${token}` : '',
    //           'Access-Control-Allow-Origin': '*',
    //         }
    //         })
    //         .then(res =>{
    //           const results =  res.data.response;
    //           console.log(results);
    //           setData(results);               
    //       });
    //     }
    const data = [];
      const Columns = [
        { id: 'status', label: 'status'},
        { id: 'projectNo', label: 'projectNo'},
        { id: 'projectName', label: 'projectName'},
        { id: 'ResponsibleBusiness', label: 'Responsible business'},
        { id: 'ProjectManager', label: 'ProjectManager'},
        { id: 'Documents', label: 'Documents in total'},
        { id: 'lastUpdate', label: 'Last Update'},


    ];
    // React.useEffect(()=>{
    //     getdata();
    //   },[]); // eslint-disable-line react-hooks/exhaustive-deps

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
                                Create Project
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
                        placeholder="Search by project name or status "
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
                    } else if (row.status.toLowerCase().includes(searchTerm.toLowerCase()) || row.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ) {
                    return row
                    }
                    return null;
                    }).map((row,id) => {
                    return(
                    <TableRow key={id}>
                        <TableCell align="left">
                        {row.status}
                        </TableCell>
                        <TableCell align="left">
                        {row.projectNo}
                        </TableCell>
                        <TableCell align="left">
                        {row.projectName}
                        </TableCell>
                        <TableCell align="left">
                        {row.ResponsibleBusiness}
                        </TableCell>
                        <TableCell align="left">
                        {row.ProjectManager}
                        </TableCell>
                        <TableCell align="left">
                        {row.Documents}
                        </TableCell>
                        <TableCell align="left">
                        {row.lastUpdate}
                        </TableCell>
                    </TableRow>
                    );
                    }
                    )
                    : 
                    <TableRow>
                        <TableCell align="center" colSpan={7}>
                        No records to show
                        </TableCell>
                    </TableRow>}
                </TableBody>
                </Table>
            </TableScrollbar>
                </GridItem>
                
        </GridContainer>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Create Project
                </DialogTitle>
                <DialogContent dividers>
                    <Box
                        component="form"
                        noValidate
                        sx={{
                        '& .MuiTextField-root': { m: 1, width: '95%', margin: '5px' },
                        }}
                        autoComplete="on"
                        padding={1}
                        marginTop={0}>
                        <TextField id="outlined-size-small" label="projectName" fullWidth size="small"  onChange={(e)=>setprojectName(e.target.value)}/>
                        <TextField id="outlined-size-small" label="contactPersonName" fullWidth size="small" onChange={(e)=>setcontactPersonName(e.target.value)}/>
                        <TextField id="outlined-size-small" label="contactEmailAddress" fullWidth size="small" onChange={(e)=>setcontactEmailAddress(e.target.value)}/>
                        <TextField id="outlined-size-small" label="contactNumber" fullWidth size="small" onChange={(e)=>setcontactNumber(e.target.value)}/>
                        <TextField id="outlined-size-small" label="projectDescription" fullWidth size="small" onChange={(e)=>setprojectDescription(e.target.value)}/>
                        <input type="date" onChange={(e)=>setestimatedEndDate(e.target.value)} style={{width:"94%",height:"35px", margin:"5px"}}></input>
                    </Box>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={createProject} color="primary" size="sm">
                    Upload
                </Button>
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
    )
}
Projects.propTypes = {
    boligmappaNumber: PropTypes.any,
};