import { db } from './firebase-config.js';
import { collection, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
    const blogContainer = document.getElementById('blog-container');
    
    // Only execute if the blog container exists on the page
    if (!blogContainer) return;

    try {
        // Build the query: Get from "blog" collection, sort by newest, limit to 3 (very cheap read)
        // We limit to 3 specifically to save on Firebase execution costs.
        const blogsRef = collection(db, "blog");
        const q = query(blogsRef, orderBy("createdAt", "desc"), limit(3));
        
        const querySnapshot = await getDocs(q);
        
        // Clear the loader
        blogContainer.innerHTML = '';
        
        if (querySnapshot.empty) {
            blogContainer.innerHTML = '<p style="text-align: center; width: 100%; color: var(--text-light);">Aún no hay artículos publicados. ¡Vuelve pronto!</p>';
            blogContainer.style.gridTemplateColumns = "1fr";
            return;
        }

        // Assure it resets back to grid format if it was changed
        blogContainer.style.gridTemplateColumns = ""; 

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const date = data.createdAt ? new Date(data.createdAt.toMillis()).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Reciente';
            
            // Determine link destination
            const articleUrl = data.externalUrl ? data.externalUrl : `article.html?id=${doc.id}`;
            const targetAttr = data.externalUrl ? `target="_blank" rel="noopener noreferrer"` : ``;

            // Build card HTML
            const card = document.createElement('div');
            card.className = 'blog-card';
            
            // Generate content
            card.innerHTML = `
                <div class="blog-image">
                    <a href="${articleUrl}" ${targetAttr}>
                        <img src="${data.imageUrl || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80'}" alt="${data.title}">
                    </a>
                </div>
                <div class="blog-content">
                    <div class="blog-date">${date}</div>
                    <h3><a href="${articleUrl}" ${targetAttr} style="color: inherit; text-decoration: none;">${data.title}</a></h3>
                    <p style="font-size: 0.9rem; color: var(--text-light); margin-bottom: 15px;">${data.summary || ''}</p>
                    <a href="${articleUrl}" ${targetAttr} class="read-more">Leer artículo <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            
            blogContainer.appendChild(card);
        });
        
    } catch (error) {
        console.error("Error cargando los blogs:", error);
        blogContainer.innerHTML = '<p style="text-align: center; width: 100%; color: #ef4444;">Ocurrió un error cargando los artículos recientes. Por favor, intenta de nuevo más tarde.</p>';
        blogContainer.style.gridTemplateColumns = "1fr";
    }
});
