document.addEventListener("DOMContentLoaded", function () {
    getValues();
    fetchElement();
});

//-----------------------------------------------------
var id = null;
var type = null;
var casaEditrice = null;
function getValues() {
    id = document.getElementById('idValue').value;
    type = document.getElementById('typeValue').value;
    casaEditrice = document.getElementById('casaEditriceValue').value;

    /*console.log('id: ' + id);
    console.log('type: ' + type);*/
}

//-----------------------------------------------------
function fetchElement() {
    var functionFetch = 'function/Dati/get';
    var dataToSend = {};
    switch (type) {
        case 'libri':
            functionFetch += 'Libro.php';
            dataToSend = {
                id: id
            };
            break;
        case 'enciclopedie':
            functionFetch += 'Enciclopedia.php';
            dataToSend = {
                id: id
            };
            break;
        case 'casaEditrice':
            functionFetch += 'CasaEditrice.php';
            dataToSend = {
                id: id
            };

            break;
        case 'cartine':
            functionFetch += 'Cartina.php';
            dataToSend = {
                id: id
            };
            break;
    }

    //console.log(functionFetch);

    console.log(dataToSend);

    fetch(functionFetch, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
        ,
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
                popolate(data.data);
            } else {
                console.log('La richiesta non ha avuto successo');
                console.log(data.message);
            }
        })
        .catch(error => {
            console.error('Si è verificato un errore:', error);
        });
}


function fetchVolume(id)
{
    const data = {
        id: id,
    };

    fetch('function/Dati/getVolume.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        ,
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
                //popolate(data.data);
            } else {
                console.log('La richiesta non ha avuto successo');
                console.log(data.message);
            }
        })
        .catch(error => {
            console.error('Si è verificato un errore:', error);
        });


}

//--------------------------------------------------------------------------------------------------
function popolate(data) {

    switch (type) {
        case 'casaEditrice':
            popolateCasaEditrice(data[0]);
            break;
        case 'libri':
            popolateLibro(data);
            break;
        case 'cartine':
            popolateCartina(data[0]);
            break;
        case 'enciclopedie':
            popolateEnciclopedia(data[0]);
            fetchVolume(data[0].id);
            break;
        default:
            break;
    }
}

//--------------------------------------------------------------------------------------------------
function popolateLibro(data) {
    // Seleziona gli elementi HTML in cui vuoi popolare i dati
    var titleDiv = document.querySelector('.title');
    var detailDiv = document.querySelector('.detail');

    // Popola i dati nei div
    titleDiv.innerHTML = data['BookName'];
    detailDiv.innerHTML = `
        <p>ISBN: ${data['ISBN']}</p>
        <p>Publication Date: ${data['PublicationDate']}</p>
        <p>Publisher Name: ${data['PublisherName']}</p>
        <p>Author Name: ${data['AuthorName']}</p>
        <p>Author Surname: ${data['AuthorSurname']}</p>
        <p>Author Birth Date: ${data['AuthorBirthDate']}</p>
        <p>Author Death Date: ${data['AuthorDeathDate']}</p>
    `;
}


function popolateEnciclopedia(data) {
    var titleDiv = document.querySelector('.title');
    var detailDiv = document.querySelector('.detail');

    titleDiv.innerHTML = data.BookName;
    detailDiv.innerHTML = `
        <p>ISBN: ${data['ISBN']}</p>
        <p>Publication Date: ${data['PublicationDate']}</p>
        <p>Publisher Name: ${data['PublisherName']}</p>
        <p>Authors: ${data['Authors']}</p>
    `;

}

function popolateCartina(data) {
    var titleDiv = document.querySelector('.title');
    var detailDiv = document.querySelector('.detail');

    titleDiv.innerHTML = data.BookName;
    detailDiv.innerHTML = `
        <p>ISBN: ${data['ISBN']}</p>
        <p>Publication Date: ${data['PublicationDate']}</p>
        <p>Representation Date: ${data['RepresentationDate']}</p>
        <p>Publisher Name: ${data['PublisherName']}</p>
        <p>Authors: ${data['Authors']}</p>
    `;
}


function popolateCasaEditrice(data) {
    var titleDiv = document.querySelector('.title');
    var detailDiv = document.querySelector('.detail');

    titleDiv.innerHTML = data.nome;
    detailDiv.innerHTML = `
        Goth girl
    `;
}