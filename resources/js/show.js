document.addEventListener("DOMContentLoaded",function()
{
    getValues();
    fetchElement();
});

//-----------------------------------------------------
var id = null;
var type = null;
var casaEditrice = null;
function getValues()
{
    id = document.getElementById('idValue').value;
    type = document.getElementById('typeValue').value;
    casaEditrice = document.getElementById('casaEditriceValue').value;

    /*console.log('id: ' + id);
    console.log('type: ' + type);*/
}

//-----------------------------------------------------
function fetchElement()
{
    var functionFetch = 'function/Dati/get';
    var dataToSend = {};
    if(casaEditrice === null)
        {
          
            functionFetch += 'CasaEditrice.php';
            dataToSend = {
                casaEditrice: casaEditrice
            };
        }else{
        switch(type)
        {
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
            case 'cartine':
                functionFetch += 'Cartina.php';
                dataToSend = {
                    id: id
                };
            break;
        }
        }

    //console.log(functionFetch);

    console.log(dataToSend);

    fetch(functionFetch, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
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

//--------------------------------------------------------------------------------------------------
function popolate(data)
{
    switch(type)
    {
        case 'libri':
            popolateLibro(data);
            break;
        case 'cartine':
            popolateCartina(data);
            break;
        case 'enciclopedie':
            popolateEnciclopedia(data);
            break;
        case 'casaEditrice':
            popolateCasaEditrice(data);
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
        <p>Book ID: ${data['BookID']}</p>
        <p>Publication Date: ${data['PublicationDate']}</p>
        <p>Publisher Name: ${data['PublisherName']}</p>
        <p>Publisher ID: ${data['PublisherID']}</p>
        <p>Author ID: ${data['AuthorID']}</p>
        <p>Author Name: ${data['AuthorName']}</p>
        <p>Author Surname: ${data['AuthorSurname']}</p>
        <p>Author Birth Date: ${data['AuthorBirthDate']}</p>
        <p>Author Death Date: ${data['AuthorDeathDate']}</p>
    `;
}
