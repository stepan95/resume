// Language

function language(lang = uk) {
let language = document.querySelectorAll('[data-language]');
	for(let i = 0; i < language.length; i++){
		let text = lang[language[i].dataset.language]; 
		language[i].textContent = (text != undefined) ? text : 'Не має пркладу.';
	}

}

language();


// Language switch

const ukLang = document.querySelector('#uk'); 
const enLang = document.querySelector('#en'); 
ukLang.onclick = function() {
	enLang.classList.remove('language-active');
	this.classList = 'language-active';
	language(uk);
}
enLang.onclick = function() {
	ukLang.classList.remove('language-active');	
	this.classList = 'language-active';
	language(en);
}