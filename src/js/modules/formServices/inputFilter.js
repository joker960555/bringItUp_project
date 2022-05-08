export default class FilterInputs {
    constructor (emailSel) {
        this.emailInputs = document.querySelectorAll(emailSel);
        this.inputs = document.querySelectorAll('form input');
    }

    init () {
        this.checkInputsLanguage();
        this.checkInputsLength();
        console.log(this.inputs);
    }

    checkInputsLanguage () {
        this.emailInputs.forEach(input => {
            input.addEventListener('input', (event) => {
                const e = event.target;
                e.value = e.value.replace(/\W/gi, '');
            });
        });
    }

    checkInputsLength () {
        this.inputs.forEach(input => {
            input.addEventListener('input', (event) => {
                const e = event.target;
                if (e.value.length >= 28) {
                    e.value = e.value.replace(/.$/, '');
                }
            });
        });
    }

}