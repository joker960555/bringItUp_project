export default class FilterInputs {
    constructor (emailSel) {
        this.emailInputs = document.querySelectorAll(emailSel);
    }

    init () {
        this.checkInputs();
    }

    checkInputs () {
        this.emailInputs.forEach(input => {
            input.addEventListener('input', (event) => {
                const e = event.target;
                e.value = e.value.replace(/\W/gi, '');
            });
        });
    }
}