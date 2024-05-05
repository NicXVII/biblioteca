
document.addEventListener("DOMContentLoaded", function() {
    checkform();
});

//---------------------------------------------------------------------------------------------------   

async function fetchRegister(name,email,password,cognome, codiceFiscale)
{
    const dataToSend = {
        nome:               name,
        mail:               email,
        password:           password,
        cognome:            cognome,
        codiceFiscale:      codiceFiscale
    };

    console.log(dataToSend);
    try {
        const response = await fetch('function/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
            return false;
        }

        const data = await response.json();

        if (data.success) {
            console.log('La richiesta ha avuto successo:', data);
            return true;
        } else {
            console.log('La richiesta non ha avuto successo');
            console.log(data.message);
            return false; 
        }
    } catch (error) {
        console.error('Si è verificato un errore:', error);
        return false; 
    }
}


//---------------------------------------------------------------------------------------------------
function checkform()
{
    var form = document.getElementById('register-form');
    var name;
    var cognome;
    var codiceFiscale;
    var email;
    var password;
    var checkpassword;
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        name = document.getElementById('firstname').value;
        email = document.getElementById('email').value;
        password = document.getElementById('password').value;
        cognome = document.getElementById('surname').value;
        codiceFiscale = document.getElementById('fiscale').value;
        checkpassword = document.getElementById('conpass').value;
        
       gestistiRegistrazione(name,email,password,cognome,codiceFiscale,checkpassword);
    });
}


async function gestistiRegistrazione(nome,email,password,cognome,codiceFiscale,checkPassword)
{
    var esito = false;
    if(!controlloPassword(password, checkPassword))
        return;
    else
    {   if!codiceFiscaleCheck(codiceFiscale)
            esito =  await fetchRegister(nome,email,password,cognome,codiceFiscale);
    }

    console.log(esito);
    popUp(esito);
    
}

function popUp(esito){
    if(esito)
    {
        popUpRight();
        window.location.href = "index.php";
    }
    else
    {
        popUpWrong("Registrazione non riuscita ");
    }
}




function controlloPassword(password, checkPassword)
{
    if(password != checkPassword)
    {
        popUpWrong("Password not match");
        return false;
    }
    return true;
}

function codiceFiscaleCheck(codiceFiscale) {
    if (codiceFiscale.length !== 16) {
        return false;
    }
    
    var cognome = codiceFiscale.substring(0, 3).toUpperCase();
    var nome = codiceFiscale.substring(3, 6).toUpperCase();
    var dataNascita = codiceFiscale.substring(6, 10);
    var carattereControllo = codiceFiscale.substring(15).toUpperCase();
    
    var caratteri = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var somma = 0;
    for (var i = 0; i < 15; i++) {
        var c = codiceFiscale[i].toUpperCase();
        var valore;
        if (i % 2 === 0) {
            valore = caratteri.indexOf(c) * 1;
        } else {
            valore = caratteri.indexOf(c) * 2;
            if (valore > 9) {
                valore = valore - 9;
            }
        }
        somma += valore;
    }
    var resto = somma % 26;
    var carattereControlloCalcolato = caratteri[resto];
    
    // Confronto con l'ultimo carattere
    return carattereControllo === carattereControlloCalcolato;
}

//---------------------------------------------------------------------------------------------------
function popUpRight()
{
    Swal.fire({
        icon: 'success',
        title: 'Registrazione avvenuta con successo!',
        text: 'Buona navigazione',
    });

}

function popUpWrong(text)
{
    Swal.fire({
        icon: 'error',
        title: text,
        text: 'Riprova',
    });
}