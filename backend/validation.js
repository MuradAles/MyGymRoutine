const validatePassword = (password) => {
    const capitalLetterRegex = /[A-Z]/;
    const symbolRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    const numberRegex = /[0-9]/;
    if (password.length < 6) {
        throw "Password should contain at least 6 characters long";
    }
    if (!capitalLetterRegex.test(password)) {
        throw "Password should contain at least 1 capital letter";
    }
    if (!symbolRegex.test(password)) {
        throw "Password should contain at least 1 symbol";
    }
    if (!numberRegex.test(password)) {
        throw "Password should contain at least 1 number";
    }
    return password;
}

const validateEmail = (email) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return email
    }
    return "Email is wrong"
}

const checkPageValidation = (page) => {
    console.log(page)
    if (isNaN(page)) { page = 1 }
    if (!Number.isInteger(page)) throw "page is not a number";
    if (page <= 0) throw "page cannot be negative or zero";
    if (page % 1 != 0) throw "page cannot be float numebr";
    return page
}

module.exports = { validatePassword, validateEmail, checkPageValidation }