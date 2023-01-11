import React from 'react';
import { Route, Routes,Link, useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react";
import {UserAuth} from '../context/AuthContext';
import { useURLParams } from '../customHooks/useURLParams';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { doc, updateDoc,deleteDoc } from "firebase/firestore";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import DoneIcon from '@mui/icons-material/Done';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import '../styles/TaskPage.css';

const TaskPage = () => {
      let query = useURLParams();
      const [todos, setTodos] = useState([]);
      var [tasks,setTasks] = useState([]);
      const [onShowUpdateForm, setOnShowUpdateForm] = useState(false);
      var task = {};

      const fetchPost = async () => {
            
      await getDocs(collection(db, "todos"))
            .then((querySnapshot)=>{              
                  const newData = querySnapshot.docs
                  .map((doc) => ({...doc.data(), id:doc.id }));
                  setTodos(newData);             
            })
      }

      useEffect(()=>{
            fetchPost();
      }, [])

      const handleSetStatusDone = async () => {
            const docRef = doc(db, "todos", query.get("id"));
            const data = {
                  status: "done"
            };
            updateDoc(docRef, data)
                  .then(docRef => {
                        console.log("A New Document Field has been added to an existing document");
                  })
                  .catch(error => {
                        console.log(error);
                  })
      }

      const handleUpdateTask = async () => {
            const docRef = doc(db, "todos", query.get("id"));
            console.log('check ' + todo + ' ' + description);
            const data = {
                  todo: todo,
                  description: description
            };
            updateDoc(docRef, data)
                  .then(docRef => {
                        console.log("A New Document Field has been added to an existing document");
                  })
                  .catch(error => {
                        console.log(error);
                  })
            setOnShowUpdateForm();
      }

      const navigate = useNavigate();
      const [taskName,setTaskName] = useState('');
      const [error,setError] = useState('');

      const handleDeletingTask = async (id) => {
            try{
                  await deleteDoc(doc(db, "todos", id));
                  navigate('/daystask');
              } catch (e){
                  setError(e.message);
                  alert('error');
              }
      }

      function findTodo(value){
            todos.forEach(function(todo,i){
                  if (todo.id==value){
                        task = todo;
                  }
            })
      }
      findTodo(query.get("id"));
      console.log('Task ' + task.todo + ' ' + task.description);
      const [todo, setTodo] = useState(task.todo);
      const [description, setDescription] = useState(task.description);
      console.log('todo ' + todo + ' ' + description);
      const [editedTask, setEditedTask] = useState({task});
      console.log(editedTask);

      return(  
              
        <div>
              {!onShowUpdateForm &&
                  <div>
                        <h1>{task.todo}</h1>
                        <div className='descriptionDiv'>
                              <p><b>{task.description}</b></p>
                        </div>
                        </div>
                  }    
              <div>
                  {onShowUpdateForm && 
                        <div>
                        <h1>Task</h1>
                      <div>
                        <label>New Task</label>
                        <input defaultValue={editedTask.todo} onChange={(e) => setTodo(e.target.value)} />
                      </div>
                      <div>
                        <label>Description</label>
                        <input defaultValue={editedTask.description} onChange={(e) => setDescription(e.target.value)} />
                      </div>
                      <button onClick={() => handleUpdateTask()}>Set changes</button>
                    </div>
                  }
                  <Button variant="outlined" startIcon={<UpdateIcon />} onClick={() => {setOnShowUpdateForm(!onShowUpdateForm);setEditedTask(task)}}>
                        Update
                  </Button>
                  <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDeletingTask(query.get("id"))}>
                        Delete
                  </Button>
                  <Button variant="outlined" startIcon={<DoneIcon />} onClick={() => handleSetStatusDone()}>
                        Done
                  </Button>
              </div>
              <div className='footer'>
                  <Button variant="outlined" startIcon={<ArrowBackIcon />} className="backButton">
                        <Link to='/daystask'>Back</Link>
                  </Button>
              </div>
        </div>
      )
}
export default TaskPage;