import React from "react";
import {  useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { UserAuth } from "../../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      alert("Logged out");
    } catch (e) {
      alert('Something goes wrong');
    }
  };

  return (
    <header>
      <h1>Tassker</h1>
      <div className="headerRight">
        <h3 className="userName">User: {user && user.email}</h3>
        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          className="logOutButton"
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
