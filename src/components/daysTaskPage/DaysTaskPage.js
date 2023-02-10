import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import moment from "moment";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TaskDiv from "../taskDiv/TaskDiv";
import Header from "../header/Header";
import { db } from "../../firebase";
import "./DaysTaskPage.css";

const DaysTaskPage = ({ onTodoSelected }) => {
  const now = moment();
  let daysButtons = [];
  const [todos, setTodos] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [tasksCount, setTasksCount] = useState(0);
  const [showTasks, setShowTasks] = useState();
  const [dateTask, setDateTask] = useState();

  const dataButton = (value) => {
    setDateTask(value);
    let copy = [];
    todos.forEach( (todo) => {
      if (todo.date === value && todo.userId === getAuth().lastNotifiedUid) {
        copy.push(todo);
        setTasks(copy);
      }
      setTasksCount(copy.length);
      if (copy.length === 0) {
        setShowTasks(false);
      } else {
        setShowTasks(true);
      }
    });
  }

  const createDaysButtons = () => {
    for (let i = now.format("DD"); i <= 35; i++) {
      daysButtons.push(
        <div className="buttonsDiv">
          <button
            className="dayDiv"
            onClick={() =>
              dataButton(
                moment(now.startOf("month"), "YYYY-MM-DD")
                  .add("days", +i - 1)
                  .format("YYYY-MM-DD")
              )
            }
          >
            <h3 className="date">
              {moment(now.startOf("month"), "DD-MM-YYYY")
                .add("days", +i - 1)
                .format("ddd")}
              <br />
              {moment(now.startOf("month"), "DD-MM-YYYY")
                .add("days", +i - 1)
                .format("DD")}
            </h3>
          </button>
        </div>
      );
    }
    return daysButtons;
  }

  const fetchPost = async () => {
    await getDocs(collection(db, "todos")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="taskPageDiv">
      <Header />
      <div className="days">{createDaysButtons()}</div>
      <div id="tasks">
        <h1>
          {tasksCount} tasks on {dateTask}
        </h1>
        {tasks.map((element) => (
          <div>
            {showTasks && (
              <TaskDiv
                todoTask={element}
                onClick={onTodoSelected(element.id)}
              />
            )}
          </div>
        ))}
      </div>
      <div className="footer">
        <Button
          variant="outlined"
          startIcon={<AddCircleIcon />}
          className="createTaskButton"
        >
          <Link to="/addTask" className="link">
            Create new task
          </Link>
        </Button>
      </div>
      <Routes>
        <Route path="/addTask" />
      </Routes>
    </div>
  );
};

export default DaysTaskPage;
