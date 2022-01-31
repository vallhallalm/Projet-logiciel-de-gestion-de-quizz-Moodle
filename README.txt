Une [vidéo d'execution](https://github.com/vallhallalm/Projet-logiciel-de-gestion-de-quizz-Moodle/blob/main/video-demonstration_ip3VFF8h.mp4) est disponible dans le dépot

Projet GL02-------------------------------------------------------------------------Sujet B-------------------------------------------------------------------------Groupe Utilité ???



Préface : Lors de cette partie nous avons rencontré différents problèmes et notamment un problème de mauvaise écriture des données fournie. De ce fait nous avons décidé de nous
concentrer sur un seul type de question pour notre parseur : les questions à choix multiples. Nous avons réussi à créer des tests avec tous les types de question.
Nous avons corrigé un fichier nommé data_test.gift qui vous sera utile pour tester notre parseur, étant donné que ce dernier ne fonctionne qu'avec ce type de fichier gift, avec une syntaxe stricte; les autres fichiers gift fournis ont beaucoup d'éléments en trop à droite et à gauche.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Quickstart : Pour démarrer notre logiciel de la meilleure des façons nous vous demanderons d'installer node.js 
Nous avons utilisé les packages suivants pour concevoir ce logiciel : @caporal/core, Vcard_js, vega-lite. Ces packages sont normalement inclus dans le dossier node_modules de l'archive
mais il est possible de devoir supprimer le dossier node_modules et de les reinstaller avec la commande "npm install"
Après cela vous pourrez exécuter la commande suivant afin de vous lancer : "node caporalCli.js --help"
Une interface s'ouvrira alors et vous pourrez voir les différentes fonctions disponibles via des commandes. Pour accéder à ces fonctionnalités, tapez : "node caporalCli.js 'commande'"
Nous avons également implémenté un système de compte utilisateur. Il vous est donc possible de créer votre propre compte avec la qualité d'admin ou d'user. Il est nécessaire de vous logger
au début de votre utilisation, le système vous le rapellera. Pour réaliser des tests plus simplement vous pouvez utiliser le compte pré-existant Username : admin et Password : admin .

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Descriptif des fonctionnalités : 
-readme : permet d'ouvrir ce fichier dans la console (fonctionne)

-select : permet de tester le parseur et de lire un fichier gift (fonctionne)
Les questions du fichier sont affichées dans le terminal.

-createTest : Permet de Selectionner et Grouper les questions (fonctionne) (accessible en tant que user ou admin)

-vCardInfo : Affiche les informations du vCard choisi (fonctionne)(accessible en tant qu'admin)

-addAccount : Créer un compte (fonctionne) (accessible en tant qu'admin)

-vcard : Creer un fichier vCard (fonctionne) (accessible en tant qu'admin)

-pass : Simuler le passage d'un test (fonctionne) (fonctionne en utilisant le fichier data_test.gift)
Il faut rentrer le fichier qu'on veut en argument de la fonction (important : cette fonction ne marche qu'avec notre modèle de fichier gift, les autres fichiers gift non standardisés ne fonctionneront pas). Les différentes questions sont affichées une à une dans le terminal. On sélectionne la réponse qu'on veut choisir avec le pavé directionnel. Les réponses sont randomisées, et la fonction donne la note obtenue à la fin.

-verif : Permet de vérifier la qualité des données du test (fonctionne)
Il faut rentrer le fichier qu'on veut en argument de la fonction (important : cette fonction ne marche qu'avec notre modèle de fichier gift, les autres fichiers gift non standardisés ne fonctionneront pas). Ensuite, la fonction lit le fichier et vérifie si les questions du fichier gift sont toutes différentes, et qu'il y en a bien entre 15 et 20.

-visualize : visualisation de graphique par rapport au type de questions (ne fonctionne pas) 

-avg : comparaison avec le profil moyen de question (ne fonctionne pas)

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Test unitaire : 
Des tests unitaires concernant le parseur et certaines fonctions associés au format gift ont été implémentés et sont accessibles via la commande "npm test"
