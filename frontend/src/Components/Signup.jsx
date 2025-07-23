import { useState } from "react";
import "./Signup.css"

const SignUp = () => {
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    function register(){
        console.log({name,email,password})
    }
    return (
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text" name="name" id="name" placeholder="Enter Name" onChange={(e)=>{setName(e.target.value)}} />
            <input className="inputBox" type="text" name="email" id="email" placeholder="Enter Email" onChange={(e)=>{setEmail(e.target.value)}} />
            <input className="inputBox" type="text" name="password" id="password" placeholder="Enter Password" onChange={(e)=>{setPassword(e.target.value)}} />
            <button type="button" className="button" onClick={register}>Sign Up</button>
        </div>
    )
}

export default SignUp;