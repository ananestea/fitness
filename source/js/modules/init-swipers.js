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
