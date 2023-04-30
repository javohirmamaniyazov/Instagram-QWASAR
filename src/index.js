import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FirebaseContext from "./firebase/firebaseStatus.js";
import "react-loading-skeleton/dist/skeleton.css";
import { firebase, FieldValue } from "./firebase/firebase.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
        <App />
    </FirebaseContext.Provider>
);