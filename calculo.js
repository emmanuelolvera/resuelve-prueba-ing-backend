// En este archivo se realizarán los calculos.

// Función para redondear a 2 digitos, tomado de
// https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places
function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
    if (n < 0) {
        negative = true;
        n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(digits);
    if (negative) {
        n = (n * -1).toFixed(digits);
    }
    return n;
}

module.exports = {
    // Función sueldo en donde se hará el calculo principal
    sueldo: function (datos){
        // Variables usadas
        var total_goles_equipo = {}
        var goles_esperados_equipo = {}
        var bonus_equipo = {}
        var bonus_individual = 0
        // En caso de que no venga información de los niveles en el JSON se asignarán los niveles por defecto de Resuelve FC
        if (datos.niveles == null){
            datos.niveles = {
                'A': 5,
                'B': 10,
                'C': 15,
                'Cuauh': 20
            }
        }
        // Se recorre todo el JSON de jugadores para relizar varios procesos
        datos.jugadores.forEach(jugador => {
            // Si el equipo no existe en las varibles se crea
            if (total_goles_equipo[jugador.equipo] == null) 
                total_goles_equipo[jugador.equipo] = 0
            if (goles_esperados_equipo[jugador.equipo] == null)
                goles_esperados_equipo[jugador.equipo] = 0
            if (bonus_equipo[jugador.equipo] == null)
                bonus_equipo[jugador.equipo] = 0
            // Se suman los goles anotados por equipo
            total_goles_equipo[jugador.equipo] = total_goles_equipo[jugador.equipo] + jugador.goles
            // Se suman los goles esperados por equipo dependiendo del nivel de cada jugador del equipo correspondiente
            goles_esperados_equipo[jugador.equipo] = goles_esperados_equipo[jugador.equipo] + datos.niveles[jugador.nivel]
        })
        // Para cada equipo se calcula el porcentaje del bonus obtenido
        // Se usó un pequeño fragmento de código obtenido en https://stackoverflow.com/a/39453995
        for (var key in bonus_equipo) { 
            if (!bonus_equipo.hasOwnProperty(key))
                { continue } 
            // Se dividen los goles anotados entre los esperados para obtener el factor correspondiente
            bonus_equipo[key] = total_goles_equipo[key]/goles_esperados_equipo[key]
            // Si el factor para de 1 (100% del 50% máximo del bonus) se fija en 1 
            if (bonus_equipo[key] > 1) bonus_equipo[key] = 1
        }
        // Se recorren todos los jugadores nuevamente para hacer calculos e insertar los sueldos completos
        datos.jugadores.forEach(jugador => {
            // Se calcula el factor del bonus individual
            bonus_individual = jugador.goles/datos.niveles[jugador.nivel]
            // En el mismo caso si el factor es mayor que 1 (100% del 50% máximo del bonus), este se fija en 1
            if (bonus_individual > 1) bonus_individual = 1
            // Se suman los factores de las dos partes del bonus por equipo, este se divide entre dos para sacar la media que será el factor final
            // que se multiplicará por el bono para después sumarle el sueldo y así obtener el sueldo completo. Después se redondea a dos decimales
            // y se convierte el valor a un valor numérico pues la función roundTo() nos devuelve una cadena.
            // Ya por último el resultado de todo esto se ingresa en el JSON de jugadores
            jugador.sueldo_completo = parseFloat(roundTo(jugador.sueldo + jugador.bono*((bonus_equipo[jugador.equipo]+bonus_individual)/2),2))
          })
        // Regresamos el JSON de jugadores ya resuelto
        return datos.jugadores
    }
};