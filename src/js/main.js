import SliderMain from './modules/slider/sliderMain';
import SliderMini from './modules/slider/sliderMini';
import Player from './modules/videoPlayer';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const sliderMainShowup = new SliderMain({
        container: '.page',
        buttons: '.next'
    });
    sliderMainShowup.render();
    const sliderMiniShowup = new SliderMini({
        container: '.showup__content-slider',
        prev: '.showup__prev',
        next: '.showup__next',
        active: 'card-active',
        decorate: true
    });
    sliderMiniShowup.render();
    const sliderMiniModules = new SliderMini({
        container: '.modules__content-slider',
        prev: '.modules__info-btns .slick-prev',
        next: '.modules__info-btns .slick-next',
        active: 'card-active',
        decorate: true,
        autoplay: true
    });
    sliderMiniModules.render();
    const sliderMiniFeed = new SliderMini({
        container: '.feed__slider',
        prev: '.feed__slider .slick-prev',
        next: '.feed__slider .slick-next',
        active: 'feed__item-active'
    });
    sliderMiniFeed.render();

    const player = new Player('.play__circle', '.overlay', '.close');
    player.play();

});