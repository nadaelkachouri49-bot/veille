# BIOPLANTS - VEILLE INFORMATIONNELLE CYBERSÉCURITÉ

## DESCRIPTION

Interface web professionnelle pour la gestion de la veille informationnelle en cybersécurité. Design immersif noir et vert, navigation fluide, accès direct aux outils de veille.

## FICHIERS

- **index.html** - Structure de l'interface
- **style.css** - Styles professionnels noir et vert
- **script.js** - Fonctionnalités JavaScript avancées

## INSTALLATION

1. Télécharger les 3 fichiers dans le même dossier
2. Ouvrir `index.html` dans un navigateur moderne
3. L'application se charge automatiquement

## FONCTIONNALITÉS

### Navigation
- 4 sections principales : Dashboard, Sources, Prompt, Workflow
- Navigation latérale fixe avec indicateur de statut
- Transitions fluides entre sections
- Raccourcis clavier : Alt + 1/2/3/4

### Dashboard
- Accès direct à Feedly (flux RSS)
- Accès direct à Perplexity (recherche IA)
- Accès rapide au prompt Copilot
- Vue du processus hebdomadaire

### Sources
- Liste complète des sources de veille
- Classement par catégories : Institutionnels, Médias, Presse, International
- Instructions d'intégration Feedly

### Prompt
- Template complet pour Copilot
- Bouton copie en 1 clic (Ctrl/Cmd + K)
- Formatage professionnel
- Zone de scroll optimisée

### Workflow
- Procédure complète en 4 étapes
- Instructions détaillées par phase
- Règles à respecter / éviter

## RACCOURCIS CLAVIER

- **Alt + 1** - Dashboard
- **Alt + 2** - Sources
- **Alt + 3** - Prompt
- **Alt + 4** - Workflow
- **Ctrl + K** (ou Cmd + K) - Copier le prompt

## TECHNOLOGIES

- HTML5 sémantique
- CSS3 avec variables et animations
- JavaScript ES6+ (classes, modules)
- Design responsive
- Animations fluides

## COMPATIBILITÉ

- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

## PERSONNALISATION

### Couleurs
Modifier les variables dans `style.css` :

```css
:root {
    --bg-dark: #0a0a0a;
    --green-primary: #00ff88;
}
```

### Ajouter une source
Éditer `index.html`, section Sources :

```html
<div class="source-item">
    <span class="source-name">Nom Source</span>
    <span class="source-type">Type</span>
</div>
```

## ARCHITECTURE

```
BioPlantsApp
├── NavigationManager (gestion sections)
├── PromptManager (copie prompt)
├── QuickActionsManager (boutons rapides)
├── AnimationManager (effets visuels)
├── KeyboardShortcutsManager (raccourcis)
├── CacheManager (sauvegarde locale)
└── PerformanceMonitor (métriques)
```

## PERFORMANCES

- Temps de chargement : < 500ms
- Animations à 60 FPS
- Cache local pour dernière visite
- Lazy loading des animations

## SUPPORT

Pour questions ou modifications : Équipe IT Bioplants

---

**BIOPLANTS** | Veille Cybersécurité v1.0 | 2026
