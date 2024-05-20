document.addEventListener("DOMContentLoaded", function() {
    var worker = document.getElementById('worker').value; 
    console.log(worker == true);
    if(worker) {
        erase();
        generateSelectElement();
        listenerBtnElement();
        listenerInsertElement();
    }else
        Map();
});

function erase()
{
    var div = document.querySelector('.map-container');
    div.innerHTML = '';

    var div = document.querySelector('.info');	
    div.remove();

}

var selectedElement = null;

function generateSelectElement() {
    var divLocation = document.querySelector('.map-container');

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

function initMap() {
    // Get the div where the map will be displayed
    var div = document.querySelector('.location');
    // Clear the div content
    div.innerHTML = '';

    // Define the map options
   
    const latitudine = 41.45630076576649;
    const longitudine =  15.55987817020046;
    const mapOptions = {
        center: new google.maps.LatLng(latitudine, longitudine),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Create the map
    const map = new google.maps.Map(div, mapOptions);

    // Define the marker options
    const markerOptions = {
        position: new google.maps.LatLng(latitudine, longitudine),
        map: map,
        // Optional icon and url properties
        // icon: image, 
        // url: "https://www.soloaziende.it//infopunto.php?id=" + imp.ElencoPunti[i].id
    };

    // Create the marker
    const marker = new google.maps.Marker(markerOptions);

    // Add click listener to the marker if url is defined
    if (markerOptions.url) {
        google.maps.event.addListener(marker, 'click', function() {
            window.location.href = this.url;
        });
    }
}

