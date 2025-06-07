
       // ---------------------------------------------------------------//
        document.getElementById("btnEntrar").addEventListener("click", function () {
    const login = document.getElementById("login").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const erroMsg = document.getElementById("erroMsg");

    if (!login || !senha) {
      erroMsg.textContent = "Por favor, preencha o login e a senha.";
      erroMsg.style.display = "block";
    } else {
      erroMsg.style.display = "none";
      // Redireciona para home.html se tudo estiver preenchido
      window.location.href = "index.html";
    }
  });
   function validarFormulario() {
      const campos = [
        "nome", "genero", "gostos", "medos", "gatilhos", "apoio"
      ];

      let todosPreenchidos = campos.every(id => {
        const valor = document.getElementById(id).value.trim();
        return valor !== "";
      });

      const erroMsg = document.getElementById("erro-msg");

      if (todosPreenchidos) {
        erroMsg.style.display = "none";
        window.location.href = "index.html"; // redireciona para home
      } else {
        erroMsg.style.display = "block";
      }
    }