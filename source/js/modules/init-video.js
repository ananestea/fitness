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
