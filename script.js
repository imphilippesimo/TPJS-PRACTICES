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
    offset = 100,
    scrollPos, docHeight;

//il faut que l'on sache si l'on est sous firefox car la recuperation de la position courante du curseur différente sur firefox   
isFirefox = navigator.userAgent.toLowerCase().lastIndexOf("firefox") > -1;

//1)Calcul de la hauteur du document
docHeight = Math.max(body.scrollHeight, body.offsetHeight, docElem.clientHeight, docElem.scrollHeight, docElem.offsetHeight);


//2)offset = ?
if (docHeight != undefined) {
    offset = docHeight / 4;
}


//3)Astuce: recuperer la position actuelle du curseur: body.scrollTop || docElem.scrollTop
window.addEventListener('scroll', function (event) {
    scrollPos = body.scrollTop || docElem.scrollTop;


    btt.className = (scrollPos > offset) ? "visible" : "";

});


//=======Récuperation dynamique des téléphones à partir d'une resource JSON ==============


