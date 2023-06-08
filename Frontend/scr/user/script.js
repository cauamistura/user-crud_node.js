async function validate(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const username = document.querySelector('input[name="username"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    try {
        let response;
        if (id) {
            const data = { id, username, email, password };
            // Edição do usuário
            data.id = id;
            response = await fetch('http://localhost:8080/http://localhost:3030/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        } else {
            const data = { username, email, password };
            // Inserção de novo usuário
            response = await fetch('http://localhost:8080/http://localhost:3030/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        }

        const result = await response.json();

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
