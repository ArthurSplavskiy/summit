// Подключение дополнения
//import "../libs/hystmodal.min.js";
// Подключение стилей

export let popupItem;
export function initPopups() { 

	popupItem = new HystModal({
		linkAttributeName: "data-hystmodal",
		// beforeOpen: function (popupItem) {
		// 	const hash = popupItem.openedWindow.id;
		// 	setHash(`#${hash}`);
		// },
		// afterClose: function (popupItem) {
		// 	setHash(window.location.href.split('#')[0]);
		// },
		// прочие настройки (не обязательно), см. API
	});
	// Открытие по хешу
	// if (getHash() && document.querySelector(`#${getHash()}`)) {
	// 	popupItem.open(`#${getHash()}`);
	// }
}
initPopups();