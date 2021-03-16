# Prueba Ingeniería Resuelve (backend)

Se agradece la oportunidad y el reto para mejorar las habilidades que se van adquiriendo con cada linea de código que escribimos.
Debo decir que el problema al principio se veía sencillo, pero al comprender más de los requerimientos se volvió un reto muy bueno.

## Problema y Solución

El principal detalle es el calculo del bono variable y para esto se debe de conocer primero el total de goles anotados por cada jugador de cada equipo, así como el total de goles mínimos de acuerdo a lo que se espera por cada jugador.
Conociendo estos datos ya se puede calcular el sueldo completo tomando en cuenta que los factores de cada meta de goles vale solo un 50% del valor del bono
Se acepta un solo JSON de entrada como se prupuso

```json
{
   "jugadores" : [  
      { ... }
   ]
}
```

y en este caso se supone que el calculo se hará usando la tabla de niveles de Resuelve FC, los equios se extraen del campo equipo de cada jugador y se separa al momento de hacer el proceso, es por esto que se pueden usar más equipos en el calculo.

En caso de que se quiera usar otra tabla de Niveles en los calculos se deberá de pasar en el mismo JSON de esta forma:

```json
{
   "jugadores" : [  
      { ... }
   ],
   "niveles": {
        "A": 10,
        "B": 15,
        "C": 20,
        "Cuauh": 25,
        "Pelé": 150
    }
}
```
Definiendo así todos los que se usarán en los calculos.

## Tecnología

Se optó por hacer una API, en donde los datos se envían por URL via POST  y se obtiene una respuesta con el JSON resuelto

`http://localhost:4444?datos={"jugadores":[{"nombre":"Juan Perez","nivel":"C","goles":10,"sueldo":50000,"bono":25000,"sueldo_completo":null,"equipo":"rojo"},{"nombre":"EL Cuauh","nivel":"Cuauh","goles":30,"sueldo":100000,"bono":30000,"sueldo_completo":null,"equipo":"azul"},{"nombre":"Cosme Fulanito","nivel":"A","goles":7,"sueldo":20000,"bono":10000,"sueldo_completo":null,"equipo":"azul"},{"nombre":"El Rulo","nivel":"B","goles":9,"sueldo":30000,"bono":15000,"sueldo_completo":null,"equipo":"rojo"}]}`

Y para enviar la tabla de niveles es igual, solo que agregando al final los niveles como parte del JSON:

`http://localhost:4444?datos={"jugadores":[{"nombre":"Juan Perez","nivel":"C","goles":10,"sueldo":50000,"bono":25000,"sueldo_completo":null,"equipo":"rojo"},{"nombre":"EL Cuauh","nivel":"Cuauh","goles":30,"sueldo":100000,"bono":30000,"sueldo_completo":null,"equipo":"azul"},{"nombre":"Cosme Fulanito","nivel":"A","goles":7,"sueldo":20000,"bono":10000,"sueldo_completo":null,"equipo":"azul"},{"nombre":"El Rulo","nivel":"B","goles":9,"sueldo":30000,"bono":15000,"sueldo_completo":null,"equipo":"rojo"}],"niveles":{"A":10,"B":15,"C":20,"Cuauh":25,"Pelé":150}}`

Se creo usando Express.JS (https://expressjs.com) y la prueba se realizo mediante Postman (https://postman.com) para mandar el POST con los datos y así obtener la respuesta.

## Ejecución

1. Manual
---

* Como requerimientos se necesita tener Node.js (https://nodejs.org/) instalado en el equipo.
* Se descargan los archivos server.js,calculo.js,package.json a un directorio.
* Se ejecuta el comando `npm install` en ese directorio usando la linea de comandos.
* Se ejecuta el comando `node server.js` para iniciar el servidor y poder usarlo.
* Para detenerlo simplemente se hace `CTRL+C` y se detiene el proceso.

2. Sencilla
---

Para fácil distribución se crearon en la carpeta `\executables` archivos ejecutables en donde solo se abren y ya estará corriendo el servior sin necesidad de hacer más

## Conclusión

El problema me tomó algo de tiempo pensar en como tomar en cuenta todos los requerimientos, incluyendo el bonus. Se que puedo hacerlo mejor, pero el tiempo apremia.

Siempre hay espacio para mejorar procesos, optimizar recursos y tiempos. Y esta prueba fue muy constructiva y me llevo aprendizaje nuevo =D

Autor: Emmanuel Olvera
