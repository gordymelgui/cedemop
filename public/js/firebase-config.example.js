// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// Configuración dinámica generada para tu Sandbox temporal: "cedemop-pruebas" (Ejemplo)
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY_HERE",
    authDomain: "YOUR_FIREBASE_AUTH_DOMAIN_HERE",
    projectId: "YOUR_FIREBASE_PROJECT_ID_HERE",
    storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET_HERE",
    messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID_HERE",
    appId: "YOUR_FIREBASE_APP_ID_HERE",
    measurementId: "YOUR_FIREBASE_MEASUREMENT_ID_HERE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
