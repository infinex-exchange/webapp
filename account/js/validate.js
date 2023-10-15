function validateEmail(mail) {
    return mail.match(/^\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/) &&
        mail.length <= 254;
}

function validatePassword(pw) {
    return /[A-Z]/.test(pw) &&
        /[a-z]/.test(pw) &&
        /[0-9]/.test(pw) &&
        pw.length >= 8 &&
        pw.length <= 254;
}

function validateVeriCode(code) {
    return code.match(/^[0-9]{6}$/);
}
