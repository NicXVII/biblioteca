
document.addEventListener("DOMContentLoaded",function(){
    console.log('DOMContentLoaded');
    preventDefault();
});


function preventDefault()
{
    var form = document.getElementById("login-form");
    var formData;
    form.addEventListener("submit", function(event) {
        event.preventDefault();
       var email = document.getElementById("email").value;
       var password = document.getElementById("password").value;
       Fetchlogin(email, password);
    });
}


function Fetchlogin(email, password)
{
    console.log(email, password);
    const data = {
        email:      email,
        password:   password,
    };

    console.log(data);
    fetch('function/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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
            sessionStorage.setItem('user', true);
            //createTokenSession(data);
            location.href = "index.php";   
        } else {
            console.log('La richiesta non ha avuto successo');
            console.log(data.message);
            errorPopUP(data.message);
        }
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
        errorPopUP(error);

    });
}


function createTokenSession(data) {
    var token = data.token;
    sessionStorage.setItem('userToken', token);
}


function errorPopUP(message)
{
    Swal.fire({
        icon: 'error',
        title: message,
        text: 'Riprova',
    });
}