const express = require('express');
const appRoot = require('app-root-path');
const Book = require('../entities/book');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");

// Router (endpoints) para la sección de libros.

// Sólo se encarga de recibir las llamadas HTTP y le entrega los datos
// relevantes a los casos de uso correspondiente. Esta capa no debe
// contener lógica de negocio, sólo lo necesario para recibir y entregar
// respuestas válidas.

function createBooksRouter(manageBooksUsecase) {

  const router = express.Router();

  router.get("/books", async (req, res) => {

    const books = await manageBooksUsecase.getBooks();
    res.status(200).send(books);

  });

  router.get("/books/:id", async (req, res) => {

    const id = req.params.id;
    const book = await manageBooksUsecase.getBook(id);
    
    res.status(200).send(book);
    
  });
  
  router.post("/books", async (req, res) => {
    
    validation = validateSchema(Book.schema, req);
    
    if (validation === true) {
      const book = await manageBooksUsecase.createBook(req.body);
      res.status(201).send(book);
    } else {
      res.status(422).send(validation)
    }

  });

  router.put("/books/:id", async (req, res) => {
    
    validation = validateSchema(Book.schema, req);
    
    if (validation === true) {
      const id = req.params.id;
      const book = await manageBooksUsecase.updateBook(id, req.body);
      res.status(200).send(book);
    } else {
      res.status(422).send(validation);
    }

  });

  router.delete("/books/:id", async (req, res) => {

    const id = req.params.id;
    await manageBooksUsecase.deleteBook(id);

    res.status(200).send(`Deleted ${id}`);

  });

  return router;

}

module.exports = createBooksRouter;