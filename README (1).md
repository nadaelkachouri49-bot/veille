# 🌱 BIOPLANTS - Veille Informationnelle Cybersécurité

## 📦 Contenu du package

Vous avez reçu 3 fichiers :

1. **index.html** - Structure de la page
2. **style.css** - Feuille de styles (design Bioplants)
3. **script.js** - Fonctionnalités interactives

## 🚀 Installation & Utilisation

### Option 1 : Utilisation locale (Rapide)

1. **Télécharger les 3 fichiers** dans le même dossier
2. **Double-cliquer sur `index.html`**
3. ✅ C'est prêt ! Ça s'ouvre dans votre navigateur

### Option 2 : Hébergement web

1. Placer les 3 fichiers sur votre serveur web
2. Accéder via l'URL de votre serveur
3. Parfait pour partager avec l'équipe !

## 🎯 Fonctionnalités incluses

### ⚡ Recherche intelligente
- Tapez "phishing", "ANSSI", "ransomware"...
- Les mots-clés correspondants s'illuminent automatiquement
- **Raccourci clavier** : `Ctrl+K` (ou `Cmd+K` sur Mac)

### 📋 Onglets interactifs
1. **Vue d'ensemble** - Objectifs et présentation
2. **Procédure** - Guide étape par étape
3. **Prompt Copilot** - Copie en 1 clic
4. **Mots-clés & Sources** - Base de données cyber
5. **Checklist** - Suivi des tâches hebdomadaires
6. **Exemple** - Newsletter type

### ✅ Checklist intelligente
- Cocher les tâches accomplies
- **Sauvegarde automatique** dans le navigateur
- Compteur de progression en temps réel
- Bouton de réinitialisation

### 🔧 Autres fonctionnalités
- ✅ Copie du prompt en 1 clic
- ✅ Sections pliables/dépliables
- ✅ Bouton "Retour en haut"
- ✅ Header qui se cache au scroll
- ✅ Design responsive (mobile/tablette/PC)
- ✅ Animations fluides

## 🎨 Personnalisation

### Changer les couleurs Bioplants

Ouvrir `style.css` et modifier les variables en haut du fichier :

```css
:root {
    --primary: #2d7a3e;        /* Vert principal */
    --primary-dark: #1f5a2c;   /* Vert foncé */
    --accent: #58c76e;         /* Vert accent */
}
```

### Ajouter des sources

Ouvrir `index.html`, chercher la section "Sources fiables" et ajouter :

```html
<span class="keyword-tag">Nouveau site</span>
```

### Modifier le prompt

Ouvrir `index.html`, chercher `<div class="prompt-box" id="promptBox">` et modifier le contenu.

## 📱 Compatibilité

✅ Chrome / Edge / Brave
✅ Firefox
✅ Safari
✅ Mobile (iOS / Android)

## 🔧 Résolution de problèmes

### La checklist ne se sauvegarde pas ?
→ Vérifier que les cookies/localStorage sont activés dans le navigateur

### Le bouton copier ne fonctionne pas ?
→ Certains navigateurs bloquent la copie sur HTTP (fonctionne sur HTTPS ou en local)

### Les styles ne s'appliquent pas ?
→ Vérifier que `style.css` est bien dans le même dossier que `index.html`

### Le JavaScript ne fonctionne pas ?
→ Vérifier que `script.js` est bien dans le même dossier et que JavaScript est activé

## 📞 Support

Pour toute question ou modification, contactez l'équipe IT Bioplants.

## 🔄 Mises à jour

**Version actuelle** : 1.0 (Février 2026)

Pour mettre à jour :
1. Télécharger les nouveaux fichiers
2. Remplacer les anciens
3. Vider le cache du navigateur (Ctrl+F5)

---

🌱 **BIOPLANTS** - Document dynamique pour la veille informationnelle en cybersécurité
