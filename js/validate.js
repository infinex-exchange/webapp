function validateEmail(mail) {
    return mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) &&
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
    return code.match(/^[a-zA-Z0-9]{8}$/);
}

function validateCaptchaResp(captcha) {
    return captcha.match(/^[a-np-zA-NP-Z1-9]{4}$/);
}

function validateApiKeyDescription(desc) {
    return desc.match(/^[a-zA-Z0-9]{1,255}$/);
}