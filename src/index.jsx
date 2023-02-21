import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './routes/Main';
import Navigation from './routes/Navigation';
import ErrorPage from './routes/ErrorPage';
import CreateNote from './routes/CreateNote';
import MyNotes from './routes/MyNotes';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import CreateVoiceNote from './routes/CreateVoiceNote';
import Note from './routes/Note';
import Settigns from './routes/updateUser';
import reportWebVitals from './reportWebVitals';
import Update from './routes/UpdateNote'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
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
        element: <Login/>
      },
      {
        path: "/signUp",
        element: <SignUp />
      },
      {
        path: "/note/:id",
        element: <Note />
      },
      {
        path: "/update/:id",
        element: <Update />
      },
      {
        path: "/settigns",
        element: <Settigns />
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
