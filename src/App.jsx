/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App */


// [AR] هذه صفحة الهبوط الرئيسية. نضع روابط للّوجين والتسجيل.
// [EN] This is the landing page. We add links to Login and Signup.

import { Link } from "react-router-dom"; 
// [AR] Link للتنقل بدون إعادة تحميل الصفحة.
// [EN] Link enables client-side navigation without full reload.

export default function App() {
  // [AR] المكوّن الرئيسي الذي يُعرض على المسار "/".
  // [EN] The main component rendered at path "/".
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* [AR] حاوية وسط الشاشة. */}
      {/* [EN] Centered container. */}

      <div className="text-center space-y-4">
        {/* [AR] محتوى مركّز مع تباعد عمودي. */}
        {/* [EN] Centered content with vertical spacing. */}

        <h1 className="text-3xl font-bold">MMA Skills Tracker</h1>
        {/* [AR] عنوان التطبيق. */}
        {/* [EN] App title. */}

        <p className="text-gray-600">
          {/* [AR] وصف قصير. */}
          {/* [EN] Short description. */}
          Track your striking, grappling, and conditioning progress.
        </p>

        <div className="flex gap-3 justify-center">
          {/* [AR] أزرار الانتقال للّوجين والتسجيل. */}
          {/* [EN] Buttons to go to login and signup. */}
          <Link to="/login" className="px-4 py-2 rounded bg-blue-600 text-white">
            {/* [AR] زر تسجيل الدخول. */}
            {/* [EN] Login button. */}
            Login
          </Link>

          <Link to="/signup" className="px-4 py-2 rounded border">
            {/* [AR] زر إنشاء حساب. */}
            {/* [EN] Signup button. */}
            Sign Up
          </Link>
        </div>

        <p className="text-sm text-gray-500">or go to your app (protected):</p>
        <Link to="/app" className="underline text-sm text-blue-600">
          {/* [AR] رابط للوحة التحكم (محمية). */}
          {/* [EN] Link to the protected dashboard. */}
          Open Dashboard
        </Link>
      </div>
    </div>
  );
}


