import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDosqVdSlWvDii7Zzs19SxAXlWWo26lGlI",
  authDomain: "forum-641a9.firebaseapp.com",
  databaseURL: "https://forum-641a9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "forum-641a9",
  storageBucket: "forum-641a9.appspot.com",
  messagingSenderId: "348970112775",
  appId: "1:348970112775:web:f570e58b6962b3636517a2",
  measurementId: "G-FGECE4SN23"
};

export const app = initializeApp(firebaseConfig);
