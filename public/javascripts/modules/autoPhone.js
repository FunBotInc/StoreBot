
function autoPhone(phoneNumber){
    if (!phoneNumber) return;

    const phoneInput = phoneNumber.querySelector('input[type="tel"]');

    phoneInput.on('keyup', function() {
        this.value = this.value
            .match(/\d*/g).join('')
            .match(/(\d{0,3})(\d{0,3})(\d{0,4})/).slice(1).join('-')
            .replace(/-*$/g, '');
    });
}

export default autoPhone;