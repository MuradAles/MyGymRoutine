import { useState } from "react";
import { doCreateUserWithEmailAndPassword } from "../../firebase/FirebaseFunctions";
import './SignUp.css'
function SignUp() {
    const [errorSet, setError] = useState('');
    const handleSubmite = async (e) => {
        e.preventDefault();
        const { signup_email_Input, signup_password_Input, signup_repeat_password_Input } = e.target

        const password = signup_password_Input.value;
        if (password.length < 6) {
            setError('Password should be at least 6 characters long.');
            return false;
        }

        if (!/\d/.test(password)) {
            setError('Password should contain at least 1 number.');
            return false;
        }

        if (!/[!@#$%^&*_]/.test(password)) {
            setError('Password should contain at least 1 symbol.');
            return false;
        }

        if (!/[A-Z]/.test(password)) {
            setError('Password should contain at least 1 capital letter.');
            return false;
        }

        if (password !== signup_repeat_password_Input.value) {
            setError('Passwords do not match');
            return false;
        }
        try {
            let userId = await doCreateUserWithEmailAndPassword(
                signup_email_Input.value,
                signup_password_Input.value,
            )
            await fetch('/users/signup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid: userId,
                    email: signup_email_Input.value,
                    password: signup_password_Input.value
                })
            })
        } catch (er) {
            setError("Email is incorrect or been in Used");
        }
    }
    return (
        <div className="SignUp">
            <p>Sign Up </p>
            {errorSet && <div className="error">{errorSet}</div>}
            <form onSubmit={handleSubmite}>
                <div className="login_Div">
                    <div className="email_Div">
                        <label htmlFor="signup_email_Input">
                            Email:
                            <input
                                className="input_tag homePage"
                                id="signup_email_Input"
                                placeholder="email"
                                autoComplete="off"
                                required
                            />
                        </label>
                    </div>
                    <div className="password_Div">
                        <label htmlFor="signup_password_Input">
                            Password:
                            <input
                                className="input_tag homePage"
                                id="signup_password_Input"
                                placeholder="password"
                                type="password"
                                autoComplete="off"
                                required
                            />
                        </label>
                    </div>
                    <div className="repeat_password_Div">
                        <label htmlFor="signup_repeat_password_Input">
                            Repeat Password:
                            <input
                                className="input_tag homePage"
                                id="signup_repeat_password_Input"
                                placeholder="password"
                                type="password"
                                autoComplete="off"
                                required
                            />
                        </label>
                    </div>
                    <button className='button-54' type='submit'>
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
