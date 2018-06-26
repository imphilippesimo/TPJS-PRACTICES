// Etapes:

// 1) Calculer la hauteur du document 
// 2) Definir une limite à la quelle le bouton devra se montrer (le 3/4 de la hauteur totale de la page)
// 3) Ajouter les event Listener pour les évènements 
//     scroll(sur la fenetre: window), écouter le défilement et lorsque la position actuelle de défilement > limite,
//      modifier le style de notre bouton afin qu'il s'affiche 


//le bouton de retour en haut de page
var btt = document.getElementById("back-to-top"),

//le document
    body = document.body,
//la racine du document
    docElem = document.documentElement,
//la limite (100 par defaut)
    offset = 100;


//1)Calcul de la hauteur du document
docHeight = Math.max(body.scrollHeight, body.offsetHeight, docElem.clientHeight, docElem.scrollHeight, docElem.offsetHeight);

//2)offset = ?

//3)Astuce: recuperer la position actuelle du curseur: body.scrollTop || docElem.scrollTop

