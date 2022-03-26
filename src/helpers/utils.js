const jwt = require('jsonwebtoken');

const validationPassword = (password) => {
    const response = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return response.test(String(password));
}

const setError = (code, message) => { //funcion generica de errores
    const error = new Error();
    error.code = code;
    error.message = message;
    return error;
}

const generateToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '1d' }); //expira en 1 dia, recomendacion unos 20 minutos
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    validationPassword,
    setError,
    generateToken,
    verifyToken
}