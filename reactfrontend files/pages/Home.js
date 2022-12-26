import React from "react";
import { useState,useEffect } from "react";
import {Link, Navigate, useLinkClickHandler} from 'react-router-dom'
import Header from "./header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaPlus } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import { RedirectFunction } from "react-router-dom";

const Home=()=>{
    let [posts,setPosts]=useState([])
    // let [count,setCount]=useState(1)
    let [topics,setTopics]=useState([])
    let [topicid,setTopicid]=useState(0)
    let [action,setAction]=useState('new')
    let navigate=useNavigate()
    const {handler}=useContext(AuthContext)

    let getPosts=async()=>{
        let response = await fetch('http://127.0.0.1:8000/base/getrooms')
        let data = await response.json()
        setPosts(data)
        console.log(posts)
    }

    let getTopics=async()=>{
        let response = await fetch('http://127.0.0.1:8000/base/gettopics')
        let data = await response.json()
        setTopics(data)
        console.log(topics)
    }

    let handledelete=(postid)=>{
        fetch(`http://127.0.0.1:8000/base/deletepost/${postid}`,{method:'DELETE',
        headers:{
            'Accept':'application/json'}})
            console.log(postid)
            window.location.reload()
        }


    useEffect(()=>{
        getTopics()
        getPosts()        
    },[]);
    
    return(
        <div>
            <Header/>
            {handler && <h3>Hello {handler.username}</h3>}
        <div className="base-container">
        
        <div className="topics-container">
                <div className="topic-container">
                    <h2 onClick={()=>setTopicid(0)}>
                        All
                    </h2>
                </div>
            {topics.map((topic)=>{
                return (
                <div className="topic-container">
                    <h2 onClick={()=>setTopicid(topic.id)}>
                        {topic.name}
                    </h2>
                </div>
            )})}
        </div>


        <div className='title-container'>

            {posts.filter(data=>{
                if (topicid!==0){
                    return (data.topic === topicid)}
                else{
                    return data
                
                }}).map((post)=>{
                console.log(post)
                return (
                <div className="headline-container">
                    <div>
                    <a className="title-header" href={`post/${post.id}`}>   
                    <h1>
                            {post.name}
                    </h1>
                    </a>
                    </div>
                    
                    {handler?.user_id===post.host ?<div>
                    <Link to={`newpost/${post.id}`} >
                    <div>
                        <button className="edit-btn">   Edit</button>
                    </div>
                    </Link>
                    <button onClick={()=>handledelete(post.id)}>delete</button>
                    </div>:<p></p>}
                </div>
            )})}
        </div>

        <div className="icon-component">
            {handler && <Link to ={`newpost/${action}`}>
            <h3 id="plus-icon">
            <FaPlus/> NewPost
            </h3>
            </Link>}
        </div>

        </div>
        </div>
    )
}

export default Home