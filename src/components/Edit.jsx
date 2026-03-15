import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../css/Home.css'
const API = "https://backend-taupe-eight-57.vercel.app/api/v1";

export default function Edit() {
    const navigate = useNavigate()
    const {id} = useParams()
    console.log(id)
    const[name, setName] = useState('')
    useEffect(() => {
        axios.get(`${API}/${id}`)
        .then((res) => {
            setName(res.data.task)
            console.log(name)
        })
        .catch((error) =>
        {
            console.log(error)
        })
    },[])

    const updateUser = async() => {
        try {
            await axios.put(`${API}/${id}`, { task: name })
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='main'>
    <div className='task'>
        <h2 className='task_manager'>Edit the task</h2>
        <input type="text" value = {name} onChange={(e) => setName(e.target.value)} />
        <button onClick = {updateUser} className = 'btn'>update</button>
        </div>
    </div>
  )
}