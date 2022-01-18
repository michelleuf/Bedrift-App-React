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
          }).catch(error =>{
            console.log(error.data);
          });
      }
      
    return (
        <div>
            create plants
            <form>
                <input type="text" onChange={(e)=>setBoligmappaNumber(e.target.value)}/>
                <button type="button" onClick={getdata}>submit</button>
            </form>
            
            response iss : {data.plantId}
        </div>
    )
}


// //bolig search component
// const token = window.localStorage.getItem('token');
//   let config = {
//     idObject: '{"userId": "michelleF"}',
//     integrationPartnerHandlesTokens: true,
//     pageSizes: {
//       streets: 10,
//       buildings: 10,
//       projects: 10
//     },
//     access_token : token
//   };
//   //custom event listener
// React.useEffect(()=>{
//   window.addEventListener('property-confirmed', (e) => {
//     setBoligmappaNumber(e.detail.selectedProperties.properties[0].boligmappaNumber);
//     createPlant();
//     // console.log(e);
//   })
// },[]);  // eslint-disable-line react-hooks/exhaustive-deps


{/* <Box
             component="form"
             noValidate
             sx={{
               '& .MuiTextField-root': { m: 1, width: '90%' },
             }}
             autoComplete="off"
             border={1}
             padding={2}
             margin={2}
             width="auto"
          >
            <b>Search for property with Addresses/Cadastral records/project</b>
            <br/>
            <br/>
            <boligmappa-search 
              development="true" 
              config={JSON.stringify(config)} 
            ></boligmappa-search>
            <br/>
            <br/>
          </Box> */}