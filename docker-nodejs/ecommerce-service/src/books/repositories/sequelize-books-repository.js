const { DataTypes } = require('sequelize');

// Implementación con Sequelize para el repositorio de libros.
// Recibe la conexión con Sequelize externamente.

class SequelizeBooksRepository {

  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;
    
    // Mapear la tabla Book.
    // Si "test" es true, se le agrega un sufijo al nombre de la tabla,
    // para que las pruebas de integración no sobreescriban los datos existentes.

    let tableName = "Books";

    if (test) {
      tableName += "_test";
    }

    const columns = {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      author: DataTypes.STRING,
      title: DataTypes.STRING,
      pages: DataTypes.INTEGER,

    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.bookModel = sequelizeClient.sequelize.define('Book', columns, options);

  }

  async getBooks() {

    const books = await this.bookModel.findAll({
      raw: true
    });

    return books;

  }

  async getBook(id) {

    return await this.bookModel.findByPk(id);

  }

  async createBook(book) {

    const data = await this.bookModel.create(book);    
    return data.id;

  }

  async updateBook(book) {

    const options = {
      where: {
        id: book.id,
      }
    };

    await this.bookModel.update(book, options);

  }

  async deleteBook(id) {

    const options = {
      where: {
        id: id,
      }
    };

    await this.bookModel.destroy(options);

  }

  async deleteAllBooks() {

    if (this.test) {

      const options = {
        truncate: true
      };

      await this.bookModel.destroy(options);

    }

  }

  async dropBooksTable() {

    if (this.test) {
      await this.bookModel.drop();
    }

  }

}

module.exports = SequelizeBooksRepository;