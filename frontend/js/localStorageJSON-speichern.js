// Konstruktor
class EinkaufslisteListe {
	constructor(listenname, inhalt) {
		this.listenname = listenname;
		this.inhalt = inhalt;
	}
}

class EinkaufslisteEintrag {
	constructor(artikel, laden) {
		this.artikel = artikel;
		this.laden = laden;
	}
}



let artikel1 = new EinkaufslisteEintrag('Apfel', 'Rewe');
let artikel2 = new EinkaufslisteEintrag('Birnen', 'Rewe');
let artikel3 = new EinkaufslisteEintrag('Kirschen', 'Rewe');

let liste1Inhalt = {};
liste1Inhalt['Birnen'] = 'Rewe';
liste1Inhalt['Kirschen'] = 'Rewe';

let liste2Inhalt = {};
liste2Inhalt['Scheuermilch'] = 'Müller';


let einkaufslisteListe = {};
einkaufslisteListe['Liste1'] = liste1Inhalt;
einkaufslisteListe['Liste2'] = liste2Inhalt;

console.log(einkaufslisteListe);
console.log(typeof(einkaufslisteListe));

console.log(JSON.stringify(einkaufslisteListe));

/*

let liste1 = new EinkaufslisteListe('Testliste', liste1Inhalt);

let liste2Inhalt;
liste2Inhalt += artikel2;
liste2Inhalt += artikel3;

let liste2 = new EinkaufslisteListe('2. Liste', liste2Inhalt);

let einkaufslisteListensammlung = {};
einkaufslisteListensammlung.liste1 = liste1;
einkaufslisteListensammlung.liste2 = liste2;


console.log(einkaufslisteListensammlung);
console.log(typeof(einkaufslisteListensammlung));



let einkaufslisteInhaltscontainer = document.getElementById('einkaufsliste').getElementsByClassName('inhalts-container')[0];
	
let einkaufslisteListeHtml = "<div class='einkaufsliste-kategorie kategorie'>" + 
	"<h3>Listenname</h3>" + 
	"<div class='einkaufsliste-kategorie-inhalt kategorie-inhalt'>" +
		"<form class='inhalt-eintragen'>" +
			"<input type='text' placeholder='Produkt...'>" +
			"<input type='text' placeholder='Laden...''>" +
			"<input type='submit' value='&#43'>" +
		"</form>" +
	"</div>" +
"</div>";

let einkaufslisteEintragHtml = "<div class='einkaufsliste-kategorie-inhalt-eintrag' data-einkaufseintrag-id='1'>" +
	"<p class='artikel'></p>" +
	"<p class='laden'></p>" +
	"<p class''loeschen'><a>x</a></p>" +
"</div>";

let einkaufslisteListeIndex = 0;
for (let [key, value] of Object.entries(liste1)) {
	// Liste erstellen
	einkaufslisteInhaltscontainer.innerHTML += einkaufslisteListeHtml;
	einkaufslisteInhaltscontainer.getElementsByTagName('h3')[einkaufslisteListeIndex].innerHTML = value;
	
	// Liste befüllen
	//for (let [key, value] of Object.entries(liste1)) {
	
	einkaufslisteListeIndex += 1;
};





// Konstruktor
class Person {
  constructor(name, alter) {
    this.name = name;
    this.alter = alter;
  }

  print() {
    console.log(`Hallo ich bin ${this.name}`);
  }
}

let p = new Person('Anna', 23);

let pAsJson = JSON.stringify(p);
let pParsedBack = JSON.parse(pAsJson);

console.log(typeof(p));
console.log(pParsedBack);
console.log(pAsObject);

*/



/*
// funktioniert nicht:
// pParsedBack.print();

let p2 = { name: 'Anna', alter: 23 };
// funktioniert auch nicht:
// p2.print();

// funktioniert:
let pAsObject = new Person(pParsedBack.name, pParsedBack.alter);
pAsObject.print();




localStorage.setItem('einkaufslisteEintragIndex-0', 'test0');
localStorage.setItem('einkaufslisteEintragIndex-1', 'test1');
localStorage.setItem('einkaufslisteEintragIndex-2', 'test2');

var einkaufslisteEintragIndexVorlage = "einkaufslisteEintragIndex-";
var index = 0;

function EinkaufslistenEinträgeAnzeigen(){
	var einkaufslisteEintragIndex = einkaufslisteEintragIndexVorlage + index;
	index += 1;

	if(localStorage.getItem(einkaufslisteEintragIndex) != null) {
		console.log(localStorage.getItem(einkaufslisteEintragIndex));
		EinkaufslistenEinträgeAnzeigen();
	}
	else {
		console.log("Kein Inhalt");
	}
}

var einkaufslisteEintragIndex = einkaufslisteEintragIndexVorlage + index;
	index += 1;

	if(localStorage.getItem(einkaufslisteEintragIndex) != null) {
		console.log(localStorage.getItem(einkaufslisteEintragIndex));
		EinkaufslistenEinträgeAnzeigen();
	}
	else {
		console.log("Kein Inhalt");
	}



// Daten in LocalStorage schreiben

document.getElementById('neuer-einkaufslistenname-eintragen').addEventListener('click', neueEinkaufslisteErstellen);

function neueEinkaufslisteErstellen() {
	document.getElementById('neuer-einkaufslistenname').text;
}


*/


// Daten aus LocalStorage in Seite einfügen
/*let p = new Person('Anna', 23);


<div class="einkaufsliste-kategorie kategorie">
	<h3>Essen</h3>
	<div class="einkaufsliste-kategorie-inhalt  kategorie-inhalt">
		<div class="einkaufsliste-kategorie-inhalt-eintrag" data-einkaufseintrag-id="1">
			<p>Bananen</p>
			<p>Rewe</p>
			<a><p>x</p></a>
		</div>
		<form class="inhalt-eintragen">
			<input type="text" id="produkt-1" placeholder="Produkt...">
			<input type="text" id="laden-1" placeholder="Laden...">
			<input type="submit" value="&#43">
		</form>
	</div>
</div>

*/










