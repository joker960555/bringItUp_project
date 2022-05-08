import Slider from './slider';
export default class SliderMini extends Slider {
    constructor (container, slides, next, prev, decorate, autoplay) {
        super (container, slides, next, prev, decorate, autoplay);
    }

    render () {
        try{
            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
            `;
            this.activeSlide();
            this.decorateSlide();
            this.toggleButtons();
            if (this.autoplay) {
                this.autoSlides();
            }
        }catch(e){}
    }

    activeSlide () {
        this.slides.forEach(item => {
            item.classList.remove(this.active);
        });
        this.slides[0].classList.add(this.active);
    }

    decorateSlide () {
        if (this.decorate) {
            this.slides.forEach(item => {
                item.querySelector('.card__title').style.opacity = 0.4;
                item.querySelector('.card__controls-arrow').style.opacity = 0;
            });
            this.slides[0].querySelector('.card__title').style.opacity = 1;
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = 1;
        }
    }

    toggleButtons () {
        this.next.addEventListener('click', () => {
            this.nextSlide();
        });
        this.prev.addEventListener('click', () => {
            this.prevSlide();
        });
    }

    nextSlide () {
            for (let i = 0; i < this.slides.length - 1; i++) {
                if (this.slides[i].tagName === 'BUTTON') {
                    this.container.insertBefore(this.slides[i], this.slides[this.slides.length - 2]);
                }
            }
            this.container.append(this.slides[0]);
            this.activeSlide();
            this.decorateSlide();
    }

    prevSlide () {
            this.slides.forEach(sl => {
                if (sl.tagName === 'BUTTON') {
                    this.container.insertBefore(sl, this.slides[this.slides.length - 3]);
                }
            });
            this.container.prepend(this.slides[this.slides.length - 1]);
            this.activeSlide();
            this.decorateSlide();
    }

    autoSlides () {
        this.intervalSlide = setInterval(() => this.nextSlide(), 5000);
        this.next.addEventListener('mouseenter', () => 
            clearInterval(this.intervalSlide));
        this.prev.addEventListener('mouseenter', () => 
            clearInterval(this.intervalSlide));

        this.next.addEventListener('mouseleave', () => {
            this.intervalSlide = setInterval(() => this.nextSlide(), 5000);
        });
        this.prev.addEventListener('mouseleave', () => {
            this.intervalSlide = setInterval(() => this.nextSlide(), 5000);
        });
        
        this.slides.forEach(slide => {
            slide.addEventListener('mouseenter', () => 
                clearInterval(this.intervalSlide));
                
            slide.addEventListener('mouseleave', () => {
                this.intervalSlide = setInterval(() => this.nextSlide(), 5000);
            });
        });
    }

    

}