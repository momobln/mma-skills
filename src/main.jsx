// Import React (needed for JSX and some dev tooling).
import React from "react";

// Import the modern root API to mount the React app.
import ReactDOM from "react-dom/client";

// Import routing primitives: BrowserRouter provides history; Routes groups Route entries; Route maps a path to an element.
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import the app-wide AuthProvider, so children can read user/loading and call login/logout.
import { AuthProvider } from "./hooks/AuthContext";

// Import route components.
import App from "./App";               // Public landing page at "/"
import Login from "./pages/Login";     // "/login"
import Signup from "./pages/Signup";   // "/signup"
import Dashboard from "./pages/Dashboard"; // Protected page at "/app"

// Import the guard that redirects unauthenticated users to "/login".
import ProtectedRoute from "./routes/ProtectedRoute";

// Global styles (Tailwind directives + your custom CSS).
import "./index.css";

// Create a root under the <div id="root"> in public/index.html and render the app tree.
ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode helps catch potential problems during development (runs some lifecycles twice in dev).
  <React.StrictMode>
    {/* Provide real browser history (clean URLs like /login, /app). */}
    <BrowserRouter>
      {/* Make auth state available to the whole component tree. */}
      <AuthProvider>
        {/* Define all route mappings here. */}
        <Routes>
          {/* When URL is exactly "/", render <App /> */}
          <Route path="/" element={<App />} />

          {/* Public auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected area: only render <Dashboard /> if <ProtectedRoute> says user is logged in. */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
