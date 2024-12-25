import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './layout';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import Protected from './routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
      <Route element={<Protected />}>
        <Route index element={<Home />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
  </Route>
))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);