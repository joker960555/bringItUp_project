export default class Form {
    constructor ({
        form = null,
        inputs = null,
        select = null,
        trigger = null,
        
    } = {}) {
        try{
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
        }catch(e){}
    }

    render () {
        try{
            this.submitData();
            this.blurFocusAlerts();
        }catch(e){}
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
            input.addEventListener('blur', (event) => {
                let e = event.target;
                if (e && (e.value === '' || (e.value.length < 18 && 
                    e.matches('#phone'))) && !e.classList.contains('empty')) {
                        e.style.border = 'thick solid red';
                        e.style.backgroundColor = 'rgba(255, 0, 0, 0.4)';
                        e.classList.add('empty');
                }
            });
            input.addEventListener('focus', (event) => {
                const e = event.target;
                console.log(e.value.length, event.type);
                if ((e && e.classList.contains('empty') &&  !e.matches('#phone'))) {
                    e.classList.remove('empty');
                    e.style.border = 'none';
                    e.style.backgroundColor = '';
                    e.value = '';
                }
                if (e && e.matches('#phone') && e.classList.contains('empty')) {
                    e.classList.remove('empty');
                    e.style.border = 'none';
                    e.style.backgroundColor = '';
                }
            });
        });
    }

    emptyFormSubmitAlerts () {
        let counter = 0,
            inp = this.inputs;
        for (let i = 0; i <= inp.length - 1; i++) {
            if (inp[i].value === '' || (inp[i].matches('#phone') &&
                inp[i].value.length < 18)) {
                inp[i].style.border = 'thick solid red';
                inp[i].style.backgroundColor = 'rgba(255, 0, 0, 0.4)';
                inp[i].classList.add('empty');
                this.stopSubmit = true;
            }
            if ((!inp[i].matches('#phone') && inp[i].value !== '') ||
                (inp[i].matches('#phone') && inp[i].value.length === 18)) {
                counter++;
                if (inp.length === counter) {
                    this.stopSubmit = false;
                }
            }
        }
    }

    submitData () {
        this.trigger.addEventListener('click', (event) => {
            event.preventDefault();
            let formData = new FormData();
            this.inputs.forEach((input, i) => {
                formData.append(i, input.value);
                if (i === this.inputs.length - 1 && this.select) {
                    formData.append(i + 1, this.select.value);
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