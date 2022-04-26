const express = require('express');
const appRoot = require('app-root-path');

// Router (endpoints) para la sección de saludos.

// Sólo se encarga de recibir las llamadas HTTP y le entrega los datos
// relevantes a los casos de uso correspondiente. Esta capa no debe
// contener lógica de negocio, sólo lo necesario para recibir y entregar
// respuestas válidas.

function createGreetingRouter(greetingUsecase) {

  const router = express.Router();

  router.get("/greeting", async (req, res) => {

    const response = await greetingUsecase.makeGreeting();
    res.send(response);

  });

  return router;

}

module.exports = createGreetingRouter;