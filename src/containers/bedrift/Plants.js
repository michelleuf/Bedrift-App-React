/* eslint-disable react/jsx-key */
import React,{useState} from "react";
import axios from 'axios';
import TableScrollbar from 'react-table-scrollbar'
import { api } from "../../urlConfig.js";

// @material-ui/core components
import { makeStyles} from "@material-ui/core/styles";
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

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle";

const useStyles = makeStyles(styles);

export default function PharmacyRequests() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState(""); //for search function

 //backend connection
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
        setData(results);
      })
  }
React.useEffect(()=>{
    getdata();
  },[]);

  const columns = [
    { id: 'boligmappaNumber', label: 'boligmappaNumber'},
    { id: 'plantId', label: 'plantId'},
    { id: 'createdDate', label: 'createdDate'},
    { id: 'building', label: 'building'},
    { id: 'property', label: 'property'},
    { id: 'type', label: 'type'},]
  const rows = data; 
  console.log(rows);

  return (
    
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Property List  </h4>
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
                          if (searchTerm === "") {
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
                              {row.boligmappaNumber}
                            </TableCell>
                            <TableCell align="left">
                              {row.plantId}
                            </TableCell>
                            <TableCell align="left">
                              {row.createdDate}
                            </TableCell>
                            <TableCell align="left">
                              {row.building}
                            </TableCell>
                            <TableCell align="left">
                              {row.property}
                            </TableCell>
                            <TableCell align="left">
                              {row.type}
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
