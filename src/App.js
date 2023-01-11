import './App.css';
import React from 'react';
import LogInPage from './components/LogInPage';
import RegisterPage from './components/RegisterPage';
import DaysTaskPage from './components/DaysTaskPage';
import TaskPage from './components/TaskPage';
import TaskDiv from './components/TaskDiv';
// import {handleSubmit} from './handleSubmit.js';
import { Route, Routes} from "react-router-dom";
// import { useRef } from 'react';
import { AuthContextProvider } from './context/AuthContext';
import { useState } from "react";
import AddTaskPage from './components/AddTaskPage';

function App() {
  console.log('log '+process.env.REACT_APP_apiKey);
  var name = "";
  function selectedTodo(data){
    console.log(data);
  }

  return (
    <div className="App">
        <AuthContextProvider>
          <Routes>
            <Route exact path="/" element={<LogInPage/>} />
            <Route exact path="/register" element={<RegisterPage/>} />
            <Route exact path="/daystask" element={<DaysTaskPage onTodoSelected={selectedTodo}/>} />
            <Route exact path="/task" element={<TaskPage name={name}/>} />
            <Route exact path="/currentTask" element={<TaskDiv/>} />
            <Route exact path="/addTask/*" element={<AddTaskPage/>} />
          </Routes>
        </AuthContextProvider>
    </div>
  );
}

export default App;
