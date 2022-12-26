import React, { Children } from 'react'
import { useState,useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const LoginPage=()=>{

    // localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null

    const [authToken,setAuthToken]=useState(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const {handler,setHandler}=useContext(AuthContext)
   
  const navigate= useNavigate()

  const getuser=async(e)=>{
    e.preventDefault()
    let response = await fetch("http://127.0.0.1:8000/base/token/",{
            method:'POST',
            headers:{
                // 'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "username": e.target.username.value,
                "password": e.target.password.value
            })
       })
    let data= await response.json()
        
    if(response.status===200){
        setAuthToken(data)
        setHandler(jwtDecode(data.access))
        
        localStorage.setItem('authTokens',JSON.stringify(data))
        navigate('/')
    }else{
        alert('Something went wrong')
    }
  }
  
  const handleLogout=()=>{
    setAuthToken(null)
    setHandler(null)
    localStorage.removeItem('authTokens')
    navigate('/')
    console.log('LOgged out')
  }

    return(
        <div className='login-form'>
            {localStorage.getItem('authTokens') ?<h2 onClick={handleLogout} className='logout-final'>Logout</h2>:
            
            <div className='login-contanier'>
            <form onSubmit={getuser}>
                <label>Username  </label>
                <input type='text' className='login-box' name='username' placeholder='Enter Username here'></input>
                <p></p>
                <label>Password  </label>
                <input type='text' className='login-box' name='password' placeholder='Enter Password here'></input>
                <p></p>
                <input  className='login-btn' type='submit' value='Login'></input>
            </form>
            </div>}
            
            {handler && <h2>You are logged in {handler.username}</h2>}

        </div>
    )
}

export default LoginPage