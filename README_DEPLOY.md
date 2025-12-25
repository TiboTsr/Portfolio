# Portfolio Tibo TESSIER - Optimisé pour Déploiement

## 📋 Organisation des fichiers

Le projet est organisé de manière standard pour un déploiement facile :

```
Portfolio_Tibo/
├── index.html              # Point d'entrée principal
├── css/                    # Styles
│   └── style.css
├── js/                     # Scripts
│   └── script.js
├── assets/                 # Ressources (images, SVG)
│   ├── og-image.svg
│   └── image-not-found.svg
├── images/                 # Favicon et icônes
│   └── icon_portfolio.png
├── CV_Tibo_Tessier.pdf    # Fichier téléchargeable
├── .gitignore             # Configuration Git
├── README.md              # Description du projet
└── DEPLOY.md              # Guide de déploiement
```

## 🎯 Points clés de cette organisation

✅ **Chemins relatifs corrects** : Tous les liens (CSS, JS, assets) sont organisés de manière logique
✅ **SEO optimisé** : Meta tags Open Graph, Twitter Card, description
✅ **Performance** : Preconnect aux Google Fonts, lazy-loading des images
✅ **Production-ready** : Favicon, analytics, structure de dossiers standard
✅ **Git-friendly** : .gitignore configuré pour ignorer les fichiers temporaires

## 🚀 Déploiement rapide

### GitHub Pages (recommandé)

```bash
cd c:\Users\tibot\Documents\Portfolio_Tibo

# Initialiser Git
git init
git add .
git commit -m "Initial commit: Portfolio"

# Créer un repository sur github.com/new
# Puis pousser :
git remote add origin https://github.com/TiboTsr/portfolio.git
git push -u origin main

# Activer Pages : Settings → Pages → main branch
```

**Résultat** : `https://tibotsr.github.io/portfolio`

### Netlify (alternative simple)

1. Aller à [netlify.com](https://netlify.com)
2. Cliquer "Connect to Git" → GitHub
3. Sélectionner le repository
4. Deploy automatique ✨

### Vercel (alternative performante)

1. Aller à [vercel.com](https://vercel.com)
2. "New Project" → Importer le repository GitHub
3. Deploy en 1 clic

## ✨ Fonctionnalités prêtes au déploiement

✅ **Animations fluides** : GSAP + AOS
✅ **Navigation responsive** : Mobile-first design
✅ **Mode sombre moderne** : Cyan (#00f2ff) + Purple (#7000ff)
✅ **Loader stylisé** : 15 particules animées
✅ **Carrousel de projets** : Avec navigation et points indicateurs
✅ **Terminal interactif** : Section "À propos"
✅ **Timeline formation** : Parcours académique et professionnel
✅ **Compétences** : 6 catégories de technologies
✅ **Google Analytics** : Intégré 
✅ **Favicon** : Logo personnalisé
✅ **SEO** : Meta tags complets + Open Graph

## 📸 Prochaines étapes

1. **Ajouter images réelles des projets**
   - Créer `assets/projects/` et ajouter les captures
   - Mettre à jour les URLs dans `js/script.js`

2. **Vérifier avant déploiement**
   - Tous les liens fonctionnent
   - Responsive design (DevTools F12)
   - Animations fluides

3. **Déployer avec Git**

4. **Monitorer en production**
   - Vérifier Google Analytics
   - Fixer les bugs de production


## 📞 Questions fréquentes

**Q: Comment modifier le domaine GitHub Pages?**
A: Dans Settings → Pages → Custom domain, ajouter votre domaine et configurer le DNS.

**Q: Comment ajouter des images au carrousel?**
A: Ajouter les URLs dans `js/script.js` section `projectsInfo`, puis commit/push.

**Q: HTTPS est-il activé?**
A: Oui, automatiquement avec GitHub Pages/Netlify/Vercel.

**Q: Puis-je utiliser un formulaire de contact?**
A: Oui, intégrer EmailJS ou Formspree dans `js/script.js`.

---

**✨ Portfolio prêt pour briller en ligne ! 🚀**
