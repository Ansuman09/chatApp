import React from 'react'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

const NewPost=()=>{
    let [users,setUsers]=useState([])
    let [topics,setTopics]=useState([])
    const {handler}=useContext(AuthContext)
    let [post,setPost]=useState({host:handler.user_id,participants:[handler.user_id]})
    let obtained= useParams()
    
    let getTopics=async()=>{
        let response = await fetch('http://127.0.0.1:8000/base/gettopics')
        let data = await response.json()
        setTopics(data)
        console.log(topics)
    }
    
    const getPost = async()=>{
        let response= await fetch(`http://127.0.0.1:8000/base/rooms/${obtained.id}`)
        let data = await response.json()
        setPost(data)
    }

    useEffect(()=>{
        if (obtained.id !=='new'){
            console.log('runs')
            getPost()
        }
    },[])
    
    let getUsers=async()=>{
        let response = await fetch('http://127.0.0.1:8000/base/users')
        let data = await response.json()
        setUsers(data)
        console.log(users)
    }

    useEffect(()=>{
        getTopics()
        getUsers()
    },[])

    let handlePost=async()=>{
        console.log(post)
        let response = await fetch('http://127.0.0.1:8000/base/newroom',
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(post)})
        console.log(response.json())
    }

    let handlePut=()=>{
        console.log(post)
        fetch(`http://127.0.0.1:8000/base/editpost/${post.id}`,
        {
            method:'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(post)})
    }

    let handleSubmit=()=>{
        if (obtained.id!=='new'){
            handlePut()
        }else{
            handlePost()
        }
    }
    return(
        <div>
        <div className='postform-container'>
            <form>
                <p></p>

                <label>Topic: </label>
                <select name='topic' value={post?.topic} onChange={(e)=>(setPost(
                        {...post,topic:e.target.value}
                        ))}>
                {topics.map((topic)=>(
                    <option  value={topic.id}>{topic.name}</option>
                ))}
                </select>
                
                <p></p>
                <br/>

                <label>Title:   </label>
                <input type='text' value={post?.name} onChange={(e)=>(setPost({
                    ...post,name:e.target.value}))}></input>
                <p></p>
                <label>Body:  </label>
                <textarea style={{'width':'480px',height:'300px'}} value={post?.description} onChange={(e)=>(setPost({
                    ...post,description:e.target.value}))}></textarea>
                <button onClick={handleSubmit} className='newpost-btn'>POST</button>
            </form>

            <Link to='/'>    
            <button className='back-btn'>Go Back</button>
            </Link>
    </div>
    </div>
    )    
}

export default NewPost