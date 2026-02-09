// ========================================
// GESTION DES ONGLETS
// ========================================
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Retirer la classe active de tous les onglets
            tabs.forEach(t => t.classList.remove('active'));
            
            // Retirer la classe active de toutes les sections
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(s => s.classList.remove('active'));
            
            // Activer l'onglet cliqué
            this.classList.add('active');
            
            // Activer la section correspondante
            const targetSection = document.getElementById(targetTab);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}

// ========================================
// COPIE DU PROMPT
// ========================================
function initCopyPrompt() {
    const copyBtn = document.getElementById('copyPromptBtn');
    const promptBox = document.getElementById('promptBox');
    
    if (copyBtn && promptBox) {
        copyBtn.addEventListener('click', function() {
            const promptText = promptBox.textContent;
            
            navigator.clipboard.writeText(promptText).then(() => {
                // Feedback visuel
                copyBtn.textContent = '✅ Copié !';
                copyBtn.classList.add('copied');
                
                // Retour à l'état normal après 2 secondes
                setTimeout(() => {
                    copyBtn.textContent = '📋 Copier';
                    copyBtn.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Erreur lors de la copie:', err);
                alert('Erreur lors de la copie. Veuillez réessayer.');
            });
        });
    }
}

// ========================================
// SECTIONS PLIABLES / DÉPLIABLES
// ========================================
function initCollapse() {
    const collapseHeaders = document.querySelectorAll('.collapse-header');
    
    collapseHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-collapse');
            const content = document.getElementById(`content-${targetId}`);
            const arrow = this.querySelector('.arrow');
            
            if (content && arrow) {
                content.classList.toggle('open');
                arrow.classList.toggle('open');
            }
        });
    });
}

// ========================================
// RECHERCHE EN TEMPS RÉEL
// ========================================
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const keywords = document.querySelectorAll('.keyword-tag');
            
            // Réinitialiser tous les tags
            keywords.forEach(tag => {
                tag.classList.remove('highlight');
            });
            
            // Highlight les mots-clés correspondants
            if (searchTerm.length > 2) {
                keywords.forEach(tag => {
                    const tagText = tag.textContent.toLowerCase();
                    
                    if (tagText.includes(searchTerm)) {
                        tag.classList.add('highlight');
                        
                        // Scroll vers le premier résultat
                        const firstHighlight = document.querySelector('.keyword-tag.highlight');
                        if (firstHighlight && tag === firstHighlight) {
                            tag.scrollIntoView({ 
                                behavior: 'smooth', 
                                block: 'center' 
                            });
                        }
                    }
                });
            }
        });
    }
}

// ========================================
// SAUVEGARDE DE LA CHECKLIST
// ========================================
function initChecklist() {
    const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        // Charger l'état sauvegardé
        const savedState = localStorage.getItem(checkbox.id);
        if (savedState === 'true') {
            checkbox.checked = true;
        }
        
        // Sauvegarder lors du changement
        checkbox.addEventListener('change', function() {
            localStorage.setItem(this.id, this.checked);
            
            // Animation de validation
            const li = this.closest('li');
            if (this.checked) {
                li.style.animation = 'checkAnimation 0.5s ease';
            } else {
                li.style.animation = 'none';
            }
        });
    });
}

// ========================================
// BOUTON DE RÉINITIALISATION DE LA CHECKLIST
// ========================================
function createResetButton() {
    const checklistCard = document.querySelector('#checklist .card');
    
    if (checklistCard) {
        const resetBtn = document.createElement('button');
        resetBtn.textContent = '🔄 Réinitialiser la checklist';
        resetBtn.className = 'copy-btn';
        resetBtn.style.position = 'relative';
        resetBtn.style.display = 'block';
        resetBtn.style.margin = '1rem auto';
        
        resetBtn.addEventListener('click', function() {
            if (confirm('Êtes-vous sûr de vouloir réinitialiser toute la checklist ?')) {
                const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
                
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                    localStorage.removeItem(checkbox.id);
                });
                
                // Feedback
                resetBtn.textContent = '✅ Réinitialisé !';
                setTimeout(() => {
                    resetBtn.textContent = '🔄 Réinitialiser la checklist';
                }, 2000);
            }
        });
        
        checklistCard.appendChild(resetBtn);
    }
}

// ========================================
// COMPTEUR DE PROGRESSION DE LA CHECKLIST
// ========================================
function createProgressCounter() {
    const checklistCard = document.querySelector('#checklist .card h2');
    
    if (checklistCard) {
        const progressSpan = document.createElement('span');
        progressSpan.id = 'checklistProgress';
        progressSpan.style.fontSize = '0.9rem';
        progressSpan.style.marginLeft = '1rem';
        progressSpan.style.color = 'var(--accent)';
        
        checklistCard.appendChild(progressSpan);
        
        updateProgress();
        
        // Mettre à jour lors des changements
        const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateProgress);
        });
    }
}

function updateProgress() {
    const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    const checked = document.querySelectorAll('.checklist input[type="checkbox"]:checked');
    const total = checkboxes.length;
    const completed = checked.length;
    const percentage = Math.round((completed / total) * 100);
    
    const progressSpan = document.getElementById('checklistProgress');
    if (progressSpan) {
        progressSpan.textContent = `(${completed}/${total} - ${percentage}%)`;
    }
}

// ========================================
// ANIMATION D'ENTRÉE AU CHARGEMENT
// ========================================
function initLoadAnimation() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ========================================
// CLICK SUR LES TAGS POUR RECHERCHE
// ========================================
function initKeywordClick() {
    const keywords = document.querySelectorAll('.keyword-tag');
    const searchInput = document.getElementById('searchInput');
    
    keywords.forEach(tag => {
        tag.addEventListener('click', function() {
            if (searchInput) {
                searchInput.value = this.textContent;
                searchInput.dispatchEvent(new Event('input'));
                
                // Scroll vers la barre de recherche
                searchInput.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                // Focus sur l'input
                searchInput.focus();
            }
        });
    });
}

// ========================================
// RACCOURCIS CLAVIER
// ========================================
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K pour focus recherche
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
        
        // Échap pour vider la recherche
        if (e.key === 'Escape') {
            const searchInput = document.getElementById('searchInput');
            if (searchInput && searchInput.value) {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
            }
        }
    });
}

// ========================================
// DÉTECTION DU SCROLL POUR HEADER STICKY
// ========================================
function initStickyHeader() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll vers le bas
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll vers le haut
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    header.style.transition = 'transform 0.3s ease';
    header.style.position = 'sticky';
    header.style.top = '0';
    header.style.zIndex = '1000';
}

// ========================================
// BOUTON RETOUR EN HAUT
// ========================================
function createBackToTop() {
    const btn = document.createElement('button');
    btn.innerHTML = '⬆️';
    btn.className = 'back-to-top';
    btn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.5rem;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    document.body.appendChild(btn);
    
    // Afficher/masquer selon le scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            btn.style.opacity = '1';
            btn.style.transform = 'scale(1)';
        } else {
            btn.style.opacity = '0';
            btn.style.transform = 'scale(0)';
        }
    });
    
    // Action au clic
    btn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    btn.addEventListener('mouseenter', function() {
        this.style.background = 'var(--primary-light)';
        this.style.transform = 'scale(1.1)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.background = 'var(--primary)';
        this.style.transform = 'scale(1)';
    });
}

// ========================================
// INITIALISATION GLOBALE
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌱 Bioplants - Veille Cyber initialisée');
    
    // Initialiser tous les modules
    initTabs();
    initCopyPrompt();
    initCollapse();
    initSearch();
    initChecklist();
    createResetButton();
    createProgressCounter();
    initKeywordClick();
    initKeyboardShortcuts();
    initStickyHeader();
    createBackToTop();
    
    // Animation d'entrée (optionnel)
    setTimeout(initLoadAnimation, 100);
    
    console.log('✅ Toutes les fonctionnalités sont chargées');
});

// ========================================
// EXPORT DES FONCTIONS (optionnel)
// ========================================
window.BioplantsCyber = {
    initTabs,
    initCopyPrompt,
    initCollapse,
    initSearch,
    initChecklist,
    updateProgress
};