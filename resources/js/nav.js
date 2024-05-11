var worker = null;
document.addEventListener("DOMContentLoaded", function()
{
    worker = document.getElementById("worker");
    addLiPrestiti();
});


function addLiPrestiti()
{
    if(worker)
        {
            var ul = document.getElementById("ul");
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

