//EL MODELO ES UNA FIRMA

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { validationPassword, setError } = require('../../helpers/utils');

const schema = new Schema(
    {
        username: { type: String, unique: true, require: true },
        email: { type: String, unique: true, require: true },
        password: { type: String, required: true },
        emoji: { type: String, require: true },
        code: [{ type: Schema.Types.ObjectId, ref: 'Code' }],
        favCodes: [{ type: Schema.Types.ObjectId, ref: 'Code' }]
    },
    {
        timestamps: true /*para saber cuando un usuario se ha creado o actualizado*/
    }
);

schema.pre('save', function (next) {
    if (!validationPassword(this.password)) {
        return next(setError(400, 'La contraseña no es válida'));
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
}) /*Funcion "Pre" = Antes de crear el esquema */

module.exports = mongoose.model('users', schema); // debe ser en plural, conjunto de elementos

