document.addEventListener('DOMContentLoaded', function () {
    const cardsContainer = document.getElementById('cards-container');
    const nomeInput = document.getElementById('nomeInput');
    const corInput = document.getElementById('corInput');
    const racaInput = document.getElementById('racaInput');
    const buscarBtn = document.getElementById('buscarBtn');

    let petsData = []; // Armazenar todos os pets da API

    // Função para renderizar os cards dos pets
    function renderizarCards(pets) {
        cardsContainer.innerHTML = ''; // Limpa o container antes de renderizar os novos cards

        pets.forEach(pet => {
            const card = document.createElement('div');
            card.classList.add('card');

            const img = document.createElement('img');
            img.src = pet.image;
            img.alt = pet.nome;

            const nome = document.createElement('h2');
            nome.textContent = pet.nome;

            const cor = document.createElement('p');
            cor.textContent = `Cor: ${pet.cor}`;

            const raca = document.createElement('p');
            raca.textContent = `Raça: ${pet.raca}`;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Deletar';
            deleteBtn.addEventListener('click', () => deletePet(pet.id));

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Editar';
            editBtn.addEventListener('click', () => editPet(pet));

            card.appendChild(img);
            card.appendChild(nome);
            card.appendChild(cor);
            card.appendChild(raca);
            card.appendChild(deleteBtn);
            card.appendChild(editBtn);

            cardsContainer.appendChild(card);
        });
    }

    // Função para deletar um pet
    function deletePet(petId) {
        fetch(`https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/excluir/pet/${petId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                // Remover o pet deletado do array petsData
                petsData = petsData.filter(pet => pet.id !== petId);
                renderizarCards(petsData); // Renderizar os cards atualizados
            } else if (response.status === 500) {
                console.error('Erro interno do servidor ao deletar pet:', response.status);
                // Exibir uma mensagem de erro amigável para o usuário
                alert('Ocorreu um erro ao deletar o pet. Por favor, tente novamente mais tarde.');
            } else {
                console.error('Erro ao deletar pet:', response.status);
            }
        })
        .catch(error => {
            console.error('Erro ao deletar pet:', error);
        });
    }

    // Função para editar um pet
    function editPet(pet) {
        const novoNome = prompt('Digite o novo nome:', pet.nome);
        const novaCor = prompt('Digite a nova cor:', pet.cor);
        const novaRaca = prompt('Digite a nova raça:', pet.raca);
    
        const petAtualizado = {
            ...pet,
            nome: novoNome || pet.nome,
            cor: novaCor || pet.cor,
            raca: novaRaca || pet.raca
        };
    
        fetch(`https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/atualizar/pet/${pet.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(petAtualizado)
        })
        .then(response => {
            if (response.ok) {
                // Atualizar o pet no array petsData
                const index = petsData.findIndex(p => p.id === pet.id);
                if (index !== -1) {
                    petsData[index] = petAtualizado;
                    renderizarCards(petsData); // Renderizar os cards atualizados
                }
            } else if (response.status === 404) {
                console.error('Pet não encontrado:', response.status);
                // Exibir uma mensagem de erro amigável para o usuário
                alert('O pet que você está tentando atualizar não foi encontrado.');
            } else {
                console.error('Erro ao atualizar pet:', response.status);
            }
        })
        .catch(error => {
            console.error('Erro ao atualizar pet:', error);
        });
    }

    // Fazendo requisição à API para listar todos os pets e armazenando os dados
    fetch('https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/listar/pets')
        .then(response => response.json())
        .then(data => {
            if (data && data.pets && data.pets.length > 0) {
                petsData = data.pets; // Armazenar os dados dos pets
                renderizarCards(petsData); // Renderizar os cards dos pets
            } else {
                cardsContainer.innerHTML = '<p>Nenhum pet encontrado.</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao obter lista de pets:', error);
            cardsContainer.innerHTML = '<p>Erro ao carregar a lista de pets. Por favor, tente novamente mais tarde.</p>';
        });

    // Adicionando evento de clique ao botão de busca
    buscarBtn.addEventListener('click', function () {
        const nomeFiltro = nomeInput.value.trim().toLowerCase();
        const corFiltro = corInput.value.trim().toLowerCase();
        const racaFiltro = racaInput.value.trim().toLowerCase();

        // Filtrar os pets com base nos critérios de busca
        const petsFiltrados = petsData.filter(pet => {
            return (
                (nomeFiltro === '' || pet.nome.toLowerCase().includes(nomeFiltro)) &&
                (corFiltro === '' || pet.cor.toLowerCase().includes(corFiltro)) &&
                (racaFiltro === '' || pet.raca.toLowerCase().includes(racaFiltro))
            );
        });

        renderizarCards(petsFiltrados); // Renderizar os cards dos pets filtrados
    });
});