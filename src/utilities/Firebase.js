import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyC_YDbRMZ2t8ij70Eeh8k-bO3fTrgN3eYA",
  authDomain: "moviesgpt-53303.firebaseapp.com",
  projectId: "moviesgpt-53303",
  storageBucket: "moviesgpt-53303.appspot.com",
  messagingSenderId: "607015668107",
  appId: "1:607015668107:web:19c1d2ea776acc6d0e078e",
  measurementId: "G-6VB7HWLPVY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export const Signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      return null;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return `${errorCode} : ${errorMessage}`;
    });
}

export const Signin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("User Successfull Loggedin", user);
    return null;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return `${errorCode} : ${errorMessage}`;
  });
}

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    return null;
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    return `${errorCode} + ${errorMessage}`;
  });
}