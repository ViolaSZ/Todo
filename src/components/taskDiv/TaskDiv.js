import React from "react";
import { Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./TaskDiv.css";

const TaskDiv = ({ todoTask }) => {
  const [checked, setChecked] = React.useState(todoTask.status === "done");

  const handleChange = () => {
    setChecked(!checked);
    const docRef = doc(db, "todos", todoTask.id);
    let data = {};
    if (!checked === true) {
      data = {
        status: "done",
      };
    } else {
      data = {
        status: "progress",
      };
    }
    updateDoc(docRef, data)
      .catch((error) => {
        alert('Something goes wrong');
      });
  };
  
  return (
    <div className="divForTaskName">
      <label className="taskName">
        <input
          type="checkbox"
          className="check"
          checked={checked}
          onChange={handleChange}
        />
        <h1>
          <Link to={`/task?id=${todoTask.id}`} className="link">
            {todoTask.todo}
          </Link>
        </h1>
      </label>
    </div>
  );
};

export default TaskDiv;
