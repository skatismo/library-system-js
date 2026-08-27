class Livro {
    constructor(titulo, autor, paginas, quantidade) {
        this.titulo = titulo;
        this.autor = autor;
        this.paginas = paginas;
        this.quantidade = quantidade;
        this.totalExemplares = quantidade;
    }

    quantidadeEmprestada() {
        return this.totalExemplares - this.quantidade;
    }

    obterResumo() {
        return `${this.titulo} foi escrito por ${this.autor}, tem ${this.paginas} páginas, possui ${this.quantidade} exemplares e está ${this.disponibilidade()}.`;
    }

    estaDisponivel() {
        return this.quantidade > 0;
    }

    disponibilidade() {
        if (this.estaDisponivel()) {
            return "disponível";
        }

        return "indisponível";
    }

    fazerEmprestimo() {
        if (this.estaDisponivel()) {
            this.quantidade--;
            return "Livro emprestado com sucesso!";
        }

        return "Livro indisponível.";
    }

    devolverEmprestimo() {
        if (this.quantidade < this.totalExemplares) {
            this.quantidade++;
            return "Livro devolvido com sucesso!";
    }

    return "Não há exemplar emprestado para devolver.";
}
}

const livros = [
    new Livro("Dom Casmurro", "Machado de Assis", 184, 2),
    new Livro("1984", "George Orwell", 120, 1),
    new Livro("Senhor das Armas", "George Clooney", 120, 1),
    new Livro("O Hobbit", "J. R. R. Tolkien", 320, 5),
    new Livro("Senhor dos Anéis", "J. R. R. Tolkien", 540, 0)
];

// ======================================
// Funções do sistema
// ======================================
function localizarLivro(livros, tituloBusca) {
    return livros.find(
        livro => livro.titulo === tituloBusca
    );
}

function listarLivrosDisponiveis(livros) {
    return livros.filter(
        livro => livro.estaDisponivel()
    );
}

function listarTitulosDisponiveis(livros) {
    const disponiveis = listarLivrosDisponiveis(livros);
    return disponiveis.map(
        livro => livro.titulo
    );
}

function calcularTotalExemplares(livros) {
    return livros.reduce((acumulador, livro) => {
        return acumulador + livro.totalExemplares;
    }, 0);
}

//Estamos aqui!
function gerarRelatorioAcervo(livros) {
    return `Total no acervo: ${calcularTotalExemplares(livros)}
Disponíveis: ${calcularTotalDisponiveis(livros)}
Emprestados: ${calcularTotalEmprestados(livros)}`;
}



function calcularTotalEmprestados(livros) {
    return livros.reduce((acumulador, livro) => {
        return acumulador + livro.quantidadeEmprestada();
    }, 0);
}


function calcularTotalDisponiveis(livros) {
    return livros.reduce((acumulador, livro) => {
        return acumulador + livro.quantidade;
    }, 0);
}


function listarLivrosPorAutor(livros, autorBusca) {
    return livros.filter(
        livro => livro.autor === autorBusca
    );
}

function buscarLivrosPorTitulo(livros, busca) {
    const buscaNormalizada = busca.toLowerCase();

    return livros.filter(
        livro => livro.titulo.toLowerCase().includes(buscaNormalizada)
    );
}


function realizarEmprestimo(livros, tituloBusca) {
    const encontrarLivro = localizarLivro(livros, tituloBusca);

    if (encontrarLivro) {
        return encontrarLivro.fazerEmprestimo();
    } else {
        return "Livro não encontrado.";
    }
}

function realizarDevolucao(livros, tituloBusca) {
const encontrarLivro = localizarLivro(livros, tituloBusca);

    if (encontrarLivro) {
       return encontrarLivro.devolverEmprestimo();
    } else {
        return "Livro não encontrado.";
    }
}




const titulos = listarTitulosDisponiveis(livros);

const total = calcularTotalExemplares(livros);





// =====================================
// Simulação de uso do sistema
// ======================================

console.log(gerarRelatorioAcervo(livros));

realizarEmprestimo(livros, "1984");

console.log(gerarRelatorioAcervo(livros));



