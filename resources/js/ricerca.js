document.addEventListener("DOMContentLoaded", function() {
    createSelect();
    addEventListenerSelect();
});


//----------------------------------fetching api here--------------------------------
function fetchRicerca()
{
    
}



//--------------------------------popolate data here--------------------------------


//--------------------------------create data here--------------------------------
function createSelect() {
    var divSearch = document.querySelector(".search");

    var select = document.createElement("select");

    var options = ["Tutti", "Libri", "Enciclopedie", "Cartine"];
    for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.value = options[i].toLowerCase();
        option.textContent = options[i];
        select.appendChild(option);
    }

    divSearch.appendChild(select);
}

var selected = null;
function addEventListenerSelect() {
    var select = document.querySelector("select");
    select.addEventListener("change", function() {
        selected = select.options[select.selectedIndex].value;
        console.log(selected);
    });
}