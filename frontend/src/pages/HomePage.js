import Logout from "../components/Logout"
import Login from "../components/Login"
import SignUp from "../components/SignUp"
import { useContext } from "react"
import { AuthContext } from "../firebase/Auth"
function Homepage() {
    const { currentUser } = useContext(AuthContext)
    console.log(currentUser)
    return (
        <div className="App">
            <p>HomePage</p>
            {currentUser ? (
                <>
                    <p>Auth</p>
                    <Logout />
                </>
            ) : (
                <>
                    <p>No Auth</p>
                    <Login />
                    <SignUp />
                </>
            )}
        </div>
    );
}

export default Homepage;
