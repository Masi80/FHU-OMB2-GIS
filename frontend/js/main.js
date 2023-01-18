// --- Funktionen starten ---
window.addEventListener("load", (event) => {
	stopPropagation();
	desktopElementeHinzufuegenMan();
});


var einkaufslisteButton;
var einkaufslisteReiter;

var speissenButton;
var speissenReiter;

var wochenplanButton;
var wochenplanReiter;

function reiterManInitialisierung(){
	einkaufslisteButton = document.getElementById("einkaufsliste-reiterbutton");
	einkaufslisteReiter = document.getElementById("einkaufsliste");

	speissenButton = document.getElementById("speissen-reiterbutton");
	speissenReiter = document.getElementById("speissen");

	wochenplanButton = document.getElementById("wochenplan-reiterbutton");
	wochenplanReiter = document.getElementById("wochenplan");
	
	reiterManagement("einkaufsliste");
}

function reiterManagement(reitername) {
	if (document.documentElement.clientWidth < 600) {
		if(einkaufslisteButton.classList.contains('active')){
			einkaufslisteButton.classList.remove("active");
		}
		if(speissenButton.classList.contains('active')){
			speissenButton.classList.remove("active");
		}
		if(wochenplanButton.classList.contains('active')){
			wochenplanButton.classList.remove("active");
		}

		einkaufslisteReiter.style.display = "none";
		speissenReiter.style.display = "none";
		wochenplanReiter.style.display = "none";

		if(reitername == "einkaufsliste"){
			einkaufslisteButton.classList.add("active");
			einkaufslisteReiter.style.display = "block";
		}
		else if(reitername == "speissen"){
			speissenButton.classList.add("active");
			speissenReiter.style.display = "block";
		}
		else if(reitername == "wochenplan"){
			wochenplanButton.classList.add("active");
			wochenplanReiter.style.display = "block";
		}
	}
}



// --- Kategorie-Hinzufügen in Mobile ---
var aktReiter;

function desktopElementeHinzufuegenMan(){
	var reiter = document.getElementsByClassName("reiter");
	Array.prototype.forEach.call(reiter, function(reiter) {
		aktReiter = reiter;
		try{
			reiter.querySelectorAll('.kategorie-hinzufuegen-anzeigen-button')[0].addEventListener("click", desktopElementeHinzufuegenAnzeigen);
			reiter.querySelectorAll('.kategorie-hinzufuegen-ausblenden')[0].addEventListener("click", desktopElementeHinzufuegenAusblenden);
		} catch (error) {
			//console.error(error);
		}
	});	
}

function desktopElementeHinzufuegenAnzeigen(){
	var deinReiter = aktReiter;
	console.log(deinReiter);
	deinReiter.querySelectorAll('.kategorie-hinzufuegen')[0].classList.add("sichtbar");
}

function desktopElementeHinzufuegenAusblenden(){
	var deinReiter = aktReiter;
	deinReiter.querySelectorAll('.kategorie-hinzufuegen')[0].classList.remove("sichtbar");
}



// Propagation stoppen
function stopPropagation(){
	var kategorieHinzufuegenElemente = document.getElementsByClassName("kategorie-hinzufuegen");
	Array.prototype.forEach.call(kategorieHinzufuegenElemente, function(element) {
		element.addEventListener("touchmove", (event) => {
			event.stopPropagation();
			event.preventDefault();
		});
	});
}

// Kategorie-Hinzufügen in Mobile
var handlerPosY;
var handlerPosYBevor;
var handlerPosYVeraend;
var kategorieHinzufDiv;
var kategorieHinzufSlider;
var kategorieHinzufDivCompTop;

var wochenplanSliderCheck;


function handlerAusklappenStart(event, reiterName){
	kategorieHinzufSlider = document.getElementById(reiterName).getElementsByClassName("kategorie-hinzufuegen-slider")[0];
	kategorieHinzufDiv = document.getElementById(reiterName).getElementsByClassName("kategorie-hinzufuegen")[0];
	kategorieHinzufDivCompTop = window.getComputedStyle(kategorieHinzufDiv, null).getPropertyValue("top");	// Holt aktuellen Bottom-Wert aus CompStyle
	kategorieHinzufDivCompTop = kategorieHinzufDivCompTop.substring(0, kategorieHinzufDivCompTop.length - 2);	// Extrahiert Zahlen-Wert, entfernt PX
	
	handlerPosYBevor = event.touches[0].clientY; // Hole dir die aktuelle Position, wo der Finger getouched hat
}

function handlerAktPos(event){
	// Touch-Management
	handlerPosY = event.touches[0].clientY;
	handlerPosYVeraend = handlerPosYBevor - handlerPosY;
	handlerPosYVeraend = parseFloat(handlerPosYVeraend);
	handlerPosYBevor = handlerPosY;
	
	// Bottom-Einstellung
	kategorieHinzufDivCompTop = window.getComputedStyle(kategorieHinzufDiv, null).getPropertyValue("top");	// Holt aktuellen Bottom-Wert aus CompStyle
	kategorieHinzufDivCompTop = kategorieHinzufDivCompTop.substring(0, kategorieHinzufDivCompTop.length - 2);	// Extrahiert Zahlen-Wert, entfernt PX
	kategorieHinzufDivCompTop = parseInt(kategorieHinzufDivCompTop);
	
	kategorieHinzufDiv.style.top = (parseFloat(kategorieHinzufDivCompTop) - parseFloat(handlerPosYVeraend)) + "px";
}

function handlerDefPos(event, reiterName){
	var topHoehe;
	topHoehe = kategorieHinzufDiv.style.top.substring(0, kategorieHinzufDiv.style.top.length - 2);
	topHoehe = parseFloat(topHoehe);
	kategorieHinzufDiv.style.top = '';
	if (wochenplanSliderCheck == true) {
		document.getElementById(reiterName).querySelectorAll('.kategorie-hinzufuegen')[0].classList.remove("ausgeklappt");
		wochenplanSliderCheck = false;
	} else {
		if(topHoehe < 370){
			document.getElementById(reiterName).querySelectorAll('.kategorie-hinzufuegen')[0].classList.add("ausgeklappt");
			wochenplanSliderCheck = true;
		} 
	}
}