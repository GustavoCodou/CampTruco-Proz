function enviarDados(url, metodo, dados, mensagemSucesso, mensagemErro, callback) {
    const requestOptions = {
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (metodo === 'POST') {
        requestOptions.body = JSON.stringify(dados);
    } else if (metodo === 'GET') {
        const queryParams = new URLSearchParams(dados).toString();
        url = `${url}?${queryParams}`;
    }

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(responseData => {
            if (responseData && responseData.data && responseData.data.success) {
                console.log(mensagemSucesso);
                if (callback) callback(true);
            } else {
                console.log(mensagemErro);
                if (callback) callback(false);
            }
        })
}

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    if (username === "" || password === "") {
        errorMessage.textContent = "Por favor, preencha todos os campos!";
        return;
    }

    enviarDados('http://localhost:3001/api/users/login', "POST", { nome: username, senha: password },
        'Login realizado com sucesso!', 'Erro ao realizar o login!',
        function(success) {
            if (success) {
                window.location.href = "gamePage.html";
            } else {
                errorMessage.textContent = "Login ou senha incorretos!";
            }
        }
    );


});


document.getElementById("SingupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    const errorMessage = document.getElementById("errorMessage");

    if (name === "" || pass === "" || email === "") {
        errorMessage.textContent = "Por favor, preencha todos os campos!";
        return;
    }

    enviarDados('http://localhost:3001/api/users/register', "POST", { email: email, nome: name, senha: pass },
        'Usuário cadastrado com sucesso!', 'Erro ao cadastrar o usuário!',
        function(success) {
            if (success) {
                navigate('Login');
            }
        }
    );
});

function navigate(state) {
    const Login = document.querySelector(".loginForm");
    const SingUP = document.querySelector(".SingupForm");

    if (state === 'Login') {
        Login.style.display = "block";
        SingUP.style.display = "none";
    } else if (state === 'Register') {
        Login.style.display = "none";
        SingUP.style.display = "block";
    }
}

// Modal
const button = document.querySelector(".buttonadm");
const modal = document.querySelector(".dialog");
const closebutton = document.querySelector(".btnclose");

button.onclick = function () {
    modal.showModal();
};

closebutton.onclick = function () {
    modal.close();
};