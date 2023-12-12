/* 
*  --- CLASSES ---
*/
import Client from "./client.js";
import displayPrice from "./functions.js";

// TRAITEMENT DU FORMULAIRE POUR AJOUTER UN CLIENT
let form = document.getElementById("formNewClient");
let clients = JSON.parse(window.localStorage.getItem('hotel.clients') || '[]');
/* console.log(new FormData(form));
let formData = new FormData(form);
for (const pair of formData.entries()) {
    console.log(`${pair[0]}, ${pair[1]}`);
}  */
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let prenom = document.getElementById("prenom").value;
    let nom = document.getElementById("nom").value;
    let nuits = document.getElementById("nuits").value;
    let chambre = document.getElementById("chambre-select").value;
    let petit_dej = document.querySelector('input[name="petit_dej"]:checked').value;
    let prix_chambre;
    let prix_petit_dej = 7;
    let total_petit_dej = 0;
    if (chambre == "chambre-1") {prix_chambre = 65}
    if (chambre == "chambre-2") {prix_chambre = 89}
    if (chambre == "chambre-4") {prix_chambre = 139}
    if (chambre == "loft") {prix_chambre = 189}
    if (petit_dej == 'oui') {total_petit_dej = prix_petit_dej * nuits}
    let total = (prix_chambre * nuits) + total_petit_dej; 
    clients.push(new Client(prenom, nom, nuits, chambre, petit_dej, total));
    //clients.push({prenom, nom, nuits, chambre, petit_dej, total});
    window.localStorage.setItem('hotel.clients', JSON.stringify(clients));
    console.log(clients);
});


// TRAITEMENT DU FORMULAIRE POUR RECHERCHER UN CLIENT
let formCheckout = document.getElementById("formCheckoutClient");
formCheckout.addEventListener("submit", (e) => {
    e.preventDefault(); //Permet de ne pas recharger la page
    let prenomRecherche = document.getElementById("prenomRecherche").value;
    let nomRecherche = document.getElementById("nomRecherche").value;    
    
    // On cherche le client dans nos données
    let findOne = clients.find(function(item){
        return (item.prenom === prenomRecherche) && (item.nom  === nomRecherche);
    });
    //Si le client est trouvé
    if (findOne) {
        //console.log("Client trouvé");
        //console.log(`<p> ${findOne.prenom} ${findOne.nom} : ${displayPrice(findOne.total)}<p>`);
        let div = `<div>Facture du client ${findOne.prenom} ${findOne.nom} : <strong>${displayPrice(findOne.total)}</strong></div>`;
        let main = document.querySelector("div#main");
        console.log(main);
        //main.appendChild(div);
        //body.insertAdjacentHTML(beforeend, div)
        document.getElementById('message').innerHTML = div;
        clients = clients.filter(item => {
            return (item.prenom !== prenomRecherche) && (item.nom  !== nomRecherche); //Permet de ne supprimer que le client qui fait son checkout. Si on enlève le !, cela supprime TOUUUUS les clients, sauf celui qui fait son checkout ^^'.
        });
        window.localStorage.setItem('hotel.clients', JSON.stringify(clients));
    }
    else {
        //console.log("❌ Client introuvable");
        let div = `Client introuvable`;
        let body = document.querySelector("body");
        //body.appendChild(div);
        //body.insertAdjacentHTML(beforeend, div)
        document.getElementById('message').innerHTML = div;
    }
});

