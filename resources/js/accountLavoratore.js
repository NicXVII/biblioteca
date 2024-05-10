document.addEventListener('DOMContentLoaded', function() {
    var worker = document.getElementById('worker');
    if(worker)
        {
            fetchData();
        }
});

//------------------------------------------------------------------------------------------------

function fetchPrestitiConcessi()
{
    
}
function fetchData()
{
    fetch('function/Account/getDatiLavoratore.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
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
            popolateDataUser(data.data);
        } else {
            console.log('La richiesta non ha avuto successo');
            console.log(data.message);
        }
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
    });
}

//------------------------------------------------------------------------------------------------
function popolateDataUser(data)
{
    /*var divContaienr = document.querySelector('content');
    divContaienr.innerHTML = "";*/
    var divUser = document.querySelector(".userMediaData");
    divUser.innerHTML = '';
    var p = document.createElement("p");
    p.innerHTML = "Nome dipendente: "+data.nome;
    divUser.appendChild(p);

    var p = document.createElement("p");
    p.innerHTML = "Cognome dipendente: "+data.cognome;
    divUser.appendChild(p);

    var p = document.createElement("p");
    p.innerHTML = "Codice fiscale utente: "+data.codiceFiscale;
    divUser.appendChild(p);

    var p = document.createElement("p");
    p.innerHTML = "Password: "+data.password;
    divUser.appendChild(p);

    var divBtn = document.querySelector('.userMediaBtn');
    divBtn.innerHTML = '';
    var button = document.createElement("button");
    button.innerHTML = "Logout";
    logout(button);
    divBtn.appendChild(button);
}

function logout(btn) {
    btn.addEventListener("click", function() {
        location.href = "function/logout.php"; 
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////        