const container = document.querySelector('.container');
const entrarButton = document.querySelector('.registrar-opcao header');
const loginButton = document.querySelector('.login-opcao header');


loginButton.addEventListener('click', () =>{
    container.classList.add('ativar');
});
entrarButton.addEventListener('click', () =>{
    container.classList.remove('ativar');
});
