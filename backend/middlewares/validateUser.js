const validateUserBody = (req, res, next) => {
    const errors = [];

    const {
        firstName,
        lastName,
        email,
        password
    } = req.body;

    switch (true) {

        case typeof password != 'string' || password.length < 6:
            errors.push('Password should be greater than 8 characters!')
            break;
        case !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
            errors.push('Please insert a valid email')
            break;
        case typeof firstName != 'string':
            errors.push('Name should be a string!')
            break;
        case typeof lastName != 'string':
            errors.push('Surname should be a string!')
            break;
        default:
            break;
    }


    if (errors.length > 0) {
        req.validationErrors = errors;
    }
    next()
}

module.exports = validateUserBody;