import React, { useState } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import RegisterPage from "../registerPage/RegisterPage";
import { UserAuth } from "../../context/AuthContext";
import "./LogInPage.css";

const LogInPage = () => {
  const { logIn } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      alert("logged in");
      navigate("/daystask");
    } catch (e) {
      setError(e.message);
      alert("error");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <div>
          <label>Email </label>
          <input onChange={(e) => setEmail(e.target.value)} type="email" />
        </div>
        <div>
          <label>Password </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <button>Log In</button>
      </form>
      <div>
        <span>Need an account?</span>
        <Link to="/register">Create an account</Link>
      </div>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default LogInPage;
