async function deleteUser(){
    const id = urlParams.get('id');
    let response;
    if(id){
        response = await deleteUserPoint(id);
        if (response.sucess){
            alert('Excluido com sucesso!');
            window.location.href = "../menu/menu.html"; // Redireciona para o menu.html
        }
    } else {
        alert('Não está editando');
        return;
    }
}

async function validate(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const username = document.querySelector('input[name="username"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const phone = document.querySelector('input[name="phone"]').value;

    const birthday = formatarData(document.querySelector('input[name="birthday"]').value);
    console.log(birthday)

    // Verifica se todos os campos estão preenchidos
    if (username === '' || email === '' || password === '' || birthday === '' || phone === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    try {
        let response;
        if (id) {
            // Edição de usuário
            response = await update(id, username, email, password, phone, birthday);
        } else {
            // Inserção de novo usuário
            response = await create(username, email, password, phone, birthday);
        }

        const result = response;

        console.log(result);

        if (result.sucess) {
            alert(`Usuário foi cadastrado/editado com sucesso.`);
            window.location.href = "../menu/menu.html"; // Redireciona para o menu.html
        } else {
            alert('Cadastro não realizado.');
        }
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

// Edição do usuário
async function update(id, username, email, password, phone, birthday) {
    const data = { id, username, email, password, phone, birthday };
    console.log(data)
    let response;
    try {
        response = await fetch('http://localhost:8080/http://localhost:3030/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    } catch (error) {
        console.error('Ocorreu um erro na requisição de atualização:', error);
    }
}

// Criação de um novo usuário
async function create(username, email, password, phone, birthday) {
    const data = { username, email, password, phone, birthday };
    let response;
    try {
        response = await fetch('http://localhost:8080/http://localhost:3030/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    } catch (error) {
        console.error('Ocorreu um erro na requisição de criação:', error);
    }
}

async function deleteUserPoint(id) {
    const data = { id };
    let response;
    try {
        response = await fetch('http://localhost:8080/http://localhost:3030/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    } catch (error) {
        console.error('Ocorreu um deletando User:', error);
    }
}



function formatarData(data) {
    const partes = data.split('/');
    const dia = partes[0];
    const mes = partes[1];
    const ano = partes[2];
    
    return `${ano}-${mes}-${dia}`;
  }
