
// [AR] هذا الملف يعرّف صفحة "إنشاء حساب جديد" للمستخدم.
// [EN] This file defines the "Sign Up" page for creating a new user account.

import { useState } from "react";
// [AR] نستخدم useState لإنشاء حالات محلية لقيم الحقول ورسالة الخطأ.
// [EN] useState creates local state for form fields and the error message.

import { createUserWithEmailAndPassword } from "firebase/auth";
// [AR] دالة من Firebase لإنشاء حساب جديد ببريد وكلمة مرور.
// [EN] Firebase function to create a new account with email and password.

import { auth } from "../services/firebase";
// [AR] كائن المصادقة الذي جهّزناه في firebase.js.
// [EN] The auth instance we initialized in firebase.js.

import { useNavigate, Link } from "react-router-dom";
// [AR] useNavigate للتنقل البرمجي بعد النجاح، و Link للانتقال بين الصفحات.
// [EN] useNavigate for programmatic navigation after success, and Link for page links.

export default function Signup() {
// [AR] نعرّف مكوّن صفحة التسجيل.
// [EN] Define the Signup page component.

  const [email, setEmail] = useState("");
  // [AR] حالة لحفظ البريد الإلكتروني الذي سيدخله المستخدم.
// [EN] State to store the user's email input.

  const [password, setPassword] = useState("");
  // [AR] حالة لحفظ كلمة المرور.
// [EN] State to store the password.

  const [error, setError] = useState("");
  // [AR] حالة لعرض رسالة خطأ في حال فشل إنشاء الحساب.
// [EN] State to display an error message if signup fails.

  const navigate = useNavigate();
  // [AR] هوك للتنقل إلى صفحة أخرى (مثل /app) بعد نجاح التسجيل.
// [EN] Hook to navigate to another route (like /app) after successful signup.

  const handleSignup = async (e) => {
  // [AR] دالة تُنفَّذ عند إرسال النموذج.
// [EN] Function executed when the form is submitted.

    e.preventDefault();
    // [AR] منع إعادة تحميل الصفحة الافتراضية للنموذج.
// [EN] Prevent the form's default full-page reload.

    setError("");
    // [AR] نفرّغ رسالة الخطأ قبل المحاولة.
// [EN] Clear any previous error before trying.

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // [AR] نحاول إنشاء الحساب باستخدام Firebase بالبريد وكلمة المرور.
// [EN] Try creating the account in Firebase using email and password.

      navigate("/app");
      // [AR] عند النجاح: ننتقل إلى لوحة التحكم (المحمية).
// [EN] On success: navigate to the protected dashboard.

    } catch (err) {
      setError(err.message);
      // [AR] عند الفشل: نخزّن رسالة الخطأ لعرضها للمستخدم.
// [EN] On failure: store the error message to show to the user.
    }
  };

  return (
    // [AR] نعيد واجهة JSX لصفحة التسجيل.
// [EN] Return the JSX for the signup page.

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* 
        [AR] حاوية تغطّي الشاشة، تمركز المحتوى عموديًا وأفقيًا، بخلفية رمادية فاتحة.
        [EN] Full-screen container, centered vertically and horizontally, with a light gray background.
      */}

      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        {/*
          [AR] نموذج التسجيل:
          - onSubmit: يستدعي handleSignup عند الضغط على زر التسجيل.
          - className: خلفية بيضاء، حواف مستديرة، ظل، عرض مناسب للموبايل.
          [EN] Signup form:
          - onSubmit: calls handleSignup when the button is pressed.
          - className: white background, rounded corners, shadow, mobile-friendly width.
        */}

        <h1 className="text-xl font-bold mb-4">Sign Up</h1>
        {/*
          [AR] عنوان واضح للصفحة مع مسافة سفلية.
          [EN] A clear page title with bottom margin.
        */}

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {/*
          [AR] إن كانت هناك رسالة خطأ، نعرضها كنص أحمر صغير.
          [EN] If there's an error message, display it as small red text.
        */}

        {/* 
          [AR] حقل البريد الإلكتروني:
          - type="email": يتحقق من صيغة البريد.
          - value/onChange: ربط الحقل بالحالة email.
          - تنسيقات Tailwind لسهولة القراءة.
          [EN] Email input:
          - type="email": basic email validation.
          - value/onChange: bind to the email state.
          - Tailwind styles for readability.
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
          - type="password": إخفاء الأحرف.
          - value/onChange: ربط بالحالة password.
          [EN] Password input:
          - type="password": masks characters.
          - value/onChange: bind to the password state.
        */}
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 
          [AR] زر إنشاء الحساب:
          - type="submit": يفعّل onSubmit في <form>.
          - ألوان/حجم مناسبين عبر Tailwind.
          [EN] Submit button:
          - type="submit": triggers the form's onSubmit.
          - Styled with Tailwind for color/size.
        */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Sign Up
        </button>

        {/* 
          [AR] سطر مساعد: عنده حساب؟ اذهب لصفحة تسجيل الدخول.
          [EN] Helper text: already have an account? Go to Login.
        */}
        <p className="mt-2 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
