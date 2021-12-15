import { isMobile, removeClasses } from './functions.js';

class App {
    constructor () {

        this.addEventListeners()
    }

    init () {
        this.removeEventListeners()

        console.log('lod')
    }

    phonesDropdown () {

    }

    documentActions (e) {
        const targetElement = e.target
        
        if(window.innerWidth > 768 && isMobile.any()) {
            if(targetElement.classList.contains('phones__arrow') || targetElement.closest('.phones__arrow')) {
                targetElement.closest('.phones').classList.toggle('_hover')
            }
            if(!targetElement.closest('.phones') && document.querySelectorAll('.phones._hover').length > 0) {
                removeClasses(document.querySelectorAll('.phones._hover'), '_hover')
            }
        }
        if(isMobile.any()) {
            if(targetElement.classList.contains('lang-toggle__current')) {
                targetElement.closest('.lang-toggle').classList.toggle('_hover')
            }
            if(!targetElement.closest('.lang-toggle') && document.querySelectorAll('.lang-toggle._hover').length > 0) {
                removeClasses(document.querySelectorAll('.lang-toggle._hover'), '_hover')
            }
        }
    }

    /*
        * Events
    */
    addEventListeners () {
        window.addEventListener('load', this.init.bind(this));
        document.addEventListener('click', this.documentActions.bind(this))
    }
    removeEventListeners () {
        window.removeEventListener('load', this.init.bind(this));
    }
}

new App()

