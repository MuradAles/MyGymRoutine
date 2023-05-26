import { useState } from "react";
import { doCreateUserWithEmailAndPassword } from "../../firebase/FirebaseFunctions";
import './SignUp.css'
function SignUp() {
    const [pwMatch, setPwMatch] = useState('')
    const handleSubmite = async (e) => {
        e.preventDefault();
        const { signup_email_Intput, signup_password_Intput, signup_repeat_password_Intput } = e.target
        if (signup_password_Intput.value !== signup_repeat_password_Intput.value) {
            setPwMatch('Passwords do not match');
            return false;
        }
        try {
            let userId = await doCreateUserWithEmailAndPassword(
                signup_email_Intput.value,
                signup_password_Intput.value,
            )
            await fetch('/users/signup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid: userId,
                    email: signup_email_Intput.value,
                    password: signup_password_Intput.value
                })
            })
        } catch (error) {
            alert(error);
        }
    }
    return (
        <div className="SignUp">
            <p>Sign Up </p>
            {pwMatch && <h4 className='error'>{pwMatch}</h4>}
            <form onSubmit={handleSubmite}>
                <div className="login_Div">
                    <div className="email_Div">
                        <label htmlFor="signup_email_Intput">
                            Email:
                            <input
                                className="input_tag homePage"
                                id="signup_email_Intput"
                                placeholder="email"
                                autoComplete="off"
                                required
                            />
                        </label>
                    </div>
                    <div className="password_Div">
                        <label htmlFor="signup_password_Intput">
                            Password:
                            <input
                                className="input_tag homePage"
                                id="signup_password_Intput"
                                placeholder="password"
                                type="password"
                                autoComplete="off"
                                required
                            />
                        </label>
                    </div>
                    <div className="repeat_password_Div">
                        <label htmlFor="signup_repeat_password_Intput">
                            Repeat Password:
                            <input
                                className="input_tag homePage"
                                id="signup_repeat_password_Intput"
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
