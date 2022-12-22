var form = document.getElementById("contact");
form.onsubmit = validateData;

function validateData() {
    var fields = form.querySelectorAll("form input, form textarea");
    var feedbackSection = document.getElementById("area-form-checkout");
    var mistakenFields = [];
    var mistakenFieldsCounter = 0;
    for (var idx = 0; idx < fields.length; idx++) {
        if (fields[idx].value == "") {
            mistakenFields[mistakenFieldsCounter] = fields[idx];
            mistakenFieldsCounter++;
        }
    }
    if (mistakenFields.length > 0) {
        var mistakes = "<div><h2 id='titulo-area-de-mensagens' tabindex='-1'>Há " + mistakenFields.length + " Campos que precisam ser preenchidos.</h2>";
        mistakes += "<p>Verifique-os a seguir : :</p>";
        mistakes += "<ul>"
        for (mistakenFieldsCounter = 0; mistakenFieldsCounter < mistakenFields.length; mistakenFieldsCounter++) {
            mistakes += "<li><a style='color: red; marging: 1em;' onclick='removerErro(this);' href='#" + mistakenFields[mistakenFieldsCounter].id + "'>O campo " + mistakenFields[mistakenFieldsCounter].id + " não pode estar vazio.</a></li>";
        }
        mistakes += "</ul></div>";
        feedbackSection.innerHTML = mistakes;
    } else {
        var checking = "<div><h2 id='titulo-area-de-mensagens' tabindex='-1'>Verifique os dados antes de submeter o Fformulário</h2>";
        checking += "<ul>";
        for (var idx = 0; idx < fields.length; idx++) {
            checking += "<li><a style='color: lightgreen; marging: 1em;' href='#" + fields[idx].id + "'>" + fields[idx].id + ": " + fields[idx].value + "</a></li>";
        }
        checking += "</ul></div>";
        checking += "<button onclick='sendForm()'>Enviar Mensagem</button>";
        feedbackSection.innerHTML = checking;
    }
    feedbackSection.querySelector("h2").focus();
    return false;
}

function sendForm() {
    form.submit()
}


function removerErro(clickedLink) {
    clickedLink.parentNode.parentNode.removeChild(clickedLink.parentNode);
}