document.getElementById('cadastroForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const imagem = document.getElementById('imagem').value;
    const nome = document.getElementById('nome').value;
    const cor = document.getElementById('cor').value;
    const raca = document.getElementById('raca').value;

    if (imagem && nome && cor && raca) {
        const petData = {
            image: imagem,  
            nome: nome,
            cor: cor,
            raca: raca
        };

        try {
            const response = await fetch('https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/novo/pet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(petData)
            });

            const responseData = await response.json();

            console.log('Response status:', response.status);
            console.log('Response data:', responseData);

            if (response.ok) {
                alert('Pet cadastrado com sucesso!');
            } else {
                alert('Erro ao cadastrar o pet: ' + responseData.message);
            }
        } catch (error) {
            alert('Erro ao conectar com a API: ' + error.message);
        }
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});
