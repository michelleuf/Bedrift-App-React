import React,{useState} from "react";
import axios from 'axios';
import { api } from "../urlConfig.js";


export default function Plants() {
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
    return (
        <div>
            hello plants
            {/* {data]} */}
            {data.map((d,id) => 
            {
              return(
                <p id={id}>{d.boligmappaNumber}</p>
              )
            })}
            
        </div>
    )
}
