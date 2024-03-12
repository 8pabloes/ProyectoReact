import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0Ja-1SNRdwidAvJH6uxSWyEuVJwHiui4",
  authDomain: "webclase-98bc4.firebaseapp.com",
  projectId: "webclase-98bc4",
  storageBucket: "webclase-98bc4.appspot.com",
  messagingSenderId: "505156146932",
  appId: "1:505156146932:web:27415d48764a15976bf0a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth };
export { db };