import Slider from './slider';
export default class SliderMain extends Slider {
    constructor (container, slides, slideIndex, buttons, buttonsNext,
        buttonsPrev, firstPageToggle) {
        super(container, slides, slideIndex, buttons, buttonsNext,
            buttonsPrev, firstPageToggle);
    }

    render () {
        try {
            this.showSlides();
            this.changeSlide(1);
            this.toggleToFirstSlide();
        }catch(e){}
    }

    showSlides (n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        this.slides.forEach(item => {
            item.style.display = 'none';
            item.classList.remove('animated', 'fadeIn');
        });

        this.slides[this.slideIndex - 1].style.display = 'block';
        this.slides[this.slideIndex - 1].classList.add('animated', 'fadeIn');
    }

    changeSlide (n) {
        this.buttons.forEach(item => {
            item.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showSlides(this.slideIndex += n);
                    if (this.adv) {
                        this.showAdvBlock();
                    }
            });
        });
        if (this.buttonsNext && this.buttonsPrev) {
            this.buttonsNext.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showSlides(this.slideIndex += n);
                });
            });
            this.buttonsPrev.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showSlides(this.slideIndex -= n);
                });
            });
        }
    }

    toggleToFirstSlide () {
        this.firstPageToggle.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                    if (e.target) {
                        this.slideIndex = 1;
                        this.showSlides();
                    }
            });
        });
    }
    
    showAdvBlock () {
            this.adv = document.querySelector('.hanson');

            if (this.slideIndex === 3) {
                this.timeout = setTimeout(() => {
                    this.adv.style.display = 'block';
                    this.adv.classList.add('animated', 'fadeInUp');
                }, 3000);
            } else {
                clearTimeout(this.timeout);
                this.adv.style.display = 'none';
                this.adv.classList.remove('animated', 'fadeInUp');
            }
    }
}


