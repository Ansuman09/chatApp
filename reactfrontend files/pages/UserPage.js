import React from "react";
import { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./header";

const UserPage=()=>{
    const obtained=useParams()    
    console.log(obtained)
    const [posts,setPosts]=useState()
    const [topics,setTopics]=useState()
    const [topicid,setTopicid]=useState(0)
    const [user,setUser]=useState()

    let getUsers=async()=>{
        let response = await fetch(`http://127.0.0.1:8000/base/user/${obtained.id}`)
        let data = await response.json()
        setUser(data)
        console.log(user)
    }

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


    useEffect(()=>{
        getPosts()
        getTopics()
        getUsers()
    },[])

    return(

    <div>

    <div>
        <Header/>
        <div className="user-container">
        <span>{user?.username}</span>
        </div>
    </div>    
    <div  className="base-container">

    <div className="topics-container">
                    <div className="topic-container">
                        <h2 onClick={()=>setTopicid(0)}>
                            All
                        </h2>
                    </div>
                {topics?.map((topic)=>{
                    return (
                    <div className="topic-container">
                        <h2 onClick={()=>setTopicid(topic.id)} >
                            {topic.name}
                        </h2>
                    </div>
                )})}
            </div>


        <div >
                
        {posts?.filter(data=>(data.host==obtained.id)).filter(data=>{
                if (topicid!==0){
                    return (data.topic === topicid)}
                else{
                    return data
                
                }}).map(post=>{
             console.log(post)
            return(
                <div>
                <Link to={`/post/${post.id}`}>
                        
                <div className="headline-container">
                    <h4 style={{'text-decoration':'none'}}>{post.name}</h4>
                </div>
                </Link>
                </div>
                
            )
        })}
        </div>

        <div>

        </div>
    </div>
    </div>
        )
}

export default UserPage