
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-comp");
  const resultado = document.getElementById("resultado");

  // Constantes para cálculo
  const CONSTANTES = {
    masculino: {
      A: 0.5,
      B: 0.3,
      C: 0.2,
    },
    feminino: {
      A: 0.4,
      B: 0.35,
      C: 0.25,
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Limpa os resultados e os campos de erro
    resultado.textContent = '';
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => input.style.borderColor = '#ccc');

    const nome = document.getElementById("nome").value.trim();
    const idade = Number(document.getElementById("idade").value);
    const sexo = document.getElementById("sexo").value;
    const peso = Number(document.getElementById("peso").value);
    const cintura = Number(document.getElementById("cintura").value);
    const quadril = Number(document.getElementById("quadril").value);
    const altura = Number(document.getElementById("altura").value);

    // Validação dos campos
    let isValid = true;
    let errorMessages = [];

    if (!nome) {
      isValid = false;
      errorMessages.push("O campo 'Nome' é obrigatório.");
      document.getElementById("nome").style.borderColor = 'red';
    }
    if (isNaN(idade) || idade <= 0) {
      isValid = false;
      errorMessages.push("A idade deve ser um número válido maior que zero.");
      document.getElementById("idade").style.borderColor = 'red';
    }
    if (!sexo) {
      isValid = false;
      errorMessages.push("Por favor, selecione o sexo.");
      document.getElementById("sexo").style.borderColor = 'red';
    }
    if (isNaN(peso) || peso <= 0) {
      isValid = false;
      errorMessages.push("O peso deve ser um número maior que zero.");
      document.getElementById("peso").style.borderColor = 'red';
    }
    if (isNaN(cintura) || cintura <= 0) {
      isValid = false;
      errorMessages.push("A cintura deve ser um número maior que zero.");
      document.getElementById("cintura").style.borderColor = 'red';
    }
    if (isNaN(quadril) || quadril <= 0) {
      isValid = false;
      errorMessages.push("O quadril deve ser um número maior que zero.");
      document.getElementById("quadril").style.borderColor = 'red';
    }
    if (isNaN(altura) || altura <= 0) {
      isValid = false;
      errorMessages.push("A altura deve ser um número maior que zero.");
      document.getElementById("altura").style.borderColor = 'red';
    }

    if (!isValid) {
      resultado.textContent = errorMessages.join(" ");
      resultado.className = "red";  // Aplica a classe de erro
      return;
    }

    // Acessa as constantes definidas em data.js
    const constantes = CONSTANTES[sexo];
    if (!constantes) {
      resultado.textContent = "Sexo inválido para cálculo.";
      resultado.className = "red";  // Aplica a classe de erro
      return;
    }

    // Cálculo de composição corporal
    const comp = (constantes.A * cintura) + (constantes.B * quadril) + (constantes.C * idade);

    // Exibindo o resultado
    resultado.textContent = `${nome}, seu resultado de composição corporal é: ${comp.toFixed(2)}`;
    resultado.className = "green";  // Aplica a classe de sucesso
  });

  // Adiciona funcionalidade de reset
  const resetButton = document.createElement('button');
  resetButton.textContent = "Limpar";
  resetButton.type = "button";
  resetButton.addEventListener('click', () => {
    form.reset();
    resultado.textContent = '';
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => input.style.borderColor = '#ccc');
    resultado.className = '';  // Remove qualquer classe de
