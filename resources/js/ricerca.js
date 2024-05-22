document.addEventListener("DOMContentLoaded", function() {
    //createSelectLavoratore();
    createSelect();
    addEventListenerSelect();
    //addEventListenerSelectLavoratore();
    fetchRicerca();
    addListenerBtn()
    addKeyBoardListener();
});


//----------------------------------fetching api here--------------------------------

function whatFetch(){
    if(type === 'prestiti')
    {
        fetchPrestiti();
    }else if(type === 'prenotazioni')
    {
        fetchPrenotazioni();
    }

}

/*
function fetchPrestiti()
{
    switch(type){
        case 'libri':
            fetchLibriPrestiti();
            break;
        case 'cartine':
            fetchCartePrestiti();
            break;
        case 'enciclopedie':
            fetchEnciclopediePrestiti();
            break;
        default:
            break;
    }
}*/
function fetchRicerca()
{

    const data = {
        tipoElemento: elemento,
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
            //console.log('La richiesta ha avuto successo:', data.data);
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


function checkPrenotaType(type,id){
    switch(type){
        case 'libri':
            fetchPrenotaLibro(id);
            break;
        case 'cartine':
            fetchPrenotaCartina(id);
            break;
        case 'enciclopedie':
            fetchPrenotaEnciclopedia(id);
            break;
        default:
            break;
    }
}
function fetchPrenotaLibro(id)
{
    const data = {
        id: id,
    };
    
    fetch('function/Prenota/prenotaLibri.php', {
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
            //console.log('La richiesta ha avuto successo:', data.data);
            //popolateRicerca(data.data);
            showSuccessAlert();
        } else {
           /* console.log('La richiesta non ha avuto successo');
            console.log(data.message);*/
            showErrorAlert();
        }
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
        showErrorAlert();
    });
}


function fetchPrenotaCartina(id)
{
    const data = {
        id: id,
    };
    
    fetch('function/Prenota/prenotaCartina.php', {
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
            showSuccessAlert();
            //console.log('La richiesta ha avuto successo:', data.data);
            //popolateRicerca(data.data);
        } else {
            /*console.log('La richiesta non ha avuto successo');
            console.log(data.message);*/
            showErrorAlert();
        }
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
        showSuccessAlert();
    });
}

async function fetchPosizione(id) {
    //console.log(id);
    var functionToFetch = "function/Posizione/get";
    //console.log(elemento);
    switch (elemento) {
        case 'libri':
            functionToFetch += 'Libro';
            break;
        case 'cartine':
            functionToFetch += 'Carta';
            break;
        case 'enciclopedie':
            functionToFetch += 'Volume';
            break;
        default:
            break;
    }
    functionToFetch += '.php';
    //console.log(functionToFetch);
    var dataToSend = {
        id: id
    };
    //console.log(dataToSend);


    try {
        const response = await fetch(functionToFetch, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        //console.log(data.data);
        return data.data;
    } catch (error) {
        console.error('Si è verificato un errore:', error);
    }
}   

//--------------------------------popolate data here--------------------------------


async function popolateRicerca(data) {
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

        var link = document.createElement('a');

        link.href = `show.php?id=${dato.id}&tipo_elemento=${dato.tipo_elemento}`;
        link.textContent = dato.titolo;

        titoloP.appendChild(link);



        /*var autoreP = document.createElement('p');
        var link = document.createElement('a');
        link.textContent = `Autore: ${dato.autore_nome} ${dato.autore_cognome}`;
        link.href = `show.php?id=${dato.id}&tipo_elementp=&${dato.tipo_elemento} nome=${dato.autore_nome}& cognome=${dato.autore_cognome}`;
        autoreP.appendChild(link);*/
        var autoreP = document.createElement('p');
        if(elemento === 'libri')
            {
                //console.log(dato.autore_cognome);
                autoreP.textContent = `Autore: ${dato.autore_nome} ${dato.autore_cognome}`;

            }else
                autoreP.textContent = `Autore/i: ${dato.autore_nome}`;
        var annoP = document.createElement('p');
        annoP.textContent = `Anno di pubblicazione: ${dato.anno_pubblicazione}`;

var casaEditriceP = document.createElement('p');

var link = document.createElement('a');
link.textContent = dato.casa_editrice; 
casaEditriceP.appendChild(link);


        divResult.appendChild(titoloP);
        divResult.appendChild(autoreP);
        divResult.appendChild(annoP);
        divResult.appendChild(casaEditriceP);
        
        if(!worker && (elemento != 'enciclopedie'))
        {
            var button = document.createElement('button');
            button.setAttribute('id',dato.id);
            button.setAttribute('type',dato.tipo_elemento);

            button.innerHTML = 'Prenota';
            button.classList.add('button-prenota');
            divResult.appendChild(button);
            addListenerPrenota(button);
        }

        if(worker && elemento !== 'enciclopedie')  
        {
            var data = await fetchPosizione(dato.id);
            //console.log(data);
            var p = document.createElement('p');
            p.innerHTML = "Stanza: " + data.nomeStanza + " Armadio: " + data.nomeArmadio + " Scaffale: " + data.nomeScaffale + " Numero: " + data.numeroScaffale;
            divResult.appendChild(p);
        }
            divSearch.appendChild(divResult);
    }
}



//--------------------------------create data here--------------------------------

function createSelectLavoratore()
{
    var worker = document.getElementById('worker');
    if(!worker) return;

    var divSearch = document.querySelector(".search");

    var select = document.createElement("select");

    select.id = "selectLavoratore";


    var options = ["Prestiti", "Prenotazioni"];
    for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.value = options[i].toLowerCase();
        option.textContent = options[i];
        select.appendChild(option);
    }

    divSearch.appendChild(select);

}

function createSelect() {
    var divSearch = document.querySelector(".search");

    var select = document.createElement("select");
    select.id = 'selectType';

    var options = ["Libri", "Enciclopedie", "Cartine"];
    for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.value = options[i].toLowerCase();
        option.textContent = options[i];
        select.appendChild(option);
    }

    divSearch.appendChild(select);
}
function getInputValue()
{
    var input = document.getElementById('search');
    return input.value;
}

var selected = null;

//--------------------------------listener here--------------------------------


function addKeyBoardListener()
{   window.addEventListener('keydown', function(event) {
    //console.log('add keyboard listener ' + event.keyCode);
 
    if (event.keyCode === 13) {
        fetchRicerca();
    }
});
}

function addListenerBtn()
{
    var btn = document.getElementById('searchBtn');
    btn.addEventListener('click', function() {
        fetchRicerca();
        whatFetch();
    });
}

var elemento = 'libri';
function addEventListenerSelect() {
    var select = document.getElementById("selectType");
    select.addEventListener("change", function() {
        elemento = select.options[select.selectedIndex].value;
        //console.log(elemento);
    });
}

var type = null;
function addEventListenerSelectLavoratore() {
    var select = document.getElementById("selectLavoratore");
    select.addEventListener("change", function() {
        type = select.options[select.selectedIndex].value;
        //console.log(type);
    });
}



function addListenerPrenota(btn)
{
    btn.addEventListener('click', function() {
        //console.log("Fetchando "+ btn.getAttribute('id') + " " + btn.getAttribute('type'));
        checkPrenotaType(btn.getAttribute('type'),btn.getAttribute('id'));
    });
}

//------------------------------------------------------------------------------------------------
function showSuccessAlert() {
    Swal.fire(
      'Prenotato!',
      'La prenotazione è stata confermata.',
      'success'
    );
  }

  function showErrorAlert() {
    Swal.fire(
      'Errore!',
      'Impossibile confermare la prenotazione.',
      'error'
    );
  }