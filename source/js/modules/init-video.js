// const video = document.querySelector('.video');
// const link = document.querySelector('.video__link');
// const button = document.querySelector('.video__button');
// const iframeBlock = video.querySelector('[data-video-container]');
// link.removeAttribute('href');

// const createIframe = (block) => {
//   const iframe = document.createElement('iframe');

//   iframe.setAttribute('allow', 'autoplay');
//   iframe.setAttribute('src', block.src);

//   return iframe;
// };

// button.addEventListener('click', () => {
//   if (video && iframeBlock) {
//     button.remove();
//     link.remove();
//     const newIframe = createIframe(iframeBlock);
//     iframeBlock.append(newIframe);
//   }
// });


// const initVideo = () => {
//   if (document.querySelector('.intro__video-wrapper') !== null && document.querySelector('.intro__video-btn') !== null) {
//     const wrapper = document.querySelector('.intro__video-wrapper');
//     const btn = document.querySelector('.intro__video-btn');

//     btn.addEventListener('click', (evt) => {
//       evt.preventDefault();
//       wrapper.insertAdjacentHTML('afterbegin','<iframe class="intro__video" src="https://www.youtube.com/embed/9TZXsZItgdw?autoplay=1" title="YouTube видео" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>');
//       wrapper.classList.add('intro__video-wrapper--play');
//     });
//   } else {
//   }
// }

// export {initVideo};


const video = document.querySelector('.video');
const button = document.querySelector('.video__button');
const container = video.querySelector('.video__container');
const image = video.querySelector('.video__image');

const createIframe = (parent) => {
  const iframe = document.createElement('iframe');

  iframe.setAttribute('allow', 'autoplay');
  iframe.setAttribute('src', parent.dataset.src);

  return iframe;
};

button.addEventListener('click', () => {
  if (video && container) {
    container.removeChild(button);
    container.removeChild(image);
    const newIframe = createIframe(container);
    container.appendChild(newIframe);
  }
});
