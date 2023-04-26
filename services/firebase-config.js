import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDnUYGZgQvKkIpyRvDEgLbrrqAPKLBwEAs",
    authDomain: "eregister-353913.firebaseapp.com",
    projectId: "eregister-353913",
    storageBucket: "eregister-353913.appspot.com",
    messagingSenderId: "527645544087",
    appId: "1:527645544087:web:7f489e922ed9eab3cd63d2",
    measurementId: "G-GE5XS4E6M5"
  };


  
// make a connection 
const app = initializeApp(firebaseConfig);
// import db to your app
export const db = getFirestore(app);

// export const colle = app.firestore().collection("tb_movements");

export const auth = getAuth(app);