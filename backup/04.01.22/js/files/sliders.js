/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Scrollbar } from 'swiper';
import gsap from 'gsap'
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
//import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Добавление классов слайдерам
// swiper главному блоку, swiper-wrapper оболочке, swiper-slide для слайдов
function bildSliders() {
	//BildSlider
	let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
	if (sliders) {
		sliders.forEach(slider => {
			slider.parentElement.classList.add('swiper');
			slider.classList.add('swiper-wrapper');
			for (const slide of slider.children) {
				slide.classList.add('swiper-slide');
			}
		});
	}
}
// Инициализация слайдеров
function initSliders() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

	// Перечень слайдеров
	if (document.querySelector('.swiper')) {


		const cursorHandler = (e) => {
			gsap.to(document.querySelector('.c-cursor'), .5, {
                top: e.touches.currentY,
		        left: e.touches.currentX
            })
		}

		const rentSlider = new Swiper('.swiper-rent', {
			// Подключаем модули слайдера
			// для конкретного случая
			//modules: [Navigation, Pagination],
			/*
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/
			init: false,
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			autoHeight: true,
			spaceBetween: 0,
			speed: 800,
			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,
			// Dotts
			//pagination: {
			//	el: '.slider-quality__pagging',
			//	clickable: true,
			//},
			breakpoints: {
				0: {
					slidesPerView: 1.1,
					spaceBetween: 16,
					autoHeight: true,
				},
				480: {
					slidesPerView: 1.2,
					spaceBetween: 40,
				}
			},
			on: {

			}
		});

		if(window.innerWidth <= 768) {
			rentSlider.init()
		}

		window.addEventListener("resize", function (e) {
			if(window.innerWidth <= 768) {
				rentSlider.init()
				rentSlider.enable()
			} else {
				rentSlider.disable()
			}
		});

		const imageSlider = new Swiper('.swiper-image', {
			modules: [Navigation],
			/*
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			speed: 800,
			grabCursor: true,

			// Arrows
			navigation: {
				nextEl: '.swiper-image .swiper-image__arrow-next',
				prevEl: '.swiper-image .swiper-image__arrow-prev'
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 16,
					autoHeight: true,
				},
				480: {
					slidesPerView: 1,
					spaceBetween: 40,
				},
				768: {
					slidesPerView: 1.2,
					spaceBetween: 32,
				},
			}
		});

		let imageSliderTotalSlides = document.querySelector('.swiper-image .swiper-image__total');
		let imageSliderCurrentSlide = document.querySelector('.swiper-image .swiper-image__current');

		imageSliderTotalSlides.innerHTML = imageSlider.slides.length;

		imageSlider.on('slideChange', () => {
			let currentSlide = ++imageSlider.realIndex;
			imageSliderCurrentSlide.innerHTML = currentSlide;
		})

		imageSlider.on('touchMove', (e) => cursorHandler(e))

		const roomsSlider = new Swiper('.swiper-rooms', {
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 16,
			autoHeight: true,
			speed: 800,
			grabCursor: true,
			breakpoints: {
				0: {
					slidesPerView: 1.1,
					spaceBetween: 16,
					autoHeight: true,
				},
				480: {
					slidesPerView: 1.1,
					spaceBetween: 40,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 32,
				},
			}
		});

		roomsSlider.on('touchMove', (e) => cursorHandler(e))

		let partnersSlider = new Swiper('.swiper-partners', {
			modules: [Navigation, Scrollbar],
			observer: true,
			observeParents: true,
			slidesPerView: 6,
			spaceBetween: 0,
			autoHeight: true,
			speed: 800,
			grabCursor: true,

			navigation: {
				nextEl: '.swiper-partners .swiper-image__arrow-next',
				prevEl: '.swiper-partners .swiper-image__arrow-prev'
			},
			
			scrollbar: {
				el: '.swiper-partners__scrollbar',
				draggable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 4
				},
				480: {
					slidesPerView: 4
				},
				768: {
					slidesPerView: 6
				},
			}
		});

		let partnersSliderTotalSlides = document.querySelector('.swiper-partners .swiper-image__total');
		let partnersSliderCurrentSlide = document.querySelector('.swiper-partners .swiper-image__current');

		partnersSliderTotalSlides.innerHTML = partnersSlider.slides.length;

		partnersSlider.on('slideChange', () => {
			let currentSlide = ++partnersSlider.realIndex;
			partnersSliderCurrentSlide.innerHTML = currentSlide;
		})

		let reviewsSlider = new Swiper('.swiper-reviews', {
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 3,
			spaceBetween: 32,
			autoHeight: true,
			speed: 800,
			grabCursor: true,

			navigation: {
				nextEl: '.swiper-reviews .swiper-image__arrow-next',
				prevEl: '.swiper-reviews .swiper-image__arrow-prev'
			},

			breakpoints: {
				0: {
					slidesPerView: 1.1,
					spaceBetween: 16
				},
				480: {
					slidesPerView: 2.1,
					spaceBetween: 40
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 32
				},
			}
		});

		let reviewsSliderTotalSlides = document.querySelector('.swiper-reviews .swiper-image__total');
		let reviewsSliderCurrentSlide = document.querySelector('.swiper-reviews .swiper-image__current');

		reviewsSliderTotalSlides.innerHTML = reviewsSlider.slides.length;

		reviewsSlider.on('slideChange', () => {
			let currentSlide = ++reviewsSlider.realIndex;
			reviewsSliderCurrentSlide.innerHTML = currentSlide;
		})

		reviewsSlider.on('touchMove', (e) => cursorHandler(e))

	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});