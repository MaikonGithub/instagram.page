// Configurações e variáveis globais
const CONFIG = {
    animationDuration: 800,
    particleCount: 20
};

// Elementos DOM
const elements = {
    menuItems: document.querySelectorAll('.menu-item'),
    contentSections: document.querySelectorAll('.content-section'),
    sectionTitle: document.getElementById('section-title'),
    particles: document.querySelector('.particles'),
    sidebar: document.getElementById('sidebar'),
    sidebarToggle: document.getElementById('sidebar-toggle')
};

// Estado da aplicação
let currentSection = 0;
let isAnimating = false;
let particles = [];
let sidebarCollapsed = false;
let autoCollapseEnabled = true; // Controla se deve recolher automaticamente

// Inicialização
function init() {
    console.log('🚀 Inicializando portfólio em Swift...');
    
    setupParticles();
    setupEventListeners();
    setupNavigation();
    setupSidebarToggle();
    restoreSidebarState();
    
    console.log('✅ Portfólio inicializado com sucesso!');
}

// Sistema de partículas
function setupParticles() {
    for (let i = 0; i < CONFIG.particleCount; i++) {
        createParticle();
    }
    animateParticles();
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: #58a6ff;
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.3;
    `;
    
    const particleData = {
        element: particle,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random() * 100 + 50
    };
    
    elements.particles.appendChild(particle);
    particles.push(particleData);
}

function animateParticles() {
    particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        
        if (particle.life <= 0) {
            particle.element.remove();
            particles.splice(index, 1);
            createParticle();
        } else {
            particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
            particle.element.style.opacity = particle.life / 150;
        }
    });
    
    requestAnimationFrame(animateParticles);
}

// Sistema de navegação
function setupNavigation() {
    const sectionTitles = {
        'profile': 'Profile',
        'repositories': 'Repositórios',
        'projects': 'Projetos',
        'contact': 'Contato'
    };
    
    elements.menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            const link = item.dataset.link;
            
            if (link) {
                // Abrir link externo
                window.open(link, '_blank');
            } else if (section) {
                // Navegar para seção
                switchSection(section);
            }
        });
    });
    
    // Download do currículo
    document.querySelector('.download-btn')?.addEventListener('click', () => {
        // Simular download
        console.log('Download do currículo iniciado');
        // Aqui você pode implementar o download real
    });
}

function switchSection(sectionName) {
    // Remover active de todos os itens
    elements.menuItems.forEach(item => item.classList.remove('active'));
    elements.contentSections.forEach(section => section.classList.remove('active'));
    
    // Ativar item selecionado
    const activeItem = document.querySelector(`[data-section="${sectionName}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
    
    // Ativar seção correspondente
    const activeSection = document.getElementById(`${sectionName}-content`);
    if (activeSection) {
        activeSection.classList.add('active');
    }
    
    // Atualizar título
    const sectionTitles = {
        'profile': 'Profile',
        'repositories': 'Repositórios', 
        'projects': 'Projetos',
        'contact': 'Contato'
    };
    
    if (elements.sectionTitle && sectionTitles[sectionName]) {
        elements.sectionTitle.textContent = sectionTitles[sectionName];
    }
    
    // Auto-collapse após escolher seção (se habilitado)
    if (autoCollapseEnabled && !sidebarCollapsed) {
        setTimeout(() => {
            sidebarCollapsed = true;
            elements.sidebar.classList.add('collapsed');
            elements.sidebarToggle.classList.add('collapsed');
        }, 300); // Pequeno delay para suavizar a transição
    }
}

// Toggle do sidebar
function setupSidebarToggle() {
    elements.sidebarToggle.addEventListener('click', () => {
        toggleSidebar();
    });
}

function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
    
    if (sidebarCollapsed) {
        elements.sidebar.classList.add('collapsed');
        elements.sidebarToggle.classList.add('collapsed');
        autoCollapseEnabled = false; // Desabilita auto-collapse quando manualmente recolhido
    } else {
        elements.sidebar.classList.remove('collapsed');
        elements.sidebarToggle.classList.remove('collapsed');
        autoCollapseEnabled = true; // Habilita auto-collapse quando expandido
    }
    
    // Salvar estado no localStorage
    localStorage.setItem('sidebarCollapsed', sidebarCollapsed);
}

// Restaurar estado do sidebar
function restoreSidebarState() {
    // Sempre começar expandido por padrão
    sidebarCollapsed = false;
    elements.sidebar.classList.remove('collapsed');
    elements.sidebarToggle.classList.remove('collapsed');
    autoCollapseEnabled = true;
}

// Scroll suave
function smoothScrollTo(targetY, callback) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = CONFIG.animationDuration;
    let start = null;
    
    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutCubic(timeElapsed, startY, distance, duration);
        
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        } else {
            if (callback) callback();
        }
    }
    
    requestAnimationFrame(animation);
}

// Função de easing
function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
}

// Event listeners
function setupEventListeners() {
    // Navegação por teclado
    document.addEventListener('keydown', handleKeyPress);
    
    // Efeitos de hover nos itens do menu
    elements.menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (!item.classList.contains('active')) {
                item.style.transform = 'translateX(5px)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });
}

// Navegação por teclado
function handleKeyPress(event) {
    switch(event.key) {
        case '1':
            event.preventDefault();
            switchSection('profile');
            break;
        case '2':
            event.preventDefault();
            switchSection('repositories');
            break;
        case '3':
            event.preventDefault();
            switchSection('projects');
            break;
        case '4':
            event.preventDefault();
            switchSection('contact');
            break;
    }
}

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Logs para debug
console.log('📱 Portfólio Swift carregado - Design moderno com animações');
console.log('🎮 Controles: Teclas 1-4 para navegar entre seções');
