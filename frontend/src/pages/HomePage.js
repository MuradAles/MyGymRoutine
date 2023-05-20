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
            <Login />
            <SignUp />
            <Logout />
        </div>
    );
}

export default Homepage;
