const express = require('express');
const utils = require('applay-utils');
const router = express.Router();



async function handlePizzaClick(ids) {
    try {
        
        let pizza = await db.getPizza(ids);

        
        console.log('Clicou na pizza', pizza);

        
        let pizzaDetails = await db.getPizzaDetails(ids);

       
        let modalData = prepareModalData(pizzaDetails);

        1
        let quantity = 1;

        let updatedData = updateData(modalData, quantity);

        return updatedData;
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Definir as funções auxiliares
function prepareModalData(data) {
    // Implementar a lógica para preparar os dados do modal
}

function updateData(data, quantity) {
    // Implementar a lógica para atualizar os dados
}

const pizzas = router.get('/cardapio', async (req, res) => {
  try {
      console.log('Fetching data from database...');
      let pizzas = await utils.findAsync(req.db, 'prods', );
      
      console.log('Data fetched successfully:', pizzas);
      console.log(pizzas);
      res.status(200).render('cardapio', { pizzas: pizzas})
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).send('An error occurred!');
    } 
  });

router.get('/login', async (req, res) => {
    res.render('login', { messages: {} });
});

router.get('/registro', async (req, res) => {
  res.render('registro', { messages: {} });
});


router.get('/index', async (req, res) => {
  const user = await req.db.collection('users').findOne({ name: req.session.user.name });
  res.render('index', { name: user.name });
});


router.delete('/logout', (req, res) => {
  req.session.destroy(err => {
      if (err) return next(err);
      res.redirect('/login');
  });
});

module.exports = router;