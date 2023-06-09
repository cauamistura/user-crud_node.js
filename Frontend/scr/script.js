async function validate(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;
  try {
    const result = await login(email, password);
    
    console.log(result.data);
    if (result.sucess) {
      alert('Bem vindo ' + result.data[0].username);
      window.location.href = "./menu/menu.html";
    } else {
      // Usuário não cadastrado
      alert('Email ou senha invalidos');
    }
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  }
}

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