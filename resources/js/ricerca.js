document.addEventListener("DOMContentLoaded", function() {
    createSelect();
    addEventListenerSelect();
    fetchRicerca();
});


//----------------------------------fetching api here--------------------------------
function fetchRicerca()
{
    const data = {
        tipoElemento: 'libro',
        ricerca : 'a',
    };
    
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
            //populatePrenotazioni(data.data);
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