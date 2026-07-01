// Elementos
const modalLogin = document.getElementById('modalLogin');
const modalCadastro = document.getElementById('modalCadastro');
const modalComp = document.getElementById('modalComp');

const btnLogin = document.getElementById('btnLogin');
const btnCadastro = document.getElementById('btnCadastro');
const btnComecar = document.getElementById('btnComecar');
const fecharModais = document.querySelectorAll('.fechar');
const btnSair = document.getElementById('btnSair');
const btnAddComp = document.getElementById('addComp');

const menuPrincipal = document.getElementById('menuPrincipal');
const menuAluno = document.getElementById('menuAluno');
const secaoInicio = document.getElementById('secaoInicio');
const areaAluno = document.getElementById('areaAluno');

// Dados do Usuário (vazio até cadastrar)
let usuario = {};
let competicoes = [];

// Abrir/Fechar Modais
btnLogin.onclick = () => modalLogin.style.display = 'block';
btnCadastro.onclick = () => modalCadastro.style.display = 'block';
btnComecar.onclick = () => modalCadastro.style.display = 'block';
btnAddComp.onclick = () => modalComp.style.display = 'block';

fecharModais.forEach(fechar => {
    fechar.onclick = () => { 
        modalLogin.style.display = 'none'; 
        modalCadastro.style.display = 'none'; 
        modalComp.style.display = 'none';
    }
});
window.onclick = (e) => {
    if (e.target === modalLogin) modalLogin.style.display = 'none';
    if (e.target === modalCadastro) modalCadastro.style.display = 'none';
    if (e.target === modalComp) modalComp.style.display = 'none';
}

// 📝 CADASTRO: Salva os dados que a pessoa digitou
document.getElementById('formCadastro').addEventListener('submit', function(e) {
    e.preventDefault();
    
    usuario = {
        nome: document.getElementById('cadNome').value,
        email: document.getElementById('cadEmail').value,
        senha: document.getElementById('cadSenha').value,
        faixa: document.getElementById('cadFaixa').value,
        data: document.getElementById('cadData').value
    };

    alert('Cadastro realizado! Agora faça login com seus dados. 🥋');
    modalCadastro.style.display = 'none';
});

// 🔑 LOGIN: Preenche a tela com os dados DO CADASTRO
document.getElementById('formLogin').addEventListener('submit', function(e) {
    e.preventDefault();

    // Pega o que foi digitado no login
    const emailLogin = document.querySelector('#formLogin input[type="email"]').value;
    const senhaLogin = document.querySelector('#formLogin input[type="password"]').value;

    // Verifica se existe cadastro
    if(usuario.email && usuario.email === emailLogin && usuario.senha === senhaLogin) {
        
        // Fecha janela
        modalLogin.style.display = 'none';

        // Troca telas
        menuPrincipal.style.display = 'none';
        menuAluno.style.display = 'flex';
        secaoInicio.style.display = 'none';
        areaAluno.style.display = 'block';

        // COLOCA OS DADOS QUE ELE MESMO CADASTROU
        document.getElementById('nomeAluno').textContent = usuario.nome;
        document.getElementById('faixaAtual').textContent = `Faixa ${usuario.faixa}`;
        document.getElementById('dataInicio').textContent = usuario.data;

    } else {
        alert('E-mail ou senha incorretos, ou você ainda não se cadastrou!');
    }
});

// ➕ ADICIONAR COMPETIÇÃO (Usuário preenche)
document.getElementById('formComp').addEventListener('submit', function(e) {
    e.preventDefault();

    const novaComp = {
        ano: document.getElementById('compAno').value,
        nome: document.getElementById('compNome').value,
        resultado: document.getElementById('compResultado').value
    };

    competicoes.push(novaComp);
    atualizarTabelaComp();
    modalComp.style.display = 'none';
    this.reset();
});

// Atualiza a tabela na tela
function atualizarTabelaComp() {
    const lista = document.getElementById('listaComp');
    lista.innerHTML = ''; // Limpa tudo

    if(competicoes.length === 0) {
        lista.innerHTML = '<p class="vazio">Nenhuma competição cadastrada ainda.</p>';
        return;
    }

    competicoes.forEach(item => {
        const linha = document.createElement('div');
        linha.className = 'linha-competicao';
        linha.innerHTML = `
            <span>${item.ano}</span>
            <span>${item.nome}</span>
            <span class="medalha">${item.resultado}</span>
        `;
        lista.appendChild(linha);
    });
}

// 🚪 SAIR
btnSair.onclick = function() {
    menuPrincipal.style.display = 'flex';
    menuAluno.style.display = 'none';
    secaoInicio.style.display = 'block';
    areaAluno.style.display = 'none';
}