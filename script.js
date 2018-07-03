import { toPhone } from "./phone.js";


var phoneListElem = document.getElementById('phone-list'),
    phoneDetailElem = document.getElementById('phone-detail'),
    phones = [],
    phoneDetails = {};


// Etapes:

// 1) Calculer la hauteur du document 
// 2) Definir une limite à la quelle le bouton devra se montrer (le 1/4 de la hauteur totale de la page)
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
    scrollPos, docHeight,

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
phones = doRequest('GET', 'phones/phones.json', buildPhonesDisplay);

function buildPhonesDisplay(req) {

    //parsage du JSON et transformation en tableau
    phones = JSON.parse(req.response);

    /*construction de l'affichage*/

    var out = "";
    for (let i = 0; i < phones.length; i++) {

        const phone = phones[i];

        out += '<div class="img-overlay" id= "' + phone.id + '" >' +
            '<img src="' + phone.imageUrl + '" alt="' + phone.name + '">' +
            '<div class="img-snippet">' +
            '<div class="text"> ' + phone.name + '</div>' +
            '<div class="info" >i</div>' +
            '</div>' + '</div>';


    }

    document.querySelector('#phone-list').innerHTML = out;

    var images = document.querySelectorAll('.img-overlay');

    for (let index = 0; index < images.length; index++) {
        images[index].addEventListener("click", function (event) {
            getDetails(event.currentTarget.id);

        })

    }
}


//=======Récuperation dynamique des détails d'un téléphone à partir d'une resource JSON ==============
var slider = document.getElementById('slider'),
    descriptions = document.querySelector('#description-details');


function getDetails(phoneId) {

    phoneListElem.style.opacity = 0;
    phoneDetailElem.style.display = 'unset';
    phoneDetailElem.style.visibility = 'visible';
    scrollToTop();

    doRequest('GET', 'phones/' + phoneId + '.json', buildDetailDisplay);

}

function buildDetailDisplay(req) {

    //parsage du JSON et transformation en tableau
    phoneDetails = toPhone(req.response);
    // console.log(phoneDetails);

    /*construction de l'affichage*/
    var out = "",
        imgOut = "";
    //construction des images
    var images = phoneDetails.images;
    console.log(images);

    for (let i = 0; i < images.length; i++) {

        const image = images[i];



        imgOut += " <li class='slide'>" +
            "<img src='" + image + "'>" + " </li>";


    }

    console.log(phoneDetails);

    var touchScreen = phoneDetails.display.touchScreen ? "Oui" : "Non";
    var cameraFeatures = phoneDetails.camera.features.length != 0 ? phoneDetails.camera.features : "Aucune";
    var primaryCamera = phoneDetails.camera.primary != "" ? phoneDetails.camera.primary : "Aucune";

    out += "<p><h4>Fonctionnalités :</h4>" + phoneDetails.additionalFeatures + "</p>"
        + "<p><h4>Description :</h4>" + phoneDetails.description + "</p>"
        + "<p><h4>Ecran : </h4> Résolution: " + phoneDetails.display.screenResolution
        + " <br/> Taille:  " + phoneDetails.display.screenSize
        + " <br/> Tactile: " + touchScreen + "</p>"
        + "<p><h4>Versions disponibles :</h4>" + phoneDetails.availability + "</p>"
        + "<p><h4>Camera  :</h4>Fonctionnalités :" + cameraFeatures
        + "<br/> Arrière: " + primaryCamera + "</p>";


    document.querySelector('#description-title').innerHTML = 'Description du téléphone ' + phoneDetails.id;
    slider.innerHTML = imgOut;
    descriptions.innerHTML = out;

}


//Defintion de la fonction de retour à la liste
document.querySelector('#back-to-list').addEventListener('click', function () {
    phoneDetailElem.style.display = 'none';
    phoneListElem.style.opacity = 1;

})


//Defintion d'une fonction pour ramener le document en haut de page
function scrollToTop() {
    if (isFirefox)
        docElem.scrollTop = 0;
    else
        body.scrollTop = 0;

}


function doRequest(httpMethod, url, responseCallback) {

    //1) Création de l'objet XMLHttpRequest
    var req = new XMLHttpRequest();

    //2) Définir l'action à effectuer lorsque l'on reçoit une réponse(req.readyState=4) et que tout est OK(req.status=200)
    req.onreadystatechange = () => {
        if (req.readyState == 4 && req.status == 200) {
            responseCallback(req);
        }
    };
    req.open(httpMethod, url, true);
    req.send();

}




