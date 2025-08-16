// [AR] هذا الملف يحتوي صفحة تسجيل الدخول (Login) للمستخدم.
// This file defines the Login page for the user.

import { useState } from "react";
// [AR] نستورد useState لإنشاء حالات محلية لحفظ قيمة البريد/الرقم السري والخطأ.
//Import useState to create local state for email/password and error.

import { signInWithEmailAndPassword } from "firebase/auth";
// [AR] دالة من Firebase لعملية تسجيل الدخول بالبريد وكلمة المرور.
//Firebase function to sign in with email and password.

import { auth } from "../services/firebase";
// [AR] كائن المصادقة الذي أنشأناه في تهيئة Firebase.
//The auth instance we exported from our Firebase setup.

import { useNavigate, Link } from "react-router-dom";
// [AR] useNavigate للتنقل البرمجي بعد تسجيل الدخول، و Link لروابط صفحات أخرى.
//useNavigate for programmatic navigation after login, Link for page links.

export default function Login() {
// [AR] نعرّف مكوّن صفحة تسجيل الدخول.
//Define the Login page component.

  const [email, setEmail] = useState("");
  // [AR] حالة لحفظ البريد الإلكتروني الذي يكتبه المستخدم.
// State to store the email entered by the user.

  const [password, setPassword] = useState("");
  // [AR] حالة لحفظ كلمة المرور.
// State to store the password.

  const [error, setError] = useState("");
  // [AR] حالة لعرض رسالة خطأ إن فشلت عملية تسجيل الدخول.
//State to display an error message if sign-in fails.

  const navigate = useNavigate();
  // [AR] هوك يتيح لنا الانتقال إلى مسار آخر (مثلاً /app) بعد تسجيل الدخول.
//Hook that lets us navigate to another route (e.g., /app) after login.

  const handleLogin = async (e) => {
  // [AR] دالة تُنادى عند إرسال النموذج (Submit).
  //Function called when the form is submitted.

    e.preventDefault();
    // [AR] نمنع المتصفّح من إعادة تحميل الصفحة الافتراضية للنموذج.
    //Prevent the browser’s default form submit (page reload).

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // [AR] نحاول تسجيل الدخول عبر Firebase باستخدام البريد وكلمة المرور من الحالات.
      //Attempt to sign in via Firebase using the email/password from state.

      navigate("/app");
      // [AR] إذا نجح تسجيل الدخول، انتقل إلى لوحة التحكم (المسار المحمي).
      //If sign-in succeeds, navigate to the dashboard (protected route).
    } catch (err) {
      setError(err.message);
      // [AR] إذا حدث خطأ، خزّن رسالة الخطأ لعرضها للمستخدم.
      //If an error occurs, store its message to show to the user.
    }
  };

  return (
    // [AR] نرجع واجهة JSX لصفحة تسجيل الدخول.
    // Return the JSX UI for the login page.

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* 
        [AR] حاوية ملء الشاشة بارتفاع أدنى كامل، مركزة عموديًا وأفقيًا، بخلفية رمادية فاتحة.
        [EN]  Full-height container centered both vertically and horizontally with a light gray background.
      */}

      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        {/*
          [AR] نموذج تسجيل الدخول:
          - onSubmit: يستدعي handleLogin عند الضغط على زر "Login".
          - className: خلفية بيضاء، حواف مستديرة، ظل، عرض ثابت مناسب للهاتف.
          Login form:
          - onSubmit: calls handleLogin when "Login" is pressed.
          - className: white background, rounded corners, shadow, fixed narrow width (mobile-friendly).
        */}

        <h1 className="text-xl font-bold mb-4">Login</h1>
        {/*
          [AR] عنوان الصفحة بحجم كبير وخط عريض مع مسافة سفلية.
         Page title with larger, bold text and bottom margin.
        */}

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {/*
          [AR] إذا وُجدت رسالة خطأ في الحالة، نعرضها كنص أحمر صغير.
           If there's an error message in state, display it as small red text.
        */}

        {/* 
          [AR] حقل البريد الإلكتروني:
          - type="email": يتحقق من صيغة البريد.
          - placeholder: نص إرشادي داخل الحقل.
          - className: حدود وبادينغ وعرض كامل ومسافة سفلية.
          - value/onChange: ربط الحقل بحالة email.
          [EN] Email input:
          - type="email": basic email format validation.
          - placeholder: hint text inside the input.
          - className: border, padding, full width, bottom margin.
          - value/onChange: bind input to the email state.
        */}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* 
          [AR] حقل كلمة المرور:
          - type="password": يخفي الأحرف.
          - ربط بالقيمة والحركة لتحديث حالة password.
          [EN] Password input:
          - type="password": masks characters.
          - bound to value/onChange to update the password state.
        */}
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 
          [AR] زر إرسال النموذج:
          - type="submit": يفعّل onSubmit في <form>.
          - تنسيقات Tailwind: عرض كامل، خلفية زرقاء، نص أبيض، حواف مستديرة.
          [EN] Submit button:
          - type="submit": triggers the form's onSubmit.
          - Tailwind styles: full width, blue background, white text, rounded corners.
        */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>

        {/* 
          [AR] رابط للتوجيه إلى صفحة إنشاء حساب إذا لم يكن لدى المستخدم حساب:
          - نستخدم <Link> لتوجيه React Router بدون إعادة تحميل الصفحة.
          [EN] Link to go to the signup page if the user has no account:
          - Use <Link> for client-side navigation without full page reload.
        */}
        <p className="mt-2 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
