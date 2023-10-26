// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLdZZy7Pl7SnieAMZX9he4KFIjsCgGFcE",
  authDomain: "dsps-skateshop-aaa59.firebaseapp.com",
  projectId: "dsps-skateshop-aaa59",
  storageBucket: "dsps-skateshop-aaa59.appspot.com",
  messagingSenderId: "763255418690",
  appId: "1:763255418690:web:15f315d58648153ac622db",
  measurementId: "G-X9NHXW2LYB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
