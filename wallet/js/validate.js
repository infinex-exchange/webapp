function validateAdbkName(name) {
    return name.match(/^[a-zA-Z0-9 ]{1,255}$/);
}

function validateTransferMessage(msg) {
    return msg.match(/^[a-zA-Z0-9 _,@#%\.\\\/\+\?\[\]\$\(\)\=\!\:\-]{1,255}$/);
}
