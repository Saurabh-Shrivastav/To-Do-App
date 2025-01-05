import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../redux/taskSlice';
import { Link } from 'react-router-dom';
import './Home.css'

const HomePage = () => {
  const dispatch = useDispatch();
  const { tasks, status } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchTasks());
  }, [status, dispatch]);

  return (
    <div className='homeContainer'>
      <h1>Task List</h1>
      {status === 'loading' && <p>Loading...</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.completed ? 'Completed' : 'Pending..'}</p>
            <Link to={`/edit/${task.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
      <Link to="/add">Add Task</Link>
    </div>
  );
};

export default HomePage;