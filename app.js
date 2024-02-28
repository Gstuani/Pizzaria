const express = require('express');
const utils = require('applay-utils');
const session = require('express-session');
const methodOverride = require('method-override');
const usersRouter = require('./src/routes/user.js');
const rootRouter = require('./src/routes/index');

const path = require('path');
const port = 3030;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method', { methods: ['POST', 'GET', "PUT"]}));

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(async (req, res, next) => {
    var client = await utils.mdb.connectAsync('Biel', 'mongodb+srv://bielstuani:senha0@users.kybi9ip.mongodb.net/');
    req.db = client.db('users');
    next()
 } );
app.engine('html', require ('ejs').renderFile);

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use('/', rootRouter);
app.use('/login', usersRouter);

app.listen(port, async () => {
    console.log('Servidor foi iniciado');
 })