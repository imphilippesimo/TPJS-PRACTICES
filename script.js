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
//1) Création de l'objet XMLHttpRequest
var req = new XMLHttpRequest(),
    phones = [],
    rowElem = document.getElementsByClassName("row");

//2) Définir l'action à effectuer lorsque l'on reçoit une réponse(req.readyState=4) et que tout est OK(req.status=200)

req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
        //parsage du JSON et transformation en tableau
        phones = JSON.parse(req.response);

        /*construction de l'affichage*/

        //répartition équitable du nombre de téléphones
        phonesPerCol = Math.round(phones.length / 4);

        
        start = 0;
        stop = phonesPerCol;
        colNumber = 1;

        for (let i = 0; i < phones.length; i += phonesPerCol) {

            out = "";
            for (let j = start; j < stop; j++) {
                const element = phones[j];
                out += '<div class="img-overlay">' +
                    '<img src="' + element.imageUrl + '" alt="' + element.name + '">' +
                    '<div class="img-snippet">' +
                    '<div class="text"> ' + element.name + '</div>' +
                    '<div class="info">i</div>' +
                    '</div>' + '</div>';


            }            
            document.getElementById('col'+colNumber).innerHTML = out;
            colNumber++;

            start = stop;
            stop = start + phonesPerCol;

        }

       

    }


}

req.open('GET', 'phones.json', true);
req.send();


