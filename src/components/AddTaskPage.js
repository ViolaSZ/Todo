import React, { useState, useEffect} from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import '../styles/DaysTaskPage.css';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const AddTaskPage = () => {
    const [todo, setTodo] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
     
    const addTodo = async (e) => {
      e.preventDefault();  
      try {
          const docRef = await addDoc(collection(db, "todos"), {
            todo: todo,
            description: description,
            date: date,
            userId: getAuth().lastNotifiedUid,
            status: "progress",
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      document.getElementById("taskForm").reset();
    }
      return(
        <div className='login'>            
            <form onSubmit={addTodo} id="taskForm">
                <h1>Task</h1>
              <div>
                <label>New Task</label>
                <input onChange={(e) => setTodo(e.target.value)}/>
              </div>
              <div>
                <label>Description</label>
                <input onChange={(e) => setDescription(e.target.value)}/>
              </div>
              <div>
                <label>Date</label>
                <input onChange={(e) => setDate(e.target.value)} type="date"/>
              </div>
              <button>Add</button>
            </form>
            <button><Link to="/daysTask">See my tasks</Link></button>
            <Routes>
              <Route path="/daystask" />
            </Routes>
        </div>
      )  
}

export default AddTaskPage;