import React from 'react';
import { Route, Routes,Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { doc, updateDoc,deleteDoc } from "firebase/firestore";
import { useState } from "react";
import {UserAuth} from '../context/AuthContext';
import { useURLParams } from '../customHooks/useURLParams';
import '../styles/TaskDiv.css';

const TaskDiv = ({todoTask}) => {
      const [checked, setChecked] = React.useState(todoTask.status == 'done');
      let query = useURLParams();

      const handleChange = () => {
            setChecked(!checked);
            console.log('id ' + todoTask.id);
            const docRef = doc(db, "todos", todoTask.id);
            console.log((!checked).toString());
            let data = {};
            if (!checked == true){
                 data = {
                  status: "done"
                 }; 
            } else {
                  data = {
                    status: "progress"
                  }; 
            }
            updateDoc(docRef, data)
                  .then(docRef => {
                        console.log("A New Document Field has been added to an existing document");
                  })
                  .catch(error => {
                        console.log(error);
                  })
      };
      return(    
        <div className='divForTaskName'> 
            <label className='taskName'>
                  <input type='checkbox' className='check' checked={checked} onChange={handleChange}/>
                  <h1><Link to={`/task?id=${todoTask.id}`} className='link'>{todoTask.todo}</Link></h1> 
            </label>   
        </div>
      )
}

export default TaskDiv;