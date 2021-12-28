import React from "react";
import { useHistory } from "react-router-dom";

export default function Home() {
    const history = useHistory();

    const goToLogin = () => {
        history.push('auth');
    }
   
    return (
        <div>
            <h1>Home</h1>
            <button onClick={goToLogin}> Login </button>
        </div>
    )
}
