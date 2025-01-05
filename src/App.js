import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import AddTaskPage from './Components/AddTaskPage';
import EditTaskPage from './Components/EditTaskPage';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      {/* <Router> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTaskPage />} />
          <Route path="/edit/:id" element={<EditTaskPage />} />
        </Routes>
      {/* </Router> */}
    </Provider>
  );
};

export default App;