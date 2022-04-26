const { Firestore } = require('@google-cloud/firestore');

const Book = require('../entities/book');

// Implementación con Firestore para el repositorio de libros.
// Recibe la conexión con Firestore externamente.

class FirestoreBooksRepository {

  constructor(firestoreClient, test = false) {

    // Obtener el nombre de la colección desde variables de entorno.
    // Si "test" es true, se le agrega un sufijo, útil para que 
    // las pruebas de integración no sobreescriban los datos existentes.

    let collection_name = process.env.FIRESTORE_COLLECTION_NAME;

    if (test) {
      collection_name += "_test";
    }

    this.collection = firestoreClient.collection(collection_name);
    this.test = test;

  }

  async getBooks() {

    const snapshot = await this.collection.get();
    const books = snapshot.docs.map(doc => this._getBookFromDocument(doc));

    return books;

  }

  async getBook(id) {

    const doc = await this.collection.doc(id).get();

    if (doc.exists) {
      return this._getBookFromDocument(doc);
    }
    
    return undefined;

  }

  async createBook(book) {

    const doc = this.collection.doc();
    
    await doc.set({
      title: book.title,
      author: book.author,
      pages: book.pages,
    })

    return doc.id;

  }

  async updateBook(book) {

    const doc = this.collection.doc(book.id);

    await doc.set({
      title: book.title,
      author: book.author,
      pages: book.pages,
    })

  }

  async deleteBook(id) {

    const doc = await this.collection.doc(id).delete();

  }

  async deleteAllBooks() {

    // Borra todos los libros de la colección. 
    // Útil para realizar pruebas unitarias con el emulador.

    if (this.test) {

      let books = await this.getBooks();

      for (const book of books) {
        await this.deleteBook(book.id);
      }

    }

  }

  _getBookFromDocument(doc) {

    // Retorna una instancia Book desde una instancia Document de Firestore.

    const id = doc.id;
    const data = doc.data();

    return new Book(id, data.title, data.author, data.pages);

  }

}

module.exports = FirestoreBooksRepository;