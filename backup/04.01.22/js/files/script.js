import { isMobile, removeClasses } from './functions.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin.js';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

class App {
    constructor () {

        
        this.body = document.body
        this.customCursor = document.querySelector('.c-cursor')
        this.slidersCursor = [
            document.querySelector('.swiper-image'),
            document.querySelector('.swiper-rooms'),
            document.querySelector('.swiper-reviews'),
            document.querySelector('.swiper-partners')
        ]

        this.addEventListeners()
    }

    init () {
        this.removeEventListeners()

        this.pinHeader()
        this.anchorTransition()

        
    }

    pinHeader () {
        const showAnim = gsap.from('.header', { 
            yPercent: -100,
            paused: true,
            duration: 0.2
        }).progress(1);
        
        ScrollTrigger.create({
            start: "top top",
            end: 99999,
            onUpdate: (self) => {
                self.direction === -1 ? showAnim.play() : showAnim.reverse()
            }
        });
    
        window.addEventListener('scroll', scroll_scroll);
        function scroll_scroll() {
            let src_value = pageYOffset;
            let header = document.querySelector('header.header');
            if (header !== null) {
                if (src_value > 10) {
                    header.classList.add('_scroll');
                } else {
                    header.classList.remove('_scroll');
                }
            }
        }
    }

    anchorTransition () {
        const anchorTimeline = gsap.timeline()
        let linkAnchors = document.querySelectorAll('._anchor-link') 
        
        gsap.utils.toArray(linkAnchors).forEach(link => { 
            link.addEventListener("click", e => {
                e.preventDefault(); 

                anchorTimeline.to(this.body, { autoAlpha: 0 })
                anchorTimeline.to(window, {duration: 1.2, scrollTo: e.target.getAttribute("href")}) 
                anchorTimeline.to(this.body, { autoAlpha: 1})

            }); 
        });
    }

    initCursor (e) {
        let x = e.clientX;
        let y = e.clientY;
        this.customCursor.style.left = x + 'px';
        this.customCursor.style.top = y + 'px';
        
        if(!this.customCursor.classList.contains('above-slider')) {
            this.customCursor.classList.add('above-slider')
        }
        

        // gsap.to(this.customCursor, .5, {
        //     top:  y,
        //     left: x
        // })

        if(this.customCursor.classList.contains('above-slider')) {
            gsap.to(this.customCursor, .5, {
                top:  y,
                left: x
            })

            // if(x < (window.innerWidth / 2)) {
            //     if(this.cursorSlider.classList.contains('right')) {
            //         this.cursorSlider.classList.remove('right')
            //     }
            // } else {
            //     if(!this.cursorSlider.classList.contains('right')) {
            //         this.cursorSlider.classList.add('right')
            //     }
            // }
        }
        
    }

    leaveCursor () {
        if(this.customCursor.classList.contains('above-slider')) {
            this.customCursor.classList.remove('above-slider')
        }
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
        this.slidersCursor.forEach(slider => slider.addEventListener('mousemove', this.initCursor.bind(this)))
        this.slidersCursor.forEach(slider => slider.addEventListener('mouseleave', this.leaveCursor.bind(this)))
    }
    removeEventListeners () {
        window.removeEventListener('load', this.init.bind(this));
    }
}

new App()

