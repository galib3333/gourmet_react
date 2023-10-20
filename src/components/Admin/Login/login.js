import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';
import { login, register } from "../Auth/auth";

function Login() {
    const navigate = useNavigate();
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [inputs, setInputs] = useState([]);
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        // Handle login
        let check = await login(inputs);
        if (check)
            navigate('/');
        else
            alert("Sorry! Your email address or password is not correct");

    }

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        // Handle registration
        await register(inputs);
        navigate('/login');
        setSignUpSuccess(true);
    }

    const toggleFormContainer = (isSignUp) => {
        const container = document.getElementById('container');
        if (isSignUp) {
            container.classList.add("right-panel-active");
        } else {
            container.classList.remove("right-panel-active");
        }
    }
    const onFileChange = (e) => {
        let files = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);

        fileReader.onload = (event) => {
            const name = "image";
            const value = event.target.result
            setInputs(values => ({ ...values, [name]: value }));
        }
    }

    return (
        <div className="body">

            <div className="container-fluid rounded" id="container" style={{ width: '786px' }}>

                <div className="form-container sign-up-container">
                    <form action="#" onSubmit={handleRegisterSubmit}>
                        <h1 >Create Account</h1>
                        <div className="social-container">
                            <a href="./" className="social" id="a"><i className="fab fa-facebook-f"></i></a>
                            <a href="./" className="social" id="a"><i className="fab fa-google-plus-g"></i></a>
                            <a href="./" className="social" id="a"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span id="span">or use your email for registration</span>
                        <input type="text" placeholder="Name" name="name" onChange={handleChange} required />
                        <input type="email" placeholder="Email" name="email" onChange={handleChange} required />
                        <input type="password" placeholder="Password" name="password" onChange={handleChange} required />
                        <label htmlFor="psw"><b>Upload Image</b></label>
                        <input type="file" className="form-control" name="image" onChange={onFileChange} />
                        <button type="submit">Sign Up</button>
                        {signUpSuccess && (
                            <div className="alert alert-success text-center rounded mt-2 pt-1 pb-1">
                                Sign Up Successful!
                            </div>
                        )}
                    </form>

                </div>

                <div className="form-container sign-in-container">
                    <form action="#" onSubmit={handleLoginSubmit}>
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <a href="./" className="social" id="a"><i className="fab fa-facebook-f"></i></a>
                            <a href="./" className="social" id="a"><i className="fab fa-google-plus-g"></i></a>
                            <a href="./" className="social" id="a"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your account</span>
                        <input type="email" placeholder="Email" name="email" onChange={handleChange} required />
                        <input type="password" placeholder="Password" name="password" onChange={handleChange} required />
                        <a href="./" id="a">Forgot your password?</a>
                        <button type="submit">Sign In</button>
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className="text-white">Welcome Back!</h1>
                            <p id="p">To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={() => toggleFormContainer(false)}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className="text-white">Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={() => toggleFormContainer(true)} >Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;