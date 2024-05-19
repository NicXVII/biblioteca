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
        volume: id
    };
    console.log(data);

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
                popolateVolume(data.data);
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


async function prenotaVolume(id)
{
    const dataToSend = {
        id: id,
    };

    console.log(dataToSend);

    fetch('function/Prenota/prenotaVolume.php', {
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
                showSuccessAlert();
                //console.log('La richiesta ha avuto successo:', data.data);
                //popolate(data.data);
            } else {
                /*console.log('La richiesta non ha avuto successo');
                console.log(data.message);*/
                showErrorAlert();
            }
        })
        .catch(error => {
            console.error('Si è verificato un errore:', error);
        });

}
async function fetchPosizioneVolume(id)
{
    var dataToSend = {
        id: id
    };
    //console.log(dataToSend);


    try {
        const response = await fetch('function/Posizione/getVolume.php', {
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
        <p>Data pubblicazione: ${data['PublicationDate']}</p>
        <p>Casa Editrice: ${data['PublisherName']}</p>
        <p>Nome autore: ${data['AuthorName']}</p>
        <p>Cognome autore: ${data['AuthorSurname']}</p>
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

async function popolateVolume(data)
{
 var detailDiv = document.querySelector('.detail');
 var divVolumi = document.createElement('div');

 divVolumi.classList.add('divVolumi');

 for(dato of data)
    {
        var div = document.createElement('div');
        div.classList.add('divVolume');
        var p = document.createElement('p');
        p.innerHTML = "Numero Volume: "+dato.numeroVolume;
        div.appendChild(p);

        var p = document.createElement('p');
        p.innerHTML = "ISBN: "+dato.isbn;
        div.appendChild(p);

        
        //console.log(sessionStorage.getItem('worker'));
        if(sessionStorage.getItem("worker") === true)
            {
            var btn = document.createElement('button');
            btn.classList.add('btnPrenotazione');
            btn.innerHTML = 'Prenota';
            listenerPrenotaVolume(btn,dato.id);
            div.appendChild(btn);
        }else
        {
            var data = await fetchPosizioneVolume(dato.id);
            //console.log(data);
            var p = document.createElement('p');
            p.innerHTML = "Stanza: " + data.nomeStanza+ " armadio: " + data.nomeArmadio + " scaffale: " + data.nomeScaffale + " posizione: " + data.numeroScaffale;
            div.appendChild(p);
        }
        divVolumi.appendChild(div);

    }

    detailDiv.appendChild(divVolumi);
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

//-------------------------------------------------------------------
function listenerPrenotaVolume(btn,id)
{
    btn.addEventListener('click', function(){
        console.log('Prenota Volume');
        prenotaVolume(id);
    });
}

//--------------------------------------------------------------------------------------------------------------------------------
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