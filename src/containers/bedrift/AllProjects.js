/* eslint-disable react/jsx-key */
import React,{useState} from "react";
import axios from 'axios';
import TableScrollbar from 'react-table-scrollbar'
import { api } from "../../urlConfig.js";
import { Link } from "react-router-dom";
// @material-ui/core components
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Table,TableHead, TableBody, TableCell, TableRow } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

// core components
import GridItem from "../../components/Dashboard/Grid/GridItem.js";
import GridContainer from "../../components/Dashboard/Grid/GridContainer.js";
import CustomTabs from "../../components/Dashboard/CustomTabs/CustomTabs.js";
import SearchProperty from "./SearchProperty.js";

export default function Plants() {
  const [searchTerm, setSearchTerm] = useState(""); //for search function

 //get Project details from api
    
      const [data, setData] = React.useState();
      const getdata =() =>{
          const token = window.localStorage.getItem('token');
          axios.get(`${api}projects`,{
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
  
  React.useEffect(()=>{
      getdata();
    },[]);

  const columns = [
    { id: 'buildingNumber', label: 'Plant Id'},
    { id: 'createdDate', label: 'Created Date'},
    { id: 'buildingNumber', label: 'Building Number'},
    { id: 'address', label: 'Address'},
    { id: 'boligmappaNumber', label: 'Housing Folder Number'},
    { id: 'view', label: 'View'},

  ]

  return (
    
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
            headerColor="primary"
            tabs={[
              {
                tabName: "Your Projects",
                tabContent: (
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
                          placeholder="Search for property"
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
                          {data && data.filter((row)=>{
                            if (searchTerm === "") {
                              return row
                            } else if (row.boligmappaNumber.toLowerCase().includes(searchTerm.toLowerCase())){
                            return row
                            }
                            return null;
                          }).map((row,id) => {
                            return(
                            <TableRow key={id}>
                              <TableCell align="left">
                                {row.plantId}
                              </TableCell>
                              <TableCell align="left">
                                {row.createdDate}
                              </TableCell>
                              <TableCell align="left">
                                {row.property.unitNumber}
                              </TableCell>
                              {/* <TableCell align="left">
                                {row.property.share? row.property.share.organizationNumber + " - ": null }&nbsp;
                                {row.property.share? row.property.share.shareNumber : null}  
                              </TableCell> */}
                              <TableCell align="left">
                                {row.property.address? row.property.address.houseNumber : null}&nbsp; 
                                {row.property.address? row.property.address.houseSubNumber : null} &nbsp; 
                                {row.property.address? row.property.address.streetName : null} &nbsp; 
                                {row.property.address? row.property.address.postalCode : null} &nbsp; 
                                {row.property.address? row.property.address.postalPlace : null}&nbsp; 
                              </TableCell>
                              <TableCell align="left">
                                {row.boligmappaNumber}
                              </TableCell>
                              <TableCell align="left">
                                <Link to={{pathname: "/bedrift/viewoneplant", state: row.boligmappaNumber}}>View</Link>
                              </TableCell>
                            </TableRow>
                            );
                          }
                          )
                          }
                        </TableBody>
                      </Table>
                    </TableScrollbar>
                  </div>
                ),
              }
            ]}
          />
      </GridItem>
    </GridContainer>
  );
}
