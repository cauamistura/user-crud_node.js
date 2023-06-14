// Get list of users
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

// Validate a user
async function login(email, password) {
    const data = { email, password };
  
    const response = await fetch('http://localhost:8080/http://localhost:3030/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    return await response.json();
  }

// Update a user
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

// Create a new user
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

// Delete a user
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

export { getAll, login, update, create, deleteUserPoint };
