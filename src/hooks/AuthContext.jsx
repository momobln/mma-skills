import { createContext, useContext, useEffect, useState } from "react"; 
//استيراد أدوات إنشاء السياق واستخدام الحالة والمراقبة.
//Import tools to create context, use state, and listen for changes.

import { onAuthStateChanged, signOut } from "firebase/auth"; 
// دوال من Firebase لمراقبة تغيّر حالة المستخدم وتسجيل الخروج.
// Firebase functions to listen to auth state changes and sign out.

import { auth } from "../services/firebase"; 
// استيراد إعدادات Firebase التي سننشئها لاحقًا في services/firebase.js
//  Import Firebase config we'll create later in services/firebase.js

// إنشاء سياق المصادقة (Auth Context)
const AuthCtx = createContext(null);

// هوك مخصص للوصول للسياق بسهولة
export const useAuth = () => useContext(AuthCtx);

// مزوّد سياق المصادقة
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  // [AR] حالة لتخزين بيانات المستخدم الحالي.
  // State to store the current user's data.

  const [loading, setLoading] = useState(true); 
  // [AR] حالة لمعرفة إذا ما زلنا نتحقق من تسجيل الدخول.
  // State to know if we're still checking login status.

  // عند تشغيل التطبيق، راقب تغيّر حالة المستخدم في Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u); // [AR] إذا فيه مستخدم، خزّنه في الحالة.
                  //  If there's a user, store it in state.
      setLoading(false); // [AR] انتهى الفحص، أوقف التحميل.
                         // Finished checking, stop loading.
    });

    return () => unsubscribe(); 
    // [AR] تنظيف الاشتراك عند إغلاق المكوّن.
    // Cleanup listener when component unmounts.
  }, []);

  // دالة تسجيل الخروج
  const logout = () => signOut(auth);

  return (
    <AuthCtx.Provider value={{ user, loading, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
