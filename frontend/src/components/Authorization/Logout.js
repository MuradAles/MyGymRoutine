import { doSignOut } from '../../firebase/FirebaseFunctions'
import { apiInstance } from "../../utils/apiInstance";
function Logout() {
    const handleLogOut = async () => {
        try {
            await doSignOut();
            await apiInstance
                .get("/users/logout");
        } catch (error) {
            alert(error);
        }
    }
    return (
        <form onSubmit={handleLogOut}>
            <button className="button-50" type='submit'>Log out</button>
        </form>
    );
}

export default Logout;
