
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
//import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAKa23v5HTFEiEkwtLIBPHX7mLSVv-tpT0",
  authDomain: "vrv-events.firebaseapp.com",
  projectId: "vrv-events",
  storageBucket: "vrv-events.appspot.com",
  messagingSenderId: "524374778699",
  appId: "1:524374778699:web:e056f8f55794720944fece",
  measurementId: "G-KXR9RKW69S"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//const firestore = getFirestore(app);
//const db = getFirestore(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, analytics, auth , database}
