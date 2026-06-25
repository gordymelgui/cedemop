import { auth, db, storage } from './firebase-config.js';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// DOM Elements
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const adminNav = document.getElementById('admin-nav');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const contentForm = document.getElementById('content-form');
const progressBar = document.getElementById('progress-bar');
const uploadProgress = document.getElementById('upload-progress');
const successMessage = document.getElementById('success-message');

import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// --- Authentication Logic ---

// Check Auth State
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        showDashboard();
    } else {
        // User is signed out
        showLogin();
    }
});

// Login o Creación (Especial para el Sandbox)
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('login-error');

    try {
        await signInWithEmailAndPassword(auth, email, password);
        errorMsg.classList.add('hidden');
    } catch (error) {
        // Si el usuario no existe (o Firebase arroja código de credencial inválida en cuentas nuevas),
        // intentamos crearlo la primera vez solo porque estamos en pruebas.
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("¡Usuario de pruebas creado con éxito!");
            errorMsg.classList.add('hidden');
        } catch (createError) {
            console.error("Fallo al entrar o crear", createError);
            errorMsg.textContent = "Error: Verifica que Authentication esté habilitado en Firebase.";
            errorMsg.classList.remove('hidden');
        }
    }
});

// Logout
logoutBtn.addEventListener('click', () => {
    signOut(auth);
});

function showDashboard() {
    loginSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
    adminNav.classList.remove('hidden');
}

function showLogin() {
    loginSection.classList.remove('hidden');
    dashboardSection.classList.add('hidden');
    adminNav.classList.add('hidden');
}


// --- Content Upload Logic ---

// Switch active tab visually (but content type is handled by the select dropdown)
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const target = btn.getAttribute('data-target');
        if(target === 'course-form') document.getElementById('content-type').value = 'curso';
        if(target === 'resource-form') document.getElementById('content-type').value = 'recurso_profesional';
        if(target === 'blog-form') document.getElementById('content-type').value = 'blog';
    });
});

contentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Disable button to prevent double submit
    const submitBtn = contentForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    uploadProgress.classList.remove('hidden');
    progressBar.style.width = '10%';

    const title = document.getElementById('title').value;
    const contentType = document.getElementById('content-type').value; 
    const externalUrl = document.getElementById('external-url') ? document.getElementById('external-url').value : '';
    
    if(!contentType) {
        alert("Por favor selecciona una Categoría/Destino.");
        submitBtn.disabled = false;
        uploadProgress.classList.add('hidden');
        return;
    }
    const imageFile = document.getElementById('image-file').files[0];
    const docFile = document.getElementById('doc-file').files[0];

    try {
        // 1. Upload Image
        let imageUrl = '';
        if (imageFile) {
            const imgRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);
            await uploadBytes(imgRef, imageFile);
            imageUrl = await getDownloadURL(imgRef);
            progressBar.style.width = '50%';
        }

        // 2. Upload Document (if any)
        let docUrl = '';
        if (docFile) {
            const docRef = ref(storage, `docs/${Date.now()}_${docFile.name}`);
            await uploadBytes(docRef, docFile);
            docUrl = await getDownloadURL(docRef);
            progressBar.style.width = '80%';
        }

        // 3. Obtener el Rich Content del Quill Editor
        const contentHtml = quill.root.innerHTML;

        // 4. Save to Firestore
        const collectionName = contentType;

        // Generate a plain-text summary from Quill HTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = contentHtml;
        const plainText = tempDiv.textContent || tempDiv.innerText || "";
        const summary = plainText.substring(0, 120) + "..."; // For preview cards

        await addDoc(collection(db, collectionName), {
            title: title,
            content: contentHtml,
            summary: summary,
            imageUrl: imageUrl,
            docUrl: docUrl,
            externalUrl: externalUrl,
            author: document.getElementById('author').value || "Admin",
            createdAt: serverTimestamp()
        });

        progressBar.style.width = '100%';

        // UI Feedback
        setTimeout(() => {
            contentForm.reset();
            contentForm.classList.add('hidden');
            successMessage.classList.remove('hidden');
            submitBtn.disabled = false;
        }, 500);

    } catch (error) {
        console.error("Upload error:", error);
        alert("Hubo un error al subir el contenido: " + error.message);
        submitBtn.disabled = false;
        uploadProgress.classList.add('hidden');
    }
});
