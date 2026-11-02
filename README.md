# Finances perso

Application personnelle de suivi des dépenses, des investissements et de projection patrimoniale.
**Un seul fichier, 100 % hors ligne, données chiffrées.**

Ce dépôt ne contient **que le code de l’application, sans aucune donnée**. Vos données restent dans un fichier chiffré sur votre ordinateur, jamais sur GitHub ni sur aucun serveur.

## Démarrer

1. Clonez ou téléchargez ce dépôt, puis double-cliquez sur `finances.html` (**Chrome ou Edge** recommandés).
2. Cliquez sur *Créer un nouveau fichier de données* et choisissez un **mot de passe maître** (12 caractères minimum). Il est **irrécupérable** : notez-le dans votre gestionnaire de mots de passe.
3. Choisissez où enregistrer le fichier chiffré `.fvault`, par exemple `C:\Users\vous\FinancesPerso\mes-finances.fvault` :
   - **hors de OneDrive, Dropbox ou iCloud**, pour qu’il ne quitte jamais votre ordinateur ;
   - **hors du dossier du dépôt git**. Le `.gitignore` exclut quand même tous les `.fvault`, `.csv` et `.json` par sécurité.
4. À la prochaine ouverture, l’application retrouve le fichier : il suffit de saisir le mot de passe. Le navigateur peut vous demander d’autoriser à nouveau l’accès au fichier.
5. Pour découvrir l’application : *Tableau de bord → Charger une démo*, puis *Paramètres → Effacer / oublier les données*.

## Où sont mes données ?

| Élément | Emplacement | Contenu |
|---|---|---|
| Code de l’application | Ce dépôt GitHub / `finances.html` | Aucune donnée personnelle |
| Vos données | Le fichier `.fvault` que **vous** avez choisi | Chiffrées (AES-256-GCM) |
| Sauvegardes | Fichiers `.fvault` exportés (clé USB…) | Chiffrées |
| Navigateur | Uniquement le *nom* du fichier pour le rouvrir | Aucune donnée |

Firefox et Safari ne permettent pas encore d’écrire directement dans un fichier. Avec ces navigateurs, le coffre chiffré est conservé dans le stockage interne du navigateur. Vous pourrez le déplacer plus tard vers un fichier depuis Chrome ou Edge, via *Paramètres → Emplacement des données*.

## Fonctionnalités

| Onglet | Contenu |
|---|---|
| **Tableau de bord** | Patrimoine, revenus/dépenses du mois, taux d’épargne, 12 mois glissants, répartition par catégorie, suivi des budgets, évolution du patrimoine |
| **Dépenses** | Saisie manuelle, **import CSV** de vos relevés bancaires (détection automatique du format, colonnes débit/crédit, doublons ignorés), classement automatique par règles, budgets mensuels par catégorie |
| **Investissements** | PEA, CTO, assurance-vie, PER, livrets, crypto, immobilier… Prix de revient unitaire (PRU), plus-values latentes et réalisées, achats/ventes avec recalcul du PRU, répartition par classe d’actifs et par enveloppe, historique |
| **Projections** | Simulation Monte-Carlo (1 000 scénarios) avec fourchette pessimiste/optimiste, frais, inflation, hausse des versements, probabilité d’atteindre un objectif, revenu soutenable à terme, simulation de l’impact d’une réduction de dépenses |
| **Paramètres** | Catégories, règles, verrouillage auto, changement de mot de passe, sauvegardes |

**Import bancaire** : dans votre espace bancaire en ligne, exportez vos opérations au format CSV, puis cliquez sur *Importer un CSV*. Quand vous changez la catégorie d’une opération, l’application vous propose de créer une règle pour les prochaines.

## Sécurité : ce qui est garanti

- **Aucune connexion réseau possible.** La politique de sécurité (CSP) de la page interdit toute requête, image, police ou formulaire vers l’extérieur. Testé : `fetch`, chargement d’image et injection de script sont tous bloqués.
- **Seul le code de l’application peut s’exécuter.** Le script est identifié par son empreinte SHA-256 dans la CSP : un code injecté ou modifié ne s’exécute pas.
- **Chiffrement AES-256-GCM** (authentifié : toute altération est détectée). La clé est dérivée du mot de passe via PBKDF2-SHA256 avec 600 000 itérations, ce qui ralentit fortement les attaques par force brute. Seul le texte chiffré est écrit sur le disque.
- **Verrouillage automatique** après inactivité (10 min par défaut). Le verrouillage recharge la page, ce qui efface les données de la mémoire.
- **Mode discret** (👁) : floute les montants à l’écran.
- **Aucune dépendance externe**, aucune bibliothèque : tout le code est lisible dans `finances.html`.

## Limites à connaître

- **Un fichier unique peut se perdre** (panne de disque, suppression). **Exportez régulièrement une sauvegarde chiffrée** (*Paramètres → Exporter*), par exemple sur une clé USB. Une bannière vous le rappelle après 30 jours.
- **L’export CSV « en clair » n’est pas chiffré** : supprimez-le après usage.
- Le chiffrement ne protège pas contre un logiciel malveillant déjà présent sur l’ordinateur, par exemple un enregistreur de frappe ou une extension de navigateur malveillante. Pour aller plus loin, utilisez un profil de navigateur dédié, sans extensions.
- Les cours des placements se saisissent à la main. C’est volontaire : toute récupération automatique impliquerait une connexion réseau.
- Pour utiliser l’application sur un autre ordinateur : clonez le dépôt, copiez-y votre fichier `.fvault` (clé USB…), puis cliquez sur *Ouvrir un fichier de données*.

## Modifier le code

Après toute modification du `<script>` de `finances.html`, recalculez l’empreinte, sinon la page refusera d’exécuter le script :

```bash
node outils/sceller.js
```
