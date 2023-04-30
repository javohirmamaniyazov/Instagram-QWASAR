import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth"
import "firebase/compat/storage";

const config = {
  apiKey: "AIzaSyCi0VZYipsBZEJVp7jbAV5bNAflFe1DEEY",
  authDomain: "instagram-407a5.firebaseapp.com",
  projectId: "instagram-407a5",
  storageBucket: "instagram-407a5.appspot.com",
  messagingSenderId: "446964927096",
  appId: "1:446964927096:web:80ef2d47a9cda8c21b3b8d",
  measurementId: "G-CZDFBLF6W6"
}

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// export const authentification  = firebase.getAuth();
export const storage = firebase.storage();
export { firebase, FieldValue };