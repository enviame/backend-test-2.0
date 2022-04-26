const Book = require('../entities/book');

// Casos de uso para el manejo de libros.
// Acá va la lógica de negocio agnóstica a los frameworks,
// recibiendo como parámetros las dependencias necesarias.

class ManageBooksUsecase {

  constructor(booksRepository) {
    this.booksRepository = booksRepository;
  }

  async getBooks() {
    return await this.booksRepository.getBooks();
  }

  async getBook(id) {
    return await this.booksRepository.getBook(id);
  }

  async createBook(data) {
    
    const book = new Book(undefined, data.title, data.author, data.pages);
    const id = await this.booksRepository.createBook(book);
    book.id = id;

    return book;

  }

  async updateBook(id, data) {

    const book = new Book(id, data.title, data.author, data.pages);
    await this.booksRepository.updateBook(book);

    return book;

  }

  async deleteBook(id) {
    await this.booksRepository.deleteBook(id);
  }

}

module.exports = ManageBooksUsecase;