document.addEventListener("DOMContentLoaded", function() {
    createSelect();
    addEventListenerSelect();
    fetchRicerca();
    addListenerBtn()

});


//----------------------------------fetching api here--------------------------------
function fetchRicerca()
{
    if(selected == null)
        selected = 'libro';
    const data = {
        tipoElemento: selected,
        ricerca : getInputValue(),
    };
    
    console.log(JSON.stringify(data));
    fetch('function/Ricerca/getElement.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
,    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {

        if (data.success) {
            console.log('La richiesta ha avuto successo:', data.data);
            popolateRicerca(data.data);
        } else {
            console.log('La richiesta non ha avuto successo');
            console.log(data.message);
        }
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
    });
}



//--------------------------------popolate data here--------------------------------


function popolateRicerca(data) {
    var divSearch = document.querySelector('.searchResults');
    divSearch.innerHTML = '';

    var titolo = document.createElement('h2');
    titolo.textContent = 'Risultati della ricerca';
    divSearch.appendChild(titolo);


    if (data.length === 0) {
        var divResult = document.createElement('div');
        divResult.classList.add('risultatoRicerca');
        var p = document.createElement('p');
        p.id = 'ricercaNulla';
        p.textContent = 'Nessun risultato trovato';
        divResult.appendChild(p);
        divSearch.appendChild(divResult);
        return;
    }
    
    for (dato of data) {
        var divResult = document.createElement('div');
        divResult.classList.add('risultatoRicerca');

        var titoloP = document.createElement('p');
        titoloP.textContent = `Titolo: ${dato.titolo}`;

        var autoreP = document.createElement('p');
        autoreP.textContent = `Autore: ${dato.autore_nome} ${dato.autore_cognome}`;

        var annoP = document.createElement('p');
        annoP.textContent = `Anno di pubblicazione: ${dato.anno_pubblicazione}`;

        var casaEditriceP = document.createElement('p');
        casaEditriceP.textContent = `Casa editrice: ${dato.casa_editrice}`;

        divResult.appendChild(titoloP);
        divResult.appendChild(autoreP);
        divResult.appendChild(annoP);
        divResult.appendChild(casaEditriceP);

        divSearch.appendChild(divResult);
    }
}



//--------------------------------create data here--------------------------------
function createSelect() {
    var divSearch = document.querySelector(".search");

    var select = document.createElement("select");

    var options = ["Tutti", "Libri", "Enciclopedie", "Cartine"];
    for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.value = options[i].toLowerCase();
        option.textContent = options[i];
        select.appendChild(option);
    }

    divSearch.appendChild(select);
}

var selected = null;
function addEventListenerSelect() {
    var select = document.querySelector("select");
    select.addEventListener("change", function() {
        selected = select.options[select.selectedIndex].value;
        console.log(selected);
    });
}


function addListenerBtn()
{
    var btn = document.getElementById('searchBtn');
    btn.addEventListener('click', function() {
        fetchRicerca();
    });
}


function getInputValue()
{
    var input = document.getElementById('search');
    return input.value;
}