import React, { useEffect } from "react";

export default function Authentication() {
  const [data, setData] = React.useState("");
  //get auth code from the URL
  const getAuthCode = () => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let codee = params.get('code');
    
    setData(codee);

    sessionStorage.setItem('code', codee);
  };
    
  //get access token
  const getToken =() =>{
    const authCode = data;
    console.log(authCode);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Access-Control-Allow-Origin", 'no-cors');
        
    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id",process.env.REACT_APP_CLIENT_ID);
    urlencoded.append("client_secret", process.env.REACT_APP_CLIENT_SECRET);
    urlencoded.append("username",process.env.REACT_APP_USERNAME);
    urlencoded.append("password",process.env.REACT_APP_PASSWORD);
    urlencoded.append("grant_type",'password' );
    // urlencoded.append("grant_type",'authorization_code' );
    // urlencoded.append("code", authCode);
    // urlencoded.append("response_type",'code' );
    urlencoded.append("redirect_uri", "/plants");
    urlencoded.append("scope", "openid");

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
    };

    fetch('token', requestOptions).then(response => response.json()).then(result => {
        console.log('dataaaaaaaa',result);
        // sessionStorage.setItem('authToken', data.access_token);
    }).catch(error => console.log('error', error));        
  }

    useEffect(()=>{
        getAuthCode();
        getToken();
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(()=>{
    //   if (data !== "") getToken();
    // },[data]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
          Please wait
        </div>
    )
}
