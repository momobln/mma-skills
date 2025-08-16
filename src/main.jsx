//  This is the entry file that mounts React to the HTML page and sets up routing and the auth context.
import React from 'react'; //Import React to use JSX and components.
import ReactDOM from 'react-dom/client'; //Import createRoot from ReactDOM to mount the app into the DOM.
import { BrowserRouter, Routes, Route } from 'react-router-dom';//Import routing tools: BrowserRouter, Routes container, and Route to define paths.

import { AuthProvider } from './hooks/AuthContext';//Import the AuthProvider to share user auth state across the entire app.
import App from './App';//The base component (public landing page before login).
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard'; //protected—visible only when logged in.

import ProtectedRoute from './routes/ProtectedRoute';//A wrapper component that blocks access if the user is not logged in.
import './index.css';// loads Tailwind and any custom CSS.

ReactDOM.createRoot(document.getElementById('root')).render(//Create a React root inside the element with id 'root' in index.html, then render the app.
  <React.StrictMode>
    <BrowserRouter>    //Enables routing using the browser history (real URLs like /login and /app).
      <AuthProvider>//Wraps the entire app with the auth context so any component can read user/loading/logout.
        <Routes> //Container that holds all route definitions. Inside it we put a Route per path/element.
          <Route path="/" element={<App />} /> //When the URL is "/", render the App component (public page).
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/app"
            element={
              <ProtectedRoute> //If the user is logged in: show Dashboard; else ProtectedRoute redirects to /login.
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
