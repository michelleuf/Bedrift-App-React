import React, { useEffect } from "react";

export default function Authentication() {
  const [data, setData] = React.useState("");
  //get auth code from the URL
  const getAuthCode = () => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let code = params.get('code');
    localStorage.setItem('code', code);
    setData(code);
  };
    
  //get access token
  const [tokenHandle, setTokenHandle] = React.useState(false);
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
          localStorage.setItem('token', data1['access_token'])
          localStorage.setItem('refresh_token', data1['refresh_token'])
          localStorage.setItem('expires_in', data1['expires_in'])
          setTokenHandle(true);
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

    useEffect(()=>{
      if (tokenHandle) window.location.href = '/bedrift';
    },[tokenHandle]); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div>
          Access Token generating...
        </div>
    )
}
