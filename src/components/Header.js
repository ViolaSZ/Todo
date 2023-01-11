import React from 'react';
import { Route, Routes,Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import {UserAuth} from '../context/AuthContext';
import { useURLParams } from '../customHooks/useURLParams';
import '../styles/Header.css';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';

const Header = () => {

    const {user, logout} = UserAuth();
    const navigate = useNavigate();

    const handleLogout = async () =>{
        try{
          await logout();
          navigate('/');
          alert('Logged out');
        } catch (e) {
          alert(e.message);
        }
      }

      return(    
        <header>
            <h1>Tassker</h1>
            <div className='headerRight'>
              <h3 className='userName'>User: {user && user.email}</h3>
              <Button variant="outlined" startIcon={<LogoutIcon />} onClick={handleLogout} className='logOutButton'>
              Logout
                </Button>
            </div>
          </header>
      )
}

export default Header;