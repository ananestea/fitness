import '../vendor/swiper';
import Swiper from '../vendor/swiper';

const swiperStuff = new Swiper('.swiper--staff', {

  loop: true,
  watchSlidesProgress: true,

  breakpoints: {
    1200: {
      slidesPerView: 4,
      slidesPerGroup: 1,
      spaceBetween: 40,
    },

    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 30,
    },

    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 30,
    },
  },

  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  autoHeight: true,
});

const swiperFeedback = new Swiper('.swiper--feedback ', {

  initialSlide: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 30,

  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  autoHeight: true,
});

export {swiperStuff, swiperFeedback};


// const initStaffSwiper = () => {
//   const staffSlider = new Swiper('.swiper--staff', { // eslint-disable-line
//     direction: 'horizontal',
//     loop: true,

//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },
//     maxBackfaceHiddenSlides: 0,
//     breakpoints: {
//       // when window width is >= 320px
//       320: {
//         slidesPerView: 1,
//         slidesPerGroup: 1,
//       },
//       // when window width is >= 768px
//       768: {
//         slidesPerView: 2,
//         slidesPerGroup: 2,
//         spaceBetween: 30,
//       },
//       // when window width is >= 1200px
//       1200: {
//         slidesPerView: 3,
//         slidesPerGroup: 1,
//       },
//       // when window width is >= 1200px
//       1280: {
//         slidesPerView: 4,
//         slidesPerGroup: 4,
//       },
//     },
//   });
// };

// const initFeedbackSwiper = () => {
//   const feedbackSlider = new Swiper('.swiper--feedback', { // eslint-disable-line
//     direction: 'horizontal',

//     navigation: {
//       nextEl: '.feedback__button--next',
//       prevEl: '.feedback__button--prev',
//     },

//     slidesPerView: 1,
//   });
// };

// initStaffSwiper();
// initFeedbackSwiper();
