

const popupWindowButton = document.querySelectorAll('.popup-window-button');
const popupWindowBackground = document.querySelector('.popup-window-background');
const popupWindow = document.querySelector('.popup-window');
const closeWindowButton = document.querySelector('.close-window-button');
const titleWindow = document.querySelector('.title-window');
const contentWindow = document.querySelector('.content-window');

for(let i = 0; i < popupWindowButton.length; i++){
	popupWindowButton[i].onclick = function() {
		popupWindowBackground.style = 'visibility: visible; opacity: 1;';
		popupWindow.style = 'scale: 1;';
		titleWindow.textContent = this.parentElement.textContent;
		let text = languageTrue[this.dataset.content];
		contentWindow.innerHTML = (text != undefined) ? text : 'Не має перекладу.';

	}
}
closeWindowButton.onclick = function() {
	popupWindowBackground.style = '';
	popupWindow.style = '';
}

