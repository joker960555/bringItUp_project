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
            success: "Congrats, you have succeded!",
            failure: "Oops, something went wrong!"
        };

    }

    render () {
        this.submitData();
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
            this.form.reset();

            this.requestResponseData('assets/question.php', formData)
            .then(resp => {
                this.createMessageBlock(this.message.success);
                console.log(resp);
            })
            .catch(e => {
                this.createMessageBlock(this.message.failure);
                console.error(e);
            })
            .finally(() => setTimeout(() => {
                this.messageBlock.remove();
                this.trigger.style.display = 'inline-block';
                this.trigger.classList.add('animated', 'fadeIn');
                try {
                    this.trigger.nextElementSibling.style.display = 'block';
                } catch (e) {}
            }, 3000));
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