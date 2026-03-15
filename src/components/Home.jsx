import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoTrashBinOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import '../css/Home.css';

const API = "https://backend-taupe-eight-57.vercel.app/api/v1";

export default function Home() {
  const [work, setWork] = useState([]);
  const [name, setName] = useState('');

  const fetchTasks = () => {
    axios.get(API).then(res => setWork(res.data)).catch(err => console.log(err));
  };

  useEffect(() => { fetchTasks(); }, []);

  const createUser = async () => {
    if (!name) return;
    try {
      const res = await axios.post(API, { task: name });
      setWork([...work, res.data]);
      setName(''); 
    } catch (err) { console.log(err); }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setWork(work.filter(item => item._id !== id));
    } catch (err) { console.log(err); }
  };

  return (
    <div className='main'>
      <div className='task-card'>
        <h2 className='task_manager'>Task Manager</h2>
        <div className="input_container">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="eg: drink water"/>
          <button onClick={createUser} className='btn-create'>Create</button>
        </div>
      </div>
      <div className='list-area'>
        {work.map((item) => (
          <div key={item._id} className='main_container'>
            <div className='list_container'>{item.task}</div>
            <div className='right_buttons'>
              <Link to={`/edit/${item._id}`}><button className='btn-edit'><FaRegEdit /></button></Link>
              <button onClick={() => deleteUser(item._id)} className='btn-delete'><IoTrashBinOutline /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}