import { doSignOut } from '../firebase/FirebaseFunctions'

function Logout() {
    return (
        <button type='button' onClick={doSignOut}>Log out</button>
    );
}

export default Logout;
