// Casos de uso para la sección de saludos.
// Acá va la lógica de negocio agnóstica a los frameworks,
// recibiendo como parámetros las dependencias necesarias.

class GreetingUsecase {

  constructor(greetingCache) {
    this.greetingCache = greetingCache;
  }

  async makeGreeting() {

    const value = await this.greetingCache.getGreetingCounter();
    const greeting = `Hello, you're the visitor N°${value}`;

    return greeting;

  }

}

module.exports = GreetingUsecase;