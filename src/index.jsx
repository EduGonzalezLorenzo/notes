import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './routes/Main';
import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';
import CreateNote from './routes/CreateNote';
import MyNotes from './routes/MyNotes';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import CreateVoiceNote from './routes/CreateVoiceNote';
import Note from './routes/Note';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, //parte fija de la página, por ejemplo el navegador.
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Main />
      },
      {
        path: "/createNote",
        element: <CreateNote />
      },
      {
        path: "/createVoiceNote",
        element: <CreateVoiceNote />
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
      },
      {
        path: "/note/:id",
        element: <Note />
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
