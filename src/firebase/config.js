// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWiQEqrNeArNWybDdZRy3QF4mUWIPpgC4",
  authDomain: "react-cursos-8a1a1.firebaseapp.com",
  projectId: "react-cursos-8a1a1",
  storageBucket: "react-cursos-8a1a1.appspot.com",
  messagingSenderId: "1074258130832",
  appId: "1:1074258130832:web:2d1e35f15a1348010a2515"
}

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig )
export const FirebaseAuth = getAuth( FirebaseApp )
export const FirebaseDB = getFirestore( FirebaseApp )
