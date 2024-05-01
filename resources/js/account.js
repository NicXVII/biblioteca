document.addEventListener("DOMContentLoaded", function() {
    fetcUtente();
    fetchPrestiti();  
    fetchPrenotazioni(); 
});

//----------------------------------------------------------------------------
function fetcUtente()
{
    
    fetch('function/Account/getDati.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {

        if (data.success) {
            console.log('La richiesta ha avuto successo:', data.data);
            popolateDataUser(data.data);
        } else {
            console.log('La richiesta non ha avuto successo');
            console.log(data.message);
        }
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
    });
}


function fetchPrestiti()
{
    
    fetch('function/Account/getPrestiti.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {

        if (data.success) {
            console.log('La richiesta ha avuto successo:', data.data);
            populatePrestiti(data.data);
        } else {
            console.log('La richiesta non ha avuto successo');
            console.log(data.message);
        }
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
    });
}



function fetchPrenotazioni()
{
    
    fetch('function/Account/getPrenotazioni.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {

        if (data.success) {
            console.log('La richiesta ha avuto successo:', data.data);
            populatePrenotazioni(data.data);
        } else {
            console.log('La richiesta non ha avuto successo');
            console.log(data.message);
        }
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
    });
}





  

  


//----------------------------------------------------------------------------
function popolateDataUser(data)
{
    /*var divContaienr = document.querySelector('content');
    divContaienr.innerHTML = "";*/
    var divUser = document.querySelector(".userMediaData");
    divUser.innerHTML = '';
    var p = document.createElement("p");
    p.innerHTML = "Nome utente: "+data.nome;
    divUser.appendChild(p);

    var p = document.createElement("p");
    p.innerHTML = "Cognome utente: "+data.cognome;
    divUser.appendChild(p);

    var p = document.createElement("p");
    p.innerHTML = "Codice fiscale utente: "+data.codiceFiscale;
    divUser.appendChild(p);

    var p = document.createElement("p");
    p.innerHTML = "Email: "+data.mail;
    divUser.appendChild(p);

    var p = document.createElement("p");
    p.innerHTML = "Password: "+data.password;
    divUser.appendChild(p);

    var divBtn = document.querySelector('.userMediaBtn');
    divBtn.innerHTML = '';
    var button = document.createElement("button");
    button.innerHTML = "Logout";
    logout(button);
    divBtn.appendChild(button);
}

function logout(btn) {
    btn.addEventListener("click", function() {
        location.href = "function/logout.php"; 
    });
}


function populatePrestiti(data) {
    var divPrestiti = document.querySelector('.prestiti');
    divPrestiti.innerHTML = '';	

    var titolo = document.createElement("h2");
    titolo.innerHTML = "Prestiti";
    divPrestiti.appendChild(titolo);

    divLibro = document.createElement("div");
    divLibro.classList.add("libro");
    for (dato of data) {
        var divElemento = document.createElement("div");
        divElemento.classList.add("elemento");

        var p = document.createElement("p");
        p.innerHTML = "Titolo: "+dato.nomeLibro;
        divElemento.appendChild(p);

        var p = document.createElement("p");
        p.innerHTML = "Autore " +dato.nomeAutore + " " + dato.cognomeAutore;
        divElemento.appendChild(p);
        
        var p  = document.createElement("p"); 
        p.innerHTML = "Inizio prestito: " + dato.dataInizio + " Fine: " + dato.dataFine;
        divElemento.appendChild(p);

        divLibro.appendChild(divElemento);
    }
    divPrestiti.appendChild(divLibro);
}


function populatePrenotazioni(data) {
    var divPrestiti = document.querySelector('.prenotazioni');
    divPrestiti.innerHTML = '';	

    var titolo = document.createElement("h2");
    titolo.innerHTML = "Prenotazioni";
    divPrestiti.appendChild(titolo);

    divLibro = document.createElement("div");
    divLibro.classList.add("libro");
    for (dato of data) {
        var divElemento = document.createElement("div");
        divElemento.classList.add("elemento");

        var p = document.createElement("p");
        p.innerHTML = "Titolo: "+dato.nomeLibro;
        divElemento.appendChild(p);

        var p = document.createElement("p");
        p.innerHTML = "Autore " +dato.nomeAutore + " " + dato.cognomeAutore;
        divElemento.appendChild(p);
        
        var p  = document.createElement("p"); 
        p.innerHTML = "Inizio prestito: " + dato.dataPrenotazione + " Accetazione: " + dato.dataAccetazione;
        divElemento.appendChild(p);

        divLibro.appendChild(divElemento);
    }
    divPrestiti.appendChild(divLibro);
}

