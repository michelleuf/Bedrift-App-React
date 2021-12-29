import React, { useEffect } from "react";

export default function Authentication() {
  const [data, setData] = React.useState("");
  //get auth code from the URL
  const getAuthCode = () => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let code = params.get('code');
    sessionStorage.setItem('code', code);
    setData(code);
  };
    
  //get access token
  const getToken =() =>{
    const authCode = data;
    console.log(authCode);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", process.env.REACT_APP_CLIENT_ID);
    urlencoded.append("client_secret", process.env.REACT_APP_CLIENT_SECRET);
    urlencoded.append("grant_type", "authorization_code");
    urlencoded.append("code", authCode);
    urlencoded.append("redirect_uri", "http://localhost:3000/redirect");
    urlencoded.append("scope", "openid");

    // urlencoded.append("username",process.env.REACT_APP_USERNAME);
    // urlencoded.append("password",process.env.REACT_APP_PASSWORD);
    // urlencoded.append("grant_type",'password' );
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch('/token', requestOptions).then(async response => {
        try {
          const data1 = await response.json();
          console.log('respose data ?',data1);
          sessionStorage.setItem('access_token', data1['access_token'])
        } catch (error) {
          console.log('error happened here!!!!')
          console.log(error)
        }
      })
  }

    useEffect(()=>{
        getAuthCode();
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
      if (data !== "") getToken();
    },[data]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
          Access Token generating...
        </div>
    )
}
