# Carnet Bouzelmate Hicham

Carnet de terrain pour une exploitation de raisin de table (2 parcelles, 10 et 12 ha,
un bassin, trois puits). Application web installable — une seule page, fonctionne
hors réseau une fois installée.

© 2026 Abdel Bouzelmate — tous droits réservés.

## Ce que contient le dossier

| Fichier | Rôle |
|---|---|
| `index.html` | L'application entière (structure, styles, code) |
| `manifest.json` | Nom, icônes, couleurs — ce qui rend l'app installable |
| `sw.js` | Service worker : met l'app en cache pour le mode hors réseau |
| `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` | Icônes Android |
| `apple-touch-icon.png` | Icône iPhone / iPad |
| `favicon-64.png` | Icône d'onglet |

## Mettre en ligne (gratuit, ~10 minutes)

1. Sur GitHub, créer un dépôt nommé `carnet-vigne` (privé ou public).
2. Déposer **tous les fichiers de ce dossier à la racine** du dépôt —
   pas dans un sous-dossier, sinon les chemins ne correspondent plus.
3. Dans le dépôt : **Settings → Pages**.
4. *Source* : `Deploy from a branch`. *Branch* : `main`, dossier `/ (root)`. **Save**.
5. Après une ou deux minutes, l'adresse s'affiche en haut de la page :
   `https://bouzelmate-pixel.github.io/carnet-vigne/`

> Un dépôt **privé** ne peut pas publier de page sur un compte gratuit.
> Pour que le lien fonctionne, le dépôt doit être **public** — ou passer par
> Cloudflare Pages / Netlify, qui publient aussi depuis un dépôt privé, gratuitement.

## Installer sur le téléphone

**Android (Chrome)** — ouvrir le lien → menu ⋮ → *Installer l'application*.

**iPhone (Safari uniquement)** — ouvrir le lien → bouton Partager →
*Sur l'écran d'accueil*. Chrome sur iPhone ne sait pas installer, c'est Safari qu'il faut.

L'icône grappe apparaît sur l'écran d'accueil. L'app s'ouvre en plein écran,
sans barre de navigateur, et continue de fonctionner sans réseau.

## Après installation

- **Appareil photo et micro** : la première utilisation demande l'autorisation.
  Si elle est refusée, elle se redonne dans les réglages du téléphone,
  à la ligne du site.
- **Météo** : seule fonction qui a besoin du réseau. Sans réseau, l'app affiche
  les dernières valeurs connues.
- **Données** : le registre est stocké dans le téléphone, il n'est envoyé nulle part.
  Il part uniquement quand quelqu'un copie un document depuis l'onglet Bureau.

## Mettre à jour l'app

Remplacer `index.html`, puis **changer le numéro de version** en tête de `sw.js` :

```js
const CACHE = 'carnet-bouzelmate-v3';   // v2 → v3
```

Sans ce changement, les téléphones continuent d'afficher l'ancienne version
en cache. C'est l'erreur classique.

## Vocabulaire des données

Aligné sur le projet Fallah pour que l'intégration reste un simple import :
`parcelle`, `rang`, `variete`, `intervention`, `intrant`, `equipe`, `releve`,
et les rôles `مالك` (propriétaire) / `مسؤول` (responsable) / `عامل` (ouvrier).

L'export JSON de l'onglet Journal produit directement ce format.
