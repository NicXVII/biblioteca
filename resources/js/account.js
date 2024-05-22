document.addEventListener("DOMContentLoaded", function() {
    var user = sessionStorage.getItem('user');
    console.log(user != null && user);
    if(user)
    {
        fetcUtente();
        generateSelect();
        fetchPrestiti();  
        fetchPrenotazioni(); 
    }
  
    /*fetchPrenotazioniCarta();
    prestitiCarta();
    prenotazioniVolume();
    prestitiVolume();*/
});

//----------------------------------------------------------------------------
function whatIFecth(value)
{
    switch(value)
    {
        case "libro":
            fetchPrestiti();
            fetchPrenotazioni();
            break;
        case "enciclopedia":
            prestitiVolume();
            prenotazioniVolume();
            break;
        case "carta geo politica":
            fetchPrenotazioniCarta();
            prestitiCarta();
            break;
    }

}
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
            //console.log('La richiesta ha avuto successo:', data.data);
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
            //console.log('La richiesta ha avuto successo:', data.data);
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
            //console.log('La richiesta ha avuto successo:', data.data);
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

function fetchPrenotazioniCarta()
{
    
    fetch('function/Account/getPrenotazioniCarta.php', {
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
            console.log('La richiesta ha avuto successo: fetchPrenotazioniCarta', data.data);
            populatePrenotazioniNoLibro(data.data);
        } else {
            console.log('La richiesta non ha avuto successo');
            console.log(data.message);
        }
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
    });
}

function prestitiCarta()
{
       
    fetch('function/Account/getPrestitoCarta.php', {
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
            console.log('La richiesta ha avuto successo: getPrestitoCarta', data.data);
            populatePrestitiNoLibro(data.data);
        } else {
            console.log('La richiesta non ha avuto successo');
            console.log(data.message);
        }
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
    });
}



function prenotazioniVolume()
{
    fetch('function/Account/getPrenotazioniEnciclopedia.php', {
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
            console.log('La richiesta ha avuto successo: getPrenotazioniEnciclopedia', data.data);
            populatePrenotazioniNoLibro(data.data);
        } else {
            console.log('La richiesta non ha avuto successo');
            console.log(data.message);
        }
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
    });
}

function prestitiVolume()

    {
        fetch('function/Account/getPrestitiEnciclopedia.php', {
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
                console.log('La richiesta ha avuto successo: getPrestitiEnciclopedia', data.data);
                populatePrestitiNoLibro(data.data);
            } else {
                console.log('La richiesta non ha avuto successo');
                console.log(data.message);
            }
        })
        .catch(error => {
            console.error('Si è verificato un errore:', error);
        });
}

  

  
function deletePrenotazione(id)
{
    const dataToSend = {
        id: id,
        type: selected
    };

    console.log(dataToSend);
    fetch('function/Account/deletePrenotazione.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {

        if (data.success) {
            showSuccessAlert();
            //console.log('La richiesta ha avuto successo', data.data);
            //populatePrestitiNoLibro(data.data);
            switch(selected)
            {
                case "Libro":
                    fetchPrenotazioni();
                    break;
                case "Enciclopedia":
                    prenotazioniVolume();
                    break;
                case "Carta Geo Politica":
                    fetchPrenotazioniCarta();
                    break;

            }
        } else {
            //console.log('La richiesta non ha avuto successo');
            showErrorAlert();
            //console.log(data.message);
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

function generateSelect() {
    var div = document.querySelector('.select');
    var select = document.createElement("select");
    var elements = ['Libro', 'Enciclopedia', 'Carta Geo Politica'];

    for (var i = 0; i < elements.length; i++) {
        var option = document.createElement("option");
        option.textContent = elements[i];
        option.value = elements[i].toLowerCase();
        select.add(option);
    }

    addEventListenerSelect(select);

    div.appendChild(select);
}

function populatePrestiti(data) {
    var divPrestiti = document.querySelector('.prestiti');
    divPrestiti.innerHTML = '';	
    var titolo = document.createElement("h2");
    titolo.innerHTML = "Prestiti";
    divPrestiti.appendChild(titolo);

    if(data.lenght === 0)
        {
            var p = document.createElement("p");
            p.innerHTML = "Nessun prestito";
            p.classList.add("noData");
            divPrestiti.appendChild(p);
            return;
        }
    
   //generateSelect(divPrestiti);
    
    
 

    divLibro = document.createElement("div");
    divLibro.classList.add("libro");
    if(data.lengh === 0)
        {
            var p = document.createElement("p");
            p.innerHTML = "Nessun prestito";
            divLibro.appendChild(p);
            return;
        }
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

function populatePrestitiNoLibro(data)
{
    var divPrestiti = document.querySelector('.prestiti');
    divPrestiti.innerHTML = '';	

    
    var titolo = document.createElement("h2");
    titolo.innerHTML = "Prestiti";
    divPrestiti.appendChild(titolo);
    console.log(data.length === 0);
    if(data.lenght === 0)
        {
            var p = document.createElement("p");
            p.innerHTML = "Nessun prestito";
            p.classList.add("noData");
            divPrestiti.appendChild(p);
            return;
        }
    //generateSelect(divPrestiti);
    console.log("Test " +data.length <= 0);
    if(data.lengh <= 0)
        {
            var p = document.createElement("p");
            p.innerHTML = "Nessun prestito";
            divLibro.appendChild(p);
            return;
        }
    divLibro = document.createElement("div");
    divLibro.classList.add("libro");
    console.log(data.length);
    if(data.length === 0)
        {
            var p = document.createElement("p");
            p.innerHTML = "Nessun prestito";
            divLibro.appendChild(p);
            return;
        }
    for (dato of data) {
        var divElemento = document.createElement("div");
        divElemento.classList.add("elemento");

        var p = document.createElement("p");
        p.innerHTML = "Titolo: "+dato.nome;
        divElemento.appendChild(p);

        var p = document.createElement("p");
        p.innerHTML = "Autore/i: " +dato.autori;
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

    if(data.length === 0)
        {
            var p = document.createElement("p");
            p.innerHTML = "Nessuna prenotazione";
            p.classList.add("noData");
            divLibro.appendChild(p);
            return;
        }

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

      
        if((dato.dataAccetazione === null))
            {
                var btn = document.createElement("button");
                btn.innerHTML = "Elimina Prenotazione";
                btn.id = "btn";
                btn.setAttribute("data-id", dato.idPrenotazione);
                divElemento.appendChild(btn);
                divElemento.classList.remove("elemento");
                divElemento.classList.add("elemento4"); 
            }
        divLibro.appendChild(divElemento);
    }
    divPrestiti.appendChild(divLibro);
    btnEliminaPrenotazione();

}

function populatePrenotazioniNoLibro(data)
{
    var divPrestiti = document.querySelector('.prenotazioni');
    divPrestiti.innerHTML = '';	

    var titolo = document.createElement("h2");
    titolo.innerHTML = "Prenotazioni";
    divPrestiti.appendChild(titolo);

  
    //console.log(data.length === 0);
    if(data.length === 0)
        {
            var p = document.createElement("p");
            p.innerHTML = "Nessuna prenotazione";
            p.classList.add("noData");
            divPrestiti.appendChild(p);
            return;
        }
        divLibro = document.createElement("div");
        divLibro.classList.add("libro");
    for (dato of data) {
        var divElemento = document.createElement("div");
        divElemento.classList.add("elemento");

        var p = document.createElement("p");
        p.innerHTML = "Titolo: "+dato.nome;
        divElemento.appendChild(p);

        var p = document.createElement("p");
        p.innerHTML = "Autore/i " +dato.autori;
        divElemento.appendChild(p);
        
        var p  = document.createElement("p"); 
        p.innerHTML = "Inizio prestito: " + dato.dataPrenotazione + " Accetazione: " + dato.dataAccetazione;
        divElemento.appendChild(p);
        if((dato.dataAccetazione === null))
            {
                var btn = document.createElement("button");
                btn.innerHTML = "Elimina Prenotazione";
                btn.id = "btn";
                btn.setAttribute("data-id", dato.id);
                divElemento.appendChild(btn);
            }

        divLibro.appendChild(divElemento);
    }
    
    divPrestiti.appendChild(divLibro);
    btnEliminaPrenotazione();
}

//-----------------------------------------------------------------------------
console.log(sessionStorage.getItem('selected'));
var selected = sessionStorage.getItem('selected') ?? 'libro';
function addEventListenerSelect(select) {
    select.addEventListener("change", function() {
        selected = select.options[select.selectedIndex].value;
        sessionStorage.setItem('selected', selected);
        console.log(selected);
        whatIFecth(sessionStorage.getItem('selected'));
    });
}

function btnEliminaPrenotazione()
{
    var btn = document.querySelectorAll("#btn");
    for (var i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", function(){
            console.log('clicked');
         deletePrenotazione(this.getAttribute("data-id"));
        });
    }
}

//------------------------------------------------------------------------------------------------
function showSuccessAlert() {
    Swal.fire(
      'Eliminato!',
      'La prenotazione è stata eliminata.',
      'success'
    );
  }

  // Funzione per mostrare un alert di errore
  function showErrorAlert() {
    Swal.fire(
      'Errore!',
      'Impossibile eliminare la prenotazione.',
      'error'
    );
  }