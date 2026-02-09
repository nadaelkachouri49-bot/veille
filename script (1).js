// NAVIGATION ENTRE SECTIONS
class NavigationManager {
    constructor() {
        this.navItems = document.querySelectorAll('.nav-item');
        this.sections = document.querySelectorAll('.section');
        this.init();
    }

    init() {
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = item.getAttribute('data-section');
                this.switchSection(targetSection);
            });
        });
    }

    switchSection(targetId) {
        // Désactiver tous les items de navigation
        this.navItems.forEach(item => item.classList.remove('active'));
        
        // Masquer toutes les sections
        this.sections.forEach(section => section.classList.remove('active'));
        
        // Activer l'item cliqué
        const activeItem = document.querySelector(`[data-section="${targetId}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
        
        // Afficher la section cible
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }
}

// COPIE DU PROMPT
class PromptManager {
    constructor() {
        this.copyBtn = document.getElementById('copyPromptBtn');
        this.promptContent = document.getElementById('promptContent');
        this.copyStatus = document.getElementById('copyStatus');
        this.init();
    }

    init() {
        if (this.copyBtn && this.promptContent) {
            this.copyBtn.addEventListener('click', () => this.copyPrompt());
        }
    }

    async copyPrompt() {
        try {
            const text = this.promptContent.textContent;
            await navigator.clipboard.writeText(text);
            this.showSuccess();
        } catch (err) {
            console.error('Erreur de copie:', err);
            this.showError();
        }
    }

    showSuccess() {
        this.copyBtn.textContent = 'COPIÉ';
        this.copyStatus.textContent = 'Prompt copié dans le presse-papier';
        
        setTimeout(() => {
            this.copyBtn.textContent = 'COPIER LE PROMPT';
            this.copyStatus.textContent = '';
        }, 3000);
    }

    showError() {
        this.copyStatus.textContent = 'Erreur lors de la copie';
        setTimeout(() => {
            this.copyStatus.textContent = '';
        }, 3000);
    }
}

// BOUTON GO TO PROMPT
class QuickActionsManager {
    constructor() {
        this.goToPromptBtn = document.getElementById('goToPrompt');
        this.init();
    }

    init() {
        if (this.goToPromptBtn) {
            this.goToPromptBtn.addEventListener('click', () => {
                const navManager = new NavigationManager();
                navManager.switchSection('prompt');
            });
        }
    }
}

// ANIMATIONS AU SCROLL
class AnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, this.observerOptions);

        // Observer tous les éléments animables
        const animatableElements = document.querySelectorAll('.quick-access-card, .workflow-step, .source-category');
        animatableElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }
}

// GESTION DES LIENS EXTERNES
class ExternalLinksManager {
    constructor() {
        this.init();
    }

    init() {
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        externalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Ajouter un effet visuel au clic
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = 'scale(1)';
                }, 200);
            });
        });
    }
}

// HOVER EFFECTS AVANCÉS
class HoverEffectsManager {
    constructor() {
        this.init();
    }

    init() {
        const cards = document.querySelectorAll('.quick-access-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createRipple(e, card);
            });
        });
    }

    createRipple(event, element) {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        element.style.setProperty('--mouse-x', `${x}px`);
        element.style.setProperty('--mouse-y', `${y}px`);
    }
}

// SYSTÈME DE CACHE LOCAL
class CacheManager {
    constructor() {
        this.storageKey = 'bioplants_veille_data';
    }

    saveLastVisit() {
        const data = {
            timestamp: new Date().toISOString(),
            lastSection: this.getCurrentSection()
        };
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    getCurrentSection() {
        const activeSection = document.querySelector('.section.active');
        return activeSection ? activeSection.id : 'dashboard';
    }

    loadLastVisit() {
        try {
            const data = localStorage.getItem(this.storageKey);
            if (data) {
                const parsed = JSON.parse(data);
                return parsed;
            }
        } catch (err) {
            console.error('Erreur de chargement du cache:', err);
        }
        return null;
    }
}

// RACCOURCIS CLAVIER
class KeyboardShortcutsManager {
    constructor() {
        this.shortcuts = {
            '1': 'dashboard',
            '2': 'sources',
            '3': 'prompt',
            '4': 'workflow'
        };
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            // Alt + Numéro pour changer de section
            if (e.altKey && this.shortcuts[e.key]) {
                e.preventDefault();
                const navManager = new NavigationManager();
                navManager.switchSection(this.shortcuts[e.key]);
            }

            // Ctrl/Cmd + K pour copier le prompt
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const promptManager = new PromptManager();
                promptManager.copyPrompt();
            }
        });
    }
}

// MONITORING DE PERFORMANCE
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            loadTime: 0,
            renderTime: 0
        };
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            this.calculateMetrics();
        });
    }

    calculateMetrics() {
        const perfData = performance.timing;
        this.metrics.loadTime = perfData.loadEventEnd - perfData.navigationStart;
        this.metrics.renderTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
        
        console.log('BIOPLANTS Performance:', this.metrics);
    }
}

// SYSTÈME DE LOGS
class Logger {
    constructor() {
        this.enabled = true;
        this.prefix = '[BIOPLANTS]';
    }

    log(message, type = 'info') {
        if (!this.enabled) return;

        const timestamp = new Date().toISOString();
        const formattedMessage = `${this.prefix} [${timestamp}] ${message}`;

        switch (type) {
            case 'error':
                console.error(formattedMessage);
                break;
            case 'warn':
                console.warn(formattedMessage);
                break;
            default:
                console.log(formattedMessage);
        }
    }
}

// GESTIONNAIRE PRINCIPAL
class BioPlantsApp {
    constructor() {
        this.logger = new Logger();
        this.init();
    }

    init() {
        this.logger.log('Initialisation de l\'application');

        // Initialiser tous les modules
        this.navigation = new NavigationManager();
        this.promptManager = new PromptManager();
        this.quickActions = new QuickActionsManager();
        this.animations = new AnimationManager();
        this.externalLinks = new ExternalLinksManager();
        this.hoverEffects = new HoverEffectsManager();
        this.cache = new CacheManager();
        this.keyboard = new KeyboardShortcutsManager();
        this.performance = new PerformanceMonitor();

        // Sauvegarder la visite au déchargement
        window.addEventListener('beforeunload', () => {
            this.cache.saveLastVisit();
        });

        this.logger.log('Application initialisée avec succès');
    }
}

// DÉMARRAGE DE L'APPLICATION
document.addEventListener('DOMContentLoaded', () => {
    const app = new BioPlantsApp();
    
    // Exposer l'app globalement pour le debug
    window.BioPlantsApp = app;
});

// GESTION DES ERREURS GLOBALES
window.addEventListener('error', (event) => {
    console.error('Erreur globale:', event.error);
});

// GESTION DES PROMESSES NON GÉRÉES
window.addEventListener('unhandledrejection', (event) => {
    console.error('Promesse rejetée:', event.reason);
});