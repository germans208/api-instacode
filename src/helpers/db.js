/*funcione para conex bd*/
const mongoose = require('mongoose');
require('dotenv').config();

const urlDb = process.env.MONGO_URI;

const connectDb = async () => {
    try {
        const db = await mongoose.connect(urlDb,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        const { name, host } = db.connection;
        console.log(`Connect a ${name} ${host}`)
    } catch (e) {
        console.error(`Error connecting a la DB`)
    }
}

module.exports = { 
    connectDb 
};