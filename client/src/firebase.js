// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdMMuOkHPvxoe9WyqT2rjHo3oqbv8TojQ",
  authDomain: "mern-auth-37bf0.firebaseapp.com",
  projectId: "mern-auth-37bf0",
  storageBucket: "mern-auth-37bf0.appspot.com",
  messagingSenderId: "521122053000",
  appId: "1:521122053000:web:44fe6c82b797a72f0f183d",
  measurementId: "G-V0CYS4DZQ8",
};

export const app = initializeApp(firebaseConfig);
