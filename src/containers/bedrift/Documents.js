import React,{useState} from "react";
import axios from 'axios';
import { api } from "../../urlConfig.js";
import PropTypes from 'prop-types';

// @material-ui/core components
import TableScrollbar from 'react-table-scrollbar'
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Table,TableHead, TableBody, TableCell, TableRow } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';
import Button from "../../components/Dashboard/CustomButtons/Button";
import Autocomplete from '@material-ui/lab/Autocomplete';

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

    //create document
    const [fileId, setFileId] = React.useState(null);
    const [fileName, setFileName] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [orderNumber, setOrderNumber] = React.useState("");
    const [checked, setChecked] = React.useState(true);
    const [uploadLink, setUploadLink] = React.useState("");
    const [downloadLink, setDownloadLink] = React.useState("");
    const [tagId, setTagId] = React.useState(null);
    const [tagName, setChapterName] = React.useState("");
    const [tagDescription, setTagDescription] = React.useState("");
    const [professionTypeId, setProfessionTypeId] = React.useState(null);
    const [professionTypeName, setProfessionTypeName] = React.useState("");
    const [documentTypeId, setDocumentTypeId] = React.useState(null);
    const [documentTypeName, setDocumentTypeName] = React.useState("");
    const [roomId, setRoomId] = React.useState(null);
    const [roomTitle, setRoomTitle] = React.useState("");
    const [roomTypeId, setRoomTypeId] = React.useState(null);
    const [roomType, setRoomType] = React.useState("");
    const [roomDescription, setRoomDescription] = React.useState("");
    const [error, setError] = React.useState("");

    const uploadFile = () => {
        const token = window.localStorage.getItem('token');
        axios.post(`${api}plants/${boligmappaNumber}/files`,
        {
            id : fileId,
            fileName : fileName,
            title : title,
            description : description,
            orderNumber : orderNumber,
            isVisibleInBoligmappa : checked,
            uploadLink : uploadLink,
            downloadLink : downloadLink,
            chapterTags : {
                id : tagId,
                tagName : tagName,
                tagDescription : tagDescription,
            },
            professionType : {
                id : professionTypeId,
                name : professionTypeName,
            },
            documentType : {
                id : documentTypeId,
                name : documentTypeName,
            },
            rooms : {
                id : roomId,
                title : roomTitle,
                roomType : {
                    id : roomTypeId,
                    type : roomType,
                },
                description : roomDescription,
            }
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

    // get existing files
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


    // get room types
    const [roomTypes, setRoomTypes] = React.useState([]);
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
  const handlechangeR = (event, value) => {
      setRoomTypeId(value.id);
      setRoomType(value.name);
  }
  const optionsR = roomTypes.map((option) => {
      const firstLetter = option.name[0].toUpperCase();
      return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
      };
  });

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
          console.log(results);
          setDocumentTypes(results);               
      }).catch(error =>{
        console.log(error);
      });
    }
    const handlechangeD = (event, value) => {
        setDocumentTypeId(value.id);
        setDocumentTypeName(value.name);
    }
    const optionsD = documentTypes.map((option) => {
        const firstLetter = option.name[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

    // get profession types
  const [professiomTypes, setProfessiomTypes] = React.useState([]);
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
          console.log(results);
          setProfessiomTypes(results);               
      }).catch(error =>{
        console.log(error);
      });
    }
    const handlechangeP = (event, value) => {
        setProfessionTypeId(value.id);
        setProfessionTypeName(value.name);
    }
    const optionsP = professiomTypes.map((option) => {
        const firstLetter = option.name[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });
      
    
    React.useEffect(()=>{
        getdata();
        getRoomTypes();
        getDocumentTypes();
        getProfessionTypes();

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
                <p style={{color: "red",fontSize:'12px'}}>{error}</p>
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
                        <input accept="image/*" id="contained-button-file" type="file"/>
                        <TextField id="outlined-size-small" label="id" fullWidth size="small"  onChange={(e)=>setFileId(e.target.value)}/>
                        <TextField id="outlined-size-small" label="fileName" fullWidth size="small"  onChange={(e)=>setFileName(e.target.value)}/>
                        <TextField id="outlined-size-small" label="title" fullWidth size="small" onChange={(e)=>setTitle(e.target.value)}/>
                        <TextField id="outlined-size-small" label="description" fullWidth size="small" onChange={(e)=>setDescription(e.target.value)}/>
                        <TextField id="outlined-size-small" label="orderNumber" fullWidth size="small" onChange={(e)=>setOrderNumber(e.target.value)}/>
                        <TextField id="outlined-size-small" label="uploadLink" fullWidth size="small" onChange={(e)=>setUploadLink(e.target.value)}/>
                        <TextField id="outlined-size-small" label="downloadLink" fullWidth size="small" onChange={(e)=>setDownloadLink(e.target.value)}/>
                        <TextField id="outlined-size-small" label="tagId" fullWidth size="small" onChange={(e)=>setTagId(e.target.value)}/>
                        <TextField id="outlined-size-small" label="tagName" fullWidth size="small" onChange={(e)=>setChapterName(e.target.value)}/>
                        <TextField id="outlined-size-small" label="tagDescription" fullWidth size="small" onChange={(e)=>setTagDescription(e.target.value)}/>
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
                        <TextField id="outlined-size-small" label="roomId" fullWidth size="small" onChange={(e)=>setRoomId(e.target.value)}/>
                        <TextField id="outlined-size-small" label="roomTitle" fullWidth size="small" onChange={(e)=>setRoomTitle(e.target.value)}/>
                        <Autocomplete
                                disableClearable
                                options={optionsR.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                groupBy={(option) => option.firstLetter}
                                getOptionLabel={(option) => option.id + " - " + option.name}
                                renderInput={(params) => <TextField {...params} label="Room Type" required />}
                                size="small"
                                onChange={(event, value) => handlechangeR(event, value)}
                            />
                        <TextField id="outlined-size-small" label="roomDescription" fullWidth size="small" onChange={(e)=>setRoomDescription(e.target.value)}/>

                        <br/>
                            <input type="checkbox" defaultChecked={checked} onChange={() => setChecked(!checked)} />
                            Show in Boligmap
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