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
 
function listarLivrosComEmprestimos(livros) {
    return livros.filter(
    livro => livro.quantidadeEmprestada() > 0
);
}


function listarLivrosIndisponiveis(livros) {
    return livros.filter(
    livro => !livro.estaDisponivel()
);
}

function gerarRelatorioPorAutor(livros, autorBusca) {
    const buscaInvalida =
        typeof autorBusca !== "string" ||
        autorBusca.trim() ===  "";

    if(buscaInvalida) {
        return "Autor inválido.";
    }

    const autorNormalizada = autorBusca.trim().toLowerCase();
    
    const livrosDoAutor = livros.filter(
        livro => livro.autor.toLowerCase() === autorNormalizada
    );
    
    if (livrosDoAutor.length < 1) {
        return "Autor não encontrado.";
    }
    const quantidadeTitulos = livrosDoAutor.length;

    const totalExemplares = calcularTotalExemplares(livrosDoAutor);

    const totalDisponiveis = calcularTotalDisponiveis(livrosDoAutor)

    const totalEmprestados = calcularTotalEmprestados(livrosDoAutor)

    return {
        autor: livrosDoAutor[0].autor,
        titulos: quantidadeTitulos,
        totalExemplares: totalExemplares,
        disponiveis: totalDisponiveis,
        emprestados: totalEmprestados
    };
}    

function buscarLivros(livros, termoBusca) {
    const buscaInvalida =
        typeof termoBusca !== "string" ||
        termoBusca.trim() ===  "";

    if(buscaInvalida) {
        return "Termo de busca inválido.";
    }

    const termoNormalizado = termoBusca.trim().toLowerCase();

    return livros.filter(
        livro => livro.titulo.toLowerCase().includes(termoNormalizado)
        ||
        livro.autor.toLowerCase().includes(termoNormalizado)
);
}

function listarLivrosPorAutor(livros, autorBusca) {
    const buscaAutorNormalizada = autorBusca.toLowerCase();
    
    return livros.filter(
        livro => livro.autor.toLowerCase().includes(buscaAutorNormalizada)
    );
}

function buscarLivrosPorTitulo(livros, busca) {
    const buscaTituloNormalizada = busca.toLowerCase();

    return livros.filter(
        livro => livro.titulo.toLowerCase().includes(buscaTituloNormalizada)
    );
}

function removerExemplares(livros, tituloBusca, quantidade) {
    const quantidadeInvalidaEx =
        typeof quantidade !== "number" ||
        !Number.isInteger(quantidade) ||
        quantidade <= 0;

    if (quantidadeInvalidaEx) {
        return "Quantidade inválida.";
    }

    const livroParaEx = localizarLivro(livros, tituloBusca);

    if (!livroParaEx) {
        return "Livro não encontrado.";
    }

    const quantidadeSuperior = quantidade > livroParaEx.quantidade;   
    
    if (quantidadeSuperior) {
            return "Quantidade indisponível para remoção.";
    }


    livroParaEx.totalExemplares -= quantidade;
    livroParaEx.quantidade -= quantidade;

    return "Exemplares removidos com sucesso!";
}

function adicionarExemplares(livros, tituloBusca, quantidade) {
    const quantidadeInvalida =
        typeof quantidade !== "number" ||
        !Number.isInteger(quantidade) ||
        quantidade <= 0;

    if (quantidadeInvalida) {
        return "Quantidade inválida.";
    }

    const livroParaAd = localizarLivro(livros, tituloBusca);

    if (!livroParaAd) {
        return "Livro não encontrado.";
    }

    livroParaAd.totalExemplares += quantidade;
    livroParaAd.quantidade += quantidade;

    return "Exemplares adicionados com sucesso!";
}

function removerLivro(livros, tituloBusca) {
    const indice = livros.findIndex(
        livro => livro.titulo === tituloBusca
    )

    if (indice !== -1) {
        livros.splice(indice, 1);
        return "Livro removido com sucesso!"
    } else {
        return "Livro não encontrado.";
    }
}

function adicionarLivro(livros, livro) {
    const livroExistente = localizarLivro(livros, livro.titulo)
    if (livroExistente) {
        return "Livro já cadastrado."
    } else {
        livros.push(livro);
        return "Livro adicionado com sucesso!";
    }
}

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
