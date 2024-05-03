document.addEventListener("DOMContentLoaded",function()
{
    getValues();
    fetchElement();
});

//-----------------------------------------------------
var id = null;
var type = null;
function getValues()
{
    id = document.getElementById('idValue').value;
    type = document.getElementById('typeValue').value;

    /*console.log('id: ' + id);
    console.log('type: ' + type);*/
}

//-----------------------------------------------------
function fetchElement()
{
    var functionFetch = 'function/Dati/get';

    switch(type)
    {
        case 'casa_editrice':
            functionFetch += 'CasaEditrice.php';
        break;
        case 'libri':
            functionFetch += 'Libro.php';
        break;
        case 'enciclopedie':
            functionFetch += 'Enciclopedia.php';
        break;
        case 'cartine':
            functionFetch += 'Cartina.php';
        break;
    }

    //console.log(functionFetch);
    var dataToSend = {
        codice: id
    };
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
            //popolateRicerca(data.data);
        } else {
            console.log('La richiesta non ha avuto successo');
            console.log(data.message);
        }
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
    });

}