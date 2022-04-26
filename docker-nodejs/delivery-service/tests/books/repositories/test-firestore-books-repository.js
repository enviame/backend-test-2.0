const appRoot = require('app-root-path');
const assert = require('assert');

const createFirestoreClient = require(appRoot + '/src/frameworks/db/firestore');
const FirestoreBooksRepository = require(appRoot + '/src/books/repositories/firestore-books-repository');
const Book = require(appRoot + '/src/books/entities/book');

// Pruebas para la creación y obtención de documentos en Firestore,
// conectándose con el emulador que debe estar corriendo de forma local.

describe("TestFirestoreBooksRepository", function() {

  const client = createFirestoreClient();
  const repository = new FirestoreBooksRepository(client, true);

  beforeEach(async function() {

    // Borrar todos los libros antes de cada prueba, para que no hayan datos anteriores
    // que afecten los resultados de las pruebas siguientes.

    await repository.deleteAllBooks();

  });

  after(async function() {

    // Borrar todos los libros después de todas las pruebas.

    await repository.deleteAllBooks();

  });

  it("should create and get a book", async function() {
  
    // Agregar un libro al repositorio.

    const title = "TestTitle";
    const author = "TestAuthor";
    const pages = 10;
    const book = new Book(undefined, title, author, pages);
    
    const id = await repository.createBook(book);

    // Obtener el libro desde el repositorio y afirmar
    // que tenga los mismos valores que los creados.

    const obtained_book = await repository.getBook(id);

    assert.equal(obtained_book.id, id);
    assert.equal(obtained_book.title, title);
    assert.equal(obtained_book.author, author);
    assert.equal(obtained_book.pages, pages);

  });

  it("should create and delete a book", async function() {

    // Agregar un libro al repositorio.

    const title = "TestTitle";
    const author = "TestAuthor";
    const pages = 10;

    const book = new Book(undefined, title, author, pages);

    const id = await repository.createBook(book);

    // Luego borrarlo del depositorio.

    await repository.deleteBook(id);

    // Obtener todos los libros del repositorio y afirmar
    // que su cantidad sea cero.

    const books = await repository.getBooks();
    assert.equal(books.length, 0);

  });

  it("should create three books and get them all", async function() {

    // Agregar tres libros al repositorio.

    const booksAmount = 3;
    
    for (let i = 0; i < booksAmount; i++) {

      const book = new Book(undefined, "TestTitle", "TestAuthor", 10);
      await repository.createBook(book);

    }

    // Obtener todos los libros del repositorio y afirmar que la cantidad
    // corresponda a la cantidad de libros agregados.

    const books = await repository.getBooks();
    assert.equal(booksAmount, books.length);

  });
    
});