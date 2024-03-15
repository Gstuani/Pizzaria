// pizzaRoutes.js
const express = require('express');
const router = express.Router();
const db = require('./db');

// Definir a rota GET para buscar os dados da pizza
router.get('/prods/:ids', async (req, res) => {
    const id = req.params.ids; // Pegar o ID da pizza da URL

    console.log('ID:', id); // Imprimir o ID

    // Aqui você pode buscar os dados da pizza do seu banco de dados
    let pizza = await db.getPizza(id);

    // Enviar os dados da pizza como resposta
    res.json(pizza);
});

module.exports = router;