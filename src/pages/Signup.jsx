// Signup page: create a new account with email/password using Firebase Auth.

import { useEffect, useState } from "react";
// useState -> form fields and flags; useEffect -> optional redirect if already logged in.

import { createUserWithEmailAndPassword } from "firebase/auth";
// Firebase method to create a new user with email/password.

import { auth } from "../services/firebase";
// Shared Auth instance from your Firebase setup.

import { useNavigate, Link } from "react-router-dom";
// useNavigate -> programmatic navigation after signup; Link -> client-side link to Login.

export default function Signup() {
  // Controlled inputs for the form.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  // UI flags: submitting (to disable button), show password visibility toggle.
  const [submitting, setSubmitting] = useState(false);
  const [showPw, setShowPw] = useState(false);

  // Error message to show a friendly message to the user.
  const [error, setError] = useState("");


  // Router
  const navigate = useNavigate();

  // If user is already logged in, send them to the app (nice UX).
  useEffect(() => {
    if (auth.currentUser) {
      navigate("/app", { replace: true });
    }
  }, [navigate]);

  // Map Firebase error codes to friendlier messages.
  function mapAuthError(err) {
    const code = err?.code || "";
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already in use.";
      case "auth/invalid-email":
        return "Invalid email address.";
      case "auth/weak-password":
        return "Password is too weak.";
      case "auth/operation-not-allowed":
        return "Email/password sign-up is not enabled.";
      default:
        return err?.message || "Signup failed. Please try again.";
    }
  }

  // Handle the signup form submit.
  const handleSignup = async (e) => {
    e.preventDefault();          // Prevent page reload
    setError("");                // Clear previous error

    // Trim inputs to avoid accidental spaces.
    const emailTrim = email.trim();
    const pwTrim = password.trim();
    const confirmTrim = confirmPw.trim();

    // Basic validation on the client.
    if (!emailTrim || !pwTrim || !confirmTrim) {
      setError("Please fill out all fields.");
      return;
    }
    if (pwTrim !== confirmTrim) {
      setError("Passwords do not match.");
      return;
    }
    if (pwTrim.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setSubmitting(true); // Disable the submit button

      // Create the account with Firebase Auth.
      await createUserWithEmailAndPassword(auth, emailTrim, pwTrim);

      // On success, go to the protected app.
      navigate("/app", { replace: true });
    } catch (err) {
      setError(mapAuthError(err)); // Friendly message
    } finally {
      setSubmitting(false); // Re-enable submit button
    }
  };

  return (
    // Full-screen centered container with a light gray background.
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Signup card */}
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded shadow-md w-80"
        noValidate // We'll manage the validation manually.
      >
        {/* Title */}
        <h1 className="text-xl font-bold mb-4">Sign Up</h1>

        {/* Error banner */}
        {error && (
          <p className="text-red-600 text-sm mb-2" role="alert">
            {error}
          </p>
        )}

        {/* Email input */}
        <label className="block text-sm mb-1" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="border p-2 w-full mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        {/* Password input with show/hide */}
        <label className="block text-sm mb-1" htmlFor="password">
          Password
        </label>
        <div className="flex gap-2 mb-1">
          <input
            id="password"
            type={showPw ? "text" : "password"}
            placeholder="At least 8 characters"
            className="border p-2 w-full rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
          <button
            type="button"
            className="px-3 rounded border text-sm"
            onClick={() => setShowPw((v) => !v)}
            aria-pressed={showPw}
          >
            {showPw ? "Hide" : "Show"}
          </button>
        </div>

        {/* Confirm password */}
        <label className="block text-sm mb-1" htmlFor="confirm">
          Confirm password
        </label>
        <input
          id="confirm"
          type={showPw ? "text" : "password"}
          placeholder="Re-type your password"
          className="border p-2 w-full mb-3 rounded"
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
          autoComplete="new-password"
          required
        />

        {/* Submit button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-60"
        >
          {submitting ? "Creating account..." : "Sign Up"}
        </button>

        {/* Link to Login */}
        <p className="mt-3 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
