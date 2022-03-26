const UserRoutes = require('express').Router();
const { authorize } = require('../../middleware/authorize');
const { login, create, getById } = require('./user.controller');

UserRoutes.post('/register', create);
UserRoutes.post('/login', login);


//authorize es el middleware con el token
UserRoutes.get('/:id', [authorize], getById);

module.exports = UserRoutes;
