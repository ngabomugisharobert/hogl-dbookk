import { db, auth } from './firebase-config'

import { collection, getDocs } from "@firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";


// login function
export const login = async (email, password) => {


    // const auth = getAuth();

    console.log(email, password);
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential, "userCredential");
        return userCredential;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const loginWithGoogle = async () => {
const provider = new GoogleAuthProvider();
// const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user, "user");
        return user;
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        
        return error;
    });
}