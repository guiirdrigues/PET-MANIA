// Validação do login
document.querySelector('.login-opcao form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const email = document.querySelector('.login-opcao input[type="email"]').value;
    const password = document.querySelector('.login-opcao input[type="password"]').value;

    fetch('https://back-login.vercel.app/usuarios')
        .then(response => response.json())
        .then(data => {
            const user = data.find(user => user.email === email && user.password === password);

            if (user) {
                // Login bem-sucedido, redireciona para index.html
                window.location.href = 'index.html';
            } else {
                // Login ou senha incorretos, exibe um alerta
                alert('Login ou senha incorretos. Por favor, tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro ao fazer a requisição:', error);
            alert('Ocorreu um erro ao fazer o login. Por favor, tente novamente mais tarde.');
        });
});

// Cadastro de novos usuários
document.querySelector('.registrar-opcao form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const nome = document.querySelector('.registrar-opcao input[type="text"]').value;
    const email = document.querySelector('.registrar-opcao input[type="email"]').value;
    const senha = document.querySelector('.registrar-opcao input[type="password"]').value;
    const confirmarSenha = document.querySelector('.registrar-opcao input[type="password"]:last-of-type').value;

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem. Por favor, verifique e tente novamente.');
        return;
    }

    const novoUsuario = {
        nome: nome,
        email: email,
        password: senha
    };

    fetch('https://back-login.vercel.app/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoUsuario)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Usuário cadastrado com sucesso:', data);
            alert('Cadastro realizado com sucesso!');
            // Limpar os campos do formulário após o cadastro bem-sucedido
            document.querySelector('.registrar-opcao form').reset();
        })
        .catch(error => {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente mais tarde.');
        });
});