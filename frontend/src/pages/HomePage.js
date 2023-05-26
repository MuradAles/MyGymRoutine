import { useState } from "react";
import Login from "../components/Authorization/Login";
import SignUp from "../components/Authorization/SignUp";
import { useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import { Navigate } from 'react-router-dom';

function Homepage() {
    const { currentUser } = useContext(AuthContext);
    const [showLogin, setShowLogin] = useState(true);

    const handleToggle = () => {
        setShowLogin(!showLogin);
    };

    return (
        <div className="HomePage" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            {currentUser ? (
                <Navigate to="/routine" />
            ) : (
                <>
                    <button className="button-54" onClick={handleToggle}>
                        {showLogin ? "Sign Up" : "Login"}
                    </button>
                    {showLogin ? <Login /> : <SignUp />}
                </>
            )}
        </div>
    );
}

export default Homepage;
