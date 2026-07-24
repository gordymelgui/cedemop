/**
 * CEDEMOP - Campus Virtual & Panel de Gestión Unificado (Docente/Admin/CRM)
 * Arquitectura de 2 Vistas Principales:
 *  1. Vista Alumno (Experiencia de Aprendizaje)
 *  2. Vista Gestión Unificada (Docente + Administrador / CRM)
 */

const AulaApp = {
  state: {
    currentRole: 'student', // 'student' | 'management'
    currentTab: 'my-learning', // Student: 'my-learning'|'discover'|'assignments'|'calendar' | Management: 'mgmt-dashboard'
    currentMgmtSubTab: 'courses', // Management subtabs: 'courses' | 'grading' | 'students' | 'metrics' | 'certificates'
    currentView: 'app', // 'app' | 'course' | 'lesson'
    
    selectedCourseId: 'c1',
    selectedModuleId: 'm1',
    selectedLessonId: 'l1',
    selectedCourseTab: 'modules',
    
    activeCategory: 'all',

    // Datos del Alumno Actual
    studentUser: {
      name: 'Dra. María González',
      email: 'estudiante@cedemop.org',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      enrolledCourses: ['c1', 'c2'],
      wallet: '$250 USD'
    },

    // Datos del Staff / Directores / Admin (Docente + Administrador)
    mgmtUser: {
      name: 'Ph. D(c) Joaquín S. Aravena',
      title: 'Director Académico & Docente Titular',
      email: 'direccion@cedemop.org',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
    },

    // CRM Lista de Estudiantes Registrados en el Sistema
    registeredStudents: [
      { id: 'st1', name: 'Dra. María González', email: 'maria.gonzalez@med.org', enrolledCount: 2, status: 'Activo', paymentStatus: 'Al día', progressAvg: '65%' },
      { id: 'st2', name: 'Lic. Esteban Paredes', email: 'esteban.p@psico.cl', enrolledCount: 1, status: 'Activo', paymentStatus: 'Al día', progressAvg: '30%' },
      { id: 'st3', name: 'Dra. Carla Benítez', email: 'carla.benitez@salud.org', enrolledCount: 3, status: 'Activo', paymentStatus: 'Al día', progressAvg: '90%' },
      { id: 'st4', name: 'Lic. Rodrigo Silva', email: 'rodrigo.s@cedemop.org', enrolledCount: 1, status: 'Pendiente', paymentStatus: 'Cuota 2 pendiente', progressAvg: '15%' }
    ],

    // Entregas de Alumnos Pendientes de Calificación (Módulo Didáctico)
    submittedAssignments: [
      { id: 'sub1', studentName: 'Lic. Esteban Paredes', courseTitle: 'Regulación emocional', assignmentTitle: 'Análisis de caso de ansiedad generalizada', file: 'Caso_Practico_Paredes.pdf', date: 'Hace 3 horas', status: 'pending', grade: null, feedback: '' },
      { id: 'sub2', studentName: 'Dra. María González', courseTitle: 'Regulación emocional', assignmentTitle: 'Caso práctico #1: Protocolo de crisis', file: 'Evaluacion_Gonzalez.pdf', date: 'Ayer', status: 'graded', grade: '9.5 / 10', feedback: 'Excelente fundamentación teórica.' }
    ],

    // Certificados Oficiales Emitidos o Listos
    certificates: [
      { id: 'cert1', studentName: 'Dra. Carla Benítez', courseTitle: 'Diplomatura en Terapia Cognitiva Conductual', issueDate: '15/07/2026', code: 'CED-2026-8841', status: 'Emitido' },
      { id: 'cert2', studentName: 'Dra. María González', courseTitle: 'Fundamentos de Neurobiología Emocional', issueDate: 'Pendiente', code: 'CED-2026-9012', status: 'Listo para emitir' }
    ],

    notifications: [
      { id: 'n1', title: 'Nueva entrega de tarea: Lic. Esteban Paredes', time: 'Hace 3 horas', type: 'submission', unread: true },
      { id: 'n2', title: 'Clase en vivo hoy a las 19:00 Hs', time: 'Hace 15 min', type: 'live', unread: true },
      { id: 'n3', title: 'Pago de matricula confirmado: Dra. Carla Benítez', time: 'Ayer', type: 'payment', unread: false }
    ],

    courses: [
      {
        id: 'c1',
        title: 'Regulación emocional y modelos clínicos',
        mode: 'sincronico',
        category: 'Psicoterapia',
        teacher: 'Ph. D(c) Joaquín S. Aravena',
        rating: 4.9,
        reviewsCount: 128,
        price: 'Gratuito (Inscripto)',
        isFree: true,
        badge: 'Sincrónico (En vivo)',
        progress: 65,
        image: 'imagenes/wp-uploads/312207595_1964040763781774_318542561535812704_n.jpg',
        description: 'Programa especializado en estrategias de regulación afectiva y modelos de intervención basados en la evidencia para la práctica clínica.',
        studentsCount: 48,

        liveSchedule: {
          nextSession: {
            title: 'Módulo 2: Intervención en crisis de pánico',
            date: 'Hoy',
            time: '19:00 Hs',
            status: 'active'
          }
        },

        modules: [
          {
            id: 'm1',
            title: 'Módulo 1: Fundamentos neurobiológicos de la regulación',
            description: 'Bases neuroanatómicas y circuitos emocionales implicados.',
            lessons: [
              {
                id: 'l1',
                title: 'Clase 1: Introducción a los modelos reguladores',
                type: 'video',
                duration: '45 min',
                completed: true,
                contentUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                notes: 'Resumen de los principales modelos de Gross (2015) y Thompson (2019).'
              },
              {
                id: 'l2',
                title: 'Lectura obligatoria - Guía en PDF de evaluación',
                type: 'pdf',
                size: '2.4 MB',
                completed: true,
                notes: 'Descarga y revisa las escalas de autoregistro emocional.'
              }
            ]
          },
          {
            id: 'm2',
            title: 'Módulo 2: Estrategias de regulación en crisis',
            description: 'Técnicas clínicas de desactivación fisiológica y reestructuración.',
            lessons: [
              {
                id: 'l3',
                title: 'Sesión en vivo: Intervención en crisis (Transmisión HD)',
                type: 'live',
                date: 'Hoy, 19:00 Hs',
                isLiveActive: true,
                completed: false
              },
              {
                id: 'l4',
                title: 'Tarea práctica: Análisis de caso de ansiedad generalizada',
                type: 'assignment',
                dueDate: '30 de julio, 23:59 Hs',
                completed: false,
                instructions: 'Analizar el caso clínico presentado en el PDF y subir un informe de máximo 3 páginas.'
              }
            ]
          }
        ],

        events: [
          { id: 'e1', day: 23, title: 'Clase en vivo: Intervención en crisis', time: '19:00 - 20:30 Hs', type: 'live', location: 'Sala virtual CEDEMOP #101' },
          { id: 'e2', day: 30, title: 'Entrega de tarea: Caso de ansiedad', time: '23:59 Hs', type: 'assignment' }
        ]
      },
      {
        id: 'c2',
        title: 'Diplomatura en terapia cognitiva conductual (TCC)',
        mode: 'asincronico',
        category: 'Diplomatura',
        teacher: 'Dra. Elena Rostova',
        rating: 4.8,
        reviewsCount: 94,
        price: 'Gratuito (Inscripto)',
        isFree: true,
        badge: 'Asincrónico (A tu ritmo)',
        progress: 30,
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
        description: 'Formación completa a tu propio ritmo con clases grabadas, materiales descargables y tutoría académica continua.',
        studentsCount: 64,

        modules: [
          {
            id: 'm2_1',
            title: 'Módulo 1: Conceptualización de casos en TCC',
            lessons: [
              { id: 'l2_1', title: 'Clase 1: El modelo ABC de Ellis y Beck', type: 'video', duration: '50 min', completed: true },
              { id: 'l2_2', title: 'Manual de registros de pensamientos automáticos', type: 'pdf', size: '1.2 MB', completed: false }
            ]
          }
        ],
        events: [
          { id: 'e3', day: 26, title: 'Tutoría abierta de consultas TCC', time: '18:00 - 19:00 Hs', type: 'workshop' }
        ]
      },
      {
        id: 'c3',
        title: 'Supervisión clínica de casos en trauma y adicciones',
        mode: 'sincronico',
        category: 'Supervisión',
        teacher: 'Ph. D(c) Joaquín S. Aravena',
        rating: 5.0,
        reviewsCount: 42,
        price: '$120 USD',
        isFree: false,
        badge: 'Nuevo',
        progress: 0,
        image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=600&auto=format&fit=crop&q=80',
        description: 'Espacio de análisis de casos complejos, presentación de historias clínicas y discusión de abordajes avanzados.',
        studentsCount: 22,
        modules: [],
        events: []
      },
      {
        id: 'c4',
        title: 'Terapia de aceptación y compromiso (ACT)',
        mode: 'asincronico',
        category: 'Psicoterapia',
        teacher: 'Lic. Martin Benítez',
        rating: 4.7,
        reviewsCount: 88,
        price: '$95 USD',
        isFree: false,
        badge: 'Destacado',
        progress: 0,
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
        description: 'Principios de la defusión cognitiva, los valores y las acciones comprometidas en el marco de la tercera ola.',
        studentsCount: 35,
        modules: [],
        events: []
      }
    ],

    announcements: [
      {
        id: 'ann1',
        author: 'Ph. D(c) Joaquín S. Aravena',
        role: 'Director Académico',
        date: 'Hace 2 horas',
        title: 'Material complementario subido al Módulo 2',
        content: 'Estimados alumnos, he subido la bibliografía para el trabajo práctico. Nos vemos a las 19:00 Hs en la sala virtual en vivo.'
      }
    ]
  },

  init() {
    this.renderHeader();
    this.renderView();
  },

  setRole(role) {
    this.state.currentRole = role;
    if (role === 'management') {
      this.state.currentTab = 'mgmt-dashboard';
    } else {
      this.state.currentTab = 'my-learning';
    }
    this.state.currentView = 'app';
    this.renderHeader();
    this.renderView();
    this.showToast(`Modo cambiado a: ${role === 'management' ? 'Panel de Gestión Unificado (Docente/Admin)' : 'Vista Alumno'}`);
  },

  setTab(tabName) {
    this.state.currentTab = tabName;
    this.state.currentView = 'app';
    this.renderHeader();
    this.renderView();
  },

  setMgmtSubTab(subTab) {
    this.state.currentMgmtSubTab = subTab;
    this.renderManagementDashboard();
  },

  navigateTo(view, params = {}) {
    this.state.currentView = view;
    if (params.courseId) this.state.selectedCourseId = params.courseId;
    if (params.moduleId) this.state.selectedModuleId = params.moduleId;
    if (params.lessonId) this.state.selectedLessonId = params.lessonId;
    if (params.tab) this.state.selectedCourseTab = params.tab;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.renderView();
  },

  renderHeader() {
    const isMgmt = this.state.currentRole === 'management';
    const userObj = isMgmt ? this.state.mgmtUser : this.state.studentUser;

    const nameEl = document.getElementById('app-header-user-name');
    const avatarEl = document.getElementById('app-header-user-avatar');
    const roleBtn = document.getElementById('app-header-role-btn');
    const navTabs = document.getElementById('app-header-nav-tabs');

    if (nameEl) nameEl.textContent = userObj.name;
    if (avatarEl) avatarEl.src = userObj.avatar;
    
    if (roleBtn) {
      if (isMgmt) {
        roleBtn.className = 'px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#904c2f] text-white hover:bg-[#a65837] transition-all shadow-sm flex items-center gap-1.5';
        roleBtn.innerHTML = '<i class="fas fa-graduation-cap text-xs"></i> Switch a Vista Alumno';
      } else {
        roleBtn.className = 'px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#15382c] text-white hover:bg-[#1f4a3b] transition-all shadow-sm flex items-center gap-1.5';
        roleBtn.innerHTML = '<i class="fas fa-user-shield text-xs"></i> Modo Gestión / Admin';
      }
    }

    if (navTabs) {
      if (isMgmt) {
        navTabs.innerHTML = `
          <button onclick="AulaApp.setTab('mgmt-dashboard')" class="text-sm font-semibold py-1.5 border-b-2 ${this.state.currentTab === 'mgmt-dashboard' ? 'border-[#15382c] text-[#15382c]' : 'border-transparent text-[#414845] hover:text-[#15382c]'} transition-all flex items-center gap-1.5">
            <i class="fas fa-chart-line text-[#904c2f]"></i> Panel de Gestión Unificado
          </button>
        `;
      } else {
        navTabs.innerHTML = `
          <button onclick="AulaApp.setTab('my-learning')" class="text-sm font-semibold py-1.5 border-b-2 ${this.state.currentTab === 'my-learning' ? 'border-[#15382c] text-[#15382c]' : 'border-transparent text-[#414845] hover:text-[#15382c]'} transition-all">
            Mi aprendizaje
          </button>
          <button onclick="AulaApp.setTab('discover')" class="text-sm font-semibold py-1.5 border-b-2 ${this.state.currentTab === 'discover' ? 'border-[#15382c] text-[#15382c]' : 'border-transparent text-[#414845] hover:text-[#15382c]'} transition-all">
            Descubrir cursos
          </button>
          <button onclick="AulaApp.setTab('assignments')" class="text-sm font-semibold py-1.5 border-b-2 ${this.state.currentTab === 'assignments' ? 'border-[#15382c] text-[#15382c]' : 'border-transparent text-[#414845] hover:text-[#15382c]'} transition-all">
            Mis tareas & notas
          </button>
          <button onclick="AulaApp.setTab('calendar')" class="text-sm font-semibold py-1.5 border-b-2 ${this.state.currentTab === 'calendar' ? 'border-[#15382c] text-[#15382c]' : 'border-transparent text-[#414845] hover:text-[#15382c]'} transition-all">
            Calendario
          </button>
        `;
      }
    }
  },

  renderView() {
    const vApp = document.getElementById('view-saas-app');
    const vCourse = document.getElementById('level2-course-view');
    const vLesson = document.getElementById('level3-lesson-view');

    if (vApp) vApp.classList.add('hidden');
    if (vCourse) vCourse.classList.add('hidden');
    if (vLesson) vLesson.classList.add('hidden');

    if (this.state.currentView === 'app') {
      if (vApp) vApp.classList.remove('hidden');
      this.renderAppTab();
    } else if (this.state.currentView === 'course') {
      if (vCourse) vCourse.classList.remove('hidden');
      this.renderCourseView();
    } else if (this.state.currentView === 'lesson') {
      if (vLesson) vLesson.classList.remove('hidden');
      this.renderLessonView();
    }
  },

  renderAppTab() {
    const tabMyLearning = document.getElementById('tab-sec-my-learning');
    const tabDiscover = document.getElementById('tab-sec-discover');
    const tabAssignments = document.getElementById('tab-sec-assignments');
    const tabCalendar = document.getElementById('tab-sec-calendar');
    const tabMgmt = document.getElementById('tab-sec-management');
    const heroBanner = document.getElementById('student-hero-banner');
    const agendaWidget = document.getElementById('student-agenda-widget');

    if (tabMyLearning) tabMyLearning.classList.add('hidden');
    if (tabDiscover) tabDiscover.classList.add('hidden');
    if (tabAssignments) tabAssignments.classList.add('hidden');
    if (tabCalendar) tabCalendar.classList.add('hidden');
    if (tabMgmt) tabMgmt.classList.add('hidden');

    if (heroBanner) {
      if (this.state.currentRole === 'management') {
        heroBanner.classList.add('hidden');
        if (agendaWidget) agendaWidget.classList.add('hidden');
      } else {
        heroBanner.classList.remove('hidden');
        if (agendaWidget) agendaWidget.classList.remove('hidden');
      }
    }

    if (this.state.currentRole === 'management') {
      if (tabMgmt) tabMgmt.classList.remove('hidden');
      this.renderManagementDashboard();
      return;
    }

    if (this.state.currentTab === 'my-learning') {
      if (tabMyLearning) tabMyLearning.classList.remove('hidden');
      this.renderMyLearningTab();
    } else if (this.state.currentTab === 'discover') {
      if (tabDiscover) tabDiscover.classList.remove('hidden');
      this.renderDiscoverTab();
    } else if (this.state.currentTab === 'assignments') {
      if (tabAssignments) tabAssignments.classList.remove('hidden');
      this.renderStudentAssignmentsTab();
    } else if (this.state.currentTab === 'calendar') {
      if (tabCalendar) tabCalendar.classList.remove('hidden');
      this.renderCalendarTab();
    }
  },

  // =========================================================
  // VISTA GESTIÓN UNIFICADA (DOCENTE + ADMIN / CRM)
  // =========================================================
  renderManagementDashboard() {
    const container = document.getElementById('management-dashboard-content');
    if (!container) return;

    const sub = this.state.currentMgmtSubTab;
    const pendingCount = this.state.submittedAssignments.filter(a => a.status === 'pending').length;

    container.innerHTML = `
      <div class="space-y-8">
        <!-- Sub-Navegación del Panel de Gestión -->
        <div class="bg-white p-3 rounded-3xl border border-[#eae1da] shadow-sm flex flex-wrap items-center justify-between gap-2">
          <div class="flex flex-wrap items-center gap-1">
            <button onclick="AulaApp.setMgmtSubTab('courses')" class="px-4 py-2.5 rounded-full text-xs font-semibold transition-all ${sub === 'courses' ? 'bg-[#15382c] text-white shadow-sm' : 'text-[#414845] hover:bg-[#f5ece5]'}">
              <i class="fas fa-book-reader mr-1.5 text-[#904c2f]"></i> 1. Cursos & Módulos
            </button>
            <button onclick="AulaApp.setMgmtSubTab('grading')" class="px-4 py-2.5 rounded-full text-xs font-semibold transition-all ${sub === 'grading' ? 'bg-[#15382c] text-white shadow-sm' : 'text-[#414845] hover:bg-[#f5ece5]'}">
              <i class="fas fa-tasks mr-1.5 text-[#904c2f]"></i> 2. Centro de Revisiones
              ${pendingCount > 0 ? `<span class="ml-1.5 bg-[#904c2f] text-white px-2 py-0.5 rounded-full text-[10px] font-bold">${pendingCount}</span>` : ''}
            </button>
            <button onclick="AulaApp.setMgmtSubTab('students')" class="px-4 py-2.5 rounded-full text-xs font-semibold transition-all ${sub === 'students' ? 'bg-[#15382c] text-white shadow-sm' : 'text-[#414845] hover:bg-[#f5ece5]'}">
              <i class="fas fa-users-cog mr-1.5 text-[#904c2f]"></i> 3. CRM & Alumnos
            </button>
            <button onclick="AulaApp.setMgmtSubTab('metrics')" class="px-4 py-2.5 rounded-full text-xs font-semibold transition-all ${sub === 'metrics' ? 'bg-[#15382c] text-white shadow-sm' : 'text-[#414845] hover:bg-[#f5ece5]'}">
              <i class="fas fa-chart-bar mr-1.5 text-[#904c2f]"></i> 4. KPIs & Reportes
            </button>
            <button onclick="AulaApp.setMgmtSubTab('certificates')" class="px-4 py-2.5 rounded-full text-xs font-semibold transition-all ${sub === 'certificates' ? 'bg-[#15382c] text-white shadow-sm' : 'text-[#414845] hover:bg-[#f5ece5]'}">
              <i class="fas fa-certificate mr-1.5 text-[#904c2f]"></i> 5. Certificados
            </button>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button onclick="AulaApp.openCreateCourseWizard()" class="bg-[#904c2f] hover:bg-[#a65837] text-white px-4 py-2 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all">
              <i class="fas fa-plus-circle"></i> Crear Curso
            </button>
            <button onclick="AulaApp.scheduleLiveModal('c1')" class="bg-[#15382c] hover:bg-[#1f4a3b] text-white px-4 py-2 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all">
              <i class="fas fa-satellite-dish"></i> Agendar Vivo
            </button>
            <button onclick="AulaApp.createModuleModal('c1')" class="bg-[#f5ece5] hover:bg-[#e6d8cd] text-[#15382c] px-4 py-2 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all">
              <i class="fas fa-file-upload"></i> Subir Material
            </button>
            <a href="index.html" class="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all">
              <i class="fas fa-globe"></i> Gestión Web
            </a>
          </div>
        </div>

        <!-- Área Dinámica según Sub-Tab Seleccionado -->
        <div id="mgmt-subtab-container">
          ${this.renderMgmtSubTabContent(sub)}
        </div>
      </div>
    `;
  },

  renderMgmtSubTabContent(sub) {
    if (sub === 'courses') {
      return `
        <div class="space-y-6">
          <div class="flex items-center justify-between pb-3 border-b border-[#eae1da]">
            <div>
              <span class="text-xs font-bold uppercase text-[#904c2f]">Módulo Didáctico</span>
              <h3 class="font-display text-2xl text-[#15382c] font-normal">Cursos dictados y contenidos del programa</h3>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            ${this.state.courses.map(c => `
              <div class="bg-white p-6 rounded-3xl border border-[#eae1da] shadow-sm space-y-4 flex flex-col justify-between">
                <div class="space-y-3">
                  <div class="flex justify-between items-start">
                    <span class="inline-block px-3 py-1 rounded-full bg-[#f5ece5] text-[#904c2f] text-xs font-semibold">${c.category}</span>
                    <span class="text-xs font-bold text-[#15382c] bg-[#c5ebd9] px-3 py-1 rounded-full"><i class="fas fa-users mr-1"></i> ${c.studentsCount} Alumnos</span>
                  </div>
                  <h4 class="font-display text-xl text-[#15382c] font-normal">${c.title}</h4>
                  <p class="text-xs text-[#414845] leading-relaxed line-clamp-2">${c.description}</p>
                </div>

                <div class="space-y-2 pt-3 border-t border-[#eae1da]">
                  <div class="grid grid-cols-2 gap-2">
                    <button onclick="AulaApp.createModuleModal('${c.id}')" class="bg-[#f5ece5] text-[#15382c] hover:bg-[#15382c] hover:text-white py-2.5 rounded-full text-xs font-semibold transition-all">
                      + Módulo / Lectura
                    </button>
                    <button onclick="AulaApp.scheduleLiveModal('${c.id}')" class="bg-[#904c2f]/10 text-[#904c2f] hover:bg-[#904c2f] hover:text-white py-2.5 rounded-full text-xs font-semibold transition-all">
                      <i class="fas fa-satellite-dish mr-1"></i> Agendar en vivo
                    </button>
                  </div>
                  <button onclick="AulaApp.navigateTo('course', { courseId: '${c.id}' })" class="w-full bg-[#15382c] text-white py-2.5 rounded-full text-xs font-semibold hover:bg-[#1f4a3b] transition-all">
                    Ver vista previa del curso completo
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (sub === 'grading') {
      return `
        <div class="space-y-6">
          <div class="flex items-center justify-between pb-3 border-b border-[#eae1da]">
            <div>
              <span class="text-xs font-bold uppercase text-[#904c2f]">Centro de Revisiones Académicas</span>
              <h3 class="font-display text-2xl text-[#15382c] font-normal">Bandeja de entregas recibidas de alumnos</h3>
            </div>
          </div>

          <div class="bg-white rounded-3xl border border-[#eae1da] shadow-sm overflow-hidden p-6 space-y-4">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="border-b border-[#eae1da] text-[#15382c] font-bold">
                  <th class="pb-3">Estudiante</th>
                  <th class="pb-3">Curso & Consigna</th>
                  <th class="pb-3">Archivo adjunto</th>
                  <th class="pb-3">Fecha</th>
                  <th class="pb-3">Estado / Nota</th>
                  <th class="pb-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#eae1da]">
                ${this.state.submittedAssignments.map(a => `
                  <tr>
                    <td class="py-4 font-semibold text-[#15382c]">${a.studentName}</td>
                    <td class="py-4">
                      <div class="font-bold text-[#15382c]">${a.courseTitle}</div>
                      <div class="text-[#414845] text-[11px]">${a.assignmentTitle}</div>
                    </td>
                    <td class="py-4 text-[#904c2f] font-semibold cursor-pointer hover:underline" onclick="alert('Descargando ${a.file}...')">
                      <i class="fas fa-file-pdf mr-1"></i> ${a.file}
                    </td>
                    <td class="py-4 text-[#414845]">${a.date}</td>
                    <td class="py-4">
                      ${a.status === 'graded' ? `<span class="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-1 rounded-full">${a.grade}</span>` : `<span class="text-amber-800 font-bold bg-amber-100 px-2.5 py-1 rounded-full">Pendiente</span>`}
                    </td>
                    <td class="py-4 text-right">
                      <button onclick="AulaApp.gradeAssignmentModal('${a.id}')" class="px-4 py-2 rounded-full ${a.status === 'graded' ? 'bg-[#f5ece5] text-[#15382c]' : 'bg-[#904c2f] text-white'} text-xs font-semibold transition-all">
                        ${a.status === 'graded' ? 'Editar nota' : 'Calificar entrega'}
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (sub === 'students') {
      return `
        <div class="space-y-6">
          <div class="flex items-center justify-between pb-3 border-b border-[#eae1da]">
            <div>
              <span class="text-xs font-bold uppercase text-[#904c2f]">Módulo Administrativo & CRM</span>
              <h3 class="font-display text-2xl text-[#15382c] font-normal">Directorio de estudiantes y matriculación</h3>
            </div>
            <button onclick="AulaApp.addStudentModal()" class="bg-[#15382c] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#1f4a3b] transition-all flex items-center gap-1.5">
              <i class="fas fa-user-plus"></i> + Matricular estudiante
            </button>
          </div>

          <div class="bg-white rounded-3xl border border-[#eae1da] shadow-sm overflow-hidden p-6 space-y-4">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="border-b border-[#eae1da] text-[#15382c] font-bold">
                  <th class="pb-3">Nombre & Correo</th>
                  <th class="pb-3">Cursos inscritos</th>
                  <th class="pb-3">Progreso Promedio</th>
                  <th class="pb-3">Estado de Arancel / Pago</th>
                  <th class="pb-3 text-right">Gestión</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#eae1da]">
                ${this.state.registeredStudents.map(st => `
                  <tr>
                    <td class="py-4">
                      <div class="font-bold text-[#15382c]">${st.name}</div>
                      <div class="text-[#414845] text-[11px]">${st.email}</div>
                    </td>
                    <td class="py-4 font-semibold text-[#15382c]">${st.enrolledCount} Programa(s)</td>
                    <td class="py-4">
                      <span class="font-bold text-[#15382c]">${st.progressAvg}</span>
                    </td>
                    <td class="py-4">
                      <span class="px-3 py-1 rounded-full text-[11px] font-bold ${st.paymentStatus === 'Al día' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}">
                        ${st.paymentStatus}
                      </span>
                    </td>
                    <td class="py-4 text-right">
                      <button onclick="alert('Otorgando acceso manual a cursos para ${st.name}')" class="px-3 py-1.5 rounded-full bg-[#f5ece5] text-[#15382c] hover:bg-[#15382c] hover:text-white text-xs font-semibold transition-all">
                        Asignar acceso
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (sub === 'metrics') {
      return `
        <div class="space-y-6">
          <div class="flex items-center justify-between pb-3 border-b border-[#eae1da]">
            <div>
              <span class="text-xs font-bold uppercase text-[#904c2f]">Métricas Globales de Directores</span>
              <h3 class="font-display text-2xl text-[#15382c] font-normal">Reportes académicos y KPIs del campus</h3>
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-3xl border border-[#eae1da] shadow-sm">
              <span class="text-xs text-[#414845] font-semibold">Alumnos Activos Totales</span>
              <h4 class="text-3xl font-bold text-[#15382c] mt-2">169</h4>
              <span class="text-[10px] text-emerald-700 font-bold">+12% este mes</span>
            </div>
            <div class="bg-white p-6 rounded-3xl border border-[#eae1da] shadow-sm">
              <span class="text-xs text-[#414845] font-semibold">Tasa de Finalización</span>
              <h4 class="text-3xl font-bold text-[#15382c] mt-2">88.4%</h4>
              <span class="text-[10px] text-emerald-700 font-bold">Excelente retención</span>
            </div>
            <div class="bg-white p-6 rounded-3xl border border-[#eae1da] shadow-sm">
              <span class="text-xs text-[#414845] font-semibold">Asistencia a Clases en Vivo</span>
              <h4 class="text-3xl font-bold text-[#904c2f] mt-2">94%</h4>
              <span class="text-[10px] text-[#904c2f] font-bold">Promedio sincrónico</span>
            </div>
            <div class="bg-white p-6 rounded-3xl border border-[#eae1da] shadow-sm">
              <span class="text-xs text-[#414845] font-semibold">Recaudación / Aranceles</span>
              <h4 class="text-3xl font-bold text-[#15382c] mt-2">$14,250 USD</h4>
              <span class="text-[10px] text-emerald-700 font-bold">Balance al día</span>
            </div>
          </div>
        </div>
      `;
    } else if (sub === 'certificates') {
      return `
        <div class="space-y-6">
          <div class="flex items-center justify-between pb-3 border-b border-[#eae1da]">
            <div>
              <span class="text-xs font-bold uppercase text-[#904c2f]">Emisión de Certificados</span>
              <h3 class="font-display text-2xl text-[#15382c] font-normal">Acreditaciones y diplomas oficiales CEDEMOP</h3>
            </div>
            <button onclick="AulaApp.generateCertificateModal()" class="bg-[#904c2f] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#a65837] transition-all flex items-center gap-1.5">
              <i class="fas fa-certificate"></i> + Emitir nuevo certificado
            </button>
          </div>

          <div class="bg-white rounded-3xl border border-[#eae1da] shadow-sm overflow-hidden p-6 space-y-4">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="border-b border-[#eae1da] text-[#15382c] font-bold">
                  <th class="pb-3">Alumno Acreditado</th>
                  <th class="pb-3">Programa / Diplomatura</th>
                  <th class="pb-3">Código Hash Verificador</th>
                  <th class="pb-3">Fecha de Emisión</th>
                  <th class="pb-3 text-right">Descargar / Enviar</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#eae1da]">
                ${this.state.certificates.map(cert => `
                  <tr>
                    <td class="py-4 font-semibold text-[#15382c]">${cert.studentName}</td>
                    <td class="py-4 text-[#414845]">${cert.courseTitle}</td>
                    <td class="py-4 text-[#904c2f] font-mono font-bold">${cert.code}</td>
                    <td class="py-4 text-[#414845]">${cert.issueDate}</td>
                    <td class="py-4 text-right">
                      <button onclick="alert('Descargando certificado oficial PDF para ${cert.studentName}...')" class="px-4 py-2 rounded-full bg-[#15382c] text-white hover:bg-[#1f4a3b] text-xs font-semibold transition-all">
                        <i class="fas fa-download mr-1"></i> Descargar PDF
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
  },

  gradeAssignmentModal(subId) {
    const item = this.state.submittedAssignments.find(a => a.id === subId);
    if (!item) return;

    this.activeGradeSubId = subId;
    const modal = document.getElementById('modal-grade-assignment');
    const nameEl = document.getElementById('grade-student-name');
    if (nameEl) nameEl.textContent = `Estudiante: ${item.studentName} | Entrega: ${item.assignmentTitle}`;
    if (modal) modal.classList.remove('hidden');
  },

  submitGrade() {
    const gradeVal = document.getElementById('input-grade-value').value;
    const feedbackVal = document.getElementById('input-grade-feedback').value;
    
    if (this.activeGradeSubId && gradeVal) {
      const item = this.state.submittedAssignments.find(a => a.id === this.activeGradeSubId);
      if (item) {
        item.grade = `${gradeVal} / 10`;
        item.feedback = feedbackVal;
        item.status = 'graded';
        this.showToast(`Entrega de ${item.studentName} calificada con ${gradeVal}/10.`);
        this.renderManagementDashboard();
      }
    }
    this.closeModal('modal-grade-assignment');
    document.getElementById('input-grade-value').value = '';
    document.getElementById('input-grade-feedback').value = '';
  },

  addStudentModal() {
    const modal = document.getElementById('modal-add-student');
    if (modal) modal.classList.remove('hidden');
  },

  submitAddStudent() {
    const name = document.getElementById('input-student-name').value;
    const email = document.getElementById('input-student-email').value;
    
    if (name && email) {
      this.state.registeredStudents.push({
        id: 'st_' + Date.now(),
        name,
        email,
        enrolledCount: 1,
        status: 'Activo',
        paymentStatus: 'Al día',
        progressAvg: '0%'
      });
      this.showToast(`Estudiante "${name}" matriculado correctamente.`);
      this.renderManagementDashboard();
    }
    this.closeModal('modal-add-student');
    document.getElementById('input-student-name').value = '';
    document.getElementById('input-student-email').value = '';
  },

  generateCertificateModal() {
    const modal = document.getElementById('modal-generate-cert');
    if (modal) modal.classList.remove('hidden');
  },

  submitGenerateCert() {
    const name = document.getElementById('input-cert-name').value;
    const course = document.getElementById('input-cert-course').value;
    
    if (name && course) {
      this.state.certificates.push({
        id: 'cert_' + Date.now(),
        studentName: name,
        courseTitle: course,
        issueDate: '24/07/2026',
        code: 'CED-2026-' + Math.floor(1000 + Math.random() * 9000),
        status: 'Emitido'
      });
      this.showToast(`Certificado oficial emitido para ${name}.`);
      this.renderManagementDashboard();
    }
    this.closeModal('modal-generate-cert');
    document.getElementById('input-cert-name').value = '';
    document.getElementById('input-cert-course').value = '';
  },

  // --- SECCIÓN: VISTA ALUMNO (MIS TAREAS & NOTAS) ---
  renderStudentAssignmentsTab() {
    const container = document.getElementById('student-assignments-content');
    if (!container) return;

    container.innerHTML = `
      <div class="space-y-8 max-w-4xl mx-auto">
        <div class="flex items-center justify-between pb-3 border-b border-[#eae1da]">
          <div>
            <span class="text-xs font-bold uppercase text-[#904c2f]">Panel del Alumno</span>
            <h3 class="font-display text-2xl text-[#15382c] font-normal">Mis tareas pendientes y historial de entregas</h3>
          </div>
        </div>

        <div class="space-y-4">
          <div class="bg-white p-6 rounded-3xl border border-[#eae1da] shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase bg-amber-100 text-amber-800 px-3 py-1 rounded-full">Fecha límite: 30 de julio</span>
              <span class="text-xs text-[#414845] font-semibold">Puntaje: 10 pts</span>
            </div>
            <h4 class="font-display text-xl text-[#15382c]">Análisis de caso de ansiedad generalizada</h4>
            <p class="text-xs text-[#414845] leading-relaxed">Descarga la guía en PDF, elabora tu propuesta de intervención clínica y adjunta tu archivo en formato PDF o Word.</p>
            
            <form onsubmit="event.preventDefault(); AulaApp.showToast('¡Tarea adjuntada y enviada a revisión docente!');" class="p-5 bg-[#fff8f4] rounded-2xl border border-[#eae1da] space-y-3">
              <span class="text-xs font-bold text-[#15382c] uppercase">Adjuntar informe final</span>
              <input type="file" required class="w-full text-xs text-[#414845] file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#15382c] file:text-white hover:file:bg-[#1f4a3b]">
              <button type="submit" class="bg-[#904c2f] hover:bg-[#a65837] text-white px-7 py-3 rounded-full font-semibold text-xs transition-all shadow-md">
                Confirmar entrega de tarea
              </button>
            </form>
          </div>

          <div class="bg-white p-6 rounded-3xl border border-[#eae1da] shadow-sm space-y-3">
            <h4 class="font-display text-lg text-[#15382c]">Historial de Tareas Evaluadas</h4>
            <div class="p-4 bg-[#f5ece5] rounded-2xl flex items-center justify-between">
              <div>
                <h5 class="font-bold text-xs text-[#15382c]">Caso Práctico #1: Protocolo de crisis</h5>
                <p class="text-[11px] text-[#414845]">Entregado el 22 de julio • Devolución docente: "Excelente fundamentación teórica."</p>
              </div>
              <span class="font-bold text-sm text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">9.5 / 10</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // --- SECCIÓN: MI APRENDIZAJE ---
  renderMyLearningTab() {
    const grid = document.getElementById('my-learning-courses-grid');
    if (!grid) return;

    const enrolled = this.state.courses.filter(c => this.state.studentUser.enrolledCourses.includes(c.id));

    grid.innerHTML = enrolled.map(c => `
      <div class="bg-white rounded-3xl border border-[#eae1da] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group">
        <div class="p-6 space-y-4">
          <div class="flex justify-between items-start gap-2">
            <span class="inline-block px-3 py-1 rounded-full ${c.mode === 'sincronico' ? 'bg-[#904c2f] text-white' : 'bg-[#c5ebd9] text-[#002117]'} text-[10px] font-bold uppercase tracking-wider shadow-sm">
              ${c.mode === 'sincronico' ? '<i class="fas fa-satellite-dish mr-1"></i> Sincrónico' : '<i class="fas fa-user-clock mr-1"></i> Asincrónico'}
            </span>
          </div>
          <h3 class="font-display text-xl text-[#15382c] font-normal leading-snug group-hover:text-[#904c2f] transition-colors">${c.title}</h3>
          
          <div class="space-y-2 pt-2">
            <div class="flex justify-between text-xs font-semibold">
              <span class="text-[#414845]">Progreso del curso</span>
              <span class="text-[#15382c]">${c.progress}%</span>
            </div>
            <div class="w-full bg-[#eae1da] h-2.5 rounded-full overflow-hidden">
              <div class="bg-[#15382c] h-full rounded-full transition-all duration-500" style="width: ${c.progress}%"></div>
            </div>
          </div>
        </div>

        <div class="p-6 pt-2">
          <button onclick="AulaApp.navigateTo('course', { courseId: '${c.id}' })" class="w-full bg-[#15382c] hover:bg-[#1f4a3b] text-white py-3 rounded-full font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-2">
            <span>Entrar al aula del curso</span>
            <i class="fas fa-arrow-right text-xs"></i>
          </button>
        </div>
      </div>
    `).join('');
  },

  // --- SECCIÓN: DESCUBRIR CURSOS ---
  renderDiscoverTab() {
    const grid = document.getElementById('discover-courses-grid');
    if (!grid) return;

    let filtered = this.state.courses;
    if (this.state.activeCategory !== 'all') {
      filtered = filtered.filter(c => c.category.toLowerCase() === this.state.activeCategory.toLowerCase() || (this.state.activeCategory === 'sincronico' && c.mode === 'sincronico'));
    }

    grid.innerHTML = filtered.map(c => {
      const isEnrolled = this.state.studentUser.enrolledCourses.includes(c.id);
      return `
        <div class="bg-white rounded-3xl border border-[#eae1da] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group">
          <div>
            <div class="relative aspect-video w-full overflow-hidden bg-slate-900">
              <img src="${c.image}" alt="${c.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90">
              <span class="absolute top-3 left-3 text-[11px] font-semibold bg-white/90 text-[#15382c] px-3 py-1 rounded-full shadow-sm">${c.badge}</span>
              <span class="absolute top-3 right-3 text-xs font-semibold bg-slate-950/80 text-amber-300 px-2.5 py-1 rounded-full border border-white/20">
                ★ ${c.rating} (${c.reviewsCount})
              </span>
            </div>

            <div class="p-6 space-y-3">
              <span class="inline-block px-3 py-1 rounded-full bg-[#f5ece5] text-[#904c2f] text-xs font-semibold">${c.category}</span>
              <h3 class="font-display text-lg text-[#15382c] font-normal leading-snug group-hover:text-[#904c2f] transition-colors">${c.title}</h3>
              <p class="text-xs text-[#414845] line-clamp-2 leading-relaxed">${c.description}</p>
              
              <div class="pt-3 border-t border-[#eae1da] flex items-center justify-between text-xs text-[#414845]">
                <span><i class="fas fa-chalkboard-teacher text-[#904c2f] mr-1"></i> ${c.teacher}</span>
                <span class="font-bold text-[#15382c] text-sm">${c.price}</span>
              </div>
            </div>
          </div>

          <div class="p-6 pt-0">
            ${isEnrolled ? `
              <button onclick="AulaApp.navigateTo('course', { courseId: '${c.id}' })" class="w-full bg-[#c5ebd9] text-[#002117] py-3 rounded-full font-semibold text-xs transition-all flex items-center justify-center gap-2">
                <i class="fas fa-check-circle"></i> Ya estás inscrito (Ir al aula)
              </button>
            ` : `
              <button onclick="AulaApp.openCheckoutModal('${c.id}')" class="w-full bg-[#904c2f] hover:bg-[#a65837] text-white py-3 rounded-full font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-2">
                <i class="fas fa-shopping-cart"></i> ${c.isFree ? 'Inscribirme gratis' : 'Comprar e inscribirme'}
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');
  },

  filterCategory(cat) {
    this.state.activeCategory = cat;
    this.renderDiscoverTab();
  },

  openCheckoutModal(courseId) {
    const course = this.state.courses.find(c => c.id === courseId);
    if (!course) return;

    const modal = document.getElementById('checkout-modal');
    const titleEl = document.getElementById('checkout-course-title');
    const priceEl = document.getElementById('checkout-course-price');
    const teacherEl = document.getElementById('checkout-course-teacher');

    if (titleEl) titleEl.textContent = course.title;
    if (priceEl) priceEl.textContent = course.price;
    if (teacherEl) teacherEl.textContent = `Impartido por: ${course.teacher}`;

    if (modal) modal.classList.remove('hidden');
    this.activeCheckoutCourseId = courseId;
  },

  closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) modal.classList.add('hidden');
  },

  processCheckout() {
    const courseId = this.activeCheckoutCourseId || 'c3';
    if (!this.state.studentUser.enrolledCourses.includes(courseId)) {
      this.state.studentUser.enrolledCourses.push(courseId);
    }
    this.closeCheckoutModal();
    this.showToast('¡Inscripción confirmada exitosamente! El curso ya está en tu panel.');
    this.setTab('my-learning');
  },

  // --- SECCIÓN: CALENDARIO GOOGLE ---
  renderCalendarTab() {
    const container = document.getElementById('calendar-tab-content');
    if (!container) return;
    const course = this.state.courses[0];
    container.innerHTML = this.renderGoogleCalendarView(course, this.state.currentRole === 'management');
  },

  // --- GOOGLE CALENDAR ENGINE ---
  renderGoogleCalendarView(course, isMgmt) {
    const daysInMonth = 31;
    const firstDayOffset = 2;
    const daysHeader = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    let gridHtml = '';

    for (let i = 0; i < firstDayOffset; i++) {
      gridHtml += `<div class="bg-[#f5ece5]/30 p-2 min-h-[90px] border border-[#eae1da]/50"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === 23;
      const dayEvents = (course.events || []).filter(e => e.day === day);

      gridHtml += `
        <div class="bg-white p-2 min-h-[100px] border border-[#eae1da] flex flex-col justify-between ${isToday ? 'ring-2 ring-[#15382c] bg-[#15382c]/5' : ''}">
          <div class="flex justify-between items-center text-xs">
            <span class="font-bold ${isToday ? 'w-6 h-6 rounded-full bg-[#15382c] text-white flex items-center justify-center' : 'text-[#414845]'}">${day}</span>
            ${isToday ? '<span class="text-[9px] font-bold uppercase text-[#15382c]">Hoy</span>' : ''}
          </div>

          <div class="space-y-1 my-1">
            ${dayEvents.map(e => `
              <div onclick="AulaApp.openGoogleCalendarModal('${e.id}')" class="p-1.5 rounded-lg text-[10px] font-semibold cursor-pointer transition-all hover:scale-[1.02] shadow-sm ${
                e.type === 'live' ? 'bg-[#904c2f] text-white' : e.type === 'assignment' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-[#15382c] text-white'
              }">
                <div class="truncate font-bold">${e.time}</div>
                <div class="truncate">${e.title}</div>
              </div>
            `).join('')}
          </div>

          ${isMgmt ? `
            <button onclick="AulaApp.scheduleLiveModal('${course.id}', ${day})" class="text-[10px] text-[#15382c]/70 hover:text-[#15382c] text-left hover:underline">
              + Evento
            </button>
          ` : '<div></div>'}
        </div>
      `;
    }

    return `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-[#eae1da]">
          <div>
            <span class="text-xs uppercase text-[#904c2f] font-semibold">Calendario oficial</span>
            <h3 class="font-display text-xl text-[#15382c] font-normal flex items-center gap-2">
              <i class="fab fa-google text-red-500"></i> Calendario de clases y entregas (Julio 2026)
            </h3>
          </div>
        </div>

        <div class="bg-white rounded-3xl border border-[#eae1da] overflow-hidden shadow-sm">
          <div class="grid grid-cols-7 bg-[#f5ece5] text-center text-xs font-bold text-[#15382c] py-2.5 border-b border-[#eae1da]">
            ${daysHeader.map(d => `<div>${d}</div>`).join('')}
          </div>
          <div class="grid grid-cols-7">
            ${gridHtml}
          </div>
        </div>
      </div>
    `;
  },

  openGoogleCalendarModal(eventId) {
    const course = this.state.courses[0];
    let event = (course.events || []).find(e => e.id === eventId) || { title: 'Clase sincrónica en vivo', time: '19:00 - 20:30 Hs', day: 23, description: 'Sesión en vivo de CEDEMOP' };
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description || '')}&location=${encodeURIComponent(event.location || 'CEDEMOP Aula Virtual')}&dates=202607${event.day < 10 ? '0' + event.day : event.day}T190000Z/202607${event.day < 10 ? '0' + event.day : event.day}T203000Z`;

    const confirmSync = confirm(`Evento: ${event.title}\nHorario: ${event.time}\n\n¿Deseas añadir este evento a tu Google Calendar personal?`);
    if (confirmSync) {
      window.open(googleCalUrl, '_blank');
    }
  },

  // --- VISTA DEL CURSO (NIVEL 2) ---
  renderCourseView() {
    const course = this.state.courses.find(c => c.id === this.state.selectedCourseId) || this.state.courses[0];
    const isMgmt = this.state.currentRole === 'management';

    const titleEl = document.getElementById('course-view-title');
    const descEl = document.getElementById('course-view-desc');
    const badgeEl = document.getElementById('course-view-badge');
    const bannerLive = document.getElementById('course-live-banner');

    if (titleEl) titleEl.textContent = course.title;
    if (descEl) descEl.textContent = course.description;
    if (badgeEl) {
      badgeEl.innerHTML = course.mode === 'sincronico' 
        ? `<span class="bg-[#f5ece5] text-[#904c2f] px-3 py-1 rounded-full text-xs font-semibold uppercase"><i class="fas fa-satellite-dish mr-1"></i> Curso sincrónico</span>`
        : `<span class="bg-[#c5ebd9] text-[#002117] px-3 py-1 rounded-full text-xs font-semibold uppercase"><i class="fas fa-user-clock mr-1"></i> Curso asincrónico</span>`;
    }

    if (bannerLive) {
      if (course.mode === 'sincronico' && course.liveSchedule && course.liveSchedule.nextSession) {
        const live = course.liveSchedule.nextSession;
        const isActive = live.status === 'active';
        bannerLive.classList.remove('hidden');
        bannerLive.innerHTML = `
          <div class="p-5 ${isActive ? 'bg-[#15382c] text-white' : 'bg-[#f5ece5] border border-[#eae1da]'} rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded-full ${isActive ? 'bg-[#904c2f] animate-ping' : 'bg-amber-500'} shrink-0"></div>
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-white bg-white/20' : 'text-amber-800 bg-amber-100'} px-2.5 py-0.5 rounded-full">
                  ${isActive ? '🔴 CLASE EN VIVO EN TRANSCURSO' : '⏳ PRÓXIMA SESIÓN PROGRAMADA'}
                </span>
                <h4 class="font-display text-lg text-white font-normal mt-1">${live.title}</h4>
                <p class="text-xs text-white/80">Horario: <strong>${live.date} a las ${live.time}</strong> • Docente: ${course.teacher}</p>
              </div>
            </div>
            ${isActive ? `
              <button onclick="AulaApp.navigateTo('lesson', { courseId: '${course.id}', moduleId: 'm2', lessonId: 'l3' })" class="bg-[#904c2f] hover:bg-[#a65837] text-white px-7 py-3 rounded-full font-semibold text-xs transition-all shadow-md flex items-center gap-2 shrink-0">
                <i class="fas fa-video"></i> Unirse a la videollamada real
              </button>
            ` : `
              <button disabled class="bg-[#eae1da] text-[#414845]/60 px-7 py-3 rounded-full font-semibold text-xs cursor-not-allowed flex items-center gap-2 shrink-0 border border-[#eae1da]">
                <i class="fas fa-lock"></i> Videollamada habilitada en horario
              </button>
            `}
          </div>
        `;
      } else {
        bannerLive.classList.add('hidden');
      }
    }

    this.renderCourseTabContent(course, isMgmt);
  },

  renderCourseTabContent(course, isMgmt) {
    const tabContainer = document.getElementById('course-tab-content');
    if (!tabContainer) return;

    const currentTab = this.state.selectedCourseTab;

    if (currentTab === 'modules') {
      tabContainer.innerHTML = `
        <div class="space-y-6">
          <div class="flex items-center justify-between pb-3 border-b border-[#eae1da]">
            <h3 class="font-display text-xl text-[#15382c] font-normal">Módulos y lecciones del programa</h3>
            ${isMgmt ? `
              <button onclick="AulaApp.createModuleModal('${course.id}')" class="bg-[#15382c] text-white px-5 py-2.5 rounded-full font-semibold text-xs hover:bg-[#1f4a3b] transition-all flex items-center gap-1.5">
                + Crear módulo / lectura
              </button>
            ` : ''}
          </div>

          <div class="space-y-4">
            ${course.modules.map((m, mIdx) => `
              <div class="bg-white rounded-3xl border border-[#eae1da] overflow-hidden shadow-sm">
                <div class="p-5 bg-[#f5ece5]/60 border-b border-[#eae1da] flex items-center justify-between">
                  <div>
                    <span class="text-xs uppercase text-[#904c2f] font-bold">Unidad ${mIdx + 1}</span>
                    <h4 class="font-display text-base text-[#15382c] font-normal">${m.title}</h4>
                    ${m.description ? `<p class="text-xs text-[#414845]">${m.description}</p>` : ''}
                  </div>
                  <span class="text-xs font-semibold text-[#15382c] bg-white px-3 py-1 rounded-full border border-[#eae1da]">
                    ${m.lessons.length} contenidos
                  </span>
                </div>

                <div class="divide-y divide-[#eae1da]">
                  ${m.lessons.map(l => `
                    <div class="p-4 hover:bg-[#f5ece5]/30 transition-colors flex items-center justify-between gap-4">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl ${l.type === 'live' ? 'bg-[#904c2f]/15 text-[#904c2f]' : 'bg-[#15382c]/10 text-[#15382c]'} flex items-center justify-center text-sm shrink-0">
                          <i class="fas ${l.type === 'video' ? 'fa-play-circle' : l.type === 'pdf' ? 'fa-file-pdf' : l.type === 'live' ? 'fa-satellite-dish' : 'fa-tasks'}"></i>
                        </div>
                        <div>
                          <div class="flex items-center gap-2">
                            <h5 class="font-semibold text-xs text-[#15382c]">${l.title}</h5>
                            ${l.completed ? `<span class="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Completada</span>` : ''}
                          </div>
                          <span class="text-xs text-[#414845]">${l.duration || l.size || l.date || 'Evaluación'}</span>
                        </div>
                      </div>

                      <button onclick="AulaApp.navigateTo('lesson', { courseId: '${course.id}', moduleId: '${m.id}', lessonId: '${l.id}' })" class="px-5 py-2 rounded-full bg-[#f5ece5] text-[#15382c] font-semibold text-xs hover:bg-[#15382c] hover:text-white transition-all shrink-0">
                        ${l.type === 'live' && l.isLiveActive ? 'Entrar a videollamada' : 'Ver contenido'}
                      </button>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (currentTab === 'calendar') {
      tabContainer.innerHTML = this.renderGoogleCalendarView(course, isMgmt);
    } else if (currentTab === 'assignments') {
      tabContainer.innerHTML = `
        <div class="space-y-6">
          <div class="flex items-center justify-between pb-3 border-b border-[#eae1da]">
            <h3 class="font-display text-xl text-[#15382c] font-normal">Tareas y consignas prácticas</h3>
          </div>

          <div class="space-y-4">
            <div class="bg-white p-6 rounded-3xl border border-[#eae1da] shadow-sm space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase bg-amber-100 text-amber-800 px-3 py-1 rounded-full">Fecha límite: 30 de julio</span>
                <span class="text-xs text-[#414845]">Puntaje: 10 pts</span>
              </div>
              <h4 class="font-display text-base text-[#15382c] font-normal">Análisis de caso de ansiedad generalizada</h4>
              <p class="text-xs text-[#414845]">Descarga la guía en PDF, elabora tu propuesta de intervención clínica y adjunta tu archivo en formato PDF o Word.</p>
              
              <div class="pt-3 border-t border-[#eae1da] flex justify-end">
                <button onclick="AulaApp.navigateTo('lesson', { courseId: '${course.id}', moduleId: 'm2', lessonId: 'l4' })" class="bg-[#15382c] text-white px-6 py-2.5 rounded-full font-semibold text-xs hover:bg-[#1f4a3b] transition-all">
                  Ver consigna y entregar tarea
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (currentTab === 'grades') {
      tabContainer.innerHTML = `
        <div class="space-y-6">
          <div class="flex items-center justify-between pb-3 border-b border-[#eae1da]">
            <h3 class="font-display text-xl text-[#15382c] font-normal">Libro de calificaciones</h3>
          </div>

          <div class="bg-white rounded-3xl border border-[#eae1da] overflow-hidden p-6 space-y-4 shadow-sm">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="border-b border-[#eae1da] text-[#15382c] font-bold">
                  <th class="pb-3">Evaluación / Actividad</th>
                  <th class="pb-3">Estado</th>
                  <th class="pb-3">Calificación</th>
                  <th class="pb-3">Devolución</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#eae1da]">
                <tr>
                  <td class="py-3 font-semibold text-[#15382c]">Cuestionario Módulo 1</td>
                  <td class="py-3"><span class="text-emerald-700 font-bold">Aprobado</span></td>
                  <td class="py-3 font-bold text-[#15382c]">10 / 10</td>
                  <td class="py-3 text-[#414845]">Excelente desempeño.</td>
                </tr>
                <tr>
                  <td class="py-3 font-semibold text-[#15382c]">Caso Práctico #1</td>
                  <td class="py-3"><span class="text-emerald-700 font-bold">Calificado</span></td>
                  <td class="py-3 font-bold text-[#15382c]">9.5 / 10</td>
                  <td class="py-3 text-[#414845]">Muy buen desarrollo metodológico.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
  },

  // --- VISTA DE LECCIÓN (NIVEL 3) ---
  renderLessonView() {
    const course = this.state.courses.find(c => c.id === this.state.selectedCourseId) || this.state.courses[0];
    let lesson = null;
    let module = null;

    course.modules.forEach(m => {
      const found = m.lessons.find(l => l.id === this.state.selectedLessonId);
      if (found) {
        lesson = found;
        module = m;
      }
    });

    if (!lesson) {
      module = course.modules[0];
      lesson = module.lessons[0];
    }

    const bcCourse = document.getElementById('lesson-bc-course');
    const bcModule = document.getElementById('lesson-bc-module');
    const bcLesson = document.getElementById('lesson-bc-title');
    const titleEl = document.getElementById('lesson-main-title');

    if (bcCourse) bcCourse.textContent = course.title;
    if (bcModule) bcModule.textContent = module.title;
    if (bcLesson) bcLesson.textContent = lesson.title;
    if (titleEl) titleEl.textContent = lesson.title;

    const contentArea = document.getElementById('lesson-content-area');
    if (!contentArea) return;

    if (lesson.type === 'video') {
      contentArea.innerHTML = `
        <div class="space-y-4">
          <div class="aspect-video w-full rounded-3xl overflow-hidden shadow-md border border-[#eae1da] bg-slate-950">
            <iframe class="w-full h-full" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" title="Video de la lección" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div class="p-6 bg-white rounded-3xl border border-[#eae1da] space-y-3 shadow-sm">
            <h4 class="font-display text-lg text-[#15382c] font-normal">Notas y recursos de la lección</h4>
            <p class="text-xs text-[#414845] leading-relaxed">${lesson.notes || 'Revisa el material adjunto para complementar esta clase grabada.'}</p>
            <div class="pt-3 border-t border-[#eae1da] flex justify-between items-center">
              <button onclick="AulaApp.showToast('¡Lección marcada como completada!')" class="bg-emerald-700 text-white px-6 py-2.5 rounded-full font-semibold text-xs hover:bg-emerald-800 transition-all flex items-center gap-1.5">
                <i class="fas fa-check-circle"></i> Marcar como completada
              </button>
            </div>
          </div>
        </div>
      `;
    } else if (lesson.type === 'pdf') {
      contentArea.innerHTML = `
        <div class="p-8 bg-white rounded-3xl border border-[#eae1da] shadow-sm space-y-6 text-center">
          <div class="w-16 h-16 bg-red-100 text-red-700 rounded-2xl flex items-center justify-center mx-auto text-3xl">
            <i class="fas fa-file-pdf"></i>
          </div>
          <div class="space-y-2">
            <h4 class="font-display text-xl text-[#15382c] font-normal">${lesson.title}</h4>
            <p class="text-xs text-[#414845] max-w-md mx-auto">Documentación clínica y lecturas fundamentales del módulo. Tamaño: ${lesson.size || '1.8 MB'}</p>
          </div>
          <div class="flex justify-center gap-3">
            <a href="#" onclick="alert('Descargando archivo PDF...'); return false;" class="bg-[#15382c] text-white px-8 py-3 rounded-full font-semibold text-xs hover:bg-[#1f4a3b] transition-all shadow-md flex items-center gap-2">
              <i class="fas fa-download"></i> Descargar PDF oficial
            </a>
          </div>
        </div>
      `;
    } else if (lesson.type === 'live') {
      contentArea.innerHTML = `
        <div class="space-y-4">
          <div id="jitsi-lesson-room" class="relative w-full aspect-video bg-slate-950 rounded-3xl overflow-hidden shadow-md border border-[#eae1da] flex items-center justify-center">
            <div id="jitsi-lesson-placeholder" class="relative w-full h-full flex flex-col items-center justify-center text-white text-center p-6 bg-cover bg-center" style="background-image: linear-gradient(rgba(21, 56, 44, 0.85), rgba(21, 56, 44, 0.95)), url('imagenes/wp-uploads/312207595_1964040763781774_318542561535812704_n.jpg');">
              <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-md cursor-pointer hover:scale-110 transition-transform shadow-lg" onclick="AulaApp.startJitsiInLesson()">
                <i class="fas fa-video text-2xl text-white"></i>
              </div>
              <span class="text-xs font-bold uppercase tracking-widest text-[#ffdbce] bg-white/10 px-3.5 py-1 rounded-full mb-2 backdrop-blur-sm">Sesión sincrónica en vivo</span>
              <h4 class="font-display text-xl font-normal max-w-lg leading-tight mb-2">Sala de transmisión del módulo</h4>
              <p class="text-xs text-white/80 max-w-md mb-5">Conéctate a la videollamada interactiva con tu docente y compañeros.</p>
              <button onclick="AulaApp.startJitsiInLesson()" class="bg-[#904c2f] hover:bg-[#a65837] text-white px-8 py-3 rounded-full font-semibold text-xs transition-all shadow-lg flex items-center gap-2">
                <i class="fas fa-plug"></i> Unirse a la clase en vivo ahora
              </button>
            </div>
            <div id="jitsi-lesson-iframe-container" class="hidden w-full h-full"></div>
          </div>

          <div class="p-4 bg-white rounded-2xl border border-[#eae1da] flex items-center justify-between">
            <span class="text-xs text-[#414845] font-medium">Estado: <strong class="text-emerald-700 font-bold">Transmisión activa</strong></span>
            <button onclick="AulaApp.leaveJitsiInLesson()" class="px-5 py-2 rounded-full bg-red-100 text-red-700 font-semibold text-xs hover:bg-red-200 transition-all">
              Salir de la videollamada
            </button>
          </div>
        </div>
      `;
    } else if (lesson.type === 'assignment') {
      contentArea.innerHTML = `
        <div class="bg-white p-8 rounded-3xl border border-[#eae1da] shadow-sm space-y-6">
          <div class="space-y-2">
            <span class="text-xs font-bold uppercase bg-amber-100 text-amber-800 px-3 py-1 rounded-full">Fecha de entrega: 30 de julio</span>
            <h4 class="font-display text-xl text-[#15382c] font-normal">${lesson.title}</h4>
            <p class="text-xs text-[#414845] leading-relaxed">${lesson.instructions || 'Instrucciones de la tarea práctica.'}</p>
          </div>

          <form onsubmit="event.preventDefault(); AulaApp.showToast('¡Tarea enviada con éxito!');" class="p-6 bg-[#fff8f4] rounded-3xl border border-[#eae1da] space-y-4">
            <h5 class="font-bold text-xs text-[#15382c] uppercase">Zona de subida de archivo</h5>
            <input type="file" required class="w-full text-xs text-[#414845] file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#15382c] file:text-white hover:file:bg-[#1f4a3b]">
            <button type="submit" class="bg-[#904c2f] hover:bg-[#a65837] text-white px-7 py-3 rounded-full font-semibold text-xs transition-all shadow-md">
              Adjuntar y entregar evaluación
            </button>
          </form>
        </div>
      `;
    }
  },

  startJitsiInLesson() {
    const placeholder = document.getElementById('jitsi-lesson-placeholder');
    const container = document.getElementById('jitsi-lesson-iframe-container');
    if (placeholder && container) {
      placeholder.classList.add('hidden');
      container.classList.remove('hidden');

      const domain = 'meet.jit.si';
      const options = {
        roomName: 'CEDEMOP_AulaVirtual_Modulo2_ClaseLive',
        width: '100%',
        height: '100%',
        parentNode: container,
        userInfo: {
          displayName: this.state.currentRole === 'management' ? `${this.state.mgmtUser.name} (Director/Docente)` : `${this.state.studentUser.name} (Alumno)`
        }
      };
      this.jitsiApi = new JitsiMeetExternalAPI(domain, options);
    }
  },

  leaveJitsiInLesson() {
    if (this.jitsiApi) {
      this.jitsiApi.dispose();
      this.jitsiApi = null;
    }
    const placeholder = document.getElementById('jitsi-lesson-placeholder');
    const container = document.getElementById('jitsi-lesson-iframe-container');
    if (placeholder && container) {
      container.classList.add('hidden');
      placeholder.classList.remove('hidden');
    }
  },

  createModuleModal(courseId) {
    this.activeCourseIdForModule = courseId;
    const modal = document.getElementById('modal-create-module');
    if (modal) modal.classList.remove('hidden');
  },

  submitCreateModule() {
    const title = document.getElementById('input-module-title').value;
    if (title && this.activeCourseIdForModule) {
      const course = this.state.courses.find(c => c.id === this.activeCourseIdForModule);
      if (course) {
        course.modules.push({
          id: 'm_' + Date.now(),
          title,
          description: 'Nuevo módulo añadido por la cátedra.',
          lessons: [
            { id: 'l_' + Date.now(), title: 'Clase 1: Introducción', type: 'video', duration: '30 min', completed: false }
          ]
        });
        this.renderCourseView();
        this.showToast(`Módulo "${title}" creado exitosamente.`);
      }
    }
    this.closeModal('modal-create-module');
    document.getElementById('input-module-title').value = '';
  },

  scheduleLiveModal(courseId, day = 25) {
    this.activeCourseIdForLive = courseId;
    const dayInput = document.getElementById('input-live-day');
    if (dayInput) dayInput.value = day;
    const modal = document.getElementById('modal-schedule-live');
    if (modal) modal.classList.remove('hidden');
  },

  submitScheduleLive() {
    const title = document.getElementById('input-live-title').value;
    const day = document.getElementById('input-live-day').value;
    
    if (title && day && this.activeCourseIdForLive) {
      const course = this.state.courses.find(c => c.id === this.activeCourseIdForLive);
      if (course) {
        if (!course.events) course.events = [];
        course.events.push({
          id: 'e_' + Date.now(),
          day: Number(day),
          title,
          time: '19:00 - 20:30 Hs',
          type: 'live',
          location: 'Sala virtual CEDEMOP',
          description: 'Sesión sincrónica en vivo de cátedra.'
        });
        
        // Ensure calendar re-renders if we are looking at it
        if (this.state.currentView === 'course' && this.state.selectedCourseTab === 'calendar') {
          this.renderCourseView();
        } else if (this.state.currentTab === 'calendar') {
          this.renderCalendarTab();
        } else {
          this.renderCourseView(); // default fallback
        }
        
        this.showToast(`Clase "${title}" agendada en el calendario para el día ${day}.`);
      }
    }
    this.closeModal('modal-schedule-live');
    document.getElementById('input-live-title').value = '';
  },

  openCreateCourseWizard() {
    const modal = document.getElementById('modal-create-course');
    if (modal) modal.classList.remove('hidden');
  },

  submitCreateCourse() {
    const title = document.getElementById('input-course-title').value;
    if (title) {
      this.state.courses.push({
        id: 'c_' + Date.now(),
        title,
        mode: 'asincronico',
        category: 'Diplomatura',
        teacher: this.state.mgmtUser.name,
        rating: 5.0,
        reviewsCount: 0,
        price: '$150 USD',
        isFree: false,
        badge: 'Nuevo',
        progress: 0,
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
        description: 'Nuevo programa publicado desde el panel de gestión unificado.',
        studentsCount: 0,
        modules: [],
        events: []
      });
      this.showToast(`Curso "${title}" creado e incorporado al catálogo.`);
      this.renderManagementDashboard();
    }
    this.closeModal('modal-create-course');
    document.getElementById('input-course-title').value = '';
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('hidden');
  },

  toggleNotificationsMenu() {
    const menu = document.getElementById('notifications-dropdown');
    if (menu) menu.classList.toggle('hidden');
  },

  toggleProfileMenu() {
    const menu = document.getElementById('profile-dropdown');
    if (menu) menu.classList.toggle('hidden');
  },

  showToast(msg) {
    let toast = document.getElementById('cedemop-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'cedemop-toast';
      toast.className = 'fixed bottom-6 right-6 z-50 bg-[#15382c] text-white px-6 py-3.5 rounded-2xl shadow-2xl font-medium text-xs border border-white/20 transition-all transform translate-y-10 opacity-0 flex items-center gap-2';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fas fa-check-circle text-[#904c2f]"></i> ${msg}`;
    toast.classList.remove('translate-y-10', 'opacity-0');
    setTimeout(() => {
      toast.classList.add('translate-y-10', 'opacity-0');
    }, 3500);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => AulaApp.init());
} else {
  AulaApp.init();
}
