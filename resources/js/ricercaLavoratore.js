var type = 'prenotazioni';
document.addEventListener('DOMContentLoaded', function() {
    selected = 'libri';
    createSelectLavoratore();
    addEventListenerSelectLavoratore();
    createSelect();
    addEventListenerSelect();
    addKeyBoardListener();
    whatFetch();

});
//------------------------------------------------------------------------------------------------
function whatFetch(){
    console.log(type);
    if(type === 'prestiti')
    {
        fetchPrestiti();
    }else if(type === 'prenotazioni')
    {
        fetchPrenotazioni();
    }

}
//------------------------------------------------------------------------------------------------
function fetchPrestiti()
{
    var functionToFetch = "function/Prestiti/get";
    console.log(selected);
    switch (selected)
    {
          case 'libri':
             functionToFetch+='Libro'
               break;
          case 'cartine':
             functionToFetch+='Carta';
               break;
          case 'enciclopedie':
             functionToFetch+='Volume'; 
             break;
 
    }
   functionToFetch+='.php';


   var dataToSend = {
    search: getInputValue()
   }

    fetch(functionToFetch, {
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
            console.log('La richiesta ha avuto successo:', data.data);
            popolateRicercaPrestito(data.data);
            
        } else {
            console.log('La richiesta non ha avuto successo');
          
        }
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);

    });
}

function fetchPrenotazioni()
{

    var functionToFetch = "function/Prenotazioni/get";
   switch (selected)
   {
         case 'libri':
            functionToFetch+='Libro'
              break;
         case 'cartine':
            functionToFetch+='Carta';
              break;
         case 'enciclopedie':
            functionToFetch+='Volume'; 
            break;

   }


   functionToFetch+='.php';

   var dataToSend = {
    search: getInputValue()
   }
    fetch(functionToFetch, {
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
            console.log('La richiesta ha avuto successo:', data.data);
            popolateRicerca(data.data);
            
        } else {
            console.log('La richiesta non ha avuto successo');
          
        }
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);

    });
}

async function fetchAccettaPrenotazione(id) {
    var functionToFetch = "function/AccettaPrenotazioni/accetta";
    switch (selected) {
        case 'libri':
            functionToFetch += 'Libro';
            break;
        case 'cartine':
            functionToFetch += 'Carta';
            break;
        case 'enciclopedie':
            functionToFetch += 'Volume';
            break;
    }

    functionToFetch += '.php';

    const dataToSend = {
        id: id
    };

    try {
        const response = await fetch(functionToFetch, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('Si è verificato un errore:', error);
        return false; 
    }
}


async function fetchCreaPrestito(id)
{
    var functionToFetch = "function/creaPrestiti/crea";
    switch (selected) {
        case 'libri':
            functionToFetch += 'Libro';
            break;
        case 'cartine':
            functionToFetch += 'Carta';
            break;
        case 'enciclopedie':
            functionToFetch += 'Volume';
            break;
    }

    functionToFetch += '.php';

    const dataToSend = {
        id: id
    };

    try {
        const response = await fetch(functionToFetch, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('Si è verificato un errore:', error);
        return false; 
    }
}


async function terminaPrestito(id)
{
    var functionToFetch = "function/terminaPrestito/termina";
    switch (selected) {
        case 'libri':
            functionToFetch += 'Libro';
            break;
        case 'cartine':
            functionToFetch += 'Carta';
            break;
        case 'enciclopedie':
            functionToFetch += 'Volume';
            break;
    }

    functionToFetch += '.php';

    const dataToSend = {
        id: id
    };

    try {
        const response = await fetch(functionToFetch, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('Si è verificato un errore:', error);
        return false; 
    }
}

//------------------------------------------------------------------------------------------------

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

        var p = document.createElement('p');
        p.textContent = "Cliente: "+dato.nome + ' ' + dato.cognome;
        divResult.appendChild(p);

        var p = document.createElement('p');
        p.textContent = "ISBN prodotto: "+dato.isbn;
        divResult.appendChild(p);

        var p = document.createElement('p');
        p.textContent = "Data prenotazione: "+dato.dataPrenotazione;
        divResult.appendChild(p);

        var p = document.createElement('p');
        p.textContent = "Data accetazione: "+dato.dataAccetazione;
        divResult.appendChild(p);

        if(dato.dataAccetazione === null)
            {
                var button = document.createElement('button');
                button.textContent = "Consegna";
                listenerConsegna(button,dato.id);
                divResult.appendChild(button);

            }


       
        divSearch.appendChild(divResult);
    }
}

function popolateRicercaPrestito(data) {
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

        var p = document.createElement('p');
        p.textContent = "Cliente: "+dato.nome + ' ' + dato.cognome;
        divResult.appendChild(p);

        var p = document.createElement('p');
        p.textContent = "ISBN prodotto: "+dato.isbn;
        divResult.appendChild(p);

        var p = document.createElement('p');
        p.textContent = "Data inizio: "+dato.dataInizio;
        divResult.appendChild(p);

        var p = document.createElement('p');
        p.textContent = "Data fine: "+dato.dataFine;
        divResult.appendChild(p);

        var p = document.createElement('p');
        p.textContent = "ID operatore: "+dato.idLavoratoreConsegna;
        divResult.appendChild(p);
        if(dato.dataFine === null)
            {
                var button = document.createElement('button');
                button.textContent = "Termina";
                listenerTermina(button,dato.id);
                divResult.appendChild(button);
            }else
        {
            var p = document.createElement('p');
            p.textContent = "ID operatore: " + dato.idLavoratoreRitiro;
            divResult.appendChild(p);
        }

       
        divSearch.appendChild(divResult);
    }
}
//------------------------------------------------------------------------------------------------

function createSelectLavoratore()
{
    var worker = document.getElementById('worker');
    if(!worker) return;

    var divSearch = document.querySelector(".search");

    var select = document.createElement("select");

    select.id = "selectLavoratore";


    var options = ["Prenotazioni","Prestiti"];
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
//------------------------------------------------------------------------------
function addEventListenerSelectLavoratore() {
    var select = document.getElementById("selectLavoratore");
    select.addEventListener("change", function() {
        type = select.options[select.selectedIndex].value;
        whatFetch();	

        //console.log(type);
    });
}
function addEventListenerSelect() {
    var select = document.getElementById("selectType");
    select.addEventListener("change", function() {
        selected = select.options[select.selectedIndex].value;
        whatFetch();	

    });

}

function addKeyBoardListener()
{   window.addEventListener('keydown', function(event) {
    //console.log('add keyboard listener ' + event.keyCode);
 
    if (event.keyCode === 13) {
        whatFetch();
    }
});
}

function listenerConsegna(btn,id)
{
    btn.addEventListener('click', async function() {
        console.log(id);
        var result = await fetchAccettaPrenotazione(id);
        if (result) {
            console.log('Prenotazione accettata');
            var result = await fetchCreaPrestito(id);
            console.log("Esito creazione prestito: "+result);
            whatFetch();
        } else {
            console.log('Prenotazione non accettata');
        }
    });
}

function listenerTermina(btn,id)
{
    btn.addEventListener('click', async function() {
        //console.log(id);
        var result = await terminaPrestito(id);
        if (result) {
            console.log('Prestito terminato');
            whatFetch();
        } else {
            console.log('Prestito non terminato');
        }
    });
}