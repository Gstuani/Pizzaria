const express = require('express');
const utils = require('applay-utils');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
const userRouter = require('./src/routes/user');                     
const loginRouter = require('./src/routes/login');
const rootRouter = require('./src/routes/index');      
const pizzaRoutes = require('./src/routes/pizzaRoutes'); // Importar as rotas da API




const port = 3030;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method', { methods: ['POST', 'GET', "PUT"]}));

 app.use('/public', express.static(path.join(__dirname, 'public')));
 app.use(async (req, res, next) => {
     var client = await utils.mdb.connectAsync('Biel', 'mongodb+srv://bielstuani:senha0@users.kybi9ip.mongodb.net/?retryWrites=true&w=majority&appName=users');
     req.db = client.db('products');
     next();
 });
app.engine('html', require ('ejs').renderFile);

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');



app.use(session({
    secret: '*$#*¨KWDBAvkjVKAJVkjavsfajshdbauedv(*;.;^`',
    resave: false,
    saveUninitialized: true,
  }));
  
app.use('/', rootRouter); 
app.use('/login', loginRouter); 
app.use('/registro', userRouter); 
app.use('/pizzaRoutes', pizzaRoutes); // Usar as rotas da API








app.listen(port, async () => {
    console.log('Servidor foi iniciado');
 })