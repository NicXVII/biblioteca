var worker = null;
document.addEventListener("DOMContentLoaded", function()
{
    addLiPrestiti();
});


function addLiPrestiti()
{
    worker = document.getElementById("worker").value;
    console.log(worker == true);


    if(worker == true)
        {
            sessionStorage.setItem("worker", true);
            var ul = document.getElementById("ul");

            var li = document.createElement("li");
            li.className = "nav-item";
            var a = document.createElement("a");
            a.className = "nav-link";
            a.href = "insert.php";
            a.innerHTML = "Autore/Casa Editrice";
            li.appendChild(a);
            ul.appendChild(li);


            var li = document.createElement("li");
            li.className = "nav-item";
            var a = document.createElement("a");
            a.className = "nav-link";
            a.href = "ricercaLavoratore.php";
            a.innerHTML = "Prenotazioni/Presiti";
            li.appendChild(a);
            ul.appendChild(li);
        }
}


