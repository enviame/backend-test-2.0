// Entidad libro.

class Book {

  static schema = {
    type: "object",
      properties: {
        title : {type: "string",errorMessage:'must be of string type'},
        author :{type: "string",errorMessage:'must be of string type'},
        pages : {type: "integer",errorMessage:'must be of integer type'}
      },
      required: ["title","author","pages"],
      additionalProperties: false,
  }

  constructor(id, title, author, pages) {

    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;

  }

}

module.exports = Book;