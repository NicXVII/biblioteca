document.addEventListener("DOMContentLoaded", function()
{

        generateSelectElement();
        listenerBtnElement();
        listenerInsertElement();
});
//------------------------------------------------------------------------------------------------
async function fetchInsertCasaEditrice(nome)
{
    const dataToSend = {
        nome: nome
    }
    try {
        const response = await fetch('function/Inserisci/inserisciCasaEditrice.php', {
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
        return data;
    } catch (error) {
        console.error('An error occurred:', error);
        return []; 
    }
}

async function fetchInsertAutore(nome,cognome)
{
    const dataToSend = {
        nome: nome,
        cognome: cognome
    }
    try {
        const response = await fetch('function/Inserisci/inserisciAutore.php', {
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
        return data;
    } catch (error) {
        console.error('An error occurred:', error);
        return []; 
    }
}

//------------------------------------------------------------------------------------------------

var selectedElement = null;

function generateSelectElement() {
    var divLocation = document.querySelector('.content');

    var div = document.createElement('div');
    div.className = 'selectElement';

    var types = ['Autore', 'Casa Editrice'];
    var divBtnElement = document.createElement('div');
    divBtnElement.classList.add('divBtnElement');
    for(type of types) {
        var divBtn = document.createElement('div');
        divBtn.classList.add('element');
        var btn = document.createElement('button');
        btn.innerHTML = type;
        btn.setAttribute('type', type);
        divBtn.appendChild(btn);
        divBtnElement.appendChild(divBtn);
    }
    div.appendChild(divBtnElement);

    var divBtnSend = document.createElement('div');
    divBtnSend.classList.add('divBtnSend');
    var btnSend = document.createElement('button');
    btnSend.innerHTML = 'Inizia Inserimento';
    divBtnSend.appendChild(btnSend);

    div.appendChild(divBtnSend);

    divLocation.appendChild(div);
}
function listenerBtnElement() {
    var btns = document.querySelectorAll('.divBtnElement button');
    for (btn of btns) {
        btn.addEventListener('click', function() {
            var allBtns = document.querySelectorAll('.divBtnElement button');
            for (btn of allBtns) {
                btn.classList.remove('selected');
            }
            this.classList.add('selected');

            var type = this.getAttribute('type');
            selectedElement = type;
            //console.log(selectedElement);
        });
    }
}

function listenerInsertElement() {
    var btn = document.querySelector('.divBtnSend button');
    btn.addEventListener('click', function() {
        switch(selectedElement) {
            case 'Autore':
                createFormAutore();
                break;
            case 'Casa Editrice':
                createFormCasaEditrice();
                break;
        }
    });
}

//------------------------------------------------------------------------------------------------
function createFormAutore() {
    var div = document.querySelector('.content');
    div.innerHTML = '';

    var divForm = document.createElement('div');
    divForm.classList.add('formDiv');

    var form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('action', 'insertElement.php');
    form.setAttribute('enctype', 'multipart/form-data');
    form.classList.add('form');

    // Create a fieldset for better grouping
    var fieldset = document.createElement('fieldset');
    fieldset.classList.add('fieldset');

    var legend = document.createElement('legend');
    legend.textContent = 'Inserisci Autore';
    fieldset.appendChild(legend);

    // Nome
    var nomeLabel = document.createElement('label');
    nomeLabel.setAttribute('for', 'nome');
    nomeLabel.textContent = 'Nome:';
    fieldset.appendChild(nomeLabel);

    var nomeInput = document.createElement('input');
    nomeInput.setAttribute('type', 'text');
    nomeInput.setAttribute('name', 'nome');
    nomeInput.setAttribute('id', 'nome');
    nomeInput.required = true;
    fieldset.appendChild(nomeInput);

    fieldset.appendChild(document.createElement('br'));

    // Cognome
    var cognomeLabel = document.createElement('label');
    cognomeLabel.setAttribute('for', 'cognome');
    cognomeLabel.textContent = 'Cognome:';
    fieldset.appendChild(cognomeLabel);

    var cognomeInput = document.createElement('input');
    cognomeInput.setAttribute('type', 'text');
    cognomeInput.setAttribute('name', 'cognome');
    cognomeInput.setAttribute('id', 'cognome');
    cognomeInput.required = true;
    fieldset.appendChild(cognomeInput);

    fieldset.appendChild(document.createElement('br'));

    // Submit button
    var submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Inscerisci Autore';
    fieldset.appendChild(submitButton);

    // Append the fieldset to the form
    form.appendChild(fieldset);

    // Append the form to the div
    divForm.appendChild(form);
    div.appendChild(divForm);

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
       
        var nome = document.getElementById('nome').value;
        var cognome = document.getElementById('cognome').value;
        var data = await fetchInsertAutore(nome,cognome);

        console.log(data);

        if(data.success === true) {
            successPopUp('Autore inserito correttamente');
        } else {
            wrongPopUp('Autore non inserito');
        }


    });
}

function createFormCasaEditrice() {
    var div = document.querySelector('.content');
    div.innerHTML = '';

    var divForm = document.createElement('div');
    divForm.classList.add('formDiv');

    var form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('action', 'insertElement.php');
    form.setAttribute('enctype', 'multipart/form-data');
    form.classList.add('form');

    var fieldset = document.createElement('fieldset');
    fieldset.classList.add('fieldset');

    var legend = document.createElement('legend');
    legend.textContent = 'Inserisci Casa Editrice';
    fieldset.appendChild(legend);

    // Nome
    var nomeLabel = document.createElement('label');
    nomeLabel.setAttribute('for', 'nome');
    nomeLabel.textContent = 'Nome:';
    fieldset.appendChild(nomeLabel);

    var nomeInput = document.createElement('input');
    nomeInput.setAttribute('type', 'text');
    nomeInput.setAttribute('name', 'nome');
    nomeInput.setAttribute('id', 'nome');
    nomeInput.required = true;
    fieldset.appendChild(nomeInput);

    fieldset.appendChild(document.createElement('br'));


   
    fieldset.appendChild(document.createElement('br'));

    var submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Inscerisci Casa Editrice';
    fieldset.appendChild(submitButton);

    form.appendChild(fieldset);

    divForm.appendChild(form);
    div.appendChild(divForm);

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
       
        var nome = document.getElementById('nome').value;
        var data = await fetchInsertCasaEditrice(nome);

        console.log(data);

        if(data.success === true) {
            successPopUp('Casa Editrice inserita correttamente');
        } else {
            wrongPopUp('Casa Editrice non inserita');
        }


    });
}

function successPopUp(text)
{
    swal({
        title: "Success!",
        text: text,
        icon: "success",
        button: "Great!"
    });
}


function wrongPopUp(text)
{
    swal({
        title: "Error!",
        text: text,
        icon: "error",
        button: "Try Again"
    });
}