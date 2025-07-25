import { useState,useEffect } from "react";
import "./Signup.css"
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const auth = localStorage.getItem("user");
        const navigte = useNavigate();
        useEffect(()=>{
            console.log("Inside")
            if(auth){
                navigte("/");
            }
            // eslint-disable-next-line
        },[])  
    async function register() {
        if (!name || !email || !password) {
            alert("Please enter the credentials")
        }
        else {
            let result = await fetch("http://localhost:5000/register", {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            result = await result.json();
            if (result) {
                navigate("/");
            }
            localStorage.setItem("user",JSON.stringify(result));
             console.log(result);
        }
       
    }
    return (
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text" name="name" id="name" placeholder="Enter Name" onChange={(e) => { setName(e.target.value) }} />
            <input className="inputBox" type="text" name="email" id="email" placeholder="Enter Email" onChange={(e) => { setEmail(e.target.value) }} />
            <input className="inputBox" type="password" name="password" id="password" placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value) }} />
            <button type="button" className="button" onClick={register}>Sign Up</button>
        </div>
    )
}

export default SignUp;