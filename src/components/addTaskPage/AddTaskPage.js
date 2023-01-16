import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import "./AddTaskPage.css";

const AddTaskPage = () => {
  const [todo, setTodo] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  let formRef = React.createRef();

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        todo,
        description,
        date,
        userId: getAuth().lastNotifiedUid,
        status: "progress",
      });
    } catch (e) {
      alert("Something goes wrong");
    }
    formRef.reset();
  };
  return (
    <div className="addTaskForm">
      <form onSubmit={addTodo} ref={(form) => formRef = form}>
        <h1>Task</h1>
        <div>
          <label>New Task</label>
          <input onChange={(e) => setTodo(e.target.value)} />
        </div>
        <div>
          <label>Description</label>
          <input onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Date</label>
          <input onChange={(e) => setDate(e.target.value)} type="date" />
        </div>
        <button>Add</button>
      </form>
      <button>
        <Link to="/daysTask">See my tasks</Link>
      </button>
      <Routes>
        <Route path="/daystask" />
      </Routes>
    </div>
  );
};

export default AddTaskPage;
