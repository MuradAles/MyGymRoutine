import { doSignOut } from '../firebase/FirebaseFunctions'

function Logout() {
    const handleLogOut = async () => {
        try {
            await doSignOut();
            await fetch('/users/logout', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (error) {
            alert(error);
        }
    }
    return (
        <form onSubmit={handleLogOut}>
            <button type='submit'>Log out</button>
        </form>
    );
}

export default Logout;
