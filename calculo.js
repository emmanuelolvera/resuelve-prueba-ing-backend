// En este archivo se realizarán los calculos.

module.exports = {
    sueldo: function (datos,niveles){
        var total_goles = 0
        var goles_esperados = 0
        var bonus_equipo = 0
        var bonus_individual = 0
        if (niveles == null){
            // Se asignan los niveles por default de Resuelve FC
            niveles = {
                'A': 5,
                'B': 10,
                'C': 15,
                'Cuauh': 20
            }
        }
        datos.jugadores.forEach(jugador => {
            total_goles = total_goles + jugador.goles
            goles_esperados = goles_esperados + niveles[jugador.nivel]
            //console.log(jugador.goles,niveles[jugador.nivel])
          })
        bonus_equipo = total_goles/goles_esperados
        if (bonus_equipo > 1) bonus_equipo = 1
        datos.jugadores.forEach(jugador => {
            bonus_individual = jugador.goles/niveles[jugador.nivel]
            if (bonus_individual > 1) bonus_individual = 1
            jugador.sueldo_completo = jugador.sueldo + jugador.bono*((bonus_equipo+bonus_individual)/2)
          })
        console.log(datos)
        //console.log(niveles)
        //console.log(total_goles,goles_esperados,bonus_equipo)
        return datos
    }
};