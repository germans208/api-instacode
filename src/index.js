const express = require('express'); //Libreria basada en middleware
const cors = require('cors');
const UserRoutes = require('./api/users/user.routes');

const { connectDb } = require('./helpers/db');

const { setError } = require('./helpers/utils');

const PORT = process.env.PORT || 8000;

const app = express();

//Conexion a la BD
connectDb();

//Cabecera + Verbos
app.use((_req, res, next) => { // BUENA PRACTICA: Ponerle el guion bajo al argumento "_req" si no se usa
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH'); //Lo que tu permites en tu servidor
    res.header('Access-Control-Allow-Credentials', true);//Que nos lleguen credenciales a traves de cookies, un tokken
    res.header('Access-Control-Allow-Headers', 'Content-Type');//Le permites al Front que tipo de contenido le vas a pasar, ejemplo un JSON, un FormData (Para mandar un archivo),
    next();
});

//PUT: actualiza para un elemento de una bd, pero mantengo esa ID
//PATCH: cambia un campo

// Cors configuracion default
app.use(
    cors({
        origin: (_origin, callback) => callback(null, true), credentials: true
    })
);

// Json Data
app.use(express.json({ limit: '1mb' }));

// urlEncoded
app.use(express.urlencoded({ limit: '1mb', extended: true }));

//Routes
app.use('/api/user', UserRoutes);

// Routes not found 404
app.use('*', (_req, _res, next) => {
    return next(setError(404, 'Route not found'));
});

// Error handler
app.use((error, _req, res, _next) => {
    return res
        .status(error.status || 500)
        .json(error.message || 'Unexpected error');
});

// Enable Language
app.disable('x-powered-by'); //PARA QUE NO SEPA EN QUE ESTA DESARROLLADA NUESTRO SERVER

// Open Listener Server
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost: ${PORT}`);
});