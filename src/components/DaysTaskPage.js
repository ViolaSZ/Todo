import React, { useState, useEffect} from 'react';
import ReactDOM, { render } from 'react-dom';
import { Route, Routes, useNavigate, Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import moment from 'moment';
import '../styles/DaysTaskPage.css';
import TaskDiv from './TaskDiv';
import Header from './Header';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const DaysTaskPage = ({onTodoSelected}) => {
  var [tasks,setTasks] = useState([]);
  var [tasksCount,setTasksCount] = useState(0);
  var [showTasks,setShowTasks] = useState();
  var [dateTask,setDateTask] = useState();

  function dataButton(value){
    tasks = [];
    setDateTask(value);
    let copy = Object.assign([], tasks);
    todos.forEach(function(todo,i){
      if (todo.date == value && todo.userId == getAuth().lastNotifiedUid){
        copy.push(todo);
        setTasks(copy);
      }
      setTasksCount(copy.length);
      if (copy.length == 0){
        setShowTasks(false);
      } else {
        setShowTasks(true);
      }
    })
  }

  const now = moment();
  var daysButtons = [];
  for (let i = now.format('DD'); i <= 35; i++){
    daysButtons.push(<div className='buttonsDiv'><button className='dayDiv' onClick={() => dataButton(moment(now.startOf('month'), "YYYY-MM-DD").add('days', +i-1).format('YYYY-MM-DD'))}><h3 className='date'>{moment(now.startOf('month'), "DD-MM-YYYY").add('days', +i-1).format('ddd')}<br/>{moment(now.startOf('month'), "DD-MM-YYYY").add('days', +i-1).format('DD')}</h3></button></div>);
  }

  const [todos, setTodos] = useState([]);

  const fetchPost = async () => {
       
    await getDocs(collection(db, "todos"))
        .then((querySnapshot)=>{              
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            setTodos(newData);
        })
  }

  useEffect(()=>{
      fetchPost();
  }, [])

      return(
        <div className='taskPageDiv'>
          <Header/>
          
            <div className='days'>
              {daysButtons}
            </div>
            <div id='tasks'>
              <h1>{tasksCount} tasks on {dateTask}</h1>
              {tasks.map(element => 
              <div>
                {showTasks && <TaskDiv todoTask={element} onClick={onTodoSelected(element.id)}/>}
              </div>
              )}
            </div>
            <div className='footer'>
                <Button variant="outlined" startIcon={<AddCircleIcon />} className="createTaskButton">
                  <Link to="/addTask" className='link'>Create new task</Link>
                </Button>
            </div>
            <Routes>
              <Route path="/addTask" />
            </Routes>
        </div>
      )
}

export default DaysTaskPage;