import React, { useState } from "react";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    function login(e) {
      e.preventDefault(); 
      console.log({email,password});
    }
    // return(
    //     <div className="login">
    //          <h1>Login</h1>
    //         <input type="text" className="inputBox" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} />
    //         <input type="text" className="inputBox" placeholder="Enter Email" />
    //         <button type="button" className="button" onClick={login}>Sign Up</button> 
    //     </div>
    // )
    return (
        <div className="login-wrapper">
            <div className="login-box">
                <div className="login-icon">🔐</div>
                <h2>Login in with Email</h2>
                <form>
                    <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required />

                    <div className="forgot-password">
                        <a href="#">Forgot password?</a>
                    </div>

                    <button type="submit" onClick={login}>Login</button>
                </form>

                <div className="divider">
                    <hr />
                    <span>or sign in with</span>
                    <hr />
                </div>

                <div className="social-icons">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                            <path fill="#4285F4" d="M43.6 20.5H42V20H24v8h11.3C34.3 33.3 29.7 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6-6C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.1-2.5-.4-3.5z" />
                            <path fill="#34A853" d="M6.3 14.7l6.6 4.8C14.2 16 18.8 13 24 13c3.1 0 5.9 1.2 8 3.1l6-6C34.5 6.5 29.5 4 24 4 16.3 4 9.6 8.7 6.3 14.7z" />
                            <path fill="#FBBC05" d="M24 44c5.4 0 10.4-2.1 14.1-5.4l-6.5-5.3C29.9 34.5 27 36 24 36c-5.6 0-10.3-3.6-12-8.5l-6.6 5.1C9.5 40.1 16.2 44 24 44z" />
                            <path fill="#EA4335" d="M43.6 20.5H42V20H24v8h11.3C33.3 32.3 29.1 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6-6C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.1-2.5-.4-3.5z" />
                        </svg>

                    </button>
                    <button>
                        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" />
                    </button>
                    <button>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Login;