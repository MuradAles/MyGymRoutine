import { useState, useEffect, useContext } from "react";
import { doCreateUserWithEmailAndPassword } from "../firebase/FirebaseFunctions";
import { AuthContext } from "../firebase/Auth";

function SignUp() {
    const { currentUser } = useContext(AuthContext);
    const [pwMatch, setPwMatch] = useState('')
    console.log(currentUser)

    const handleSubmite = async (e) => {
        e.preventDefault();
        const { email_Intput, password_Intput, repeat_password_Intput } = e.target.elements
        if (password_Intput.value !== repeat_password_Intput.value) {
            setPwMatch('Passwords do not match');
            return false;
        }
        try {
            await doCreateUserWithEmailAndPassword(
                email_Intput.value,
                password_Intput.value,
            );
        } catch (error) {
            alert(error);
        }
    }
    return (
        <div className="App">
            <p>Sign Up </p>
            {pwMatch && <h4 className='error'>{pwMatch}</h4>}
            <form onSubmit={handleSubmite}>
                <div className="login_Div">
                    <div className="email_Div">
                        <label htmlFor="email_Intput">
                            Email:
                            <input
                                className="input_tag"
                                id="email_Intput"
                                placeholder="email"
                                autoComplete="off"
                                required
                            />
                        </label>
                    </div>
                    <div className="password_Div">
                        <label htmlFor="password_Intput">
                            Password:
                            <input
                                className="input_tag"
                                id="password_Intput"
                                placeholder="password"
                                type="password"
                                autoComplete="off"
                                required
                            />
                        </label>
                    </div>
                    <div className="repeat_password_Div">
                        <label htmlFor="repeat_password_Intput">
                            Repeat Password:
                            <input
                                className="input_tag"
                                id="repeat_password_Intput"
                                placeholder="password"
                                type="password"
                                autoComplete="off"
                                required
                            />
                        </label>
                    </div>
                    <button id='submiteButton' type='submit'>
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
