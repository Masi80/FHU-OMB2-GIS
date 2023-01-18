const url = 'http://localhost:3000/';


// Einkaufslisten-Einträge-Funktionen

async function EinkaufslistenEintragErstellen(event){
    // Feldvalues abgreifen
    var button = event.target;
    var buttonEltern = button.parentNode;
    var produktFeld = buttonEltern.getElementsByClassName('produkt')[0].value;
    console.log(produktFeld);
    var ladenFeld = buttonEltern.getElementsByClassName('laden')[0].value;
    var kategorieDiv = buttonEltern.parentNode;
    var kategorieId = kategorieDiv.id;

    // Document erstellen
    const documentMongo = {
        Produkt : produktFeld,
        Laden : ladenFeld,
    };

    const response = await fetch(url+'einkaufslistenEintragErstellen?id=' + kategorieId, {
        method: 'post',
        body: JSON.stringify(documentMongo),
    });

    // Aufgrund eines Delays beim Einfügen in die Datenbank muss ide Liste pseudo-mäßig in die Datenbank und zusätzlich ins HTML geladen werden
    await EinkaufslistenAnzeigen();
    //var listenInhaltscontainer = kategorieDiv.childNodes[1]; // = Kategorie-Inhalt
    //listenInhaltscontainer += EinkaufslistenEintragConstructor(documentMongo.Produkt, documentMongo.Laden);
}

async function EinkaufslistenEintragLoeschen(event){
    var button = event.target;
    var buttonParent = button.parentNode;
    var documentId = buttonParent.lastChild.id;
    var kategorieId = buttonParent.parentNode.parentNode.id; // Collectionname durch Kategorie-ID

    // Stellt Collection des Documents sowie die Document-ID bereit
    const documentMongo = {
        KategorieCollection : kategorieId,
        ID : documentId,
    }

    console.log(JSON.stringify(documentMongo));

    await fetch(url+'einkaufslisteEintragLoeschen', {
        method: 'post',
        body: JSON.stringify(documentMongo),
    });
    
    // Aufgrund eines Delays beim Einfügen in die Datenbank muss die Liste pseudo-mäßig in die Datenbank und zusätzlich ins HTML geladen werden
    //buttonKategorie.remove();
    EinkaufslistenAnzeigen();
}


// Einkaufslisten-Funktionen
var einkaufslisteKategorie;
const einkaufslistenInhaltscontainer =  document.getElementById("einkaufsliste").querySelector('.inhalts-container');
var kategorieInhaltEintrag;
var kategorieInhaltDiv;
let einkaufslistenSpeichernButton = document.getElementById("neuer-einkaufslistenname-eintragen"); // Fügt Einkaufslisten-Speicher-Button Funktionalität hinzu 
einkaufslistenSpeichernButton.addEventListener("click", EinkaufslisteErstellen); //speichernButton.addEventListener("click", neueEinListe);

async function EinkaufslisteErstellen(event){
    var button = event.target;
    var buttonEltern = button.parentNode;
    var listennamenFeld = buttonEltern.querySelector("#neuer-einkaufslistenname");
    var documentMongo = {
        Einkaufslistenname : listennamenFeld.value,
    }

    await fetch(url+'einkaufslisteErstellen', {
        method: 'post',
        body: JSON.stringify(documentMongo),
    });

    // Aufgrund eines Delays beim Einfügen in die Datenbank muss die Liste pseudo-mäßig in die Datenbank und zusätzlich ins HTML geladen werden
    await EinkaufslistenAnzeigen();
    EinkaufslistenAnzeigenConstructor(documentMongo.Einkaufslistenname);


    listennamenFeld.value = ""; // Resettet das Listennamen-Eingabelfeld
}

// Einkaufslisten anzeigen
async function EinkaufslistenAnzeigen(){
    einkaufslistenInhaltscontainer.innerHTML = "";

    const response = await fetch(url+'einkaufslistenAnzeigen');
    var einLisColJSON = await response.text(); // Text aus Response Body
    var einLisCol = await JSON.parse(einLisColJSON); // Erstellt Array

    // Fügt für den Einkaufslistencontainer die Einkaufslisten hinzu
    for(let i = 0; i < (einLisCol.length); i++){
        var name = einLisCol[i].name;
        await EinkaufslistenAnzeigenConstructor(name);
    }
}

async function EinkaufslistenAnzeigenConstructor(name){
    // Erstellt Einkaufslisten-Inhaltscontainer
    einkaufslisteKategorie = document.createElement('div');
    einkaufslisteKategorie.className = "einkaufsliste-kategorie kategorie";
    einkaufslisteKategorie.id = name;

        var kategorieTitelleise = document.createElement('div');
        kategorieTitelleise.className = "kategorie-titelleiste";

            var h3 = document.createElement("h3");
            h3.innerHTML = name;

            var a = document.createElement("a");
            a.innerHTML = "x";
            a.addEventListener("click", EinkaufslisteLöschen);

        kategorieTitelleise.append(h3, a);

        // Erstellt Listeneinträge
        const response = await fetch(url+'einkaufslistenEintraegeHolen?id=' + name);
        const text = await response.text();
        var einLisEintraege = JSON.parse(text);

        kategorieInhaltDiv = document.createElement("div");
        kategorieInhaltDiv.className = "einkaufsliste-kategorie-inhalt kategorie-inhalt";

        for(let i = 0; i < einLisEintraege.length; i++){
            EinkaufslistenEintragErstellenConstructor(einLisEintraege[i]);
        }
        
        // Erstellt Container zum Listeintrag-Hinzufügen
        var inhaltEintragen = document.createElement("div");
        inhaltEintragen.className = "inhalt-eintragen";

            var inputProdukt = document.createElement("input");
            inputProdukt.type = "text";
            inputProdukt.className = "produkt";
            inputProdukt.placeholder = "Produkt...";

            var inputLaden = document.createElement("input");
            inputLaden.type = "text";
            inputLaden.className = "laden";
            inputLaden.placeholder = "Laden...";

            var a = document.createElement("a");
            a.innerHTML = "&#43";
            a.addEventListener("click", EinkaufslistenEintragErstellen);

        inhaltEintragen.append(inputProdukt, inputLaden, a);
            
    einkaufslisteKategorie.append(kategorieTitelleise, kategorieInhaltDiv, inhaltEintragen);
    
    einkaufslistenInhaltscontainer.append(einkaufslisteKategorie);
}

function EinkaufslistenEintragErstellenConstructor(einLisEintrag){
    kategorieInhaltEintrag = document.createElement("div");
    kategorieInhaltEintrag.className = "einkaufsliste-kategorie-inhalt-eintrag";

            var produktFeld = document.createElement("p");
            produktFeld.className = "produkt";
            produktFeld.innerHTML = einLisEintrag.Produkt;

            var ladenFeld = document.createElement("p");
            ladenFeld.className = "laden";
            ladenFeld.innerHTML = einLisEintrag.Laden;

            var a = document.createElement("a");
            a.addEventListener("click", EinkaufslistenEintragLoeschen);

                var p = document.createElement("p");
                p.innerHTML = "x";
                a.append(p);

            var eintragId = document.createElement("span");
            eintragId.id = einLisEintrag._id;
            eintragId.className = "eintragsId";

        kategorieInhaltEintrag.append(produktFeld, ladenFeld, a, eintragId);

    kategorieInhaltDiv.append(kategorieInhaltEintrag);
}

async function EinkaufslisteLöschen(event){
    var button = event.target;
    var buttonTitelleiste = button.parentNode;
    var buttonKategorie = buttonTitelleiste.parentNode;
    const response = await fetch(url+'einkaufslisteLoeschen?id=' + buttonKategorie.id);
    
    // Aufgrund eines Delays beim Einfügen in die Datenbank muss die Liste pseudo-mäßig in die Datenbank und zusätzlich ins HTML geladen werden
    buttonKategorie.remove();
    EinkaufslistenAnzeigen();
}

EinkaufslistenAnzeigen();