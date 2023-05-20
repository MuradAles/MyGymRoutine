import { useState, useEffect, useContext } from "react";
import { doCreateUserWithEmailAndPassword } from "../firebase/FirebaseFunctions";
import { AuthContext } from "../firebase/Auth";

function Login() {
    const { currentUser } = useContext(AuthContext);
    return (
        <div className="App">
            <p>Login</p>
        </div>
    );
}

export default Login;
