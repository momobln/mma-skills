import { Navigate } from 'react-router-dom'; //Import the Navigate component from react-router-dom to redirect the user to another page.
import { useAuth } from '../hooks/AuthContext';//Import the custom hook useAuth from AuthContext to get the current user's data and loading state

export default function ProtectedRoute({ children }) { // Define a component named ProtectedRoute that takes children (the components/pages we want to protect).

  const { user, loading } = useAuth();// Use the useAuth hook to get user (the current user) and loading (whether we’re still checking login state).
  if (loading) return <div>Loading...</div>;// If still loading (loading = true), display "Loading..." and don't show any other page until check finishes.
  return user ? children : <Navigate to="/login" replace />; //  If there's a logged-in user (user exists) → show the requested page (children),
  //      otherwise → redirect to /login using Navigate.
}
