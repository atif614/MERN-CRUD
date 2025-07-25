import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
    const logout = ()=>{
        console.warn("logout function");
        localStorage.clear();
        navigate("/signup");
    }
    return (
        <div>
            <ul className="nav-ul">
                <li> <Link to="/">Home Page</Link></li>
                <li> <Link to="/add">Add Product</Link></li>
                <li> <Link to="/update">Update Product</Link></li>
                {/* <li> <Link to="/logout">Logout</Link></li> */}
                <li> <Link to="/login">Login</Link></li>
                <li> {auth ? <Link onClick={logout}>Logout</Link> : <Link to="/signup">Sign Up</Link>} </li>
            </ul>
        </div>
    )
}
export default Navbar;