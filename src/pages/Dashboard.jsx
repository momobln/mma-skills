import { useEffect, useState } from "react";
import { db, auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { ref, push, remove, onValue, off, set } from "firebase/database";

export default function Dashboard() {
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("");
  const [skills, setSkills] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    const skillsRef = ref(db, "skills", uid);
    onValue(skillsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const skillsList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setSkills(skillsList);
      } else {
        setSkills([]);
      }
      setLoadingList(false);
    });
    return () => {
      off(skillsRef);
    };
  }, [uid]);
  console.log(skills);
  // const skillsCollection = useMemo(() => collection(db, "skills"), []);
  // const userSkillsQuery = useMemo(() => {
  //   return query(skillsCollection, where("user", "==", uid || "__NO_UID__"));
  // }, [skillsCollection, uid]);

  // useEffect(() => {
  //   if (!uid) {
  //     setSkills([]);
  //     setLoadingList(false);
  //     return;
  //   }
  //   const unsubscribe = onSnapshot(
  //     userSkillsQuery,
  //     (snapshot) => {
  //       console.log("items", items);
  //       const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  //       setSkills(items);
  //       setLoadingList(false);
  //     },
  //     (err) => {
  //       console.error("Failed to subscribe to skills:", err);
  //       setLoadingList(false);
  //     }
  //   );
  //   return () => unsubscribe();
  // }, [uid, userSkillsQuery]);

  const addSkill = async (e) => {
    e.preventDefault();
    if (!skill.trim() || !level.trim()) return;
    if (!uid) return;
    try {
      setSubmitting(true);
      const skillRef = ref(db, "skills", uid);
      const newSkillRef = push(skillRef);
      await set(newSkillRef, {
        skill,
        level,
        uid,
      });
    } catch (err) {
      console.error("Failed to add skill:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteSkill = async (id) => {
    try {
      await deleteDoc(doc(db, "skills", id));
    } catch (err) {
      console.error("Failed to delete skill:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Failed to sign out:", err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      {/* Page title */}
      <h1 className="text-2xl font-bold mb-4">MMA Skills Dashboard</h1>

      {/* Add skill form */}
      <form onSubmit={addSkill} className="mb-4">
        <input
          type="text"
          placeholder="Skill"
          className="border p-2 w-full mb-2"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />

        <input
          type="text"
          placeholder="Level (Beginner, Intermediate, Advanced)"
          className="border p-2 w-full mb-2"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />

        <button
          disabled={submitting}
          className="w-full bg-green-500 text-white py-2 rounded disabled:opacity-60"
        >
          {submitting ? "Adding..." : "Add Skill"}
        </button>
      </form>

      {/* Skills list */}
      {loadingList ? (
        <p className="text-sm text-gray-500">Loading your skills…</p>
      ) : skills.length === 0 ? (
        <p className="text-sm text-gray-500">
          No skills yet. Add your first one!
        </p>
      ) : (
        <ul>
          {skills.map((s) => (
            <li
              key={s.id}
              className="flex justify-between items-center border-b py-2"
            >
              <span>
                {s.skill} — {s.level}
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
      )}

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-4 bg-gray-500 text-white w-full py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

// // This page is shown only after login (protected by <ProtectedRoute/>).
// // It lets the user manage their MMA skills stored in Firestore.

// import { useEffect, useMemo, useState } from "react";
// // useState -> local state for form inputs and the skills array.
// // useEffect -> fetch on mount / subscribe to changes.

// import {
//   collection,
//   addDoc,
//   deleteDoc,
//   doc,
//   query,
//   where,
//   onSnapshot,
// } from "firebase/firestore";
// // Firestore helpers: CRUD and realtime subscription.

// import { db, auth } from "../services/firebase";
// // 'db' is your Firestore instance, 'auth' is Firebase Auth instance.

// import { signOut } from "firebase/auth";
// // To sign the user out.

// export default function Dashboard() {
//   // Controlled input for the skill name (text).
//   const [skill, setSkill] = useState("");

//   // Controlled input for the skill level (e.g., Beginner/Intermediate/Advanced).
//   const [level, setLevel] = useState("");

//   // Array of skills coming from Firestore.
//   const [skills, setSkills] = useState([]);

//   // Loading flags for UX.
//   const [loadingList, setLoadingList] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   // Convenience: current user id (safe optional chaining in case something changes).
//   const uid = auth.currentUser?.uid;

//   // Reference to the "skills" collection (do not fetch yet).
//   const skillsCollection = useMemo(() => collection(db, "skills"), []);

//   // Build a query that only returns documents belonging to the current user.
//   // This prevents reading other users' skills.
//   const userSkillsQuery = useMemo(() => {
//     // If uid is missing (edge case), we still return a query; ProtectedRoute should guard this.
//     return query(skillsCollection, where("user", "==", uid || "__NO_UID__"));
//   }, [skillsCollection, uid]);

//   // Fetch or subscribe to skills on mount and whenever uid changes.
//   useEffect(() => {
//     // If there is no user (very edge case if route wasn't protected), bail out.
//     if (!uid) {
//       setSkills([]);
//       setLoadingList(false);
//       return;
//     }

//     // Option A (realtime): use onSnapshot to instantly reflect adds/deletes.
//     const unsubscribe = onSnapshot(
//       userSkillsQuery,
//       (snapshot) => {
//         // Map snapshot docs to plain objects and include doc.id.
//         console.log("items", items);
//         const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
//         setSkills(items);
//         setLoadingList(false);
//       },
//       (err) => {
//         console.error("Failed to subscribe to skills:", err);
//         setLoadingList(false);
//       }
//     );

//     // Cleanup subscription on unmount.
//     return () => unsubscribe();

//     // NOTE: If you prefer one-time fetch instead of realtime, use getDocs(userSkillsQuery) here.
//   }, [uid, userSkillsQuery]);
//   console.log(skills);
//   // Add a new skill document to Firestore.
//   const addSkill = async (e) => {
//     e.preventDefault(); // Prevent form submit from reloading the page

//     // Basic validation
//     if (!skill.trim() || !level.trim()) return;

//     // Extra guard: ensure we have a user id.
//     if (!uid) return;

//     try {
//       setSubmitting(true);
//       await addDoc(skillsCollection, {
//         skill: skill.trim(), // normalize input
//         level: level.trim(),
//         user: uid, // link to the current user
//         createdAt: Date.now(), // optional: for sorting later if needed
//       });

//       // Reset form fields
//       setSkill("");
//       setLevel("");
//     } catch (err) {
//       console.error("Failed to add skill:", err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Delete a skill by document id.
//   const deleteSkill = async (id) => {
//     try {
//       await deleteDoc(doc(db, "skills", id));
//       // No need to manually refresh; onSnapshot will update the UI.
//     } catch (err) {
//       console.error("Failed to delete skill:", err);
//     }
//   };

//   // Log the user out and rely on your global auth flow to redirect.
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       // After sign-out, your ProtectedRoute should redirect to /login automatically.
//     } catch (err) {
//       console.error("Failed to sign out:", err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       {/* Page title */}
//       <h1 className="text-2xl font-bold mb-4">MMA Skills Dashboard</h1>

//       {/* Add skill form */}
//       <form onSubmit={addSkill} className="mb-4">
//         <input
//           type="text"
//           placeholder="Skill"
//           className="border p-2 w-full mb-2"
//           value={skill}
//           onChange={(e) => setSkill(e.target.value)}
//         />

//         <input
//           type="text"
//           placeholder="Level (Beginner, Intermediate, Advanced)"
//           className="border p-2 w-full mb-2"
//           value={level}
//           onChange={(e) => setLevel(e.target.value)}
//         />

//         <button
//           disabled={submitting}
//           className="w-full bg-green-500 text-white py-2 rounded disabled:opacity-60"
//         >
//           {submitting ? "Adding..." : "Add Skill"}
//         </button>
//       </form>

//       {/* Skills list */}
//       {loadingList ? (
//         <p className="text-sm text-gray-500">Loading your skills…</p>
//       ) : skills.length === 0 ? (
//         <p className="text-sm text-gray-500">
//           No skills yet. Add your first one!
//         </p>
//       ) : (
//         <ul>
//           {skills.map((s) => (
//             <li
//               key={s.id}
//               className="flex justify-between items-center border-b py-2"
//             >
//               <span>
//                 {s.skill} — {s.level}
//               </span>
//               <button
//                 onClick={() => deleteSkill(s.id)}
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Logout */}
//       <button
//         onClick={handleLogout}
//         className="mt-4 bg-gray-500 text-white w-full py-2 rounded"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }
