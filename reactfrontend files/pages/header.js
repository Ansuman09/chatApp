import React,{useContext} from "react";
import LoginPage from "./LoginPage";
import { Link } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import { counter } from "@fortawesome/fontawesome-svg-core";

const Header=()=>{
    let {handler}=useContext(AuthContext)
    const handleSignup=()=>{
        window.open('http://127.0.0.1:8000/base/registeruser')
    }

    return (
        <div>
            <h1 style={
                {'backgroundColor':' rgb(249, 130, 62)',
            'text-align':'center',
            'margin':0,
            'padding':10,
            }}>
                Alethion
            </h1>
        <div className="header-container">
            <h3>
            <Link to='/login'>
                    {handler===null? <span className="login-logout" style={{'color':'white'}}>Login</span> : <span className="login-logout" style={{'color':'black'}}>Logout </span>}
            </Link>
                    <span className="login-logout" onClick={handleSignup}>SignUp</span>
            </h3>            
            </div>
        </div>
    )
}

export default Header