const express = require('express');
const utils = require('applay-utils');
const router = express.Router();

router.post('/registro', async (req, res) => {
    const { name, email, password } = req.body;
    const user = {
      name,
      email,
      password
    }

  if (!name || !email || !password) {
    return res.render('registro', { messages: { error: 'Todos os campos são obrigatórios' } });
  } else if (password.length < 6) {
    return res.render('registro', { messages: { error: 'A senha deve ter no mínimo 6 caracteres' } });
  } else if (!utils.emailValidator(email)) {
    return res.render('registro', { messages: { error: 'Email inválido' } });
  } else if (await req.db.collection('users').findOne({ email })) {
    return res.render('registro', { messages: { error: 'Email já cadastrado' } });
  } else {
    try {
      await utils.insertOne(req.db, 'users', { user });
      // await req.db.collection('users').insertOne({ user });
      return res.redirect('/login');
    } catch (error) {
      return res.render('registro', { messages: { error: 'Erro ao salvar usuário' } });
    }
  }
} );
  module.exports = router;