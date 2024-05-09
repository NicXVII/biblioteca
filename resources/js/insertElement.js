var type = null;
document.addEventListener('DOMContentLoaded', function() {
    type = document.getElementById('type').value;
    whichForm();
    //fetchCaseEditrici();
    //fetchAutori();
});

//------------------------------------------------------------------

function whichForm() {
    switch (type) {
        case 'Enciclopedia':
            break;
        case 'Libro':
            createFormLibro();
            break;
        case 'Carta Geo Politica':
            break;
    }
}

//------------------------------------------------------------------

async function fetchCaseEditrici() {
    try {
        const response = await fetch('function/Dati/getCaseEditrici.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.success) {
            return data.data; // Return the array of authors
        } else {
            throw new Error('Request was not successful: ' + data.message);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return []; // Return an empty array if there's an error
    }
}

async function fetchAutori() {
    try {
        const response = await fetch('function/Dati/getAutori.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.success) {
            return data.data; // Return the array of authors
        } else {
            throw new Error('Request was not successful: ' + data.message);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return []; // Return an empty array if there's an error
    }
}

//------------------------------------------------------------------

async function createFormLibro() {
    var formDiv = document.querySelector('.formDiv');
    formDiv.innerHTML = '';

    var titolo = document.createElement('h1');
    titolo.innerHTML = 'Inserisci un nuovo libro';
    formDiv.appendChild(titolo);

    var form = document.createElement('form');
    form.setAttribute('method', 'POST');
    //nome, isbn, pubblicazione, prezzo,autore, casa editrice, 

    var nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name:';
    var nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'name');
    form.appendChild(nameLabel);
    form.appendChild(nameInput);

    var isbnLabel = document.createElement('label');
    isbnLabel.textContent = 'ISBN:';
    var isbnInput = document.createElement('input');
    isbnInput.setAttribute('type', 'text');
    isbnInput.setAttribute('name', 'isbn');
    form.appendChild(isbnLabel);
    form.appendChild(isbnInput);

    var publicationLabel = document.createElement('label');
    publicationLabel.textContent = 'Publication Date:';
    var publicationInput = document.createElement('input');
    publicationInput.setAttribute('type', 'date');
    publicationInput.setAttribute('name', 'publication');
    form.appendChild(publicationLabel);
    form.appendChild(publicationInput);

    var priceLabel = document.createElement('label');
    priceLabel.textContent = 'Price:';
    var priceInput = document.createElement('input');
    priceInput.setAttribute('type', 'text');
    priceInput.setAttribute('name', 'price');
    form.appendChild(priceLabel);
    form.appendChild(priceInput);

    var autoriLabel = document.createElement('label');
    autoriLabel.textContent = 'Autori:';
    form.appendChild(autoriLabel);
    var selectAutori = document.createElement('select');
    var autori = await fetchAutori();
    for (autore of autori) {
        var option = document.createElement('option');
        option.setAttribute('value', autore.id);
        option.textContent = autore.nome + ' ' + autore.cognome;
        selectAutori.appendChild(option);
    }
    listenerSelect(selectAutori);
    form.appendChild(selectAutori);

    var caseEditricilabel = document.createElement('label');
    caseEditricilabel.textContent = 'Case Editrici:';
    form.appendChild(caseEditricilabel);
    var selectCaseEditrici = document.createElement('select');
    var caseEditrici = await fetchCaseEditrici();
    for (casaEditrice of caseEditrici) {
        var option = document.createElement('option');
        option.setAttribute('value', casaEditrice.id);
        option.textContent = casaEditrice.nome;
        selectCaseEditrici.appendChild(option);
    }
    listenerSelectCasaEditrice(selectCaseEditrici);
    form.appendChild(selectCaseEditrici);

    var button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.innerHTML = "Inserisci Libro";
    form.appendChild(button);

    var hiddenAutore = document.createElement('input');
    hiddenAutore.setAttribute('type', 'hidden');
    hiddenAutore.setAttribute('autore', "");
    hiddenAutore.id = 'autoreHidden'; 
    form.appendChild(hiddenAutore);

    var hiddenCasaEditrice = document.createElement('input');
    hiddenCasaEditrice.setAttribute('type', 'hidden');
    hiddenCasaEditrice.setAttribute('casaEditrice', "");
    hiddenCasaEditrice.id = 'casaEditrice';
    form.appendChild(hiddenCasaEditrice);

    formDiv.appendChild(form);

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        var formData = new FormData(form);
        for (var pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        autore = document.getElementById('autoreHidden').value;
        console.log(autore);
    });
}


var autore = null;

function listenerSelect(select)
{
    select.addEventListener('change', function()
    {
        var input = document.getElementById('autoreHidden');
        input =  select.options[select.selectedIndex].value;

    });
}
var casaEditrice = null;

function listenerSelectCasaEditrice(select) {
    select.addEventListener('change', function() {
        var input = document.getElementById('casaEditrice');
        input =  select.options[select.selectedIndex].value;

    });
}


