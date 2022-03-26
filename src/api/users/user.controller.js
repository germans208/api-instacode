//Funciones q se disparan en base a una RUTA

const User = require('./user.model');
const bcrypt = require('bcrypt');

const { generateToken, setError } = require('../../helpers/utils');

//ALTA DE USUARIO
const create = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        const userExist = await User.findOne({ email: newUser.email })
        if (userExist) {
            return next(setError(409, 'El mail ya existe'));
        }
        const userInDb = await newUser.save();
        return res.status(201).json(userInDb);
    } catch (error) {
        return next(setError(500, 'Create user failed'));
    }
}

//LOGIN
const login = async (req, res, next) => {
    try {
        const userInDb = await User.findOne({ email: req.body.email });
        if (!userInDb) {
            return next(setError(401, 'El usuario no encontrado'));
        }
        if (bcrypt.compareSync(req.body.password, userInDb.password)) {
            const token = generateToken(userInDb._id, userInDb.email); //_id es de Moongo son AUTOGENERADAS
            return res.status(200).json({
                user: userInDb,
                token: token,
            })
        } else {
            return next(setError(401, 'No coincide la contraseña'));
        }
    } catch (error) {
        return next(setError(500, 'Login failed'));
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) return next(setError(404, 'No existe'));

        return res.status(200).json({
            status: 200,
            message: 'User Info',
            data: { user: user }
        })
    } catch (error) {
        return next(setError(500, 'Usuario ha fallado'));
    }
}

module.exports = {
    create,
    login,
    getById
}