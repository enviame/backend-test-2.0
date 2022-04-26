const appRoot = require('app-root-path');
const assert = require('assert');
const sinon = require('sinon');

const ManageBooksUsecase = require(appRoot + '/src/books/usecases/manage-books-usecase');
const Book = require(appRoot + '/src/books/entities/book');
const FirestoreBooksRepository = require(appRoot + '/src/books/repositories/firestore-books-repository');

// Pruebas para el caso de uso del el manejo de libros, usando un Stub
// para simular el repositorio de Firestore, es decir, en este caso no se utiliza el emulador.

describe("TestManageBooksUsecase", function() {

  const repositoryStub = sinon.createStubInstance(FirestoreBooksRepository);
  const usecase = new ManageBooksUsecase(repositoryStub);

  it("should get all three books", async function() {

    // Definir que el stub del repositorio retorne tres libros.

    stub_books = [
      new Book(1, "Book1", "Author1", 10),
      new Book(2, "Book2", "Author2", 20),
      new Book(3, "Book3", "Author3", 30),
    ];

    repositoryStub.getBooks.returns(stub_books);

    // Obtener los libros desde el caso de uso, y afirmar que se hayan retornado
    // la cantidad correcta de libros,
    
    books = await usecase.getBooks();
    assert.equal(stub_books.length, books.length);

  });

  it("should create a book", async function() {

    // Definir que el stub del repositorio retorne una ID tras simular crear un libro.

    stub_id = 25;
    repositoryStub.createBook.returns(stub_id);

    // Crear un libro con el caso de uso.

    data = {
      "title": "test-title",
      "author": "test-author",
      "pages": 40,
    };
    
    book = await usecase.createBook(data);

    // Afirmar que el libro retornado tenga los mismos datos definidos.
    
    assert.equal(book.id, stub_id);
    assert.equal(book.title, data.title);
    assert.equal(book.author, data.author);
    assert.equal(book.pages, data.pages);

  });

});