import React from 'react';
import { Route, Routes,Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import {UserAuth} from '../context/AuthContext';

//export class RegisterPage extends Component {
const RegisterPage = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const navigate = useNavigate();

  const {createUser} = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try{
      await createUser(email,password);
      navigate('/daystask');
    } catch (e){
      setError(e.message);
      alert(e.message);
    }
  }

      return(    
        <div className='login'>
            <form onSubmit={handleSubmit}>
              <h1>Log Up</h1> 
              <div>
                <label>Email </label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" />
              </div>
              <div>
                <label>Password </label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" />
              </div>
              <button>Create</button>
            </form>
            <div>
                <span>Have an account?</span>
                <Link to="/">Log In</Link>
            </div>
            <Routes>
              <Route path="/" />
            </Routes>
        </div>
      )
}

export default RegisterPage;