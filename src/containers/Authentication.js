import React,{useState} from "react";
import axios from 'axios';
import { backendUrl } from "../urlConfig.js";
require('dotenv').config()

export default function Authentication() {
    // get auth code from the URL
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let codee = params.get('code');
    localStorage.setItem('code', codee);
    console.log("authcodeee",codee);
    
    // get access token
    const [data, setData] = useState();

    const getdata =() =>{
        const authCode = window.localStorage.getItem('code');
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("client_id",process.env.REACT_APP_CLIENT_ID);
        urlencoded.append("client_secret", process.env.REACT_APP_CLIENT_SECRET);
        urlencoded.append("username",process.env.REACT_APP_USERNAME);
        urlencoded.append("password",process.env.REACT_APP_PASSWORD);
        urlencoded.append("grant_type",'password' );
        // urlencoded.append("grant_type",'authorization_code' );
        // urlencoded.append("code", authCode);
        urlencoded.append("redirect_uri", "http://localhost:3000/redirect");
        urlencoded.append("scope", "openid");

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        fetch(`/token`, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            localStorage.setItem('token', result.access_token);

            // setData(result);
        })
        .catch(error => console.log('error', error));        
      }

    React.useEffect(()=>{
        getdata();
      });
    return (
        <div>
            {data}
        </div>
    )
}
