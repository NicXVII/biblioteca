document.addEventListener("DOMContentLoaded", function()
{

        generateSelectElement();
        listenerBtnElement();
        listenerInsertElement();
});

var selectedElement = null;

function generateSelectElement() {
    var divLocation = document.querySelector('.content');

    var div = document.createElement('div');
    div.className = 'selectElement';

    var types = ['Autore', 'Casa Editrice'];
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
        /*if(selectedElement!= null)
            location.href = 'insertElement.php?type=' + selectedElement;*/
    });
}

//------------------------------------------------------------------------------------------------
function createFormAutore()
{
    
}