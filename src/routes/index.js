const express = require('express');

const router = express.Router();

router.get('/login', async (req, res) => {
    res.render('login' , { messages: { error: 'Sua mensagem de erro aqui' } });
});

router.get('/registro', async (req, res) => {
  res.render('registro', { messages: { error: 'Sua mensagem de erro aqui' } });
});


module.exports = router;