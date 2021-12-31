import React,{useState} from "react";
import axios from 'axios';
import { api } from "../../urlConfig.js";


export default function CreatePlant() {
    const [data, setData] = useState([]);
    const [boligmappaNumber, setBoligmappaNumber] = useState('');

    const getdata =() =>{
        const token = window.sessionStorage.getItem('token');
          axios.post(`${api}plants`,{
            data:{
              "boligmappaNumber" : boligmappaNumber
            }},{
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
      
    return (
        <div>
            create plants
            response iss : {data}
            <form onSubmit={getdata}>
                <input type="text" value={boligmappaNumber} onChange={(e)=>setBoligmappaNumber(e.target.value)}/>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}
