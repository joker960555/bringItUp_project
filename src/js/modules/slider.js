export default class Slider {
    constructor (pageSel, buttonSel) {
        this.page = document.querySelector(pageSel),
        this.slides = this.page.children,
        this.buttons = document.querySelectorAll(buttonSel),
        this.slideIndex = 1;
    }

    render () {
        this.showSlides();
        this.nextSlide(1);
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

    nextSlide (n) {
        this.buttons.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSlides(this.slideIndex += n);
                try {
                    this.showAdvBlock();
                } catch (e) {}
            });

            item.parentNode.previousElementSibling.addEventListener('click', (e) => {
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