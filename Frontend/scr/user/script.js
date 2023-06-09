async function validate(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const username = document.querySelector('input[name="username"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Verifica se todos os campos estão preenchidos
    if (username === '' || email === '' || password === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        let response;
        if (id) {
            // Edição de usuário
            response = await update(id, username, email, password);
        } else {
            const data = { username, email, password };
            // Inserção de novo usuário
            response = await create(username, email, password);
        }

        const result = response;

        console.log(result.data);

        if (result.sucess) {
            alert(`Usuario foi cadastrado/editado com sucesso`);
            window.location.href = "../menu/menu.html"; // Redireciona para o menu.html
        } else {
            alert('Cadastro não realizado');
        }
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

// Edição do usuário
async function update (id, username, email, password) {
    const data = { id, username, email, password };
    let response;
    data.id = id;
    response = await fetch('http://localhost:8080/http://localhost:3030/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

// Criação de um novo usuário
async function create (username, email, password) {
    const data = { username, email, password };
    let response;
    response = await fetch('http://localhost:8080/http://localhost:3030/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}