export default class Player {
    constructor (triggerSel, overlaySel, closeSel) {
        this.triggers = document.querySelectorAll(triggerSel),
        this.overlay = document.querySelector(overlaySel),
        this.close = this.overlay.querySelector(closeSel);
    }

    play () {
        this.createAPIBlock();
        this.triggerButton();
        this.closeButton();
    }

    createAPIBlock () {
        const tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    createPlayer (path) {
        this.overlay.style.display = 'flex';

        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${path}`
          });
    }

    triggerButton () {
        this.triggers.forEach(item => {
            item.addEventListener('click', () => {
                if (document.querySelector('iframe#frame')) {
                    this.overlay.style.display = 'flex';
                } else {
                    const path = item.parentNode.getAttribute('data-url');
                    this.createPlayer(path);
                }
            });
        });
    }

    closeButton () {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.stopVideo();
        });
    }
}