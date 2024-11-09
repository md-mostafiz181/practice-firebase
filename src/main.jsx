import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'



import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './layout/Root';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Email_Pass from './components/Email_Pass/Email_Pass';
import SignUp from './components/SignUp/SignUp';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/g_g",
        element:<Login></Login>
      },
      {
        path: "/email_pass",
        element: <Email_Pass></Email_Pass>
      },
      {
        path:"/signUp",
        element:<SignUp></SignUp>
      }
    ]
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
