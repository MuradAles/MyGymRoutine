import Login from "../components/Authorization/Login"
import SignUp from "../components/Authorization/SignUp"
import { useContext } from "react"
import { AuthContext } from "../firebase/Auth"
import { Navigate } from 'react-router-dom';
function Homepage() {
    const { currentUser } = useContext(AuthContext)
    return (
        <div className="App">
            <p>HomePage</p>
            {currentUser ? (
                <>
                    <Navigate to='/routine' />
                </>
            ) : (
                <>
                    <Login />
                    <SignUp />
                </>
            )}
        </div>
    );
}

export default Homepage;
