export default class Slider {
    constructor ({
        container = null,
        buttons = null,
        next = null,
        prev = null,
        active = null,
        descr = null,
        decorate = false,
        autoplay = false
    } = {}) {
        this.container = document.querySelector(container),
        this.slides = this.container.children,
        this.buttons = document.querySelectorAll(buttons),
        this.next = document.querySelector(next),
        this.prev = document.querySelector(prev),
        this.active = active,
        this.descr = descr,
        this.decorate = decorate,
        this.autoplay = autoplay,
        this.slideIndex = 1;
    }

    
}