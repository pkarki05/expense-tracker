import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQlPVJLt-XBbTJrdQMvPMBgdRSpWIzpG4",
  authDomain: "expense-trackor-21953.firebaseapp.com",
  projectId: "expense-trackor-21953",
  storageBucket: "expense-trackor-21953.appspot.com",
  messagingSenderId: "818548437780",
  appId: "1:818548437780:web:a7ad1a5c4a898449320801",
};
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

