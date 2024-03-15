// db.js
const utils = require('applay-utils');

async function connectToDb() {
    var client = await utils.mdb.connectAsync('Biel', 'mongodb+srv://bielstuani:senha0@users.kybi9ip.mongodb.net/?retryWrites=true&w=majority&appName=users');
    return client.db('products');
}

module.exports = connectToDb;