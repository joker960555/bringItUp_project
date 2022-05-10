export default class ShowInfo {
    constructor ({
        triggers = null,
        contents = null
    } = {}) {
        this.triggers = document.querySelectorAll(triggers);
        this.contents = document.querySelectorAll(contents);

    }

    render () {
        this.contents.forEach(item => item.style.display = 'none');
        this.triggers.forEach((trig, i) => {
            trig.addEventListener('click', (e) => {
                if (this.contents[i].style.display === 'none') {
                    this.contents[i].classList.remove('animated', 'fadeInUp');
                    this.contents[i].classList.add('animated', 'fadeInDown');
                    this.contents[i].style.display = 'block';
                } else {
                    this.contents[i].classList.remove('animated', 'fadeInDown');
                    this.contents[i].classList.add('animated', 'fadeInUp');
                    setTimeout(() => {
                        this.contents[i].style.display = 'none';
                    }, 600);
                }
            });
        });

    }

}