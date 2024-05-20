document.addEventListener("DOMContentLoaded", function() {
    var worker = document.getElementById('worker').value; 
    console.log(worker == 1);
    if(worker == 1) {
        generateSelectElement();
        listenerBtnElement();
        listenerInsertElement();
        erase();
    }
});

function erase()
{
    var div = document.querySelector('.info');
    div.remove();

}

var selectedElement = null;

function generateSelectElement() {
    var divLocation = document.querySelector('.location');

    var div = document.createElement('div');
    div.className = 'selectElement';

    var types = ['Libro', 'Carta Geo Politica', 'Enciclopedia'];
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
            console.log(selectedElement);
        });
    }
}

function listenerInsertElement() {
    var btn = document.querySelector('.divBtnSend button');
    btn.addEventListener('click', function() {
        if(selectedElement!= null)
            location.href = 'insertElement.php?type=' + selectedElement;
    });
}

/*
function Maph()
{
    latitudine   = 45.650075;
    longitudine  = 13.767766;
    mapOptions = {
        center: new google.maps.LatLng(latitudine,longitudine),
        zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map($("#dvMap")[0], mapOptions);
    marker = new google.maps.Marker({position: new google.maps.LatLng(latitudine,longitudine), map: map});
    var imp = JSON.parse(result);
    pLatLng = new google.maps.LatLng(imp.ElencoPunti[i].lat,imp.ElencoPunti[i].lon);
    marker = new google.maps.Marker({
         position: pLatLng,
         map: map,
         icon: image,
         //url: "https://www.soloaziende.it//infopunto.php?id="+imp.ElencoPunti[i].id
    });
    google.maps.event.addListener(marker, 'click', function() {
        window.location.href = this.url;
    });
}*/
