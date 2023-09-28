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

function validateCaptchaResp(captcha) {
    return captcha.match(/^[a-np-zA-NP-Z1-9]{4}$/);
}

function validateApiKeyDescription(desc) {
    return desc.match(/^[a-zA-Z0-9 ]{1,255}$/);
}

function validateAdbkName(name) {
    return name.match(/^[a-zA-Z0-9 ]{1,255}$/);
}

function validateReflinkDescription(desc) {
    return desc.match(/^[a-zA-Z0-9 ]{1,255}$/);
}

function validateTransferMessage(msg) {
    return msg.match(/^[a-zA-Z0-9 _,@#%\.\\\/\+\?\[\]\$\(\)\=\!\:\-]{1,255}$/);
}

function validateAssetSymbol(symbol) {
    return symbol.match(/^[A-Z0-9]{1,32}$/, symbol);
}

function validateVotingName(name) {
    return name.length <= 64;
}

function validateVotingWebsite(website) {
    if(website.length > 255) return false;
    return website.match(/^(https?:\/\/)?([a-z0-9\-]+\.)+[a-z]{2,20}(\/[a-z0-9\-\.]+)*\/?$/, website);
}

function validate2FA(code) {
    return code.match(/^[0-9]{4,20}$/);
}