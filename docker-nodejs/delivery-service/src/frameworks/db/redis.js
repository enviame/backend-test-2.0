const redis = require('redis');

// Función para crear una conexión con Redis
// según las variables de entorno definidas.

function createRedisClient() {

  const host = process.env.REDIS_HOST;
  const port = process.env.REDIS_PORT;

  return redis.createClient(port, host);

}

module.exports = createRedisClient;