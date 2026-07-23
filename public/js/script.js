document.addEventListener('DOMContentLoaded', () => {
    
    // --- Universal Responsive Mobile Navigation Drawer ---
    const mobileToggles = document.querySelectorAll('.mobile-menu-toggle, [aria-label="Menu"]');
    
    let mobileDrawer = document.getElementById('mobile-nav-drawer');
    if (!mobileDrawer) {
        mobileDrawer = document.createElement('div');
        mobileDrawer.id = 'mobile-nav-drawer';
        mobileDrawer.className = 'fixed inset-0 bg-surface/98 backdrop-blur-xl z-50 transform translate-x-full transition-transform duration-300 flex flex-col p-6 overflow-y-auto hidden md:hidden border-l border-surface-container-highest';
        mobileDrawer.innerHTML = `
            <div class="flex justify-between items-center pb-6 border-b border-surface-container-highest">
                <a href="index.html" class="flex items-center shrink-0 bg-gradient-to-r from-primary via-[#1c4738] to-secondary px-4 py-2 rounded-full shadow-md">
                    <img src="logo.png" alt="CEDEMOP Logo" class="h-8 w-auto object-contain">
                </a>
                <button id="close-mobile-drawer" class="text-primary p-2 focus:outline-none" aria-label="Cerrar Menú">
                    <span class="material-symbols-outlined text-3xl">close</span>
                </button>
            </div>

            <nav class="flex-1 py-6 space-y-6">
                <a href="index.html" class="block font-headline text-2xl text-primary hover:text-secondary transition-colors">Inicio</a>
                
                <div class="space-y-2">
                    <div class="font-headline text-xl text-primary font-semibold flex items-center justify-between cursor-pointer py-1" onclick="this.nextElementSibling.classList.toggle('hidden')">
                        <span>Cedemop</span> <i class="fas fa-chevron-down text-xs text-secondary"></i>
                    </div>
                    <div class="pl-4 space-y-2.5 text-base text-on-surface-variant font-medium">
                        <a href="about.html" class="block hover:text-primary">Sobre Nosotros</a>
                        <a href="staff.html" class="block hover:text-primary">Staff Profesional</a>
                        <a href="corporate.html" class="block hover:text-primary">Instituciones</a>
                        <a href="blog.html" class="block hover:text-primary">Blog & Noticias</a>
                        <a href="contact.html" class="block hover:text-primary">Contacto</a>
                    </div>
                </div>

                <div class="space-y-2">
                    <div class="font-headline text-xl text-primary font-semibold flex items-center justify-between cursor-pointer py-1" onclick="this.nextElementSibling.classList.toggle('hidden')">
                        <span>Pacientes</span> <i class="fas fa-chevron-down text-xs text-secondary"></i>
                    </div>
                    <div class="pl-4 space-y-2.5 text-base text-on-surface-variant font-medium">
                        <a href="psychotherapy.html" class="block hover:text-primary">Psicoterapia Online</a>
                        <a href="resources_patients.html" class="block hover:text-primary">Recursos & Libros</a>
                    </div>
                </div>

                <div class="space-y-2">
                    <div class="font-headline text-xl text-primary font-semibold flex items-center justify-between cursor-pointer py-1" onclick="this.nextElementSibling.classList.toggle('hidden')">
                        <span>Profesionales</span> <i class="fas fa-chevron-down text-xs text-secondary"></i>
                    </div>
                    <div class="pl-4 space-y-2.5 text-base text-on-surface-variant font-medium">
                        <a href="courses.html" class="block hover:text-primary">Cursos & Talleres</a>
                        <a href="aula.html" class="block hover:text-primary">Aula Virtual & Videollamadas</a>
                        <a href="resources_pros.html" class="block hover:text-primary">Biblioteca Digital</a>
                        <a href="supervision.html" class="block hover:text-primary">Supervisión Clínica</a>
                    </div>
                </div>
            </nav>

            <div class="pt-6 border-t border-surface-container-highest space-y-3">
                <a href="contact.html" class="w-full inline-flex items-center justify-center bg-primary text-white py-3.5 rounded-full font-semibold text-sm shadow-md">
                    <i class="fas fa-calendar-check mr-2"></i> Reservar Consulta
                </a>
                <a href="admin.html" class="w-full inline-flex items-center justify-center bg-surface-container text-primary border border-surface-container-highest py-3 rounded-full font-semibold text-sm">
                    <i class="fas fa-user-shield mr-2"></i> Acceso Admin
                </a>
            </div>
        `;
        document.body.appendChild(mobileDrawer);
    }

    const closeBtn = document.getElementById('close-mobile-drawer');

    function openDrawer() {
        mobileDrawer.classList.remove('hidden', 'translate-x-full');
        mobileDrawer.classList.add('translate-x-0');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        mobileDrawer.classList.add('translate-x-full');
        document.body.style.overflow = '';
        setTimeout(() => {
            mobileDrawer.classList.add('hidden');
        }, 300);
    }

    mobileToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            openDrawer();
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeDrawer);
    }

    mobileDrawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // --- Hero Carousel ---
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 5000;

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        setInterval(nextSlide, slideInterval);
    }

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

        revealElements.forEach(el => revealOnScroll.observe(el));
    }

});
