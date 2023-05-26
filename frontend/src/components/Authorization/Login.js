import { doSignInUserWithEmailAndPassword } from "../../firebase/FirebaseFunctions";
import './Login.css'
function Login() {
    const handleSubmite = async (e) => {
        e.preventDefault();
        const { login_email_Intput, login_password_Intput } = e.target
        try {
            await doSignInUserWithEmailAndPassword(
                login_email_Intput.value,
                login_password_Intput.value,
            )
            await fetch('/users/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: login_email_Intput.value,
                    password: login_password_Intput.value
                })
            })
        } catch (error) {
            console.log(error)
            alert(error);
        }
    }
    return (
        <div className="Login">
            <p>Login </p>
            <form onSubmit={handleSubmite}>
                <div className="login_Div">
                    <div className="email_Div">
                        <label htmlFor="login_email_Intput">
                            Email:
                            <input
                                className="input_tag homePage"
                                id="login_email_Intput"
                                placeholder="email"
                                autoComplete="off"
                                required
                            />
                        </label>
                    </div>
                    <div className="password_Div">
                        <label htmlFor="login_password_Intput">
                            Password:
                            <input
                                className="input_tag homePage"
                                id="login_password_Intput"
                                placeholder="password"
                                type="password"
                                autoComplete="off"
                                required
                            />
                        </label>
                    </div>
                    <button className='button-54' type='submit'>
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
