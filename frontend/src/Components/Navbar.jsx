import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
    return (
        <div>
            <ul className="nav-ul">
                <li> <Link to="/">Home Page</Link></li>
                <li> <Link to="/add">Add Product</Link></li>
                <li> <Link to="/update">Update Product</Link></li>
                <li> <Link to="/logout">Logout</Link></li>
                <li> <Link to="/profile">Profile</Link></li>
            </ul>
        </div>
    )
}
export default Navbar;