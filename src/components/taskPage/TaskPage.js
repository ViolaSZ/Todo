import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import DoneIcon from "@mui/icons-material/Done";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import Button from "@mui/material/Button";
import { useURLParams } from "../../hooks/UseURLParams";
import { db } from "../../firebase";
import "./TaskPage.css";

const TaskPage = () => {
  let query = useURLParams();
  let task = {};
  let changeDescription = React.createRef();
  let changeTodo = React.createRef();
  const [todos, setTodos] = useState([]);
  const [onShowUpdateForm, setOnShowUpdateForm] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [todo, setTodo] = useState(task.todo);
  const [description, setDescription] = useState(task.description);
  const [editedTask, setEditedTask] = useState({ task });

  const fetchPost = async () => {
    await getDocs(collection(db, "todos")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(newData);
    });
  };

  const handleSetStatusDone = async () => {
    const docRef = doc(db, "todos", query.get("id"));
    const data = {
      status: "done",
    };
    updateDoc(docRef, data).catch((error) => {
      alert("Something goes wrong");
    });
  };

  const handleUpdateTask = async () => {
    if (description === undefined) {
      setDescription(changeDescription.current.value);
    }
    if (todo === undefined) {
      setTodo(changeTodo.current.value);
    }
    const docRef = doc(db, "todos", query.get("id"));
    const data = {
      todo,
      description,
    };
    console.log(data);
    updateDoc(docRef, data).catch((error) => {
      alert("Something goes wrong");
    });
    setOnShowUpdateForm();
  };

  const reloadPage = (time) => {
    setTimeout(() => {
      window.location.reload();
    }, time);
  };

  const handleDeletingTask = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      navigate("/daystask");
    } catch (e) {
      setError(e.message);
      alert("error");
    }
  };

  const findTodo = (value) => {
    todos.forEach(function (todo, i) {
      if (todo.id === value) {
        task = todo;
      }
    });
  };
  findTodo(query.get("id"));

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div>
      {!onShowUpdateForm && (
        <div>
          <h1>{task.todo}</h1>
          <div className="descriptionDiv">
            <p>
              <b>{task.description}</b>
            </p>
          </div>
        </div>
      )}
      <div>
        {onShowUpdateForm && (
          <div>
            <h1>Task</h1>
            <div>
              <label>New Task</label>
              <input
                defaultValue={editedTask.todo}
                onChange={(e) => setTodo(e.target.value)}
                ref={changeTodo}
              />
            </div>
            <div>
              <label>Description</label>
              <input
                defaultValue={editedTask.description}
                onChange={(e) => setDescription(e.target.value)}
                ref={changeDescription}
              />
            </div>
            <Button
              variant="outlined"
              startIcon={<PublishedWithChangesIcon />}
              onClick={() => {
                handleUpdateTask();
                reloadPage(1000);
              }}
            >
              Set changes
            </Button>
          </div>
        )}
        <Button
          variant="outlined"
          startIcon={<UpdateIcon />}
          onClick={() => {
            setOnShowUpdateForm(!onShowUpdateForm);
            setEditedTask(task);
          }}
        >
          Update
        </Button>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => handleDeletingTask(query.get("id"))}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          startIcon={<DoneIcon />}
          onClick={() => handleSetStatusDone()}
        >
          Done
        </Button>
      </div>
      <div className="footer">
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          className="backButton"
        >
          <Link to="/daystask">Back</Link>
        </Button>
      </div>
    </div>
  );
};
export default TaskPage;
