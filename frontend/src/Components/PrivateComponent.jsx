import {Navigate, Outlet} from "react-router-dom";

const PrivateComponent=()=>{
    const auth = localStorage.getItem("user");
    console.log(auth);
    return auth? <Outlet/>: <Navigate to="/login"/>
}

export default PrivateComponent;