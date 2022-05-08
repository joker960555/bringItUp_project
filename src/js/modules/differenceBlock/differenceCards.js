export default class DifferenceCards {
    constructor ({
        container = null,
        cards = null,
        trigger = null
    } = {}) {
        try{
            this.container = document.querySelector(container);
            this.cards = this.container.querySelectorAll(cards);
            this.addCard = this.container.lastElementChild;
            this.trigger = this.container.querySelector(trigger);
        }catch(e){}
    }

    render () {
        try{
            this.hideCards();
            this.triggerCard();
        }catch(e){}
    }

    hideCards () {
        this.cards.forEach(item => item.style.display = 'none');
        this.addCard.style.display = 'flex';
    }

    triggerCard () {
        this.trigger.addEventListener('click', () => {
            for (let i = 0; i < this.cards.length - 1; i++) {
                if (getComputedStyle(this.cards[i]).display === 'none') {
                    this.cards[i].style.display = 'flex';
                    this.cards[i].classList.add('animated', 'fadeIn');

                    if (i === this.cards.length - 2) {
                        this.addCard.style.display = 'none';
                    }
                    
                    break;
                }
            }
        });
    }

}