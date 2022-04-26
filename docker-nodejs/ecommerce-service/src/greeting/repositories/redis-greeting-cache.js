const { promisify } = require('util');

const COUNTER_KEY = "greeting_counter";

// Implementación con Redis del caché utilizado por la sección de saludos.
// Recibe externamente la conexión con Redis.

class RedisGreetingCache {

  constructor(redisClient) {
    this.redisClient = redisClient;
  }

  async getGreetingCounter() {
    
    const incrAsync = promisify(this.redisClient.incr).bind(this.redisClient);
    return await incrAsync(COUNTER_KEY);

  }

};

module.exports = RedisGreetingCache;