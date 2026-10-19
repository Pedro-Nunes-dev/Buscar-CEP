//Capturando elementos do HTML que serão manipulados
const inputCEP = document.getElementById("cep");
const inputEstado = document.getElementById("estado");
const inputCidade = document.getElementById("cidade");
const inputBairro = document.getElementById("bairro");
const inputLogradouro = document.getElementById("logradouro");
const btnBuscar = document.getElementById("btn-buscar");


// Máscara
inputCEP.addEventListener("input", function () {

    // Remove qualquer caractere que não seja número
    let cep = inputCEP.value.replace(/\D/g, "");

    // Limita o CEP a 8 números, por exemplo se alguém colar mais de 8 dígitos, ele pega somente 8
    cep = cep.slice(0, 8);

    // Adiciona o hífen após os primeiros 5 números, cria dois grupos: 00000 e 0, entre os dois grupos $1 adiciona um hífen (-) 2$
    cep = cep.replace(/^(\d{5})(\d)/, "$1-$2");

    // Atualiza o valor exibido no input
    inputCEP.value = cep;
});

// 3. Função para consultar a API, async permite continuar respondendo enquanto aguarda (await) os dados da API
async function buscarCEP() {

    // Pegamos o CEP digitado pelo usuário e substituimos o hífen por uma string vazia
    const cep = inputCEP.value.replace(/\D/g, "");

    // Verificamos se possui exatamente 8 números, se o tamanho de cep for diferente de 8 retorna um alert
    if (cep.length !== 8) {
        alert("Digite um CEP válido com 8 números!");
        return;
    }

    // Try executa um bloco de código que pode conter erro (tente)
    try {

        // Fazemos a requisição AJAX
        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        // Verificamos se a requisição funcionou, se a resposta for diferente de ok (código 200), cria um erro
        if (!resposta.ok) {
            throw new Error("Erro na requisição.");
        }

        // Convertendo a resposta em JSON, .json() é um método assincrono, por isso do await resposta.json();
        const dados = await resposta.json();

        // Verificando se o CEP existe, se tiver erro na busca dos dados dispara um alert
        if (dados.erro) {
            alert("CEP não encontrado!");
            return;
        }

        // Preenchendo os campos automaticamente, || operador lógico OU, OR. São tipo opções, se existir guarda no valor, se não pula para a próxima opção
        inputEstado.value = dados.estado || dados.uf || "";
        inputCidade.value = dados.localidade || "";
        inputBairro.value = dados.bairro || "";
        inputLogradouro.value = dados.logradouro || "";

        // catch pega o erro e exibe no console e dispara um alert
    } catch (erro) {
        console.error("Erro ao buscar CEP:", erro);
        alert("Não foi possível consultar o CEP. Tente novamente.");

    }
}

// 4. Executamos a função somente quando clicar, usuário clicka e dispara a função. OBS: função sem o ().
btnBuscar.addEventListener("click", buscarCEP);