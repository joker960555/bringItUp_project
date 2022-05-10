import SliderMain from './modules/slider/sliderMain';
import SliderMini from './modules/slider/sliderMini';
import Player from './modules/videoPlayer';
import DifferenceCards from './modules/differenceBlock/differenceCards';
import Form from './modules/formServices/form';
import Mask from './modules/formServices/mask';
import FilterInputs from './modules/formServices/inputFilter';
import ShowInfo from './modules/accordeon';
import Download from './modules/download';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const sliderMainShowup = new SliderMain({
        container: '.page',
        buttonsNext: '.sidecontrol__controls .next',
        firstPageToggle: '.sidecontrol > a'
    });
    sliderMainShowup.render();
    const sliderModulePageSlides = new SliderMain({  //Second Page pages modules
        container: '.moduleapp',
        buttons: '.sidecontrol__controls .next',
        buttonsNext: '.nextmodule',
        buttonsPrev: '.prevmodule',
        firstPageToggle: '.sidecontrol > a'
    });
    sliderModulePageSlides.render();

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

    const videoPlayerFirstPage = new Player({
        buttons: '.showup__video .play',
        overlay: '.overlay'
    });
    videoPlayerFirstPage.play();
    const videoPlayerSecondPage = new Player({
        buttons: '.module__video-item .play',
        overlay: '.overlay'
    });
    videoPlayerSecondPage.play();

    const oldCards = new DifferenceCards({
        container: '.officerold',
        cards: '.officer__card-item',
        trigger: '.plus'
    });
    oldCards.render();
    const newCards = new DifferenceCards({
        container: '.officernew',
        cards: '.officer__card-item',
        trigger: '.plus'
    });
    newCards.render();

    const formEvolution = new Form({
        form: '.join__evolution .form',
        inputs: 'input',
        select: '#city',
        trigger: '.btn'
    });
    formEvolution.render();

    const formSchedule = new Form ({
        form: '.schedule__form .form',
        inputs: 'input',
        trigger: '.btn'
    });
    formSchedule.render();
    
    const phoneMask = new Mask('.form__block #phone');
    phoneMask.init();

    const emailFilter = new FilterInputs('input[name="email"]');
    emailFilter.init();

    const accordeon = new ShowInfo({
        triggers: '.module__info .plus',
        contents: '.module__info .msg'
    });
    accordeon.render();

    new Download({triggers: '.download'}).init();
});