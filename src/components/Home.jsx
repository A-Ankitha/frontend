import axios from 'axios'

import React from 'react'
import { IoTrashBinOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

import { useEffect } from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import '../css/Home.css'

export default function Home() {
  const [work, setWork] = useState([])
  const [name, setName] = useState('')
  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
    .then((res) => {
        setWork(res.data)
    })
    .catch((error) => {
        console.log(error)
    })
  },[])

  const deleteUser = async(id) => {
    try {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`)
        setWork(work.filter(ls => ls._id !== ls.id))
    } catch (error) {
        console.log(error)
    }
  }
  const createUser = async() => {
    try {
        const res = await axios.post('https://backend-git-main-a-ankithas-projects.vercel.app/api/tasks', {task:name})
        setWork([...work, res.data])
        
    } catch (error) {
        console.log(error)
    }
  }
   
  return (
    <div className='main'>
      <div className='task'>
        <h2 className='task_manager'>Task Manager</h2>
        <input type="text" placeholder='eg: drink water' value = {name} onChange = {(e) => setName(e.target.value)}/>
        <button onClick = {createUser} className='btn'>create</button>
      </div>
      <div className='list'>
        <ul>
            {work.map((list) => 
            
                <li key = {(list._id)}>
                    <div className='main_container'>
                        <div className='list_container'>{list.task}</div>
                        <div className='right_buttons'>
                            <div>
                           <Link to = {`/edit/${list._id}`}><button className='btn1'><FaRegEdit /></button></Link>
                            </div>
                            <div> <button onClick = {()=>deleteUser(list._id)} className='btn2'><IoTrashBinOutline /></button> </div>
                        </div>
                    </div>
                </li>
            )}
        </ul>
        </div>
       
    </div>
  )
}