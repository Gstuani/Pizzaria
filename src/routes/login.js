const express = require('express');
const utils = require('applay-utils');
const router = express.Router();




router.post('/', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.render('login', { messages: { error: 'Todos os campos são obrigatórios' } });
    }
    const user = await req.db.collection('users').findOne({ email: email });
    if (!user) {
        return res.render('login', { messages: { error: 'Email não encontrado' } });
    } 
    if (user.password !== password) {
        return res.render('login', { messages: { error: 'Senha incorreta' } });
    }
    try {
      req.session.user = user;
      return res.redirect('/index'); 
    } catch (error) {
      return res.render('login', { messages: { error: 'Erro ao fazer login' } });
    }
});
  



module.exports = router;
