export default class Download {
    constructor ({triggers = null} = {}) {
        this.triggers = document.querySelectorAll(triggers);
        this.path = 'assets/img/Bitmap.jpg';
    }

    init () {
        this.clickOnButton();
    }

    createDownloadLink () {
        this.link = document.createElement('a');
        this.link.style.display = 'none';
        this.link.setAttribute('href', `${this.path}`);
        this.link.setAttribute('download', 'laptopIMG');
        document.body.append(this.link);
        this.link.click();
        document.body.removeChild(this.link);
    }

    clickOnButton () {
        this.triggers.forEach(trig => {
            trig.addEventListener('click', (e) => {
                this.createDownloadLink();
            });
        });
    }
}