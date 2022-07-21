# Backend Test Envíame

La siguiente prueba requiere realizar el diseño y desarrollo de dos microservicios (ms) que deben comunicarse entre si.
Los microservicios son:
* sistema de marketplace ecommerce (ecommerce ms): Microservicio destinado a la venta de productos online.
* sistema de shipping y tracking (shipping ms): Microservicio destinado a la gestión logística de la entrega de las ventas.

El proyecto está enfocado en los aspectos operacionales de un proceso de marketplace ecommerce típico. Lo anterior implica que puedes descartar procesos relacionados a pago y facturación.

## Requerimientos técnicos
Deberás elegir entre los siguientes lenguajes +  frameworks:
- Python + flask
- NodeJS + express
- Deberás utilizar docker / docker-compose para proveer una aplicación contenedorizada y portable.
- La API desarrollada deberá considerar algún mecanismo de autenticación como: API Key, Bearer Token, Basic Auth, OAuth
Si no estás familiarizado con Docker, hemos compartido un template para Python y NodeJS. El que ha sido estructurado siguiendo los proncipios definidos por [clean architecture]

Te alentamos a que uses la plantilla provista y te recompensaremos con puntos adicionales las siguientes dos razones: 
- Leer y entender el código escrito por otro desarrollador es una habilidad necesaria y que valoramos.
- Es deseable la comprensión de los principios de clean architecture.

La plantilla proporciona bases de datos mysql, firestore y redis listas para usar. Sientente libre de usar cualquiera de estas herramientas o cualquier combinación de ellas.

## Plazo
Debes entregar la prueba como máximo en una semana (7 días)

## Antes de comenzar

- Entrega un **repositorio privado de GitHub** con tu código y agrega a los siguiente usuarios como colaboradores: **@rolivagon @rsebjara @vmolina-enviame @vham @rcarrascop**.
- No te olvides de incluir:
    - Debes entregar un microservicio contenedorizado con las instrucciones apropiadas para ejecutar la servicio.
    - README.md con las instrucciones sobre como ejecutar tu app.
    - **Colección de Postman o archivo req.http** con ejemplos e instrucciones sobre como probar todos los endpoints de tu servicio.
    - Archivo de variables de ambiente de ejemplo **(no ignorar archivo .env)** con todas las variables de entorno requeridas.
    - Un archivo **Dockerfile y docker-compose.yml** necesarios para ejecutar tu servicio.
    - Provee un método para poblar la base de datos con datos de prueba.
- Por favor, antes de entregar tu prueba, asegurate de probar tu servicio en un ambiente limpio desde el inicio, con esto te asegurarás de probar en similares condiciones que las que tendrá nuestro equipo Dev para revisar tu prueba. **Si no podemos ejecutar tu servicio, tu prueba será descartada inmediatamente**.
- Dado que se trata de una prueba de backend concéntrate en entregar una API donde podamos probar todas las funcionalidades requeridas.

En caso de cualquier pregunta técnica [contáctanos](mailto:tech-test@enviame.io)

Una vez comenzada la revisión de tu prueba podríamos enviarte algunas preguntas, por lo que apreciaremos tus respuestas oportunas.

## Challenge
Para cada microservicio deberás desarrollar las historias que se indican a continuación:

## Historias de Usuario

### ecommerce microservice
1. Como usuario administrador de marketplace ("marketplace admin") podrás crear, ver, editar, eliminar y listar tiendas, en adelante "stores". Cada "store" requiere al menos los siguientes datos: nombre, descripción corta y al menos un usuario ("seller user").
2. Como "seller user" podrás ver y editar datos de la tienda ("store"). Deberás poder agregar una dirección de bodega "warehouse address", lo cuál será condición previa y necesaria para poder vender un producto.
3. Como "seller user" podrás crear, ver, editar y listar productos ("products"). Cada producto requiere al menos los siguientes datos: nombre, descripción corta, precio, sku de producto y cantidad.
4. Cualquier persona podrá registrarse como usuario del marketplace ("marketplace user"). Cada "marketplace user" requiere al menos los siguientes datos: nombre, email y dirección de entrega ("shipping_address").
5. Como "marketplace user", podrás comprar productos de diferentes tiendas. Tu compra no podrá exceder el stock de un producto y al realizar una compra se reducirá el stock disponible de productos disponibles de acuerdo a lo indicado por tu compra. Cada compra se traduce en una transacción de order de compra ("buy order"), en estado creada ("created") la que debe ser confirmada por el seller user.
6. Como "seller user", podrás listar y ver tus órdenes de compra ("buy orders"). También podrás cambiar el estado de las ordenes desde creada ("created") a confirmada ("confirmed"), y desde confirmada a despachada ("dispatched"). Cada orden deberá tener al menos los siguientes datos: sku de producto, cantidad de producto e información de delivery. Cuando cambies el estado de la orden a "dispatched", el "ecommerce ms" creará un "delivery" en el "delivery ms", utilizando el endpoint de creación de envíos que debe estar disponible en la API del delivery ms.
7. Como "marketplace user". podrás cancelar una orden de compra ("cancell") únicamente si esta se encuentra en los estados "created" o "confirmed". No podrás cancelar una orden en estado "dispatched". En caso de que una orden de compra sea cancelada el stock de productos disponibles del seller a quien corresponde la orden debe ser incrementado de acuerdo a las cantidades indicadas en la oden de compra cancelada.
8. Como "marketplace admin", podrás listar y ver todas las ordenes de compra, y podrás filtrar por estado ("created", "confirmed", "dispatched", "cancelled").
9. Tanto los "seller user" como los "marketplace user" podrá listar y ver sus urdenes de compra y filtrarlas por estado. Los estados posibles son: "created", "confirmed", "dispatched" y "delivered". 
10. El estado "delivered" es gatillado desde el "delivery ms" mediante un webhook. Lo anterior requiere que el "ecommerce ms" debe proveer un endpoint autenticado que será registrado en el "delivery ms" al cual se enviarán las notificaciones de cambio de estado de una orden.

### delivery microservice

1. El delivery ms debe implementar una API autenticada que permita crear, ver, editar y listar envíos ("deliveries"). Cada delivery corresponde a una "buy order" proveniente del ms ecommerce.
2. El delivery ms debe implementar la funcionalidad para ver el historial de tracking o cambios de estado de un "delivery".

- Ejemplo de contrato para crear un delivery:
**request:**
```json
{
    "order":
    {
        "foreing_order_id": "order number provided by ecommerce microservice",
        "products": [{
                "sku": "unique id of product",
                "name": "product name",
                "qty": "product quantity"
            }]
    },
    "origin": {
        "address": "pickup address"
    },
    "destination": {
        "name": "customer name",
        "address": "customer address"
    }
}
```

**response:**
```json
{
    "order":
    {
        "foreing_order_id": "order number provided by ecommerce microservice",
        "products": [{
                "sku": "unique id of product",
                "name": "product name",
                "qty": "product quantity"
            }]
    },
    "origin": {
        "address": "pickup address"
    },
    "destination": {
        "name": "customer name",
        "address": "customer address"
    },
    "tracking_number": "provided by the delivery microservice",
    "status": "provided by the delivery microservice"
}
```

- Ejemplo de contrato para obtener el historial de tracking de un delivery:
**request:**
```json
{
    "foreing_order_id": "",
    "tracking_number": ""
}
```

**response:**
```json
{
    "tracking_number": "",
    "status": "",
    "tracking": [{
        "status": "",
        "date": ""
    }]
}
```

3. El microservicio de delivery debe proveer un mecanismo para cambiar el estado de las ordenes cada 30 segundos, de manera automática y de acuerdo a las siguientes reglas:
    - Los estados posibles de delivery son: "READY_FOR_PICK_UP" -> "AT_ORIGIN" -> "EN_ROUTE_OF_DELIVERY" -> "NOT_DELIVERED"/"DELIVERED", en el orden señalado.
    - Desde el estado "EN_ROUTE_OF_DELIVERY" hay un 50% de probabilidades de que el cambio de estado siguiente sea "NOT_DELIVERED" o "DELIVERED" (de manera aleatoria).
    - Desde el estado "NOT_DELIVERY" el estado siguiente debe ser retroceder al estado "EN_ROUTE_OF_DELIVERY".
    - El estado "DELIVERED" es un estado final.

4. El ms delivery debe proveer una funcionalidad para registrar un endpoint (webhook) al cual notificar cambios de estado de las ordenes. Cada cambio de estado debe ser notificado una única vez.

### Definiciones:
Los estados a notificar son: **"READY_FOR_PICK_UP", "AT_ORIGIN", "EN_ROUTE_OF_DELIVERY", "NOT_DELIVERED", "DELIVERED".**

## Aspectos a evaluar

Es importante que escribas un archivo README.md con toda las instrucciones necesarias para ejecutar tu servicio, y una collección de postman o un archivo req.http con ejemplos e instrucciones para tu API adecuadamente. 
**Si el README.md está incompleto y/o no proporcionas una colección de Postman o archivo req.http no podremos probar tu servicio, por lo que no podremos evaluar tu prueba**.

- Funcionalidad (36 pts)
- Pruebas unitarias (12 pts)
- Documentación (6 pts)
    - README.md 
    - Colección de Postman  o archivo req.http con ejemplos e instrucciones sobre **como probar todos los endpoints** de tu app
    - Software design (services architecture diagram)
- Estilo de programación (6 pts)
- Uso apropiado de respuestas http (2 pts)
- Manejo adecuado de errores y excepciones (2 pts)
- Uso apropiado del template de Clean Architecture (6)

## Aspectos que serán ignorados

- Diseño visual de la solución (frontend)
- Despliegue de la solución
