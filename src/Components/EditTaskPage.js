import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../redux/taskSlice';
import { useNavigate, useParams } from 'react-router-dom';
import './EditTask.css'

const EditTaskPage = () => {
  const { id } = useParams();
  const task = useSelector((state) => state.tasks.tasks.find((task) => task.id === parseInt(id)));
  const [status, setStatus] = useState(task?.completed || false);
  const [title, setTitle] = useState(task?.title || ''); // Title ka state manage karne ke liye
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = async () => {
    const updatedTask = { ...task, title, completed: status }; // Title ko include kar rahe hain

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task on the server');
      }

      const data = await response.json();
      dispatch(updateTask(data)); // Redux state update karein API response ke sath
      navigate('/');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className='editTaskContainer'>
      <h1>Edit Task</h1>
      {task ? (
        <>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Completed:
            <input
              type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
          </label>
          <button onClick={handleUpdate}>Update</button>
        </>
      ) : (
        <p>Task not found.</p>
      )}
    </div>
  );
};

export default EditTaskPage;