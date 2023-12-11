let form = document.getElementById("formNewClient");
let clients = [];
//console.log(new FormData(form));
/* let formData = new FormData(form);
for (const pair of formData.entries()) {
    console.log(`${pair[0]}, ${pair[1]}`);
} */
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let prenom = document.getElementById("prenom").value;
    console.log(prenom);
    clients.push({ prenom });
});



// @TODO transformer Julie en variable à rechercher
let formCheckout = document.getElementById("formCheckoutClient");
formCheckout.addEventListener("submit", (e) => {
    e.preventDefault(); //Permet de ne pas recharger la page
    let clientFind = clients.find(client => { return client.prenom === "Julie" });
    console.log(clientFind);
});

