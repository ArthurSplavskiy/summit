import { isMobile, removeClasses } from './functions.js';
//import gsap from 'gsap';
//import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
//import { ScrollToPlugin } from 'gsap/ScrollToPlugin.js';
import {
    textAnimationIn,
    textAnimationOut,
    circleAnimationIn,
    circleAnimationOut,
    cardAnimationStagger
} from './animation.js'
import Observer from './observer.js'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

class App {
    constructor () {
        this.customCursor = document.querySelector('.c-cursor')
        this.rentCursor = document.querySelector('.c-cursor_more-info')
        this.videoElement = document.querySelector('.video--js')
        this.slidersCursor = [
            document.querySelector('.swiper-image__cursor-overlay'), // .swiper-image
            document.querySelector('.swiper-rooms__cursor-overlay'),
            document.querySelector('.swiper-reviews__cursor-overlay'), //.s-reviews__swiper
            //document.querySelector('.swiper-partners__cursor-overlay') // .s-partners__swiper
        ]
        this.rentImages = document.querySelectorAll('.s-rent .rent-card__image') 
        this.pageTitles = document.querySelectorAll('.page-section__title h2')
        this.pageDescriptions = document.querySelectorAll('.page-section__description span')
        this.pageCircles = document.querySelectorAll('.page-section__circles')
        this.pageElementsCircles = [
            document.querySelector('.page-section__design img'),
            document.querySelector('.s-features__circle'),
            document.querySelector('.download-btn')
        ]

        this.addEventListeners()
    }

    init () {
        this.removeEventListeners()

        this.pinHeader()
        this.anchorTransition()
        this.scrollAnimation()
        this.playVideo()

        if(this.videoElement) {
            this.videoLoad()
        }
    }

    videoLoad () {
        const video_mp4 = this.videoElement.querySelector('source[type="video/mp4"]') 
        const video_webm = this.videoElement.querySelector('source[type="video/webm"]') 

        video_mp4.src = video_mp4.dataset.src
        video_webm.src = video_webm.dataset.src
        this.videoElement.load()
    }

    playVideo () {
        if (this.videoElement && !this.videoElement.playing) {
            let playPromise = this.videoElement.play();

            if (playPromise !== undefined) {
                playPromise.then(_ => {
                })
                .catch(error => {
                });
            }
        }
    }

    pinHeader () {

        ScrollTrigger.matchMedia({
            "(min-width: 992px)": function() {
                const showAnim = gsap.from('.header', { 
                    yPercent: -100,
                    paused: true,
                    duration: 0.2
                }).progress(1);
                
                ScrollTrigger.create({
                    start: "+=200",
                    end: 99999,
                    onUpdate: (self) => {
                        self.direction === -1 ? showAnim.play() : showAnim.reverse()
                    }
                });
            },
            "(max-width: 992px)": function() {
                gsap.set('.header', { 
                    yPercent: 0
                })
            }
        }); 
    
        window.addEventListener('scroll', scroll_scroll);
        function scroll_scroll() {
            let src_value = window.pageYOffset;
            let header = document.querySelector('header.header');
            if (header !== null) {
                if (src_value > 200) {
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
            link.addEventListener("click", event => {
                event.preventDefault(); 

                document.documentElement.classList.remove('menu-open', 'lock');
                document.querySelector('.header__menu').classList.remove("menu-open");

                // setTimeout(() => {
                //     document.documentElement.classList.remove('menu-open', 'lock');
                //     document.querySelector('.header__menu').classList.remove("menu-open");
                // }, 400)

                if(event.target.getAttribute("href")) {
                    anchorTimeline.to(window, {duration: 2.2, scrollTo: event.target.getAttribute("href")})
                }

                // if(document.querySelector('.page-transition') && event.target.getAttribute("href")) {
                //     anchorTimeline.to('.page-transition', {duration: 0.6, scaleX: 1, transformOrigin: 'top left'})
                //     anchorTimeline.to(window, {duration: 0.2, scrollTo: event.target.getAttribute("href")}) 
                //     anchorTimeline.to('.page-transition', {duration: 0.4, scaleX: 0, transformOrigin: 'top right'})
                // }
                
            }); 
        });
    }

    initCursor (e) {
        let x = e.pageX;
        let y = e.pageY;
        
        if(!this.customCursor.classList.contains('above-slider')) {
            this.customCursor.classList.add('above-slider')
        }

        if(this.customCursor.classList.contains('above-slider')) {
            gsap.to(this.customCursor, .5, {
                scale: 1
            })
            gsap.to(this.customCursor, .5, {
                top:  y,
                left: x
            })

            if(x < (window.innerWidth / 2)) {
                gsap.to(this.customCursor, {
					rotate: '-180deg'
				})
            } else {
                gsap.to(this.customCursor, {
					rotate: 0
				})
            }

        }

    }

    initMoreInfoCursor (e) {
        let x = e.pageX;
        let y = e.pageY;
        
        if(!this.rentCursor.classList.contains('above-slider')) {
            this.rentCursor.classList.add('above-slider')
        }

        if(this.rentCursor.classList.contains('above-slider')) {
            gsap.to(this.rentCursor, .5, {
                scale: 1
            })
            gsap.to(this.rentCursor, .5, {
                top:  y,
                left: x
            })
        }
    }

    leaveCursor () {
        if(this.customCursor.classList.contains('above-slider')) {
            this.customCursor.classList.remove('above-slider')
            gsap.to(this.customCursor, .5, {
                scale: 0
            })
        }
        if(this.rentCursor.classList.contains('above-slider')) {
            this.rentCursor.classList.remove('above-slider')
            gsap.to(this.rentCursor, .5, {
                scale: 0
            })
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
        * Animation
    */
    scrollAnimation () {
        new Observer(this.pageTitles, textAnimationIn, textAnimationOut)
        new Observer(this.pageDescriptions, textAnimationIn, textAnimationOut)
        new Observer(this.pageCircles, circleAnimationIn, circleAnimationOut)

        this.pageElementsCircles.forEach(circleEl => {
            if (circleEl) {
                new Observer(circleEl, circleAnimationIn, circleAnimationOut)
            }
        })
    
        if(document.querySelector('.infrastructure-card')) {
            cardAnimationStagger('.infrastructure-card:not(.infrastructure-card_big)')
            cardAnimationStagger('.infrastructure-card_big')
        }
    }

    /*
        * Events
    */
    addEventListeners () {
        window.addEventListener('load', this.init.bind(this));
        document.addEventListener('click', this.documentActions.bind(this))
        document.addEventListener('touchstart', this.playVideo.bind(this))

        if(this.slidersCursor.length > 0) {
            this.slidersCursor.forEach(slider => {
                if(slider) {
                    slider.addEventListener('mousemove', this.initCursor.bind(this))
                }
            })
            this.slidersCursor.forEach(slider => {
                if(slider) {
                    slider.addEventListener('mouseleave', this.leaveCursor.bind(this))
                }
            })
        }
        if(this.rentImages.length > 0) {
            this.rentImages.forEach(image => {
                if(image) {
                    image.addEventListener('mousemove', this.initMoreInfoCursor.bind(this))
                }
            })
            this.rentImages.forEach(image => {
                if(image) {
                    image.addEventListener('mouseleave', this.leaveCursor.bind(this))
                }
            })
        }
    }
    removeEventListeners () {
        window.removeEventListener('load', this.init.bind(this));
    }
}

new App()

