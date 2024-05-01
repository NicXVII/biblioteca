document.addEventListener("DOMContentLoaded", function() {
});

//----------------------------------------------------------------------------
function fetcUtente(id)
{
    
    fetch(url+'function/Account/getDati.php', {
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
            //popolateDataUser(data.data);
        } else {
            console.log('La richiesta non ha avuto successo');
            console.log(data.message);
        }
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
    });
}





  

  
//----------------------------------------------------------------------------
var idUser= null;
function getUser()
{
    var userID = document.getElementById("userID").value;
    fetcUtente(userID);
}

//----------------------------------------------------------------------------
function popolateDataUser(data)
{
    /*var divContaienr = document.querySelector('content');
    divContaienr.innerHTML = "";*/
    var divUser = document.querySelector(".userMediaData");
    divUser.innerHTML = '';
    var p = document.createElement("p");
    p.innerHTML = "Nome utente: "+data.nome;
    divUser.appendChild(p);


    var p = document.createElement("p");
    p.innerHTML = "Email: "+data.email;
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
        location.href = "function/logout.php"; // Correzione qui: location.href invece di Location.href
    });
}


function popUpRight()
{
    Swal.fire({
        icon: 'success',
        title: 'Eliminazione avvenuta con successo!',
        text: 'Buona navigazione',
    });

}

function popUpWrong()
{
    Swal.fire({
        icon: 'error',
        title: 'Eliminazione non avvenuta!',
        text: 'Riprova',
    });
}


