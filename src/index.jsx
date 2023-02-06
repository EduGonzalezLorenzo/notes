import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './routes/App';
import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';
import CreateNote from './routes/CreateNote';
import MyNotes from './routes/MyNotes';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, //parte fija de la página, por ejemplo el navegador.
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />
      },
      {
        path: "/createNote",
        element: <CreateNote />
      },
      {
        path: "/myNotes",
        element: <MyNotes />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signUp",
        element: <SignUp />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
