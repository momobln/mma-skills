// Import the Link component for client-side navigation (no full page reload).
import { Link } from "react-router-dom";

// Export a default React component named 'App' so the router can render it at "/".
export default function App() {
  // This component renders the landing page with navigation links.
  return (
    // Full-height container that centers content both horizontally and vertically.
    <div className="min-h-screen flex items-center justify-center">
      {/* Inner wrapper with centered text and vertical spacing between children. */}
      <div className="text-center space-y-4">
        {/* Main title for the app. */}
        <h1 className="text-3xl font-bold">MMA Skills Tracker</h1>

        {/* Short, muted description under the title. */}
        <p className="text-gray-600">
          Track your striking, grappling, and conditioning progress.
        </p>

        {/* Horizontal button row for Login and Signup actions. */}
        <div className="flex gap-3 justify-center">
          {/* Link to the Login page (client-side route). */}
          <Link to="/login" className="px-4 py-2 rounded bg-blue-600 text-white">
            Login
          </Link>

          {/* Link to the Signup page (client-side route). */}
          <Link to="/signup" className="px-4 py-2 rounded border">
            Sign Up
          </Link>
        </div>

        {/* Hint to a protected route (requires auth). */}
        <p className="text-sm text-gray-500">or go to your app (protected):</p>

        {/* Link to the protected dashboard route; will be guarded by <ProtectedRoute/>. */}
        <Link to="/app" className="underline text-sm text-blue-600">
          Open Dashboard
        </Link>
      </div>
    </div>
  );
}
