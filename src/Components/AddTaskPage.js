import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';
import { useNavigate } from 'react-router-dom';
import './AddTask.css'

const AddTaskPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    dispatch(addTask({ id: Date.now(), title, description, completed: false }));
    navigate('/');

    const newTask = { title, description, completed: false };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      const data = await response.json();
      dispatch(addTask(data)); // Redux state mein add karein
      navigate('/');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };


  return (
    <div className='addContainer'>
      <h1>Add Task</h1>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};

export default AddTaskPage;