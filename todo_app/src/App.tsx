import React, { ReactNode } from 'react';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Todo from './components/todo/Todo';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signin' element={<Login />} />
      <Route path='/' element={<Register />} />
      <Route path='/todo' element={<Todo />} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;