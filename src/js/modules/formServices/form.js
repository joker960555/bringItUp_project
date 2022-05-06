export default class Form {
    constructor ({
        form = null,
        inputs = null,
        select = null,
        trigger = null,
        
    } = {}) {
        this.form = document.querySelector(form);
        this.inputs = this.form.querySelectorAll(inputs);
        this.select = this.form.querySelector(select);
        this.trigger = this.form.querySelector(trigger);
        this.message = {
            loading: "Wait, untill it's done!",
            empty: "Please, fill the empty fields!",
            success: "Congrats, you have succeded!",
            failure: "Oops, something went wrong!"
        };
        this.stopSubmit = false;

    }

    render () {
        this.submitData();
        this.blurFocusAlerts();
    }

    createMessageBlock (result) {
        if (this.form.querySelector('.message')) {
            this.messageBlock.textContent = `${result}`;
        } else {
            this.messageBlock = document.createElement('div');
            this.messageBlock.textContent = `${result}`;
            let tPN = this.trigger.parentNode;
            if (tPN.tagName === 'FORM') {
                tPN.append(this.messageBlock);
                this.messageBlock.style.color = ' black';
                this.messageBlock.style.paddingTop = '40px';
            } else {
                tPN.prepend(this.messageBlock);
                this.trigger.nextElementSibling.style.display = 'none';
                this.messageBlock.style.color = 'white';
            }
            this.messageBlock.classList.add('animated', 'fadeIn', 'message');
            this.messageBlock.style.display = 'block';
            this.trigger.style.display = 'none';
        }
        setTimeout(() => {
            this.messageBlock.remove();
            this.trigger.style.display = 'inline-block';
            this.trigger.classList.add('animated', 'fadeIn');
            try {
                this.trigger.nextElementSibling.style.display = 'block';
            } catch (e) {}
        }, 3000);
    }

    blurFocusAlerts () {
        this.inputs.forEach(input => {
            input.addEventListener('blur', (e) => {
                if (e.target && e.target.value === '' && !e.target.classList.contains('empty')) {
                    e.target.value = this.message.empty;
                    e.target.style.border = 'thick solid red';
                    e.target.style.backgroundColor = 'rgba(255, 0, 0, 0.4)';
                    e.target.classList.add('empty');
                }
            });
            input.addEventListener('focus', (e) => {
                if ((e.target && e.target.classList.contains('empty'))) {
                    e.target.classList.remove('empty');
                    e.target.style.border = 'none';
                    e.target.style.backgroundColor = '';
                    e.target.value = '';
                }
            });
        });
    }

    emptyFormSubmitAlerts () {
        let counter = 0;
        for (let i = 0; i <= this.inputs.length - 1; i++) {
            if (this.inputs[i].value === '') {
                this.inputs[i].style.border = 'thick solid red';
                this.inputs[i].style.backgroundColor = 'rgba(255, 0, 0, 0.4)';
                this.inputs[i].classList.add('empty');
                this.stopSubmit = true;
            }
            if (this.inputs[i].value !== '') {
                counter++;
                console.log(counter, i);
                if (this.inputs.length === counter) {
                    console.log(777, counter);
                    this.stopSubmit = false;
                }
            }
        }
    }

    submitData () {
        this.trigger.addEventListener('click', (event) => {
            event.preventDefault();
            console.log(this);
            let formData = new FormData();
            this.inputs.forEach((input, i) => {
                formData.append(i, input.value);
                if (i === this.inputs.length - 1 && this.select) {
                    formData.append(i + 1, this.select.value);
                    console.log(this.select.value, 12349876);
                }
            });
            this.createMessageBlock(this.message.loading);
            this.emptyFormSubmitAlerts();
            if (this.stopSubmit === true) {
                this.createMessageBlock(this.message.empty);
                return; 
            }

            this.form.reset();

            this.requestResponseData('assets/question.php', formData)
            .then(resp => {
                this.createMessageBlock(this.message.success);
                console.log(resp);
            })
            .catch(e => {
                this.createMessageBlock(this.message.failure);
                console.error(e);
            });
        });
    }

    async requestResponseData (url, data) {
        let response = await fetch(url, {
            method: 'POST',
            body: data
        });
        return await response.text();
    }


}