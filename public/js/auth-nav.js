import { auth } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    const authUi = document.getElementById('auth-ui');
    const adminEmail = 'cedemop@gmail.com';

    if (!authUi) return;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Usuario logueado
            let html = '';

            // Si es admin, mostrar botón de panel
            if (user.email === adminEmail) {
                html += `<a href="admin.html" class="nav-btn-admin"><i class="fas fa-cog"></i> Panel Admin</a>`;
            }

            // Botón de Cerrar Sesión
            html += `<a href="#" id="logout-link" class="nav-btn-highlight"><i class="fas fa-sign-out-alt"></i> Salir</a>`;

            authUi.innerHTML = html;

            // Evento para cerrar sesión
            document.getElementById('logout-link').addEventListener('click', (e) => {
                e.preventDefault();
                signOut(auth).then(() => {
                    window.location.reload();
                });
            });
        } else {
            // Usuario no logueado
            authUi.innerHTML = `<a href="admin.html" class="nav-btn-highlight"><i class="fas fa-user-circle"></i> Ingresar</a>`;
        }
    });
});
