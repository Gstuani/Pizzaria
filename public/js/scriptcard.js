


// aula 05
// criar a variável modalKey sera global
let modalKey = 0

// variavel para controlar a quantidade inicial de pizzas na modal
let quantPizzas = 1

let cart = [] // carrinho
// /aula 05

// funcoes auxiliares ou uteis

const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if(valor) {
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    seleciona('.pizzaWindowArea').style.opacity = 0 // transparente
    seleciona('.pizzaWindowArea').style.display = 'flex'
    setTimeout(() => seleciona('.pizzaWindowArea').style.opacity = 1, 150)
}

const fecharModal = () => {
    seleciona('.pizzaWindowArea').style.opacity = 0 // transparente
    setTimeout(() => seleciona('.pizzaWindowArea').style.display = 'none', 500)
}

const botoesFechar = () => {
    // BOTOES FECHAR MODAL
    selecionaTodos('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach( (item) => item.addEventListener('click', fecharModal) )
}

const preencheDadosDasPizzas = (pizzaItem, item, index) => {
    // aula 05
    // setar um atributo para identificar qual elemento foi clicado
	pizzaItem.setAttribute('data-key', index)
    console.log('Data key ' + index)
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = formatoReal(item.price[2])
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
}

const preencheDadosModal = (pizzaData) => {
    console.log(pizzaData)
    seleciona('.pizzaBig img').src = pizzaData.img;
    seleciona('.pizzaInfo h1').innerHTML = pizzaData.name;
    seleciona('.pizzaInfo--desc').innerHTML = pizzaData.description;
    if (pizzaData.price && pizzaData.price.length > 2) {
        seleciona('.pizzaInfo--actualPrice').innerHTML = formatoReal(pizzaData.price[2 ]);
    } else {
        console.error('Price data is not available');
    }
}
// aula 05
const pegarKey = (e) => {
    let pizzaItem = e.target.closest('.pizza-item');
    if (pizzaItem) {
        let pizzaDataAttribute = pizzaItem.getAttribute('data-pizza');
        if (!pizzaDataAttribute) {
            console.error('data-pizza attribute not found');
            return;
        }
        let pizzaData;
        try {
            pizzaData = JSON.parse(pizzaDataAttribute);
        } catch (error) {
            console.error('Error parsing data-pizza JSON', error);
            return;
        }
        // rest of your code...
    } else {
        console.error('Elemento .pizza-item não encontrado');
    }
    
}
const preencherTamanhos = (pizzaData) => {
    console.log(pizzaData);
    if (!pizzaData || !pizzaData.sizes || pizzaData.sizes.length === 0) {
        console.error('Pizza data or size data is not available');
        return;
    }
    // Verificar se pizzaData e pizzaData.sizes estão disponíveis
    if (pizzaData && pizzaData.sizes) {
        // Remover a classe 'selected' do elemento atualmente selecionado
        let selectedSizeElement = document.querySelector('.pizzaInfo--size.selected');
        if (selectedSizeElement) {
            selectedSizeElement.classList.remove('selected');
        }

        // Selecionar o tamanho grande
        let largeSizeElement = document.querySelector('.pizzaInfo--size[data-size="Grande"]');
        if (largeSizeElement) {
            largeSizeElement.classList.add('selected');
        }

        // Adicionar manipulador de eventos a cada tamanho
        let sizeElements = document.querySelectorAll('.pizzaInfo--size');
        sizeElements.forEach((sizeElement) => {
            sizeElement.addEventListener('click', (e) => {
                // Remover a classe 'selected' do elemento atualmente selecionado
                let currentSelectedElement = document.querySelector('.pizzaInfo--size.selected');
                if (currentSelectedElement) {
                    currentSelectedElement.classList.remove('selected');
                }

                // Adicionar a classe 'selected' ao elemento clicado
                e.target.classList.add('selected');
            });
        });
    } else {
        console.error('Pizza data or size data is not available');
    }
}
const escolherTamanhoPreco = (pizzaData) => {
    // selecionar todos os tamanhos
    let sizes = document.querySelectorAll('.pizzaInfo--size');
    if (sizes.length > 0) {
        // Adicionar manipulador de eventos a cada tamanho
        sizes.forEach((sizeElement, index) => {
            sizeElement.addEventListener('click', (e) => {
                // Remover a classe 'selected' do elemento atualmente selecionado
                let currentSelectedElement = document.querySelector('.pizzaInfo--size.selected');
                if (currentSelectedElement) {
                    currentSelectedElement.classList.remove('selected');
                }

                // Adicionar a classe 'selected' ao elemento clicado
                e.target.classList.add('selected');

                // Atualizar o preço com base no tamanho selecionado
                if (pizzaData.price && pizzaData.price.length > index) {
                    document.querySelector('.pizzaInfo--actualPrice').innerHTML = formatoReal(pizzaData.price[index]);
                } else {
                    console.error('Price data is not available for the selected size');
                }
            });
        });
    } else {
        console.error('Não foi possível encontrar o elemento com a classe .pizzaInfo--size');
    }
}

const mudarQuantidade = () => {
    // Ações nos botões + e - da janela modal
    document.querySelector('.pizzaInfo--qtmais').addEventListener('click', () => {
        quantPizzas++
        document.querySelector('.pizzaInfo--qt').innerHTML = quantPizzas
    })

    document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', () => {
        if(quantPizzas > 1) {
            quantPizzas--
            document.querySelector('.pizzaInfo--qt').innerHTML = quantPizzas	
        }
    })
}

   
// /aula 05

// aula 06
const adicionarNoCarrinho = (pizzaData) => {
    let addButton = seleciona('.pizzaInfo--addButton');

    // Remove existing click event listener
    addButton.replaceWith(addButton.cloneNode(true));
    addButton = seleciona('.pizzaInfo--addButton');

    addButton.addEventListener('click', () => {
        // tamanho
        let sizeElement = seleciona('.pizzaInfo--size.selected');
        let size = sizeElement ? sizeElement.getAttribute('data-key') : null;

        // quantidade
        let quantity = parseInt(seleciona('.pizzaInfo--qt').innerHTML);

        // preco
        let price = parseFloat(seleciona('.pizzaInfo--actualPrice').innerHTML.replace('R$&nbsp;', ''));

        // crie um identificador que junte id e tamanho
        let identifier = pizzaData.ids.id+'t'+size;

        // antes de adicionar verifique se ja tem aquele codigo e tamanho
        let key = cart.findIndex((item) => item.identifier == identifier);

        if(key > -1) {
            // se encontrar aumente a quantidade
            cart[key].qt += quantity;
        } else {
            // adicionar objeto pizza no carrinho
            let pizzaItem = {
                identifier,
                id: pizzaData.ids,
                size, // size: size
                qt: quantity,
                price: price, // price: price
                pizzaData: pizzaData // Store all pizza data
            }
            cart.push(pizzaItem);
        }

        fecharModal();
        abrirCarrinho();
        atualizarCarrinho();
    });
}


const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)
    if(cart.length > 0) {
        // mostrar o carrinho
	    seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex' // mostrar barra superior
    }

    // exibir aside do carrinho no modo mobile
    seleciona('.menu-openner').addEventListener('click', () => {
        if(cart.length > 0) {
            seleciona('aside').classList.add('show')
            seleciona('aside').style.left = '0'
        }
    })
}

const fecharCarrinho = () => {
    // fechar o carrinho com o botão X no modo mobile
    let menuCloser = document.querySelector('.menu-closer');
    if (menuCloser) {
        menuCloser.addEventListener('click', () => {
            let asideElement = document.querySelector('aside');
            if (asideElement) {
                asideElement.style.left = '100vw'; // usando 100vw ele ficara fora da tela
            }
            let headerElement = document.querySelector('header');
            if (headerElement) {
                headerElement.style.display = 'flex';
            }
        });
    }
}
const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        console.log('Finalizar compra')
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
    })
}

// Chame a função para adicionar o evento ao botão
fecharCarrinho();

const atualizarCarrinho = () => {
    // Exibir número de itens no carrinho
    seleciona('.menu-openner span').innerHTML = cart.length;

    // Mostrar ou não o carrinho
    if (cart.length > 0) {
        // Mostrar o carrinho
        seleciona('aside').classList.add('show');

        // Zerar o .cart para não fazer inserções duplicadas
        seleciona('.cart').innerHTML = '';

        // Criar as variáveis antes do for
        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        // Para preencher os itens do carrinho, calcular subtotal
        for (let i in cart) {
            let pizzaItem = cart[i].pizzaData; // Get pizza data from cart

            if (pizzaItem) {
                // Em cada item pegar o subtotal
                subtotal += cart[i].price * cart[i].qt;

                // Fazer o clone, exibir na telas e depois preencher as informações
                let cartItem = seleciona('.models .cart--item').cloneNode(true);

                let pizzaSizeName = cart[i].size;
                let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

                // Preencher as informações
                cartItem.querySelector('img').src = pizzaItem.img;
                cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
                cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

                // Selecionar botões + e -
                cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                    // Adicionar apenas a quantidade que está neste contexto
                    cart[i].qt++;
                    // Atualizar a quantidade
                    atualizarCarrinho();
                });

                cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                    if (cart[i].qt > 1) {
                        // Subtrair apenas a quantidade que está neste contexto
                        cart[i].qt--;
                    } else {
                        // Remover se for zero
                        cart.splice(i, 1);
                    }

                    (cart.length < 1) ? seleciona('header').style.display = 'flex' : '';

                    // Atualizar a quantidade
                    atualizarCarrinho();
                });

                seleciona('.cart').append(cartItem);
            }
        }

        // Calcular desconto e total
        desconto = subtotal * 0.1; // 10% de desconto
        total = subtotal - desconto;

        // Exibir subtotal, desconto e total
        seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal);
        seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto);
        seleciona('.total span:last-child').innerHTML = formatoReal(total);

    } else {
        // Ocultar o carrinho
        seleciona('aside').classList.remove('show');
        seleciona('aside').style.left = '100vw';
    }
}

// /aula 06

// MAPEAR pizzaJson para gerar lista de pizzas

let pizzaItems = document.querySelectorAll('.pizza-item');

pizzaItems.forEach((pizzaItem, index) => {
    // Get the pizza data
    let pizzaData = JSON.parse(pizzaItem.dataset.pizza);
    pizzaData.name = pizzaItem.querySelector('.pizza-item--name').innerHTML;
    pizzaData.description = pizzaItem.querySelector('.pizza-item--desc').innerHTML;

    // pizza clicked
    pizzaItem.querySelector('.pizza-item a').addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Clicou na pizza');

        // open modal window
        abrirModal();

        // fill in the data
        preencheDadosModal(pizzaData);

        // get selected size
        preencherTamanhos(pizzaData); // Pass pizzaData as an argument

        // set initial quantity as 1
        seleciona('.pizzaInfo--qt').innerHTML = quantPizzas;

        // select the size and price with the click on the button
        escolherTamanhoPreco(pizzaData); // Pass pizzaData as an argument

        // Add to cart
        adicionarNoCarrinho(pizzaData); // Pass pizzaData as an argument
    });

    botoesFechar();
});// fim do MAPEAR pizzaJson para gerar lista de pizzas
// Importar o módulo de banco de dados
// const db = require('./db');

// // Definir a função de manipulação de clique
// async function handlePizzaClick(pizzaId) {
//     try {
//         // Buscar a pizza do banco de dados
//         let pizza = await db.getPizza(pizzaId);

//         // Logar a pizza
//         console.log('Clicou na pizza', pizza);

//         // Abrir o modal seria equivalente a buscar mais dados sobre a pizza
//         let pizzaDetails = await db.getPizzaDetails(pizzaId);

//         // Preencher os dados do modal seria equivalente a manipular os dados
//         let modalData = prepareModalData(pizzaDetails);

//         // Definir a quantidade inicial como 1
//         let quantity = 1;

//         // Selecionar o tamanho e preço com o clique no botão seria equivalente a atualizar os dados
//         let updatedData = updateData(modalData, quantity);

//         // Retornar os dados atualizados
//         return updatedData;
//     } catch (error) {
//         console.error('An error occurred:', error);
//     }
// }

// Definir as funções auxiliares
function prepareModalData(data) {
    // Implementar a lógica para preparar os dados do modal
}

function updateData(data, quantity) {
    // Implementar a lógica para atualizar os dados
}

// aula 05
// mudar quantidade com os botoes + e -
mudarQuantidade()
// /aula 05

// aula 06
adicionarNoCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCompra()
// /aula 06


    // preencheDadosModal(item);

    // preencherTamanhos(chave);

    // seleciona('.pizzaInfo--qt').innerHTML = quantPizzas;

    // // escolherTamanhoPreco(chave);


    // module.exports = router;