export default class Slider {
    constructor ({
        container = null,
        buttons = null,
        buttonsNext = null,
        buttonsPrev = null,
        firstPageToggle = null,
        next = null,
        prev = null,
        active = null,
        descr = null,
        decorate = false,
        autoplay = false
    } = {}) {
        this.container = document.querySelector(container);
        try { this.slides = this.container.children; } catch(e){}
        this.buttons = document.querySelectorAll(buttons);
        this.buttonsNext = document.querySelectorAll(buttonsNext);
        this.buttonsPrev = document.querySelectorAll(buttonsPrev);
        this.firstPageToggle = document.querySelectorAll(firstPageToggle);
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.active = active;
        this.descr = descr;
        this.decorate = decorate;
        this.autoplay = autoplay;
        this.slideIndex = 1;
    }

    
}