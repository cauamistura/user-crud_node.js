document.addEventListener('DOMContentLoaded', async () => { usersAdd() });
async function filterList() { usersAdd(); }

async function usersAdd() {
    try {
      let users = await getAll();
      users = users.data;
      const userList = document.querySelector('.list');

      userList.innerHTML = ''; // Limpa lista
  
      users.forEach(user => {
        const { id, username, email, phone, birthday } = user;
  
        const listItem = document.createElement('li');
        listItem.textContent = ` Código: ${id}
                              | Nome: ${username}
                              | Email: ${email}
                              | Telefone: ${phone}
                              | Data de Nascimento: ${formatarData(birthday)}
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
  }
  

function formatarData(data) {
    const dataObjeto = new Date(data);

    const dia = dataObjeto.getUTCDate();
    const mes = dataObjeto.getUTCMonth() + 1; 
    const ano = dataObjeto.getUTCFullYear();

    const diaFormatado = dia.toString().padStart(2, '0');
    const mesFormatado = mes.toString().padStart(2, '0');

    return `${diaFormatado}/${mesFormatado}/${ano}`;
}

function editUser(user) {
    // Redireciona para a tela de cadastro de usuário com os dados preenchidos
    const { username, email, id, password, phone, birthday } = user;
    const queryParams = `?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}
    &id=${encodeURIComponent(id)}&password=${encodeURIComponent(password)}
    &phone=${encodeURIComponent(phone)}&birthday=${encodeURIComponent(formatarData(birthday))}`;
    window.location.href = `../user/user.html${queryParams}`;
}

async function getAll() {
    const filter = document.querySelector('input[name="filter"]').value;

    let response;

    if (filter) {
        const data = { filter };
        response = await fetch('http://localhost:8080/http://localhost:3030/getAll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    } else {
        response = await fetch('http://localhost:8080/http://localhost:3030/getAll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return await response.json();
}
