export default class Mask {
    constructor (inputsSel = null) {
        this.inputs = document.querySelectorAll(inputsSel);
    }

    init () {
        console.log(this, this.inputs[0]);
        this.inputs.forEach(input => {
            input.addEventListener('input',(e) => this.createMask(e, input));
            input.addEventListener('focus',(e) => this.createMask(e, input));
            input.addEventListener('blur', (e) => this.createMask(e, input));
        });
    }

    setCursorPosition  (pos, elem) {
        elem.focus();

        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            let range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    createMask (e, input) {
        let matrix = '+1 (___) ___ __ __',
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = input.value.replace(/\D/g, '');

        if (def.length >= val.length) {
            val = def;
        }

        input.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) :
                   i >= val.length ? '' : a;
        });

        if (e.type === 'blur') {
            if (input.value.length === 2) {
                input.value = '';
            }
        } else {
            this.setCursorPosition(input.value.length, input);
        }

    }

}