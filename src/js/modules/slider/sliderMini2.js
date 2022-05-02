import Slider from './slider';
export default class SliderMini extends Slider {
    constructor (container, slides, next, prev) {
        super (container, slides, next, prev);
    }

    render () {
        console.log(this.slides.parentNode);
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;
        this.slides.forEach(item => item.classList.add('animated'));
        this.nextSlide();
        this.prevSlide();
        this.toggleActive();
    }

    nextSlide () {
        this.next.addEventListener('click', () => {
            this.slides.forEach(sl => {
                if (sl.type === 'button') {
                    this.container.append(sl);
                } else {
                    sl.classList.remove('fadeInLeft', 'fadeInRight', `${this.active}`);
                setTimeout(() => {
                    this.slides.forEach(sl => {
                        if (sl.type !== 'button') {
                            sl.classList.add('fadeInRight');
                        }
                    });
                }, 20);
                }
            });
            this.container.append(this.slides[0]);
            this.toggleActive();
        });
    }

    prevSlide () {
        this.prev.addEventListener('click', () => {
            this.slides.forEach(sl => {
                if (sl.type === 'button') {
                    this.container.insertBefore(sl, this.slides[3]);
                } else {
                    sl.classList.remove('fadeInLeft', 'fadeInRight', `${this.active}`);
                    setTimeout(() => {
                        this.slides.forEach(sl => {
                            if (sl.type !== 'button') {
                                sl.classList.add('fadeInLeft');
                            }
                        });
                    }, 20);
                }
            });
            this.container.prepend(this.slides[this.slides.length - 1]);
            this.toggleActive();
        });
    }
    
    toggleActive () {
        const sl = this.slides[0];
        this.slides.forEach(item => {
            if (item.type !== 'button') {
                item.classList.remove(`${this.active}`);
                if (item.firstElementChild.lastElementChild.matches(this.descr)) {
                    item.firstElementChild.lastElementChild.style.opacity = 0.5;
                } else {
                    item.firstElementChild.lastElementChild.style.opacity = 0;
                }
                item.lastElementChild.style.opacity = 0.4;
            }
        });
        setTimeout(() => {
            if (sl.type !== 'button') {
                sl.classList.add(`${this.active}`);
                sl.firstElementChild.lastElementChild.style.opacity = 1;
                sl.lastElementChild.style.opacity = 1;
            }
        }, 10);
    }



}