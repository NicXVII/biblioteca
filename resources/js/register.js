var url = 'http://localhost/info/concerto/';

document.addEventListener("DOMContentLoaded", function() {
    checkform();
});

//---------------------------------------------------------------------------------------------------   

async function fetchRegister(name,email,password)
{
    const dataToSend = {
        nome:       name,
        email:      email,
        password:   password,
    };

    try {
        const response = await fetch(url+'function/register.php', {
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
            createTokenSession(data.token);
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

function createTokenSession(data) {
    var token = data;
    sessionStorage.setItem('userToken', token);
}
//---------------------------------------------------------------------------------------------------
function checkform()
{
    var form = document.getElementById('register-form');
    var name;
    var email;
    var password;
    var checkpassword;
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        name = document.getElementById('firstname').value;
        email = document.getElementById('email').value;
        password = document.getElementById('password').value;
        checkpassword = document.getElementById('conpass').value;
       gestistiRegistrazione(name,email,password,checkpassword);
    });
}


async function gestistiRegistrazione(nome,email,password,checkPassword)
{
    var esito = false;
    if(!controlloPassword(password, checkPassword))
        return;
    else
        esito =  await fetchRegister(nome,email,password);

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