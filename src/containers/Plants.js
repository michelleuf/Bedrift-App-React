import React,{useState} from "react";
import axios from 'axios';
import { api } from "../urlConfig.js";
import TableScrollbar from 'react-table-scrollbar'

import { Table,TableHead, TableBody, TableCell, TableRow } from "@material-ui/core";


export default function Plants() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); //for search function

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
        { id: 'type', label: 'type'},]
      const rows = data; 

    return (
        <div>
            hello plants
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
        </div>
    )
}
