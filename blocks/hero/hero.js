import { decorateIcons, readBlockConfig } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  const hero = document.createElement('div');
  hero.classList.add('grid-flex');

  const text = document.createElement('div');
  text.classList.add('col', 'col-text', 'aligner-item');
  text.innerHTML = `
    <div class="text cmp-text-regular">
      <div class="cmp-text">
        <h1>${cfg.title}</h1>
      </div>
      <div class="cmp-text-vertical">
        <div class="cmp-text-vertical-line"></div>
        <div class="cmp-text-vertical-text">SCROLL</div>
      </div>
    </div>
  `;

  const textDiv = text.querySelector('.cmp-text-regular > .cmp-text');
  cfg.text.forEach((line) => {
    const p = document.createElement('p');
    p.innerHTML = line;
    textDiv.append(p);
  });

  hero.append(text);
  const video = document.createElement('div');
  video.classList.add('col', 'col-left');
  video.innerHTML = `
    <div class="col-image image-clip-left">
      <video autoPlay="" playsInline="" loop="" preload="auto" muted="" class="cmp-hero-variation-video gif">
        <source data-label="${cfg.name}" data-title="${cfg.name}"
                src="${cfg.gif}" type="video/mp4">
        <track src="" kind="subtitles" srcLang="en" label="English">
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="button cmp-button-play-primary cmp-button-launch-video">
      <button type="button" class="cmp-button" aria-label="Play Video" data-cmp-clickable="">
                                <span class="cmp-button-details">
                                <span class="cmp-button-text">Watch the video</span>
                                <span class="cmp-button-duration">${cfg.length}</span>
                                </span>
        <span class="cmp-button-icon cmp-button-icon-play" aria-hidden="true"></span>
      </button>
    </div>
    <div class="button cmp-button-pause">
      <button type="button" class="cmp-button" aria-label="Pause Video" data-cmp-clickable="">
        <span class="cmp-button-icon cmp-button-icon-arrow" aria-hidden="true"></span>
        <span class="cmp-button-text"> </span>
      </button>
    </div>
    <div class="button cmp-button-playbtn">
      <button type="button" class="cmp-button" aria-label="Play Video" data-cmp-clickable="">
        <span class="cmp-button-icon cmp-button-icon-arrow" aria-hidden="true"></span>
        <span class="cmp-button-text"> </span>
      </button>
    </div>
    <div class="cmp-modal" aria-modal="true" role="dialog" data-component="modal">
      <div class="cmp-modal-backdrop"></div>
      <div tabIndex="0"></div>
      <div class="cmp-modal-container">
        <div class="cmp-modal-heading">
          <button class="close" aria-label="close">
          </button>
        </div>
        <div class="cmp-modal-content">
          <video class="cmp-modal-video" autoPlay="" controls="" muted="" playsInline="" loop="" preload="auto">
            <source data-label="${cfg.name}" data-title="${cfg.name}"
                    src="${cfg.video}" type="video/mp4">
            <track src="" kind="subtitles" srcLang="en" label="English">
            Your browser does not support the video tag.
          </video>
        </div>
        <div tabIndex="0"></div>
      </div>
    </div>
  `;
  hero.append(video);
  decorateIcons(hero);
  block.innerHTML = hero.outerHTML;

  const videoHomePage = block.querySelector('.gif');
  const pauseBtn = block.querySelector('.cmp-button-pause button');
  const playBtn = block.querySelector('.cmp-button-playbtn button');
  const launchVideoButton = block.querySelector('.cmp-button-launch-video');

  if (launchVideoButton) {
    launchVideoButton.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('launchVideo', {
        detail: {
          modalEle: block.querySelector('.cmp-modal'),
        },
      }));
    });
  }

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      pauseBtn.style.visibility = 'hidden';
      videoHomePage.pause();
      setTimeout(() => {
        playBtn.style.visibility = 'visible';
      }, 200);
    });
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      playBtn.style.visibility = 'hidden';
      videoHomePage.play();
      setTimeout(() => {
        pauseBtn.style.visibility = 'visible';
      }, 200);
    });
  }
}
