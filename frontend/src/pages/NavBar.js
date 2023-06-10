import { AuthContext } from "../firebase/Auth";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import './NavBar.css';
import Logout from "../components/Authorization/Logout";

const NavBar = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="navBar">
            <div className="leftLinks">
                <NavLink className="logo no-underline" to="/">
                    MyGymRoutine
                </NavLink>
            </div>

            <div className="rightLinks">
                {currentUser ? (
                    <>
                        <NavLink className="button-50 no-underline" to="/routine">
                            Routine
                        </NavLink>
                        <Logout />
                    </>
                ) : (
                    <>
                        <NavLink className="button-50 no-underline" to="/authorization">
                            Login
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

export default NavBar;
