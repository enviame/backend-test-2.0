const createExpressApp = require('./frameworks/http/express');
const createFirestoreClient = require('./frameworks/db/firestore');
const createRedisClient = require('./frameworks/db/redis');
const SequelizeClient = require('./frameworks/db/sequelize');

const createGreetingRouter = require('./greeting/http/greeting-router');
const GreetingUsecase = require('./greeting/usecases/greeting-usecase');
const RedisGreetingCache = require('./greeting/repositories/redis-greeting-cache');

const createBooksRouter = require('./books/http/books-router');
const ManageBooksUsecase = require('./books/usecases/manage-books-usecase');
const FirestoreBooksRepository = require('./books/repositories/firestore-books-repository');
const SequelizeBooksRepository = require('./books/repositories/sequelize-books-repository');

// Instanciar dependencias.

// En el caso de uso de de libros, es es posible pasarle como parámetro el repositorio
// de Firestore o el repositorio con Sequelize, y en ambos casos debería funcionar,
// incluso si el cambio se hace mientras la aplicación está en ejecución.

const redisClient = createRedisClient();
const redisGreetingCache = new RedisGreetingCache(redisClient);

const firestoreClient = createFirestoreClient();
const firestoreBooksRepository = new FirestoreBooksRepository(firestoreClient);

const sequelizeClient = new SequelizeClient();
const sequelizeBooksRepository = new SequelizeBooksRepository(sequelizeClient);
sequelizeClient.syncDatabase();

const greetingUsecase = new GreetingUsecase(redisGreetingCache);
const manageBooksUsecase = new ManageBooksUsecase(sequelizeBooksRepository);

let routers = [
  createGreetingRouter(greetingUsecase),
  createBooksRouter(manageBooksUsecase),
];
  
// Crear aplicación Express con dependencias inyectadas.

const app = createExpressApp(routers);