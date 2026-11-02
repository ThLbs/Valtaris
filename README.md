# Valtaris

Application personnelle de suivi des dépenses, des investissements et de projection patrimoniale.
**Un seul fichier HTML, aucune connexion réseau, données chiffrées.**

Ce dépôt ne contient **que le code de l’application, sans aucune donnée**. Vos données sont dans **un fichier chiffré sur votre OneDrive**, lisible uniquement avec votre mot de passe maître.

- **Application en ligne :** https://thlbs.github.io/Valtaris/
- **Fonctionnement :** le PC est **maître** (lecture et écriture), le smartphone est en **consultation seule**.

```
   PC (Chrome / Edge)                      OneDrive                     Smartphone
 ┌──────────────────────┐  sync Windows  ┌─────────────────┐  app OneDrive  ┌───────────────────┐
 │ index.html           │ ─────────────► │ valtaris.fvault │ ─────────────► │ navigateur        │
 │ lit + écrit le       │                │                 │                │ lit le fichier,   │
 │ fichier .fvault      │                │ (chiffré)       │                │ déchiffre en      │
 └──────────────────────┘                └─────────────────┘                │ mémoire, n'écrit  │
                                                                            │ jamais            │
                                                                            └───────────────────┘
 L'application elle-même ne se connecte à rien : c'est OneDrive qui synchronise le fichier chiffré.
```

## Démarrer sur le PC (appareil maître)

1. Ouvrez l’adresse en ligne ou `index.html` (copie locale du dépôt), avec **Chrome ou Edge**.
2. Cliquez sur *Créer un nouveau fichier de données* et choisissez un **mot de passe maître**. Il est **irrécupérable** : rangez-le dans votre gestionnaire de mots de passe. Comme le fichier sera sur OneDrive, prenez une **phrase de 5 mots aléatoires ou plus**.
3. Enregistrez le fichier dans votre **dossier OneDrive**, par exemple `OneDrive\Finances\valtaris.fvault`, mais **pas** dans le dossier du dépôt git. Le `.gitignore` exclut de toute façon les `.fvault`, `.csv` et `.json`.
4. À la prochaine ouverture, l’application retrouve le fichier : il suffit de saisir le mot de passe.
5. Pour découvrir l’application : *Tableau de bord → Charger une démo*, puis *Paramètres → Effacer / oublier les données*.

**Ne modifiez les données que depuis un seul PC.** Si deux appareils écrivaient le même fichier, OneDrive créerait des copies en conflit.

## Consulter sur le smartphone

1. Installez l’application **OneDrive** et connectez-vous.
2. Ouvrez l’adresse en ligne dans le navigateur. Astuce : ajoutez-la à l’écran d’accueil.
3. Touchez *Ouvrir mon fichier de données*, choisissez `valtaris.fvault` dans OneDrive, puis saisissez votre mot de passe.

Vous voyez le tableau de bord, les dépenses, les placements et les projections, en **lecture seule**. Les données affichées sont celles du dernier enregistrement fait sur le PC. **Rien n’est stocké sur le téléphone** : le fichier est déchiffré en mémoire, puis oublié au verrouillage.

## Où sont mes données ?

| Élément | Emplacement | Contenu |
|---|---|---|
| Code de l’application | Ce dépôt GitHub (public) / GitHub Pages | Aucune donnée, aucun secret |
| Vos données | `valtaris.fvault` sur votre OneDrive | Chiffrées (AES-256-GCM) : Microsoft ne peut pas les lire |
| Sauvegardes | Fichiers `.fvault` exportés | Chiffrées |
| Navigateur du PC | Uniquement le *nom* du fichier pour le rouvrir | Aucune donnée |
| Smartphone | Rien | — |

## Fonctionnalités

| Onglet | Contenu |
|---|---|
| **Tableau de bord** | Patrimoine, revenus/dépenses du mois, taux d’épargne, 12 mois glissants, répartition par catégorie, suivi des budgets, évolution du patrimoine |
| **Dépenses** | Saisie manuelle, **import CSV** de vos relevés bancaires (détection automatique du format, colonnes débit/crédit, doublons ignorés), classement automatique par règles, budgets mensuels par catégorie |
| **Investissements** | PEA, CTO, assurance-vie, PER, livrets, crypto, immobilier… Prix de revient unitaire (PRU), plus-values latentes et réalisées, achats/ventes avec recalcul du PRU, répartition par classe d’actifs et par enveloppe, historique |
| **Projections** | Simulation Monte-Carlo (1 000 scénarios) avec fourchette pessimiste/optimiste, frais, inflation, hausse des versements, probabilité d’atteindre un objectif, revenu soutenable à terme, simulation de l’impact d’une réduction de dépenses |
| **Paramètres** | Catégories, règles, verrouillage auto, changement de mot de passe, sauvegardes |

**Import bancaire** : dans votre espace bancaire en ligne, exportez vos opérations au format CSV, puis cliquez sur *Importer un CSV*. Quand vous changez la catégorie d’une opération, l’application vous propose de créer une règle pour les prochaines.

## Sécurité

- **Aucune connexion réseau possible.** La politique de sécurité (CSP) de la page interdit toute requête, image, police ou formulaire vers l’extérieur. Testé : `fetch`, chargement d’image et injection de script sont tous bloqués.
- **Seul le code de l’application peut s’exécuter.** Le script est identifié par son empreinte SHA-256 dans la CSP : un code injecté ou modifié ne s’exécute pas.
- **Chiffrement AES-256-GCM** (authentifié : toute altération est détectée). La clé est dérivée du mot de passe via PBKDF2-SHA256 avec 600 000 itérations, ce qui ralentit fortement les attaques par force brute.
- **Verrouillage automatique** après inactivité (10 min par défaut). Le verrouillage efface les données de la mémoire.
- **Mode discret** (👁) : floute les montants à l’écran.
- **Aucune dépendance externe** : tout le code est lisible dans `index.html`.

Ce qui reste de votre responsabilité :
- **Activer la double authentification sur votre compte Microsoft**, qui protège le fichier chiffré.
- **Activer la double authentification sur votre compte GitHub**, qui protège le code servi à votre téléphone.
- **Choisir un mot de passe maître robuste.** Quelqu’un qui volerait le fichier pourrait tester des mots de passe sans limite.

## Limites à connaître

- **Exportez régulièrement une sauvegarde chiffrée** (*Paramètres → Exporter*), en plus de l’historique des versions de OneDrive. Une bannière vous le rappelle après 30 jours.
- **L’export CSV « en clair » n’est pas chiffré** : supprimez-le après usage, et ne le laissez pas dans OneDrive.
- Le chiffrement ne protège pas contre un logiciel malveillant déjà présent sur l’appareil, comme un enregistreur de frappe ou une extension de navigateur malveillante.
- Les cours des placements se saisissent à la main. C’est volontaire : toute récupération automatique impliquerait une connexion réseau.

## Modifier le code

Après toute modification du `<script>` de `index.html`, recalculez l’empreinte, sinon la page refusera d’exécuter le script :

```bash
node outils/sceller.js
```
