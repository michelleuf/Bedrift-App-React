import React from "react";
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';

export default function Home() {
    const history = useHistory();

    const goToLogin = () => {
        history.push('auth');
    }
   
    return (
        <div>
            <h1>Home</h1>
            <Button variant="contained" onClick={goToLogin}>Login</Button>
        </div>
    )
}
