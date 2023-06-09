document.addEventListener('DOMContentLoaded', async () => {
    try {
        let users = await getAll();
        users = users.data;
        const userList = document.querySelector('.list');
        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = ` Código: ${user.id}
                                   | Nome: ${user.username}
                                   | Email: ${user.email}
                                   | Telefone: ${user.password}
                                   | Data de Nascimento: ${user.password}
                                  `;
            
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => {
                editUser(user);
            });
        
            listItem.appendChild(editButton);
            userList.appendChild(listItem);
        });

    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
});

async function deleteUser(id, username) {
    const data = { id };

    try {
        const response = await fetch('http://localhost:8080/http://localhost:3030/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        alert(`${username} foi excluído com sucesso`);
        location.reload();

    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

function editUser(user) {
    // Redireciona para a tela de cadastro de usuário com os dados preenchidos
    const { username, email, id, password } = user;
    const queryParams = `?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}
    &id=${encodeURIComponent(id)}&password=${encodeURIComponent(password)}`;
    window.location.href = `../user/user.html${queryParams}`;
}

async function getAll() {
    const response = await fetch('http://localhost:8080/http://localhost:3030/getAll');
    return await response.json();
}