
// [AR] هذه الصفحة تظهر فقط للمستخدم بعد تسجيل الدخول وتسمح له بإدارة مهارات MMA.
// [EN] This page is only accessible after login and allows managing MMA skills.

import { useState, useEffect } from "react";
// [AR] useState للحالات (inputs + skills list)، useEffect لجلب البيانات من Firestore.
// [EN] useState for states (inputs + skills list), useEffect for fetching data from Firestore.

import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
// [AR] دوال للتعامل مع Firestore (إضافة، جلب، حذف).
// [EN] Firestore functions (add, fetch, delete).

import { db, auth } from "../services/firebase";
// [AR] استدعاء قاعدة البيانات (db) والمصادقة (auth).
// [EN] Import database (db) and auth instance.

import { signOut } from "firebase/auth";
// [AR] لتسجيل الخروج.
// [EN] For logging out.

export default function Dashboard() {
  const [skill, setSkill] = useState("");
  // [AR] حالة لحفظ اسم المهارة المؤقت من input.
  // [EN] State to hold skill name input.

  const [level, setLevel] = useState("");
  // [AR] حالة لحفظ مستوى المهارة من input.
  // [EN] State to hold skill level input.

  const [skills, setSkills] = useState([]);
  // [AR] قائمة المهارات التي سنجلبها من Firestore.
  // [EN] List of skills fetched from Firestore.

  // [AR] مرجع لمجموعة skills داخل Firestore.
  // [EN] Reference to "skills" collection in Firestore.
  const skillsCollection = collection(db, "skills");

  // [AR] دالة لجلب المهارات من Firestore
  // [EN] Function to fetch skills from Firestore
  const fetchSkills = async () => {
    const data = await getDocs(skillsCollection);
    // [AR] getDocs تجلب كل المستندات داخل "skills".
    // [EN] getDocs retrieves all documents inside "skills".

    setSkills(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // [AR] نحول المستندات إلى كائنات عادية + نضيف id (معرّف لكل وثيقة).
    // [EN] Convert docs into plain objects + add id for each document.
  };

  // [AR] جلب المهارات عند فتح الصفحة.
  // [EN] Fetch skills when the page loads.
  useEffect(() => {
    fetchSkills();
  }, []);

  // [AR] إضافة مهارة جديدة.
  // [EN] Add new skill.
  const addSkill = async (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة
    if (!skill || !level) return;

    await addDoc(skillsCollection, {
      skill,
      level,
      user: auth.currentUser.uid, // ربط المهارة بالمستخدم الحالي
    });

    setSkill("");
    setLevel("");
    fetchSkills(); // تحديث القائمة بعد الإضافة
  };

  // [AR] حذف مهارة.
  // [EN] Delete skill.
  const deleteSkill = async (id) => {
    const skillDoc = doc(db, "skills", id);
    await deleteDoc(skillDoc);
    fetchSkills(); // تحديث القائمة بعد الحذف
  };

  // [AR] تسجيل الخروج.
  // [EN] Logout function.
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      {/* [AR] الحاوية الرئيسية بوسط الشاشة. 
          [EN] Main centered container. */}

      <h1 className="text-2xl font-bold mb-4">MMA Skills Dashboard</h1>
      {/* [AR] عنوان الصفحة.
          [EN] Page title. */}

      <form onSubmit={addSkill} className="mb-4">
        {/* [AR] نموذج لإضافة المهارة.
            [EN] Form to add new skill. */}

        <input
          type="text"
          placeholder="Skill"
          className="border p-2 w-full mb-2"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        {/* [AR] حقل إدخال اسم المهارة.
            [EN] Input field for skill name. */}

        <input
          type="text"
          placeholder="Level (Beginner, Intermediate, Advanced)"
          className="border p-2 w-full mb-2"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
        {/* [AR] حقل إدخال مستوى المهارة.
            [EN] Input field for skill level. */}

        <button className="w-full bg-green-500 text-white py-2 rounded">
          Add Skill
        </button>
        {/* [AR] زر لإضافة المهارة.
            [EN] Button to add skill. */}
      </form>

      <ul>
        {/* [AR] قائمة عرض المهارات.
            [EN] List of skills. */}
        {skills.map((s) => (
          <li
            key={s.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span>
              {s.skill} - {s.level}
            </span>
            <button
              onClick={() => deleteSkill(s.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleLogout}
        className="mt-4 bg-gray-500 text-white w-full py-2 rounded"
      >
        Logout
      </button>
      {/* [AR] زر تسجيل الخروج.
          [EN] Logout button. */}
    </div>
  );
}
