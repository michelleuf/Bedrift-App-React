import React,{useState} from "react";
import axios from 'axios';
import { api } from "../../urlConfig.js";


export default function CreatePlant() {
    const [data, setData] = useState([]);
    const [boligmappaNumber, setBoligmappaNumber] = useState('');

    const getdata =() =>{
        const token = window.localStorage.getItem('token');
          axios.post(`${api}plants`,{
            boligmappaNumber : boligmappaNumber
            },{
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
      
    return (
        <div>
            create plants
            <form>
                <input type="text" onChange={(e)=>setBoligmappaNumber(e.target.value)}/>
                <button type="button" onClick={getdata}>submit</button>
            </form>
            
            response iss : {data}
        </div>
    )
}
