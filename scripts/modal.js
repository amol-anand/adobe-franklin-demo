(() => {
  const hideModal = () => {
    const modal = document.querySelector('.cmp-modal.active');
    modal.querySelector('video').pause();
    modal.classList.toggle('active');
  };

  const displayModal = (e) => {
    const modal = e.detail.modalEle;
    const close = modal.querySelector('.close');
    const backdrop = modal.querySelector('.cmp-modal-backdrop');

    close.addEventListener('click', hideModal);
    backdrop.addEventListener('click', hideModal);

    modal.classList.toggle('active');
    const video = modal.querySelector('video');
    video.muted = false;
    video.load();
  };

  document.addEventListener('launchVideo', displayModal);
})();
