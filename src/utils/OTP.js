function OTPNumber () {
    return Math.floor(Math.random()*90000) + 10000;
}


module.exports = {
    OTPNumber
}
