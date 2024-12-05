// Função para rolar suavemente até o topo da página
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Exibir o botão quando a página é rolada para baixo
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("btnTop").classList.add("show");
    } else {
        document.getElementById("btnTop").classList.remove("show");
    }
};

// Adicionar evento de clique ao botão
document.getElementById("btnTop").addEventListener("click", scrollToTop);