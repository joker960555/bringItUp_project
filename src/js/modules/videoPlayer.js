export default class Player {
    constructor ({buttons = null, overlay = null} = {}) {
        this.buttons = document.querySelectorAll(buttons);
        this.overlay = document.querySelector(overlay);
        try{
            this.close = this.overlay.querySelector('.close'); 
            this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
        }catch(e){}
    
    }

    play () {
        this.openVideo();
        this.closeVideo();
        this.loadAPI();
    }

    loadAPI () {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    onPlayerStateChange (event) {
        if (event.data === 0) {
            this.locked.style.opacity = 1;
            this.locked.style.filter = 'none';
            this.newBtn = this.locked.querySelector('.play__circle');
            this.newBtn.classList.remove('closed');
            this.newBtn.querySelector('svg').remove();
            this.newBtn.append(this.svg);
            this.newBtn.nextElementSibling.classList.remove('attention');
            this.newBtn.nextElementSibling.textContent = 'play video';
            this.newBtn.parentNode.setAttribute('data-closed', 'false');
        }
    }

    onYouTubeIframeAPIReady(path) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${path}`,
            events: {
                'onStateChange': this.onPlayerStateChange
            }
        });
    }

    openVideo() {
        this.buttons.forEach((btn, i) => {
            if (i % 2 !== 0) {
                btn.setAttribute('data-closed', 'true');
            }
            btn.addEventListener('click', (e) => {
                if (btn.getAttribute('data-closed') !== 'true') {
                    try{
                        this.path = btn.getAttribute('data-url');
                        this.locked = btn.closest('.module__video-item').nextElementSibling;
                        this.svg = btn.querySelector('svg').cloneNode(true);
                    }catch(e){}
                    if (this.overlay.querySelector('iframe')) {
                        this.overlay.style.display = 'flex';
                        this.player.loadVideoById({videoId: `${this.path}`});
                    } else {
                        this.overlay.style.display = 'flex';
                        this.onYouTubeIframeAPIReady(this.path);
                    }
                }
            });
        });
    }

    closeVideo() {
        this.close.addEventListener('click', (e) => {
            this.overlay.style.display = 'none';
            try{ this.player.stopVideo(); }catch(e){}
        });
    }

}