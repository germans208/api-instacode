const { verifyToken, setError } = require('../helpers/utils');
const User = require('../api/users/user.model');

const authorize = async (req, _res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) return next(setError(401, 'Unauthorized'));
        const parsedToken = token.replace('Bearer ', '');
        const validToken = verifyToken(parsedToken, process.env.JWT_TOKEN);
        const user = await User.findById(validToken.id);
        req.user = user;
        next();
    } catch (error) {
        return next(setError(401, 'Usuario no authorize'));
    }
}

module.exports = {
    authorize
};