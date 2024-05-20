var type = null;
document.addEventListener('DOMContentLoaded', function() {
    createFormVolume();

    //type = document.getElementById('type').value;
    //whichForm();
    //fetchCaseEditrici();
    //fetchAutori();
    //check();
    //test();
});

async function test()
{
    var data = await fetchPosizione(37, 'carta');
    console.log(data);
}

//------------------------------------------------------------------

function whichForm() {
    switch (type) {
        case 'Enciclopedia':
            createFormEnciclopedia();
            break;
        case 'Libro':
            createFormLibro();
            break;
        case 'Carta Geo Politica':
            createFormCarta();
            break;
    }
}

//------------------------------------------------------------------




async function fetchPosizione(id, type)
{
    functionToFetch = 'function/AutoPosition/';

    switch (type) {
        case 'libro':
            functionToFetch += 'libro.php';
            break;
        case 'volume':
            functionToFetch += 'volume.php';
            break;
        case 'carta':
            functionToFetch += 'carta.php';
            break;
    }
    const dataToSend = {
        id: id,
    };

    console.log(dataToSend);
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
        if (data.success) {
            return data; 
        } else {
            throw new Error('Request was not successful: ' + data.message);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return []; 
    }
}

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
            //console.log(data.data);
            return data.data; // Return the array of authors
        } else {
            throw new Error('Request was not successful: ' + data.message);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return []; // Return an empty array if there's an error
    }
}

async function checkIsbn(type, isbn) {
    //console.log(isbn);

    functionToFetch = 'function/checkIsbn/check';

    switch (type) {
        case 'Libro':
            functionToFetch += 'Libro.php';
            break;
        case 'Enciclopedia':
            functionToFetch += 'Enciclopedia.php';
            break;
        case 'Carta':
            functionToFetch += 'Carta.php';
            break;
        case 'Volume':
            functionToFetch += 'Volume.php';
            break;
    }

    const dataToSend = {
        isbn: isbn
    };
    //console.log(dataToSend);
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
        //console.log(data.data);
        return data.data;   
    } catch (error) {
        console.error('An error occurred:', error);
        return []; // Return an empty array if there's an error
    }
}

async function check(isbn)
{
    var data = ['Libro', 'Enciclopedia', 'Carta', 'Volume'];
    var result = 0;
    for(dato of data)
    {
        result += await checkIsbn(dato, isbn);

    }

    return result;
}

async function insertLibro(nome, isbn, pubblicazione, autore, casaEditrice)
{
    console.log(sigma);
    var numerico = isNumericString(isbn);
    if(!numerico)
        {
            wrongPopUp('ISBN non numerico');
            return data = {
                success: false
            };
            return;

        }
    var isbnFORMAT = fixISBN(isbn);

    var result = 0;
    result = await check(isbnFORMAT);

    console.log(result);

    if(result !== 0)
        {
            wrongPopUp('ISBN già presente nel database');
            return data = {
                success: false
            };
            ;
        }
    const dataToSend = {
        nome: nome,
        isbn: isbnFORMAT,
        pubblicazione: pubblicazione,
        idAutore: sigma,
        idCasaEditrice: casaEditrice
    };
    try {
        const response = await fetch('function/Inserisci/inserisciLibro.php', {
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
        if (data.success) {
        console.log("Libro inserito "+data);
            return data; 
        } else {
            throw new Error('Request was not successful: ' + data.message);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return []; // Return an empty array if there's an error
    }
}

async function insertCarta(nome, isbn, pubblicazione,dataRiferimento, autore, casaEditrice)
{
    var numerico = isNumericString(isbn);
    if(!numerico)
        {
            wrongPopUp('ISBN non numerico');
            return data = {
                success: false
            };
        }

    if(clearAutore()) {
        return data ={
            success: false
        };
    }
    var isbnFORMAT = fixISBN(isbn);

    var result = 0;
    result = await check(isbnFORMAT);

    console.log(result);

    if(result !== 0)
        {
            wrongPopUp('ISBN già presente nel database');            
            return data = {
                success: false
            };
        }

    if(!checkDate(dataRiferimento,pubblicazione))
        {
            wrongPopUp('Data di rappresentazione precedente a quella di pubblicazione');
            return data = {
                success: false
            };
        }
    const dataToSend = {
        nome: nome,
        isbn: isbnFORMAT,
        pubblicazione: pubblicazione,
        dataRiferimento: dataRiferimento,
        idCasaEditrice: casaEditrice
    };
    //check
    //console.log(dataToSend);

    //console.log(dataToSend);
    try {
        const response = await fetch('function/Inserisci/inserisciCarta.php', {
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
        //console.log(data);
        if (data.success) {
            return data; 


        } else {
            throw new Error('Request was not successful: ' + data.message);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return []; // Return an empty array if there's an error
    }
}




async function insertEnciclopedia(nome,pubblicazione, isbn, volumiTotali, casaEditrice)
{
    var numerico = isNumericString(isbn);
    if(!numerico)
        {
            wrongPopUp('ISBN non numerico');
            return data = {
                success: false
            };
        }

    if(clearAutore()) {
        return data ={
            success: false
        };
    }
    var isbnFORMAT = fixISBN(isbn);

    var result = 0;
    result = await check(isbnFORMAT);

    console.log(result);

    if(result !== 0)
        {
            wrongPopUp('ISBN già presente nel database');            
            return data = {
                success: false
            };
        }


    const dataToSend = {
        titolo: nome,
        isbn: isbnFORMAT,
        dataPubblicazione: pubblicazione,
        volumiTotali: volumiTotali,
        idCasaEditrice: casaEditrice
    };

    sessionStorage.setItem('volumiTotali', volumiTotali);

    
    //check
    console.log(dataToSend);

    //console.log(dataToSend);
    try {
        const response = await fetch('function/Inserisci/inserisciEnciclopedia.php', {
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
        //console.log(data);
        if (data.success) {
            return data; 


        } else {
            throw new Error('Request was not successful: ' + data.message);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return []; // Return an empty array if there's an error
    }    
}
async function insertAutori(type,autori, id)
{
    const dataToSend = {
        autore: autori,
        id: id
    };

    //console.log(dataToSend);




    var functionToFetch = 'function/Inserisci/Autori/insertAutori';

    switch (type)
    {
        case 'Enciclopedia':
            functionToFetch += 'Enciclopedia.php';
            break;
        case 'Carta':
            functionToFetch += 'Carta.php';
            break;
    }
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
        if (data.success) {
            return data; 
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
    //nome, isbn, pubblicazione, prezzo, autore, casa editrice 

    var nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name:';
    var nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'name');
    nameInput.setAttribute('required', 'required'); // Aggiunto required
    form.appendChild(nameLabel);
    form.appendChild(nameInput);

    var isbnLabel = document.createElement('label');
    isbnLabel.textContent = 'ISBN:';
    var isbnInput = document.createElement('input');
    isbnInput.setAttribute('type', 'text');
    isbnInput.setAttribute('name', 'isbn');
    isbnInput.setAttribute('required', 'required');
    isbnInput.setAttribute('minlength', '13'); 
    isbnInput.setAttribute('maxlength', '13');
    form.appendChild(isbnLabel);
    form.appendChild(isbnInput);
    

    var publicationLabel = document.createElement('label');
    publicationLabel.textContent = 'Publication Date:';
    var publicationInput = document.createElement('input');
    publicationInput.setAttribute('type', 'date');
    publicationInput.setAttribute('name', 'publication');
    publicationInput.setAttribute('required', 'required'); // Aggiunto required
    form.appendChild(publicationLabel);
    form.appendChild(publicationInput);

    /*var priceLabel = document.createElement('label');
    priceLabel.textContent = 'Price:';
    var priceInput = document.createElement('input');
    priceInput.setAttribute('type', 'text');
    priceInput.setAttribute('name', 'price');
    priceInput.setAttribute('required', 'required'); // Aggiunto required
    form.appendChild(priceLabel);
    form.appendChild(priceInput);*/

    var autoriLabel = document.createElement('label');
    autoriLabel.textContent = 'Autori:';
    form.appendChild(autoriLabel);
    var selectAutori = document.createElement('select');
    selectAutori.setAttribute('required', 'required'); // Aggiunto required
    var autori = await fetchAutori();
    for (autore of autori) {
        var option = document.createElement('option');
        option.setAttribute('value', autore.idAutore);
        option.textContent = autore.nome + ' ' + autore.cognome;
        selectAutori.appendChild(option);
    }
    listenerSelect(selectAutori);
    form.appendChild(selectAutori);


    var caseEditricilabel = document.createElement('label');
    caseEditricilabel.textContent = 'Case Editrici:';
    form.appendChild(caseEditricilabel);
    var selectCaseEditrici = document.createElement('select');
    selectCaseEditrici.setAttribute('required', 'required'); // Aggiunto required
    var caseEditrici = await fetchCaseEditrici();
    for (casaEditrice of caseEditrici) {
        var option = document.createElement('option');
        option.setAttribute('value', casaEditrice.idCasaEditrice);
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
            //console.log(pair[0] + ': ' + pair[1]);
        }
        console.log("Autore " + autore + " casaEditrice " + casaEditrice);
        var data = await insertLibro(formData.get('name'), formData.get('isbn'), formData.get('publication'), autore, casaEditrice);
        console.log(data);
        var id = data.bookID;
        if(data.success === true)
            {

                var esito = await fetchPosizione(id,'libro');
                console.log(esito);
            }
    });
}

var numero = 1;
async function createFormCarta()
{
    var formDiv = document.querySelector('.formDiv');
    formDiv.innerHTML = '';

    var titolo = document.createElement('h1');
    titolo.innerHTML = 'Inserisci una nuova Carta Geo Politica';
    formDiv.appendChild(titolo);

    var form = document.createElement('form');
    form.setAttribute('method', 'POST');
    //nome, isbn, pubblicazione, prezzo, autore, casa editrice 

    var nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name:';
    var nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'name');
    nameInput.setAttribute('required', 'required'); 
    form.appendChild(nameLabel);
    form.appendChild(nameInput);

    var isbnLabel = document.createElement('label');
    isbnLabel.textContent = 'ISBN:';
    var isbnInput = document.createElement('input');
    isbnInput.setAttribute('type', 'text');
    isbnInput.setAttribute('name', 'isbn');
    isbnInput.setAttribute('required', 'required');
    isbnInput.setAttribute('minlength', '13'); 
    isbnInput.setAttribute('maxlength', '13');
    form.appendChild(isbnLabel);
    form.appendChild(isbnInput);



    var rappresentazioneLabel = document.createElement('label');
    rappresentazioneLabel.textContent = 'Data di rappresentazione:';
    var rappresentationInput = document.createElement('input');
    rappresentationInput.setAttribute('type', 'date');
    rappresentationInput.setAttribute('name', 'reference');
    rappresentationInput.setAttribute('required', 'required');
    form.appendChild(rappresentazioneLabel);
    form.appendChild(rappresentationInput);


    var publicationLabel = document.createElement('label');
    publicationLabel.textContent = 'Publication Date:';
    var publicationInput = document.createElement('input');
    publicationInput.setAttribute('type', 'date');
    publicationInput.setAttribute('name', 'publication');
    publicationInput.setAttribute('required', 'required'); 
    form.appendChild(publicationLabel);
    form.appendChild(publicationInput);




    /*var priceLabel = document.createElement('label');
    priceLabel.textContent = 'Price:';
    var priceInput = document.createElement('input');
    priceInput.setAttribute('type', 'text');
    priceInput.setAttribute('name', 'price');
    priceInput.setAttribute('required', 'required'); // Aggiunto required
    form.appendChild(priceLabel);
    form.appendChild(priceInput);*/
    /*var divBtn = document.createElement('div');
    divBtn.classList.add('divAutoriBtn');
    divBtn.appendChild(buttonAddAutore);
    var buttoRemove = document.createElement('button');
    buttoRemove.textContent = "Rimuovi Autori";
    divBtn.appendChild(buttoRemove);
    divAutori.appendChild(divBtn);
    var buttonAddAutore = document.createElement('button');
    buttonAddAutore.textContent = "Inserisci Autori";*/


    var divAutori = document.createElement('div');
    divAutori.id = 'autori';
    divAutori.classList.add('divAutori');

    var divAutoriSelect = document.createElement('div');
    divAutoriSelect.classList.add('divAutoriSelect');
    
    


var p = document.createElement('p');
p.innerHTML = "Seleziona quanti autori vuoi";
divAutoriSelect.appendChild(p);

var select = document.createElement('select');
select.setAttribute('required', 'required');

for (var i = 1; i <= 10; i++) {
    var option = document.createElement('option');
    option.value = i; 
    option.text = i; 
    select.appendChild(option);
}
select.addEventListener('change', async function() {
    var divA = document.querySelector('#autori');
    divA.innerHTML = '';
    /*divAutori.id = 'autori';
    divAutori.classList.add('divAutori');*/
   numero = select.options[select.selectedIndex].value;
   var div  = await createSelectAutori();
   divA.appendChild(div);
   //console.log(numero);
});

divAutoriSelect.appendChild(select);
form.appendChild(divAutoriSelect);





    //var select = ;
    //await createSelectAutori();
  
    form.appendChild(divAutori);

    var caseEditricilabel = document.createElement('label');
    caseEditricilabel.textContent = 'Casa Editrice:';
    form.appendChild(caseEditricilabel);
    var selectCaseEditrici = document.createElement('select');
    selectCaseEditrici.setAttribute('required', 'required'); // Aggiunto required
    var caseEditrici = await fetchCaseEditrici();
    for (casaEditrice of caseEditrici) {
        var option = document.createElement('option');
        option.setAttribute('value', casaEditrice.idCasaEditrice);
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
            //console.log(pair[0] + ': ' + pair[1]);
        }

        //console.log("Autore " + autore[0] + " casaEditrice " + casaEditrice);
        var data = await insertCarta(formData.get('name'), formData.get('isbn'), formData.get('publication'),formData.get('reference'), autore, casaEditrice);
        console.log(data);
        //console.log(autore);
        //insertAutori('Carta', sigma, 1);
        //console.log(data.success);
        var id = data.id;  

        if(data.success === true)
        {

            var data = await insertAutori('Carta', sigma, id); 
            console.log(data);
            if(data.success)
                {
                    successPopUp("Carta e Autori Inseriti");
                    var data = await fetchPosizione(id,'carta');
                    console.log(data);
                    if(data.success)
                        {
                            successPopUp("Carta inserita con successo");

                        }
                }
        }
    });
}

async function createFormEnciclopedia()
{
    var formDiv = document.querySelector('.formDiv');
    formDiv.innerHTML = '';

    var titolo = document.createElement('h1');
    titolo.innerHTML = 'Inserisci una nuova Enciclopedia';
    formDiv.appendChild(titolo);

    var form = document.createElement('form');
    form.setAttribute('method', 'POST');
    //nome, isbn, pubblicazione, prezzo, autore, casa editrice 

    var nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name:';
    var nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'name');
    nameInput.setAttribute('required', 'required'); 
    form.appendChild(nameLabel);
    form.appendChild(nameInput);

    var isbnLabel = document.createElement('label');
    isbnLabel.textContent = 'ISBN:';
    var isbnInput = document.createElement('input');
    isbnInput.setAttribute('type', 'text');
    isbnInput.setAttribute('name', 'isbn');
    isbnInput.setAttribute('required', 'required');
    isbnInput.setAttribute('minlength', '13'); 
    isbnInput.setAttribute('maxlength', '13');
    form.appendChild(isbnLabel);
    form.appendChild(isbnInput);



 

    var publicationLabel = document.createElement('label');
    publicationLabel.textContent = 'Data di pubblicazione:';
    var publicationInput = document.createElement('input');
    publicationInput.setAttribute('type', 'date');
    publicationInput.setAttribute('name', 'publication');
    publicationInput.setAttribute('required', 'required'); 
    form.appendChild(publicationLabel);
    form.appendChild(publicationInput);


    var volumeLabel = document.createElement('label');
    volumeLabel.textContent = 'Quanti volumi:';
    var volumeInput = document.createElement('input');
    volumeInput.setAttribute('type', 'number');
    volumeInput.setAttribute('name', 'volumi');
    volumeInput.setAttribute('required', 'required');
    volumeInput.setAttribute('min', '1');
    form.appendChild(volumeLabel);
    form.appendChild(volumeInput);




    var divAutori = document.createElement('div');
    divAutori.id = 'autori';
    divAutori.classList.add('divAutori');

    var divAutoriSelect = document.createElement('div');
    divAutoriSelect.classList.add('divAutoriSelect');
    
    


var p = document.createElement('p');
p.innerHTML = "Seleziona quanti autori vuoi";
divAutoriSelect.appendChild(p);

var select = document.createElement('select');
select.setAttribute('required', 'required');

for (var i = 1; i <= 10; i++) {
    var option = document.createElement('option');
    option.value = i; 
    option.text = i; 
    select.appendChild(option);
}
select.addEventListener('change', async function() {
    var divA = document.querySelector('#autori');
    divA.innerHTML = '';
    /*divAutori.id = 'autori';
    divAutori.classList.add('divAutori');*/
   numero = select.options[select.selectedIndex].value;
   var div  = await createSelectAutori();
   divA.appendChild(div);
});

divAutoriSelect.appendChild(select);
form.appendChild(divAutoriSelect);





    //var select = ;
    //await createSelectAutori();
  
    form.appendChild(divAutori);

    var caseEditricilabel = document.createElement('label');
    caseEditricilabel.textContent = 'Casa Editrice:';
    form.appendChild(caseEditricilabel);
    var selectCaseEditrici = document.createElement('select');
    selectCaseEditrici.setAttribute('required', 'required'); // Aggiunto required
    var caseEditrici = await fetchCaseEditrici();
    for (casaEditrice of caseEditrici) {
        var option = document.createElement('option');
        option.setAttribute('value', casaEditrice.idCasaEditrice);
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

        var data = await insertEnciclopedia(formData.get('name'), formData.get('publication'),formData.get('isbn'), formData.get('volumi') , casaEditrice.idCasaEditrice);
        var id = data.id;  
        console.log(data);
        if(data.success === true)
        {
            console.log("id " +id);
            var data = await insertAutori('Enciclopedia', sigma, id); 
            console.log(data);
            if(data.success)
                {
                    successPopUp("Enciclopedia e Autori Inseriti");
                    /*var data = await fetchPosizione(id,'carta');
                    console.log(data);
                    if(data.success)
                        {
                            successPopUp("Carta inserita con successo");

                        }*/

                        createFormVolume();
                }
        }else
            wrongPopUp(data.message);

    });
}

async function createSelectAutori() {
  
    var autori = await fetchAutori();
    //console.log(numero);
    var div = document.createElement('div');
    div.classList.add('divAutoriMostra');
    for(var i = 0; i < numero; i++)
        {
            var selectAutori = document.createElement('select');
            selectAutori.setAttribute('required', 'required'); 
        for (autore of autori) {
            var option = document.createElement('option');
            option.setAttribute('value', autore.idAutore);
            option.textContent = autore.nome + ' ' + autore.cognome;
            selectAutori.appendChild(option);
        }
    selectAutori.classList.add('selectAutori');
    listenerSelect(selectAutori);
    div.appendChild(selectAutori); 
    }
    return div;
}


async function createFormVolume()
{
    var numeroVolumi = sessionStorage.getItem('volumiTotali');
    console.log(numeroVolumi);

    var formDiv = document.querySelector('.formDiv');
    formDiv.innerHTML = '';

    var form = document.createElement('form');
    form.setAttribute('method', 'POST');


    var label = document.createElement('label');
    label.innerHTML = 'Inerisci isbn volumi';

    form.appendChild(label);
    for(var i = 0; i < numeroVolumi; i++)
        {
            var input = document.createElement('input');
            input.placeholder = 'ISBN volume ' + (i+1) ;
            input.setAttribute('type', 'text');
            input.setAttribute('name', 'isbn'+i);
            input.setAttribute('required', 'required');
            input.setAttribute('minlength', '13'); 
            input.setAttribute('maxlength', '13');


            form.appendChild(input);

        }


        var button = document.createElement('button');
        button.setAttribute('type', 'submit');
        button.innerHTML = "Inserisci ISBN";
        form.appendChild(button);


    form.addEventListener('submit', function(event) {
        event.preventDefault();
        var formData = new FormData(form);

        let isbns = [];
        for (var pair of formData.entries()) {
            isbns.push(pair[1]);
            //console.log(pair[0] + ': ' + pair[1]);
        }
        console.log(isbns);
        console.log(checkISBNEquals(isbns));
    });    
    formDiv.appendChild(form);



}
// ------------------------------------------------------------------------------------------------
function checkISBNEquals(isbns)
{
    let allUnique = new Set(isbns).size === isbns   .length;
    return allUnique;
}

var autore = [];
var sigma = [];
function listenerSelect(select) {
    select.addEventListener('change', function() {
     
        //input.value = select.options[select.selectedIndex].value;
        //console.log(input.value);
        //var id  = selected.idAutore;
        //console.log(selected + '  ' + id);
        sigma.push(select.options[select.selectedIndex].value);
        //console.log(autore[select.selectedIndex]);
    });
} [];
var casaEditrice = null;
function listenerSelectCasaEditrice(select) {
    select.addEventListener('change', function() {
        var input = document.getElementById('casaEditrice');
        input.value = select.options[select.selectedIndex].value;
        casaEditrice = select.options[select.selectedIndex].value;
        console.log(casaEditrice);
    });
}


function isNumericString(isbn) {
  
    var numericRegex = /^[0-9]+$/;
    return numericRegex.test(isbn);
}

function fixISBN(isbn) {

    var prefix = isbn.slice(0, 3);         
    var registrationGroup = isbn.slice(3, 4); 
    var registrant = isbn.slice(4, 7);     
    var publication = isbn.slice(7, 12);    
    var checkDigit = isbn.slice(12);      

    return `${prefix}-${registrationGroup}-${registrant}-${publication}-${checkDigit}`;
}
function checkDate(rappresentazione,pubblicazione)
{
    var dataR = new Date(rappresentazione);
    var dataP = new Date(pubblicazione);

    if(dataR < dataP)
        {
            return true;
        }
    return false;

}
function clearAutore() {
    var counts = {}; 
    for (var i = 0; i < sigma.length; i++) {
        var valoreCorrente = sigma[i];
        counts[valoreCorrente] = (counts[valoreCorrente] || 0) + 1;
        if (counts[valoreCorrente] > 1) {
            return true;
        }
    }
    return false;
}


function successPopUp(text)
{
    swal({
        title: "Success!",
        text: text,
        icon: "success",
        button: "Ottimo!"
    });
}


function wrongPopUp(text)
{
    swal({
        title: "Error!",
        text: text,
        icon: "error",
        button: "Prova di nuovo"
    });
}