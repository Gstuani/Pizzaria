const express = require('express');
const utils = require('applay-utils');
const session = require('express-session');



const path = require('path');
const port = 3030;
const app = express();


app.engine('html', require ('ejs').renderFile);
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'src/views'));


app.listen(port, async () => {
    console.log('Servidor foi iniciado');
 })