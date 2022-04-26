const { Firestore } = require('@google-cloud/firestore');

// Función para crear una conexión a Firestore.

// Si está definida la variable de entorno FIRESTORE_EMULATOR_HOST,
// entonces tratará de conectarse con el emulador, de lo contrario
// se conecta al Firestore del mismo proyecto en donde se encuentra
// desplegado el servicio del AppEngine.

function createFirestoreClient() {
  
  return new Firestore();
  
}

module.exports = createFirestoreClient;