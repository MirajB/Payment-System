import React from 'react';
import './styles/styles-custom.css';
import './styles/styles.css';
import HomePage from './pages/Home';
import Pay from './pages/Pay';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PayEMIForm from './components/forms/PayEMIForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/emi',
    element: <PayEMIForm />,
  },
  {
    path: '/pay',
    element: <Pay />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
