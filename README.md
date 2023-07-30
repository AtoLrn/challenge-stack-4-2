# Challenge-stack 4IW3

## Cahier des charges

Sujet: **Analytics**

### Description

Notre plateforme d'analytics a pour but de permettre à un utilisateur, après s'être inscrit en fournissant l'URL de son site internet, 
d'accéder à un dashboard répertoriant des métriques relatives aux visiteurs de son site.
Ledit dashboard est personnalisable : l'utilisateur peut rajouter des graphiques et/ou des KPI, et choisir de suivre différents types d'informations, comme le nombre de visites, de clics, etc.
Ce tracking s'effectue via un système de tags, que l'utilisateur doit ajouter à son site.

Le sujet comporte plusieurs features:
- Realtime (rxjs et Server Side Event)
- Tunnel de conversion
- Heatmap des click et mouvement de souris des utilisateurs
- Dashboard personnalisable avec Dimensions tel que (Device, page, Tag) et metrics (Click, Visite, Visiteur Uniques, Soumissions de formulaire)
- Creation et edition des tags

Features **Admins**:
- Modifier un utilisateur
- Update d'un utilisateur

Features **SDK**:
- Petit Bundle de 6.7Kb
- Multi platforme
- Facile a integrer

**Contraintes**: 
- Backend en nodejs avec express
- Authentification via JWT
- Frontend fait en VueJS pour etre une one page app
- Graphiques avec google Charts
- SDK fait en VanillaJS integreable a tout framework (JS, React, VueJS)
- Deploiement fait via une CI-CD sur cluster k8s

### UI-UX

Pour l'UX de notre site, nous souhaitions avoir un rendu moderne et coloré.
En faisant des recherches sur des plateformes concurrentes, nous avons trouvé que celles déjà existantes étaient souvent ternes, peu attrayantes, et pas forcément simple d'utilisation. Notre but était donc de rendre la nôtre agréable à l'oeil, et de concevoir un affichage clair.
Nous avons fait le choix de partir sur un thème violet, indigo et blanc, en limitant le nombre de pages pour rendre l'utilisation de notre plateforme la plus simple et intuitive possible.
Nous avons coloré l'ensemble de nos boutons et des autres CTA pour que la navigation soit la plus fluide, et que notre utilisateur trouve rapidement ce qu'il cherche.