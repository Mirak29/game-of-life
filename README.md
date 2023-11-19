# Jeu de Simulation de Vie Cellulaire

Ce jeu de simulation de vie cellulaire est une implémentation utilisant HTML Canvas et JavaScript pour créer un automate cellulaire basé sur des règles simples.

## Fonctionnalités

- **Grille de cellules**: Une grille est affichée sur le canvas où chaque cellule peut être dans un état vivant ou mort.
- **Interaction Utilisateur**: Les utilisateurs peuvent interagir avec les cellules en cliquant ou en faisant glisser la souris pour changer leur état.
- **Évolution Automatique**: Les cellules évoluent automatiquement selon des règles spécifiques après le lancement du jeu.
- **Paramètres Configurables**: Utilisez l'interface utilisateur pour ajuster la taille de la grille, la vitesse d'évolution et les couleurs.

## Comment Jouer

1. **Installation**:
   - Téléchargez ou clonez ce dépôt.
   - Utilisez Live Server pour lancer le jeu.
   - Si vous utilisez Visual Studio Code, installez l'extension "Live Server" et ouvrez le fichier `index.html`. Cliquez avec le bouton droit et sélectionnez "Open with Live Server".

2. **Interaction**:
   - Cliquez sur une cellule pour la faire passer de vivante à morte, et vice versa.
   - Maintenez enfoncé et faites glisser la souris pour changer l'état de plusieurs cellules à la fois.

3. **Contrôles**:
   - Utilisez l'interface pour démarrer, arrêter ou effacer la grille.
   - Ajustez la taille de la grille et la vitesse d'évolution à l'aide des commandes disponibles.

## Conseils pour les Sons

Certains navigateurs peuvent bloquer les sons qui démarrent automatiquement pour offrir une meilleure expérience de navigation. Voici comment autoriser les sons dans certains navigateurs :

### Google Chrome

1. Accédez à `chrome://settings/content/sound` dans la barre d'adresse.
2. Activez l'option "Autoriser les sites à jouer les sons (recommandé)".

### Mozilla Firefox

1. Accédez à `about:preferences#privacy` dans la barre d'adresse.
2. Sous "Permissions", cliquez sur "Paramètres" à côté de "Notifications".
3. Assurez-vous que le site du jeu est autorisé à jouer les sons.

Ces étapes peuvent différer légèrement selon les versions des navigateurs, mais cela devrait vous donner une idée générale de la manière d'autoriser les sons dans votre navigateur.

Vous pouvez accéder directement au jeu [ici](https://game-of-life-mu-wine.vercel.app/).
