class Livro {
    constructor(titulo, autor, paginas, quantidade) {
        this.titulo = titulo;
        this.autor = autor;
        this.paginas = paginas;
        this.quantidade = quantidade;
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
        this.quantidade++;
        return "Livro devolvido com sucesso!";
    }
}

const livros = [
    new Livro("Dom Casmurro", "Machado de Assis", 184, 2),
    new Livro("1984", "George Orwell", 120, 1),
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

// ======================================
// Simulação de uso do sistema
// ======================================
const livro = localizarLivro(livros, "1984");

if (livro) {
    console.log(livro.obterResumo());

    console.log(livro.fazerEmprestimo());

    console.log(livro.obterResumo());
} else {
    console.log("Livro não encontrado.");
}