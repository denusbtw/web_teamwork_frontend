import React from 'react';
import {useNavigate} from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import './loginSignup.css';
import Topbar from '../components/Topbar';

function LoginSignup() {
    const navigate = useNavigate();

    const [action, setAction] = React.useState("Sign Up");
    const [bannerMessage, setbannerMessage] = React.useState("");
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [role, setRole] = React.useState('');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    async function signUp() {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!name || !email || !password) {
            setbannerMessage('All fields are required.');
            return;
        }

        if (!role) {
            setbannerMessage('Please select a valid role.');
            return;
        }

        try {
            const response = await fetch('https://web-teamwork-backend.onrender.com/api/v1/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: name,
                    role: role,
                    email: email,
                    password: password
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Registration failed.');
            }

            // логін одразу після успішної реєстрації
            const loginResponse = await fetch('https://web-teamwork-backend.onrender.com/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (!loginResponse.ok) {
                const errorData = await loginResponse.json();
                throw new Error(errorData.detail || 'Auto-login failed.');
            }

            const data = await loginResponse.json();
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);

            navigate('/user/me');
        } catch (error) {
            setbannerMessage(error.message || 'Sign up error');
        }
    }


    async function login() {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        try {
            const response = await fetch('https://web-teamwork-backend.onrender.com/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Login failed.');
            }

            const data = await response.json();
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);

            navigate('/user/me');
        } catch (error) {
            setbannerMessage(error.message || 'Login error');
        }
    }

    return (
        <>
            <Topbar />
            <div className='container'>
                {bannerMessage && (
                    <div className="banner-container">
                        <div className='close-button' onClick={() => setbannerMessage("")}>✖</div>
                        <div className="submit-banner">
                            <h2>{bannerMessage}</h2>
                        </div>
                    </div>
                )}

                <div className='header'>
                    <div className="submit-container">
                        <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => setAction("Sign Up")}>Sign Up</div>
                        <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>Login</div>
                    </div>
                    <div className='underline' style={{ left: action === 'Login' ? '400px' : '140px' }}></div>
                </div>

                <div className="inputs">
                    {action === "Login" ? null : (
                        <>
                            <div className="input">
                                <img src="/images/loginSignup/person.png" alt="user" />
                                <input type='text' placeholder='Name' id='name' />
                            </div>
                            <div className="input">
                                <img src="/images/loginSignup/role.svg" alt="role" className='role-icon' />
                                <form onSubmit={handleSubmit}>
                                    <select
                                        className='role-select'
                                        id='role'
                                        name='role'
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="">Role</option>
                                        <option value="user">User</option>
                                        <option value="host">Host</option>
                                    </select>
                                </form>
                            </div>
                        </>
                    )}

                    <div className="input">
                        <img src="/images/loginSignup/email.png" alt="email" />
                        <input type='email' placeholder='Email' id='email' />
                    </div>
                    <div className="input">
                        <img src="/images/loginSignup/password.png" alt="password" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            id='password'
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <button
                            className='eye-icon'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </button>
                    </div>
                </div>

                {action === "Sign Up" ? null : (
                    <div className="forgot-password">Lost Password?<span>Click Here!</span></div>
                )}

                <div className="submit-container">
                    <button
                        className='submit-button'
                        onClick={action === "Login" ? login : signUp}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
}

export default LoginSignup;
