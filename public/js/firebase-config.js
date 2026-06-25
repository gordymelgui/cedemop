// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// Configuración dinámica generada para tu Sandbox temporal: "cedemop-pruebas"
const firebaseConfig = {
    apiKey: "AIzaSyCFsNqGu9ZvOQa_n_cn-F-mswP8d34JVaA",
    authDomain: "cedemop-pruebas.firebaseapp.com",
    projectId: "cedemop-pruebas",
    storageBucket: "cedemop-pruebas.firebasestorage.app",
    messagingSenderId: "27542582403",
    appId: "1:27542582403:web:b28ac943199999f33317b6",
    measurementId: "G-6RVWD584FM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
