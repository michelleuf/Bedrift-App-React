import React,{useState} from "react";
import axios from 'axios';
import { api } from "../../urlConfig.js";
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// @material-ui/core components
import TableScrollbar from 'react-table-scrollbar'
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Table,TableHead, TableBody, TableCell, TableRow } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@mui/material/IconButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';import Box from '@material-ui/core/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';
import Button from "../../components/Dashboard/CustomButtons/Button";
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function DocumentsProject(props) {
    const projectCodeold = props.projectCode;

    const [searchTerm, setSearchTerm] = useState(""); //for search bar
    
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setFileName("");
    }; 

    //create document
    const [projectCode, setProjectCode] = React.useState(projectCodeold);
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileName, setFileName] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [checked, setChecked] = React.useState(true);
    const [tagId, setTagId] = React.useState([]);
    const [professionTypeId, setProfessionTypeId] = React.useState(null);
    const [documentTypeId, setDocumentTypeId] = React.useState(null);
   const [error, setError] = React.useState("error");

    const notifyError = (err) => toast.info(err, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    const notifySucccess = () => toast.success(`File Created Successfully`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    const createDocument = () => {
        const token = window.localStorage.getItem('token');
        axios.post(`${api}projects/${projectCode}/files`,
        {
            fileName : fileName,
            title : title,
            documentType : {
                id : documentTypeId,
            },
            professionType : {
                id : professionTypeId,
            },
            chapterTags : [],
            sendToLinkedBoligmapper : checked,
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
            uploadFile(results.uploadLink);
        }).catch(error =>{
            console.log(error.response.data.message.en);
            notifyError(error.response.data.message.en);
          });
    }
    const uploadFile = (url) => {
        console.log(url);
        axios.put(`${url}`,selectedImage, {
        headers: {
            'Content-Type': 'multipart/form-data'
          }})
        .then(res =>{
            console.log("file uploaded successfully",res);
            notifySucccess();
            setOpen(false);
        }).catch(error =>{
            console.log("upload file error",error);
          });
    }

    // get existing files
    const [data, setData] = React.useState();
    const getdata =() =>{
        const token = window.localStorage.getItem('token');
        axios.get(`${api}projects/${projectCode}/files`,{
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


  // get document types
  const [documentTypes, setDocumentTypes] = React.useState([]);
  const getDocumentTypes =() =>{
      const token = window.localStorage.getItem('token');
      axios.get(`${api}types/documentTypes`,{
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Access-Control-Allow-Origin': '*',
        }
        })
        .then(res =>{
          const results =  res.data.response;
        //   console.log(results);
          setDocumentTypes(results);               
      }).catch(error =>{
        console.log(error);
      });
    }
    const handlechangeD = (event, value) => {
        setDocumentTypeId(value.id);
    }
    const optionsD = documentTypes.map((option) => {
        const firstLetter = option.name[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

    // get profession types
  const [professionTypes, setProfessionTypes] = React.useState([]);
  const getProfessionTypes =() =>{
      const token = window.localStorage.getItem('token');
      axios.get(`${api}types/professionTypes`,{
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Access-Control-Allow-Origin': '*',
        }
        })
        .then(res =>{
          const results =  res.data.response;
        //   console.log(results);
          setProfessionTypes(results);               
      }).catch(error =>{
        console.log(error);
      });
    }
    const handlechangeP = (event, value) => {
        setProfessionTypeId(value.id);
    }
    const optionsP = professionTypes.map((option) => {
        const firstLetter = option.name[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

    // get chapter tag types
  const [tagTypes, setTagTypes] = React.useState([]);
  const getTagTypes =() =>{
      const token = window.localStorage.getItem('token');
      axios.get(`${api}types/chapterTags`,{
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Access-Control-Allow-Origin': '*',
        }
        })
        .then(res =>{
          const results =  res.data.response;
        //   console.log(results);
          setTagTypes(results);               
      }).catch(error =>{
        console.log(error);
      });
    }
    const handlechangeT = (event, value) => {
        setTagId(value.id);
    }
    const optionsT = tagTypes.map((option) => {
        const firstLetter = option.tagName[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });
      
    
    React.useEffect(()=>{
        getdata();
        getDocumentTypes();
        getProfessionTypes();
        getTagTypes();
      },[]);  // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <div>
            <Box
            component="form"
            noValidate
            sx={{
              '& .MuiTextField-root': { m: 1, width: '90%'},
            }}
            autoComplete="off"
            border={0}
            padding={1}
            margin={2}
            align={'right'}
            >
                    <Button variant="contained" component="span" onClick={handleClickOpen}>          
                        <PhotoCamera />Upload File
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
                        key={column.id}>
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                
                <TableBody >
                    {data ? data.filter((row)=>{
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
                            <IconButton 
                                onClick={()=>{window.location.href = row.downloadLink;}} 
                                size="small" variant="filled">
                                <FileDownloadIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    );
                    }
                    )
                    : 
                    <TableRow>
                        <TableCell align="center" colSpan={6}>
                        No records to show
                        </TableCell>
                    </TableRow>
                    }
                </TableBody>
                </Table>
            </TableScrollbar>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Upload File
                </DialogTitle>
                <DialogContent dividers>


                    <Box
                        component="form"
                        noValidate
                        sx={{
                        '& .MuiTextField-root': { m: 1, width: '95%', padding: '5px'},
                        }}
                        autoComplete="on"
                        padding={1}                        
                        marginTop={0}>

                        <TextField id="outlined-size-small" label="projectCode" fullWidth size="small" value={projectCodeold ? projectCodeold : null} onChange={(e)=>setProjectCode(e.target.value)}/>

                        <input 
                            accept="image/*" 
                            id="contained-button-file" 
                            type="file" 
                            onChange={(event) => {
                                // console.log(event.target.files[0]);
                                setSelectedImage(event.target.files[0]);
                                setFileName(event.target.files[0].name);
                            }}
                            />

                        <TextField id="outlined-size-small" label="fileName" fullWidth size="small" value={selectedImage ? selectedImage.name : null} onChange={(e)=>setFileName(e.target.value)}/>
                        <TextField id="outlined-size-small" label="title" fullWidth size="small" onChange={(e)=>setTitle(e.target.value)}/>
                        <Autocomplete
                                disableClearable
                                options={optionsT.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                groupBy={(option) => option.firstLetter}
                                getOptionLabel={(option) => option.id + " - " + option.tagName}
                                renderInput={(params) => <TextField {...params} label="Chapter Tag" required />}
                                size="small"
                                onChange={(event, value) => handlechangeT(event, value)}
                        />
                         <Autocomplete
                                disableClearable
                                options={optionsP.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                groupBy={(option) => option.firstLetter}
                                getOptionLabel={(option) => option.id + " - " + option.name}
                                renderInput={(params) => <TextField {...params} label="Profession Type" required />}
                                size="small"
                                onChange={(event, value) => handlechangeP(event, value)}
                            />
                        <Autocomplete
                                disableClearable
                                options={optionsD.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                groupBy={(option) => option.firstLetter}
                                getOptionLabel={(option) => option.id + " - " + option.name}
                                renderInput={(params) => <TextField {...params} label="Document Type" required />}
                                size="small"
                                onChange={(event, value) => handlechangeD(event, value)}
                            />
                        
                        <br/>
                            <input type="checkbox" defaultChecked={checked} onChange={() => setChecked(!checked)} />
                            Show in Boligmap
                    </Box>

                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={createDocument} color="primary" size="sm">
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
DocumentsProject.propTypes = {
    boligmappaNumber: PropTypes.any,
};