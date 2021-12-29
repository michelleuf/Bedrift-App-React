/* eslint-disable react/jsx-key */
import React,{useState} from "react";
import axios from 'axios';
import TableScrollbar from 'react-table-scrollbar'
import { api } from "../../urlConfig.js";

// @material-ui/core components
import { makeStyles} from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Table,TableHead, TableBody, TableCell, TableRow } from "@material-ui/core";

import SearchIcon from '@material-ui/icons/Search';

// core components
import GridItem from "../../components/Dashboard/Grid/GridItem.js";
import GridContainer from "../../components/Dashboard/Grid/GridContainer.js";
import Card from "../../components/Dashboard/Card/Card.js";
import CardHeader from "../../components/Dashboard/Card/CardHeader.js";
import CardBody from "../../components/Dashboard/Card/CardBody.js";
import Button from "../../components/Dashboard/CustomButtons/Button";
import PhotoSteps from "../../components/admin/dialogbox/PhotoSteps";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle";

const useStyles = makeStyles(styles);

export default function PharmacyRequests() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState(""); //for search function

 //backend connection
  const [data, setData] = useState([]);
  const getdata =() =>{
    // const token = window.localStorage.getItem('token');
    const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJjamZ6R3RiR3NjQUQwa0dIN01BY0Y4d3hzaVFjcTB5X3FkQTdvZ3lWQ3p3In0.eyJleHAiOjE2NDA3NzQzNDIsImlhdCI6MTY0MDc3MjU0MiwianRpIjoiYTVlZTZlZDktZmEyZC00Mzk3LWIxN2QtOGYzMDBjYjUwY2I1IiwiaXNzIjoiaHR0cHM6Ly90ZXN0YXV0aC5ib2xpZ21hcHBhLm5vL2F1dGgvcmVhbG1zL3Byb2Zlc3Npb25hbC1yZWFsbS1zdGFnaW5nIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImFiZGE2ZmYzLWM5M2MtNGZhOC04YWEyLTRmMzg3MjY4NjZjYSIsInR5cCI6IkJlYXJlciIsImF6cCI6InN0YWdpbmctbWljaGVsbGUiLCJzZXNzaW9uX3N0YXRlIjoiZTRjNWM3ZDktMDkzOC00YzNiLWIzNWQtYzQwNzllNWYzMDM4IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiWW9oYW4gSmF5YXJhdGhuYSIsInByZWZlcnJlZF91c2VybmFtZSI6InlvaGFuaiIsImdpdmVuX25hbWUiOiJZb2hhbiIsImZhbWlseV9uYW1lIjoiSmF5YXJhdGhuYSIsImVtYWlsIjoieW9oYW5qQDk5eC5pbyJ9.bu7kNXgqQ0Nxwa2PUw7TTaIg1xlIYvdF-j_VQ1Jmw7FjdNP4SicFm_ybKA7wpSJoPRGZaRKzzUlM0EG7VXLfrY_bSVndeGxXq7nftZUPJS6E4FGAZpr1CT4qcQYmjkGJyCjxkTQuzQK--NBsaW7UQFRE6wuvP3Pa2GJYmijqwL6BBfcHlnEiXlE2f_RxUXSDgl71SBAsVpELjYkg1sW4urL4EwI8VQ_Fo4HpDTKgVW8Zfv02IcDx4WiCqb3jskW9-jtV0LYxhZZMU-DMRD1dc1VSj-9WRiH5xS31YMr6CShbRDTzVpwydDkHyEt0IrNDDgtsUonUO0gMAVJFlFocGg";
      axios.get(`${api}/plants`,{
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Access-Control-Allow-Origin': '*',
        }
        })
      .then(res =>{
        const results =  res.data;
         console.log(results);
        setData(results);
      })
    
  }
  React.useEffect(()=>{
    getdata();
  },[]);

  const columns = [
    { id: 'name', label: 'Name'},
    { id: 'email', label: 'Email'},
    { id: 'contactnumber', label: 'ContactNo'},
    { id: 'location', label: 'Location'},
    { id: 'document', label: 'Documents'},
    { id: 'activate', label: 'Activate'},
    { id: 'reject', label: 'Reject'},];
  const rows = data; 

  return (
    
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Pharmacy Registration Requests  </h4>
          </CardHeader>
          <CardBody>
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
                  placeholder="Search..."
                  fontSize="small"
                  size="sm"
                />
              </FormControl>
            </div>
            <TableScrollbar rows={20}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell style={{color:'primary',backgroundColor: "white"}}
                              key={column.id}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      
                      <TableBody >
                        {rows.filter((row)=>{
                          if (searchTerm == "") {
                            return row
                          } else if (row.name.toLowerCase().includes(searchTerm.toLowerCase()) || row.email.toLowerCase().includes(searchTerm.toLowerCase()) 
                          // || row.location.toLowerCase().includes(searchTerm.toLowerCase())
                          ){
                            return row
                          }
                        }).map((row,id) => {
                          return(
                          <TableRow key={id}>
                            <TableCell align="left">
                              {row.name}
                            </TableCell>
                            <TableCell align="left">
                              {row.email}
                            </TableCell>
                            <TableCell align="left">
                              {row.contactnumber}
                            </TableCell>
                            <TableCell align="left">
                              {row.city}
                            </TableCell>
                          </TableRow>
                          );
                        }
                        )
                        }
                      </TableBody>
                    </Table>
                  </TableScrollbar>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
