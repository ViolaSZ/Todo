import React from "react";
import { Route, Routes } from "react-router-dom";
import LogInPage from "./components/logInPage/LogInPage";
import RegisterPage from "./components/registerPage/RegisterPage";
import DaysTaskPage from "./components/daysTaskPage/DaysTaskPage";
import TaskPage from "./components/taskPage/TaskPage";
import TaskDiv from "./components/taskDiv/TaskDiv";
import { AuthContextProvider } from "./context/AuthContext";
import AddTaskPage from "./components/addTaskPage/AddTaskPage";
import "./App.css";

const App = () => {
  const selectedTodo = (data) => {
    return data;
  }

  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route exact path="/" element={<LogInPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route
            exact
            path="/daystask"
            element={<DaysTaskPage onTodoSelected={selectedTodo} />}
          />
          <Route exact path="/task" element={<TaskPage />} />
          <Route exact path="/currentTask" element={<TaskDiv />} />
          <Route exact path="/addTask/*" element={<AddTaskPage />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
};

export default App;
