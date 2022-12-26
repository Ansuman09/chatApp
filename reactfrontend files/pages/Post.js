import React from "react";
import { useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { render } from "@testing-library/react";
import { AuthContext } from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";

const PostPage=()=>{
    let [post,setPost]=useState()
    let [messages,setMessages]=useState()
    let [comment,setComment]=useState()
    let [users,setUsers]=useState()
    const obtained=useParams()

    let {handler}=useContext(AuthContext)
    // let handler=jwtDecode(localStorage.getItem('authTokens'))
    let getUsers=async()=>{
        let response = await fetch('http://127.0.0.1:8000/base/users')
        let data = await response.json()
        setUsers(data)
        console.log(users)
    }

    const getMessages=async()=>{
        let response= await fetch(`http://127.0.0.1:8000/base/getmessages`)
        let data = await response.json()
        setMessages(data)
    }

    const getPost = async()=>{
        let response= await fetch(`http://127.0.0.1:8000/base/rooms/${obtained.id}`)
        let data = await response.json()
        setPost(data)
    }

    useEffect(()=>{
        getPost()
        getMessages()
        getUsers()
        console.log('gotuser',handler)
    },[])

    let handleComment=()=>{
        fetch(`http://127.0.0.1:8000/base/newmessage`,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                body:comment,
                user:handler?.user_id,
                room:post?.id,
            })
       })


    }

    return(
        <div className='messages-display'>
            <div className="newpost-headline">
            <h1>
                {post?.name}
            </h1>
            <h5>
                {post?.description}
            </h5>
            </div>
            <div className="messages-container">
                {messages?.filter(message=>message.room===post?.id)
                .map(message=>(
                    <div className="message-container">
                    <div className="message-user"><Link to={`/user/${message?.user}`}>{users[Number(message?.user)-1]?.username}</Link></div>
                    <h5>
                        {message.body}
                    </h5>
                    </div>
                ))}

                {handler &&
                <form className='message-submit'>
                    <textarea className='messages-textbox' onChange={(e)=>{setComment(e.target.value)}}/>
                    <button onClick={handleComment}>Submit</button>
                </form>}
            </div>
        </div>
    )
}

export default PostPage