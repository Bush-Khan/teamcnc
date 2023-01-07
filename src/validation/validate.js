const keyValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length == 0) return false
    return true
}

const bodyVal = function (data) {
    return Object.keys(data).length > 0
}

const nameCheck = function (name) {
    name = /^[a-zA-Z_ ]{2,1500}$/.test(name)
    return name
}

const mobileNum = function (phone) {
    phone = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(phone)
    return phone
};

const emailCheck = function (email) {
    email = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
    return email
}

const passwordCheck = function (password) {
    password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(password)
    return password
}

const idCheck = function (value){
    let user = /^[0-9a-fA-F]{24}$/.test(value)
    return user
}

const profileImageCheck = function (value) {
    let user = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(value)
    return user
};

module.exports = { keyValid, bodyVal, nameCheck, mobileNum, emailCheck, passwordCheck, idCheck, profileImageCheck}