let MokeponJugador
let MokeponPC
let Orden = aleatorio(1,2)
let TipoMokeponJugador
let TipoMokeponPC
let ataqueJugador
let ataquePC
let HPJugador = 100
let HPPC = 100
let DañoRealizado
let MusicaOrden = 1

//La función pausa(ms) devuelve una promesa que se resuelve después de la cantidad de milisegundos especificada. Luego, con async/await en las funciones que requieran llevar pausas antes de ejecutar la siguiente acción. Esto puede hacer que tu código sea más claro y más fácil de entender en comparación con el uso de múltiples setTimeout.
function pausa(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

 //Al cargar la página html se ejecutará iniciarJuego, en la cual se encuentran el boton de seleccion de Mokepon y los botones de ataques de fuego, agua y planta
async function iniciarJuego() {
    const muteCheckbox = document.getElementById('muteCheckbox')
    const MusicaInicio = document.getElementById('MusicaInicio')
    const MusicaBatalla = document.getElementById('MusicaBatalla')
    const MusicaLowHP = document.getElementById('MusicaLowHP')

    console.log("Valor inicial de Turno:", Orden)
    let SectionSilenciarMusica = document.getElementById('SilenciarMusica')
    SectionSilenciarMusica.style.display = 'none'
    muteCheckbox.disabled = true
    MusicaInicio.addEventListener('ended', function() { //Para que se repitan las musicas
        // Reinicia la reproducción desde el principio
        MusicaInicio.currentTime = 0
        MusicaInicio.play()
    })
    MusicaBatalla.addEventListener('ended', function() {
        // Reinicia la reproducción desde el principio
        MusicaBatalla.currentTime = 0
        MusicaBatalla.play()
    })
    MusicaLowHP.addEventListener('ended', function() {
        // Reinicia la reproducción desde el principio
        MusicaLowHP.currentTime = 0
        MusicaLowHP.play()
    })

    muteCheckbox.addEventListener('change', function (){
        CheckboxReproduccion(MusicaOrden)
    })

    let BotonFuego = document.getElementById('Boton-Fuego')
    let BotonAgua = document.getElementById('Boton-Agua')
    let BotonPlanta = document.getElementById('Boton-Planta')

    BotonAgua.style.display = 'none'
    BotonFuego.style.display = 'none'
    BotonPlanta.style.display = 'none'

    let InputMilopras = document.getElementById('Milopras')
    let InputTalondigon = document.getElementById('Talondigon')
    let InputGartile = document.getElementById('Gartile')

    let BotonSeleccionarJugador = document.getElementById('Boton-Seleccionar')
    verificarInputs()
    function verificarInputs() { //Al iniciar, para que el boton seleccion se habilite al haber seleccionado por lo menos una opcion de mokepon
        if (!InputMilopras.checked && !InputGartile.checked && !InputTalondigon.checked) {
            BotonSeleccionarJugador.disabled = true
            setTimeout(verificarInputs, 100); // Verifica nuevamente después de 100 milisegundos
        } else {
            BotonSeleccionarJugador.disabled = false
        }
    }

    InputMilopras.addEventListener('change', Input1Change)
    function Input1Change(){
        OpcionSeleccionada(1)
    }
    InputTalondigon.addEventListener('change', Input2Change)
    function Input2Change(){
        OpcionSeleccionada(2)
    }
    InputGartile.addEventListener('change', Input3Change)
    function Input3Change(){
        OpcionSeleccionada(3)
    }
    let PokeOpen1 = document.getElementById('PokeO1')
    let PokeClose1 = document.getElementById('PokeC1')
    let PokeOpen2 = document.getElementById('PokeO2')
    let PokeClose2 = document.getElementById('PokeC2')
    let PokeOpen3 = document.getElementById('PokeO3')
    let PokeClose3 = document.getElementById('PokeC3')
    function OpcionSeleccionada(MokeponChecked){  //Para que la pokebola se abra o se cierre dependiendo la opcion que este seleccionada
        if(MokeponChecked == 1){
                PokeOpen1.style.display = 'block'
                PokeOpen2.style.display = 'none'
                PokeOpen3.style.display = 'none'
                PokeClose1.style.display = 'none'
                PokeClose2.style.display = 'block'
                PokeClose3.style.display = 'block'
        } else if(MokeponChecked == 2){
                PokeOpen1.style.display = 'none'
                PokeOpen2.style.display = 'block'
                PokeOpen3.style.display = 'none'
                PokeClose1.style.display = 'block'
                PokeClose2.style.display = 'none'
                PokeClose3.style.display = 'block'
        } else if(MokeponChecked == 3){
                PokeOpen1.style.display = 'none'
                PokeOpen2.style.display = 'none'
                PokeOpen3.style.display = 'block'
                PokeClose1.style.display = 'block'
                PokeClose2.style.display = 'block'
                PokeClose3.style.display = 'none'
        }
    }
    let ImgMilo = document.getElementById('ImgMilo')
    let ImgTalo = document.getElementById('ImgTalo')
    let ImgGart = document.getElementById('ImgGart')
    ImgMilo.addEventListener('click', ImgMoke1)
    PokeClose1.addEventListener('click', ImgMoke1)
    function ImgMoke1(){
        CheckInput(1)
        console.log('click en ImgPoke o Pokeball 1')
    }
    ImgTalo.addEventListener('click', ImgMoke2)
    PokeClose2.addEventListener('click', ImgMoke2)
    function ImgMoke2(){
        CheckInput(2)
        console.log('click en ImgPoke o Pokeball 2')
    }
    ImgGart.addEventListener('click', ImgMoke3)
    PokeClose3.addEventListener('click', ImgMoke3)
    function ImgMoke3(){
        CheckInput(3)
        console.log('click en ImgPoke o Pokeball 3')
    }
    function CheckInput(input){ //Para checkear las inputs cuando se le da click a las imagenes de la seleccion
        if(input == 1){
            InputMilopras.checked = true
            OpcionSeleccionada(1)
        } else if (input == 2){
            InputTalondigon.checked = true
            OpcionSeleccionada(2)
        } else if (input == 3){
            InputGartile.checked = true
            OpcionSeleccionada(3)
        }
    }

    let BotonReiniciar = document.getElementById('Reiniciar')
    BotonReiniciar.addEventListener('click', reiniciarJuego)

    BotonSeleccionarJugador.addEventListener('click', SeleccionBoton)
    
    let botonSeleccionarJugadorActivado = false // Variable para rastrear si el botón ya se ha activado

    async function SeleccionBoton() { //Ejecucion posterior al haber dado click en boton seleccion (de mokepon) y pasar a fase de batalla
        // Verifica si el botón ya se ha activado. Si es false (que el boton no se ha activado), procede.
        if (!botonSeleccionarJugadorActivado) {
            BotonSeleccionarJugador.disabled = true
            botonSeleccionarJugadorActivado = true
            // Desactiva el evento después de la primera activación
            BotonSeleccionarJugador.removeEventListener('click', SeleccionBoton)
            InputMilopras.removeEventListener('change', Input1Change)
            InputTalondigon.removeEventListener('change', Input2Change)
            InputGartile.removeEventListener('change', Input3Change)
            ImgMilo.removeEventListener('click', ImgMoke1)
            PokeClose1.removeEventListener('click', ImgMoke1)
            ImgTalo.removeEventListener('click', ImgMoke2)
            PokeClose2.removeEventListener('click', ImgMoke2)  
            ImgGart.removeEventListener('click', ImgMoke3)
            PokeClose3.removeEventListener('click', ImgMoke3)  

            await SeleccionarMokeponJugador()
            await pausa(2000)
            NotificacionSeleccion('Comenzar')
            await AlertaPreparate()
            async function AlertaPreparate(){
                if(Orden == 1){
                await mostrarAlerta('INICIAS TU', 'verde')
                await mostrarAlerta('PREPARATE!!!', 'verde')
                }else{
                await mostrarAlerta('INICIA ENEMIGO', 'rojo')
                await mostrarAlerta('PREPARATE!!!', 'rojo')   
                }
            }
            FgetElementById('Cont1', 2)
            FgetElementById('Cont2', 4)
            BarraSalud()
            BotonFuego.disabled = true
            BotonAgua.disabled = true
            BotonPlanta.disabled = true

            ReproduccionMusica('inicio', false)
            MusicaOrden = 2
            ReproduccionMusica('batalla', true)

            
            Turno()
        }
    }
}

//Funcion de aleatoriedad entre un valor min y max
function aleatorio(min, max) {
    return Math.floor( Math.random() * (max - min + 1) + min)
}

//La expresión (Orden === 1) ? 2 : 1 es un operador condicional ternario. Si el valor actual de Orden es igual a 1, entonces se asigna el valor 2 a Orden; de lo contrario, se asigna el valor 1. Esto básicamente invierte el turno: si Orden es 1, se cambia a 2, y viceversa.
async function cambiarTurno() {
    console.log("Cambiando turno...")
    Orden = (Orden === 1) ? 2 : 1
    console.log("Nuevo valor de Turno:", Orden)
    await pausa(1000)
    Turno()
}

async function Turno(){
    if(Orden === 1){
        NotificacionTurno('jugador')
        await pausa(1000)
        SeleccionAtaqueJugador()
    } else if(Orden === 2) {
        NotificacionTurno('pc')
        await pausa(2000)
        SeleccionAtaquePC()
    }
}

//La funcion indica la selección del jugador, la cual se ejecutará al hacer click en el boton de seleccionar (encontrada en la fn iniciaJuego) la cual nos alertará la opción que elegimos
async function SeleccionarMokeponJugador(){
    let InputMilopras = document.getElementById('Milopras')
    let InputTalondigon = document.getElementById('Talondigon')
    let InputGartile = document.getElementById('Gartile')
    let SpanMokeponJugador = document.getElementById('Mokepon-Jugador')
    let BotonFuego = document.getElementById('Boton-Fuego')
    let BotonAgua = document.getElementById('Boton-Agua')
    let BotonPlanta = document.getElementById('Boton-Planta')

    if(InputMilopras.checked) {
        SpanMokeponJugador.innerHTML = 'Milopras'
        MokeponJugador = 'Milopras'
        TipoMokeponJugador = 'AGUA'
        BotonAgua.style.display = 'block'
        FgetElementById('MiloprasS', 1)
        NotificacionSeleccion('jugador')

    } else if(InputTalondigon.checked) {
        SpanMokeponJugador.innerHTML = 'Talondigon'
        MokeponJugador = 'Talondigon'
        TipoMokeponJugador = 'FUEGO'
        BotonFuego.style.display = 'block'
        FgetElementById('TalondigonS', 1)
        NotificacionSeleccion('jugador')

    } else if(InputGartile.checked) {
        SpanMokeponJugador.innerHTML = 'Gartile'
        MokeponJugador = 'Gartile'
        TipoMokeponJugador = 'PLANTA'
        BotonPlanta.style.display = 'block'
        FgetElementById('GartileS', 1)
        NotificacionSeleccion('jugador')

    }
    InputGartile.disabled = true
    InputMilopras.disabled = true
    InputTalondigon.disabled = true
    await pausa(1000)
    SeleccionarMokeponPC()
}

//La función indica la selección aleatoria del mokepon para la PC
function SeleccionarMokeponPC(){
    MokeponPC = aleatorio(1,3)
    let SpanMokeponPC = document.getElementById('Mokepon-Enemigo')

    if (MokeponPC == 1) {
        SpanMokeponPC.innerHTML = 'Milopras'
        MokeponPC = 'Milopras'
        TipoMokeponPC = 'AGUA'
        FgetElementById('MiloprasSE', 1)
        NotificacionSeleccion('pc')
    } else if (MokeponPC == 2) {
        SpanMokeponPC.innerHTML = 'Talondigon'
        MokeponPC = 'Talondigon'
        TipoMokeponPC = 'FUEGO'
        FgetElementById('TalondigonSE', 1)
        NotificacionSeleccion('pc')
    } else if (MokeponPC == 3) {
        SpanMokeponPC.innerHTML = 'Gartile'
        MokeponPC = 'Gartile'
        TipoMokeponPC = 'PLANTA'
        FgetElementById('GartileSE', 1)
        NotificacionSeleccion('pc')
    }
    
}

function SeleccionAtaqueJugador(){
    let BotonFuego = document.getElementById('Boton-Fuego')
    let BotonAgua = document.getElementById('Boton-Agua')
    let BotonPlanta = document.getElementById('Boton-Planta')

    NotificacionAtaques('Selecciona un ataque','jugador')
    console.log("Seleccion de ataque de Jugador")


    if(BotonFuego.style.display == 'block'){
        BotonFuego.disabled = false
        BotonFuego.addEventListener('click', manejarClicFuego)
        function manejarClicFuego() {
            console.log("Click en Boton Fuego")
            BotonFuego.disabled = true
            BotonFuego.removeEventListener('click', manejarClicFuego) // Limpiar event listeners anteriores antes de agregar nuevos
            Ataque('AtkFuego')
        }
    } else if(BotonAgua.style.display == 'block'){
        BotonAgua.disabled = false
        BotonAgua.addEventListener('click', manejarClicAgua)
        function manejarClicAgua() {
            console.log("Click en Boton Agua")
            BotonAgua.disabled = true
            BotonAgua.removeEventListener('click', manejarClicAgua) // Limpiar event listeners anteriores antes de agregar nuevos
            Ataque('AtkAgua')
        }
    } else if(BotonPlanta.style.display == 'block'){
        BotonPlanta.disabled = false
        BotonPlanta.addEventListener('click', manejarClicPlanta)
        function manejarClicPlanta() {
            console.log("Click en Boton Planta")
            BotonPlanta.disabled = true
            BotonPlanta.removeEventListener('click', manejarClicPlanta) // Limpiar event listeners anteriores antes de agregar nuevos
            Ataque('AtkPlanta')
        }
    }
}

async function SeleccionAtaquePC(){
    NotificacionAtaques('PC está seleccionando un ataque...','pc')
    await pausa(1000)

    if (TipoMokeponPC == 'FUEGO'){
        ataquePC = 'FUEGO'
        NotificacionAtaques('PC escogió ataque de ' + ataquePC,'pc')
        
        await pausa(1000)
        
        await CombateFUEGOPC()

        if(HPJugador > 0){ 
            cambiarTurno()
        } else if(HPJugador === 0){
            NotificacionVictoriaDerrota('pc')
        }
    } else if (TipoMokeponPC == 'AGUA'){
        ataquePC = 'AGUA'
        NotificacionAtaques('PC escogió ataque de ' + ataquePC,'pc')

        await pausa(1000)
        
        await CombateAGUAPC()

        if(HPJugador > 0){ 
            cambiarTurno()
        } else if(HPJugador === 0){
            NotificacionVictoriaDerrota('pc')
        }
    } else if (TipoMokeponPC == 'PLANTA'){
        ataquePC = 'PLANTA'
        NotificacionAtaques('PC escogió ataque de ' + ataquePC,'pc')
        await pausa(1000)

        await CombatePLANTAPC()

        if(HPJugador > 0){ 
            cambiarTurno()
        } else if(HPJugador === 0){
            NotificacionVictoriaDerrota('pc')
        }
    }   
}

async function Ataque(opcion){
    switch (opcion){
        case 'AtkFuego':
            ataqueJugador = 'FUEGO'
            NotificacionAtaques('Tu ' + MokeponJugador + ' atacará con ' + ataqueJugador,'jugador')
            
            await pausa(1000)
            
            await CombateFUEGOJugador()

            if(HPPC > 0){ 
                cambiarTurno()
            } else if(HPPC === 0){
                NotificacionVictoriaDerrota('jugador')
            }  
        break
        case 'AtkAgua':
            ataqueJugador = 'AGUA'
            NotificacionAtaques('Tu ' + MokeponJugador + ' atacará con ' + ataqueJugador,'jugador')
            await pausa(1000)

            await CombateAGUAJugador()

            if(HPPC > 0){ 
                cambiarTurno()
            } else if(HPPC === 0){
                NotificacionVictoriaDerrota('jugador')
            }  
        break
        case 'AtkPlanta':
            ataqueJugador = 'PLANTA'
            NotificacionAtaques('Tu ' + MokeponJugador + ' atacará con ' + ataqueJugador,'jugador')
            await pausa(1000)

            await CombatePLANTAJugador()

            
            if(HPPC > 0){ 
                cambiarTurno()
            } else if(HPPC === 0){
                NotificacionVictoriaDerrota('jugador')
            }  
        break
    }
}

//Si el ataque es EFECTIVO hará entre 20-25 HP. Si es SUPEREFECTIVO hará de 30-40 HP. Si es NO EFICAZ hará entre 10-15 HP. 
async function CombateFUEGOJugador(){

    let esquivado = false
    
    //Antes de ejecutar cualquier lógica relacionada con el ataque del jugador (CombateFUEGOJugador), se llama a Esquivar('ProbEsquivarJugador').La variable esquivado se establece con el valor que retorna la función Esquivar. Después de la llamada a Esquivar, se verifica si esquivado es false.
    esquivado = Esquivar('jugador')

    if (!esquivado){ //Representa "si esquivado es false", significa que el ataque no fue esquivado por el enemigo, por lo que procederá al cálculo de daño.

        if (ataqueJugador == 'FUEGO' && TipoMokeponPC == 'AGUA'){
            await FortDebJugador('AtkNoEficaz')
        } else if (ataqueJugador == 'FUEGO' && TipoMokeponPC == 'FUEGO'){
            await FortDebJugador('AtkEficaz')
        } else if (ataqueJugador == 'FUEGO' && TipoMokeponPC == 'PLANTA'){
            await FortDebJugador('AtkSupereficaz')
        }
    }       
} 

async function CombateAGUAJugador(){

    let esquivado = false
    
    esquivado = Esquivar('jugador')

    if (!esquivado){

        if (ataqueJugador == 'AGUA' && TipoMokeponPC == 'PLANTA'){
            await FortDebJugador('AtkNoEficaz')
        } else if (ataqueJugador == 'AGUA' && TipoMokeponPC == 'AGUA'){
            await FortDebJugador('AtkEficaz')
        } else if (ataqueJugador == 'AGUA' && TipoMokeponPC == 'FUEGO'){
            await FortDebJugador('AtkSupereficaz')
        }
    }   
} 

async function CombatePLANTAJugador(){

    let esquivado = false

    esquivado = Esquivar('jugador')

    if (!esquivado){

        if (ataqueJugador == 'PLANTA' && TipoMokeponPC == 'FUEGO'){
            await FortDebJugador('AtkNoEficaz')
        } else if (ataqueJugador == 'PLANTA' && TipoMokeponPC == 'PLANTA'){
            await FortDebJugador('AtkEficaz')
        } else if (ataqueJugador == 'PLANTA' && TipoMokeponPC == 'AGUA'){
            await FortDebJugador('AtkSupereficaz')
        }
    }   
} 

async function CombateFUEGOPC(){

    let esquivado = false
    
    esquivado = Esquivar('pc')

    if (!esquivado){

        if (ataquePC == 'FUEGO' && TipoMokeponJugador == 'AGUA'){
            await FortDebPC('AtkNoEficaz')
        } else if (ataquePC == 'FUEGO' && TipoMokeponJugador == 'FUEGO'){
            await FortDebPC('AtkEficaz')
        } else if (ataquePC == 'FUEGO' && TipoMokeponJugador == 'PLANTA'){
            await FortDebPC('AtkSupereficaz')
        }
    }
}
async function CombateAGUAPC(){

    let esquivado = false
    
    esquivado = Esquivar('pc')

    if (!esquivado){

        if (ataquePC == 'AGUA' && TipoMokeponJugador == 'PLANTA'){
            await FortDebPC('AtkNoEficaz')
        } else if (ataquePC == 'AGUA' && TipoMokeponJugador == 'AGUA'){
            await FortDebPC('AtkEficaz')
        } else if (ataquePC == 'AGUA' && TipoMokeponJugador == 'FUEGO'){
            await FortDebPC('AtkSupereficaz')
        }
    }
}

async function CombatePLANTAPC(){

    let esquivado = false
    
    esquivado = Esquivar('pc')

    if (!esquivado){

        if (ataquePC == 'PLANTA' && TipoMokeponJugador == 'FUEGO'){
            await FortDebPC('AtkNoEficaz')
        } else if (ataquePC == 'PLANTA' && TipoMokeponJugador == 'PLANTA'){
            await FortDebPC('AtkEficaz')
        } else if (ataquePC == 'PLANTA' && TipoMokeponJugador == 'AGUA'){
            await FortDebPC('AtkSupereficaz')
        }
    }
}

//Fortalezas y debilidades Jugador
async function FortDebJugador(Efectividad){
    let AtkNoEficaz = aleatorio(15,20)
    let AtkEficaz = aleatorio(15,25)
    let AtkSupereficaz = aleatorio(20,30)

    console.log("Daño base realizado Jugador", "AtkNoEficaz:", AtkNoEficaz, "AtkEficaz:", AtkEficaz, "AtkSupereficaz:", AtkSupereficaz)

    // Obtener valores actualizados por golpe crítico
    let valoresCriticos = Critico('jugador', AtkNoEficaz, AtkEficaz, AtkSupereficaz) //Devuelve las tres propiedades con los parametros actualizados del objeto valoresActualizados en la funcion Critico.
    AtkNoEficaz = valoresCriticos.AtkNoEficaz
    AtkEficaz = valoresCriticos.AtkEficaz
    AtkSupereficaz = valoresCriticos.AtkSupereficaz

    let dañoReal = 0

    switch (Efectividad){
        case 'AtkNoEficaz':
            if(HPPC > 0){
                dañoReal = Math.min(AtkNoEficaz, HPPC) // Calcula el daño real sin exceder la vida actual
                HPPC = HPPC - dañoReal //Tambien puede ser expresado como HPPC -= dañoReal
                BarraSalud()
                if (HPPC === 0) {
                    NotificacionAtaques('El ataque de ' + MokeponJugador + ' fue fulminante!!','jugador')
                    if(MusicaOrden !== 4){
                        MusicaOrden = 4
                        ReproduccionMusica('lowhp', false)
                        ReproduccionMusica('batalla', false)
                        ReproduccionMusica('victory', true)
                    }
                } else {
                    NotificacionAtaques('El ataque de ' + MokeponJugador + ' ha dado en el blanco!','jugador')
                }
            }
            DañoRealizado = dañoReal
            await pausa(1000)
            NotificacionDaño('jugador')
            await pausa(1000)
        break
        case 'AtkEficaz':
            if(HPPC > 0){
                dañoReal = Math.min(AtkEficaz, HPPC) // Calcula el daño real sin exceder la vida actual
                HPPC = HPPC - dañoReal //Tambien puede ser expresado como HPPC -= dañoReal
                BarraSalud()
                if (HPPC === 0) {
                    NotificacionAtaques('El ataque de ' + MokeponJugador + ' fue fulminante!!','jugador')
                    if(MusicaOrden !== 4){
                        MusicaOrden = 4
                        ReproduccionMusica('lowhp', false)
                        ReproduccionMusica('batalla', false)
                        ReproduccionMusica('victory', true)
                    }
                } else {
                    NotificacionAtaques('El ataque de ' + MokeponJugador + ' ha dado en el blanco!','jugador')
                }
            }
            DañoRealizado = dañoReal
            await pausa(1000)
            NotificacionDaño('jugador')
            await pausa(1000)
        break
        case 'AtkSupereficaz':
            if(HPPC > 0){
                dañoReal = Math.min(AtkSupereficaz, HPPC) // Calcula el daño real sin exceder la vida actual
                HPPC = HPPC - dañoReal //Tambien puede ser expresado como HPPC -= dañoReal
                BarraSalud()
                if (HPPC === 0) {
                    NotificacionAtaques('El ataque de ' + MokeponJugador + ' fue fulminante!!','jugador')
                    if(MusicaOrden !== 4){
                        MusicaOrden = 4
                        ReproduccionMusica('lowhp', false)
                        ReproduccionMusica('batalla', false)
                        ReproduccionMusica('victory', true)
                    }
                } else {
                    NotificacionAtaques('El ataque de ' + MokeponJugador + ' ha dado en el blanco!','jugador')
                }
            }
            DañoRealizado = dañoReal
            await pausa(1000)
            NotificacionDaño('jugador')
            await pausa(1000)
        break
    }
}
//Fortalezas y debilidades PC
async function FortDebPC(Efectividad){
    let AtkNoEficaz = aleatorio(15,20)
    let AtkEficaz = aleatorio(15,25)
    let AtkSupereficaz = aleatorio(20,30)

    console.log("Daño base realizado PC", "AtkNoEficaz:", AtkNoEficaz, "AtkEficaz:", AtkEficaz, "AtkSupereficaz:", AtkSupereficaz)

    let valoresCriticos = Critico('pc', AtkNoEficaz, AtkEficaz, AtkSupereficaz)
    AtkNoEficaz = valoresCriticos.AtkNoEficaz
    AtkEficaz = valoresCriticos.AtkEficaz
    AtkSupereficaz = valoresCriticos.AtkSupereficaz
    let dañoReal = 0

    switch (Efectividad){
        case 'AtkNoEficaz':
            if(HPJugador > 0){
                dañoReal = Math.min(AtkNoEficaz, HPJugador) // Calcula el daño real sin exceder la vida actual
                HPJugador = HPJugador - dañoReal //Tambien puede ser expresado como HPPC -= dañoReal
                BarraSalud()

                if (HPJugador === 0) {
                    NotificacionAtaques('El ataque de ' + MokeponPC + ' fue fulminante!!','pc')
                    if(MusicaOrden !== 5){
                        MusicaOrden = 5
                        ReproduccionMusica('lowhp', false)
                        ReproduccionMusica('batalla', false)
                        ReproduccionMusica('defeat', true)
                    }
                } else {
                    NotificacionAtaques('El ataque de ' + MokeponPC + ' enemigo ha dado en el blanco!','pc')
                }
    
                if (HPJugador < 30 && HPJugador > 0){
                    if(MusicaOrden !== 3){
                        MusicaOrden = 3
                        ReproduccionMusica('batalla', false)
                        ReproduccionMusica('lowhp', true)
                    }
                }
            }
            DañoRealizado = dañoReal
            await pausa(1000)
            NotificacionDaño('pc')
            await pausa(1000)
        break
        case 'AtkEficaz':
            if(HPJugador > 0){
                dañoReal = Math.min(AtkEficaz, HPJugador) // Calcula el daño real sin exceder la vida actual
                HPJugador = HPJugador - dañoReal //Tambien puede ser expresado como HPPC -= dañoReal
                BarraSalud()

                if (HPJugador === 0) {
                    NotificacionAtaques('El ataque de ' + MokeponPC + ' fue fulminante!!','pc')
                    if(MusicaOrden !== 5){
                        MusicaOrden = 5
                        ReproduccionMusica('lowhp', false)
                        ReproduccionMusica('batalla', false)
                        ReproduccionMusica('defeat', true)
                    }
                } else {
                    NotificacionAtaques('El ataque de ' + MokeponPC + ' enemigo ha dado en el blanco!','pc')
                }

                if (HPJugador < 30 && HPJugador > 0){
                    if(MusicaOrden !== 3){
                        MusicaOrden = 3
                        ReproduccionMusica('batalla', false)
                        ReproduccionMusica('lowhp', true)
                    }
                }
            }
            DañoRealizado = dañoReal
            await pausa(1000)
            NotificacionDaño('pc')
            await pausa(1000)
        break
        case 'AtkSupereficaz':
            if(HPJugador > 0){
                dañoReal = Math.min(AtkSupereficaz, HPJugador) // Calcula el daño real sin exceder la vida actual
                HPJugador = HPJugador - dañoReal //Tambien puede ser expresado como HPPC -= dañoReal
                BarraSalud()

                if (HPJugador === 0) {
                    NotificacionAtaques('El ataque de ' + MokeponPC + ' fue fulminante!!','pc')
                    if(MusicaOrden !== 5){
                        MusicaOrden = 5
                        ReproduccionMusica('lowhp', false)
                        ReproduccionMusica('batalla', false)
                        ReproduccionMusica('defeat', true)
                    }
                } else {
                    NotificacionAtaques('El ataque de ' + MokeponPC + ' enemigo ha dado en el blanco!','pc')
                }
                
                if (HPJugador < 30 && HPJugador > 0){
                    if(MusicaOrden !== 3){
                        MusicaOrden = 3
                        ReproduccionMusica('batalla', false)
                        ReproduccionMusica('lowhp', true)
                    }
                }
            }
            DañoRealizado = dañoReal
            await pausa(1000)
            NotificacionDaño('pc')
            await pausa(1000)
        break
        
    }
}

function BarraSalud(){
    let SpanHPJugador = document.getElementById('HP-Jugador')
    let SpanHPPC = document.getElementById('HP-Enemigo')
    
    SpanHPJugador.innerHTML = HPJugador
    SpanHPPC.innerHTML = HPPC
}


function Critico(bando, AtkNoEficaz, AtkEficaz, AtkSupereficaz){
    let ProbCrit = aleatorio(1,10)

    console.log("ProbCrit",ProbCrit)
    //Se crea un objeto 'valoresActualizados' con tres propiedades que tendrán el valor del parametro traido de la otra funcion.
    let valoresActualizados = {
        AtkNoEficaz: AtkNoEficaz,
        AtkEficaz: AtkEficaz,
        AtkSupereficaz: AtkSupereficaz
    }

    if (bando == 'jugador' && ProbCrit >9){
        valoresActualizados.AtkNoEficaz *= 2;
        valoresActualizados.AtkEficaz *= 1.75;
        valoresActualizados.AtkSupereficaz *= 1.5;
        
        NotificacionCritico('jugador')

        console.log("Daño con multiplicador Critico Jugador","AtkNoEficaz:", valoresActualizados.AtkNoEficaz, "AtkEficaz:", valoresActualizados.AtkEficaz, "AtkSupereficaz:", valoresActualizados.AtkSupereficaz)

    } else if(bando == 'pc' && ProbCrit >9){
        valoresActualizados.AtkNoEficaz *= 2;
        valoresActualizados.AtkEficaz *= 1.75;
        valoresActualizados.AtkSupereficaz *= 1.5;
        
        NotificacionCritico('pc')

        console.log("Daño con multiplicador Critico PC", "AtkNoEficaz:", valoresActualizados
        .AtkNoEficaz, "AtkEficaz:", valoresActualizados.AtkEficaz, "AtkSupereficaz:", valoresActualizados.AtkSupereficaz)
    }
    return valoresActualizados //Devuelve el objeto valoresActualizados con los nuevos daños actualizados en caso de haber Critico, sino devuelve el mismo valor
}

function Esquivar(bando){
    let ProbEsquivar = aleatorio(1,10)
    let esquivado = false
    console.log("ProbEsquivar",ProbEsquivar)

    if (bando == 'jugador' && ProbEsquivar >8){ //Turno del jugador, cuando el enemigo esquiva el ataque
        NotificacionAtaques('El ataque de ' + MokeponJugador + ' ha fallado','jugador')
        NotificacionEsquivar('jugador')
        esquivado = true
    
    } else if (bando == 'pc' && ProbEsquivar >8){ //Turno del PC, cuando tu mokepon esquiva el ataque
        NotificacionAtaques('El ataque de ' + MokeponPC + ' enemigo ha fallado','pc')
        NotificacionEsquivar('pc')
        esquivado = true
    }
    return esquivado
}
// se crea un parrafo (p) al cual se le introducira el texto de NotiDaño. Mediante SectionMensajes se esta colocando ese parrafo dentro de la seccion de MensajesContainer en el HTML.
function NotificacionDaño(bando){
    let NotiDaño = document.createElement('p')

    if(bando == 'jugador'){
        NotiDaño.textContent = 'Tu ' + MokeponJugador + ' realizó ' + DañoRealizado + ' de daño a ' + MokeponPC + ' enemigo.'
    } else if(bando == 'pc'){
        NotiDaño.textContent = 'El ' + MokeponPC + ' enemigo realizó ' + DañoRealizado + ' de daño a tu ' + MokeponJugador + '.'
    }
    AgregarParrafo(NotiDaño)
} 

function NotificacionCritico(bando){
    let NotiCrit = document.createElement('p')

    if(bando == 'jugador'){
        NotiCrit.textContent = 'Tu ' + MokeponJugador + ' realizó un GOLPE CRITICO!!!'
    } else if(bando == 'pc'){
        NotiCrit.textContent = 'El ' + MokeponPC + ' enemigo realizó un GOLPE CRITICO!!!'
    }
    AgregarParrafo(NotiCrit)
} 

function NotificacionEsquivar(bando){
    let NotiEsquivar = document.createElement('p')

    if(bando == 'jugador'){ //Turno jugador
        NotiEsquivar.textContent = 'El ' + MokeponPC + ' enemigo esquivó el ataque!'
    } else if(bando == 'pc'){ //Turno pc
        NotiEsquivar.textContent = 'Tu ' + MokeponJugador + ' esquivó el ataque!'
    }
    AgregarParrafo(NotiEsquivar)
}

function NotificacionTurno(bando){
    let NotiTurno = document.createElement('p')

    if(bando == 'jugador'){ //Turno jugador
        NotiTurno.textContent = 'TU TURNO'
        NotiTurno.classList.add('turnoJG');
    } else if(bando == 'pc'){ //Turno pc
        NotiTurno.textContent = 'TURNO DEL ENEMIGO'
        NotiTurno.classList.add('turnoPC');
    }
    AgregarParrafo(NotiTurno)
} 

async function NotificacionVictoriaDerrota(ganador){
    let NotiVictoria = document.createElement('p')
    let NotiDerrota = document.createElement('p')

    if(ganador == 'jugador'){ //Turno jugador
        NotiVictoria.textContent = 'HAS GANADO EL COMBATE!!! 🥳'
        NotiVictoria.style.color = 'orange' // Cambia el color
        NotiVictoria.style.fontWeight = 'bold' // Pone el texto en negrita

        NotiDerrota.textContent = 'PC ENEMIGO HA PERDIDO EL COMBATE 🤔'
        NotiDerrota.style.color = 'black'; // Cambia el color
        NotiDerrota.style.fontWeight = 'bold'; // Pone el texto en negrita
    } else if(ganador == 'pc'){ //Turno pc
        NotiVictoria.textContent = 'PC ENEMIGO HA GANADO EL COMBATE 😮'
        NotiVictoria.style.color = 'orange' // Cambia el color
        NotiVictoria.style.fontWeight = 'bold' // Pone el texto en negrita

        NotiDerrota.textContent = 'HAS PERDIDO EL COMBATE 😢'
        NotiDerrota.style.color = 'black'; // Cambia el color
        NotiDerrota.style.fontWeight = 'bold'; // Pone el texto en negrita
    }
    AgregarParrafo(NotiVictoria)
    await pausa(1000)
    AgregarParrafo(NotiDerrota)
} 
function NotificacionSeleccion(bando){
    let NotiSeleccion = document.createElement('p')
    let MokeponSelecc = document.createElement('span')
    
    if(bando == 'jugador'){
        NotiSeleccion.textContent = 'Escogiste a '
        MokeponSelecc.textContent = MokeponJugador
        NotiSeleccion.style.display = 'inline'
        MokeponSelecc.style.display = 'inline'
    }else if(bando == 'pc'){
        NotiSeleccion.textContent = 'PC escogió a '
        MokeponSelecc.textContent = MokeponPC
        NotiSeleccion.style.display = 'inline'
        MokeponSelecc.style.display = 'inline'
    }else{
        NotiSeleccion.textContent = 'La batalla está por comenzar...'
    }
    AgregarParrafoSelecc(NotiSeleccion, MokeponSelecc, bando)
}
function NotificacionAtaques(mensaje, bando){
    let NotiSeleccion = document.createElement('p')
    if(bando == 'jugador'){
        NotiSeleccion.textContent = mensaje
        NotiSeleccion.classList.add("jugador")
    } else if(bando == 'pc'){
        NotiSeleccion.textContent = mensaje
        NotiSeleccion.classList.add("pc")
    }
    AgregarParrafoAtaques(NotiSeleccion)
}
function AgregarParrafo(TipoNoti){
    let SectionMensajes = document.getElementById('MensajesContainer')

    SectionMensajes.appendChild(TipoNoti)
    
    /*while (SectionMensajes.children.length > 5) {
        SectionMensajes.removeChild(SectionMensajes.firstChild)
    }*/

    SectionMensajes.scrollTop = SectionMensajes.scrollHeight
}

function AgregarParrafoSelecc(TipoNoti, span, bando){
    if(bando == 'jugador'){
        let SectionMensajes = document.getElementById('SeleccJG')
        SectionMensajes.appendChild(TipoNoti)
        SectionMensajes.appendChild(span)
        SectionMensajes.scrollTop = SectionMensajes.scrollHeight
    }else if(bando == 'pc'){
        let SectionMensajes  = document.getElementById('SeleccPC')
        SectionMensajes.appendChild(TipoNoti)
        SectionMensajes.appendChild(span)
        SectionMensajes.scrollTop = SectionMensajes.scrollHeight  
    }else{
        let SectionMensajes = document.getElementById('MsjSistema_Cont1')
        SectionMensajes.appendChild(TipoNoti)
        SectionMensajes.scrollTop = SectionMensajes.scrollHeight  
    }
}
function AgregarParrafoAtaques(TipoNoti){
    let SectionMensajes = document.getElementById('MsjSistema_Cont2')

    SectionMensajes.appendChild(TipoNoti)
    
    while (SectionMensajes.children.length > 6) {
        SectionMensajes.removeChild(SectionMensajes.firstChild)
    }

    SectionMensajes.scrollTop = SectionMensajes.scrollHeight
}
function reiniciarJuego(){
    location.reload()
}

document.addEventListener('click', function MusicaClicInicio(){
    let muteCheckbox = document.getElementById('muteCheckbox')
    ReproduccionMusica('inicio', true)
    document.removeEventListener('click', MusicaClicInicio)

    let SectionSilenciarMusica = document.getElementById('SilenciarMusica')
    SectionSilenciarMusica.style.display = 'flex'

    muteCheckbox.disabled = false
})

function ReproduccionMusica(Seccion, PlayPause){ //PlayPause en true es Play en False es Pause
    const MusicaInicio = document.getElementById('MusicaInicio')
    const MusicaBatalla = document.getElementById('MusicaBatalla')
    const MusicaLowHP = document.getElementById('MusicaLowHP')
    const MusicaDefeat = document.getElementById('MusicaDefeat')
    const MusicaVictory = document.getElementById('MusicaVictory')

    if(Seccion == 'inicio'){
        if(PlayPause == true){
            MusicaInicio.play()
            console.log("Musica Inicio Play")
        } else {
            MusicaInicio.pause()
            console.log("Musica Inicio Pause")
        }
    } else if(Seccion == 'batalla'){
        if(PlayPause == true){
            MusicaBatalla.play()
            console.log("Musica Batalla Play")
        } else {
            MusicaBatalla.pause()
            console.log("Musica Batalla Pause")
        }
    } else if(Seccion == 'lowhp'){
        if(PlayPause == true){
            MusicaLowHP.play()
            console.log("Musica LowHP Play")
        } else {
            MusicaLowHP.pause()
            console.log("Musica LowHP Pause")
        }
    } else if(Seccion == 'victory'){
        if(PlayPause == true){
            MusicaVictory.play()
            console.log("Musica Victory Play")
        } else {
            MusicaVictory.pause()
            console.log("Musica Victory Pause")
        }
    } else if(Seccion == 'defeat'){
        if(PlayPause == true){
            MusicaDefeat.play()
            console.log("Musica Defeat Play")
        } else {
            MusicaDefeat.pause()
            console.log("Musica Defeat Pause")
        }
    } 
}

function CheckboxReproduccion(MusicaOrden){
    let muteCheckbox = document.getElementById('muteCheckbox')

    // Si el checkbox está marcado, pausa la música. Si no está marcado, reanuda la reproducción
    if(MusicaOrden == 1){
        if (muteCheckbox.checked){
            ReproduccionMusica('inicio', false)
            console.log("Musica Inicio checkbox mark")
        } else {
            ReproduccionMusica('inicio', true)
            console.log("Musica Inicio checkbox unmark")
        }
    } else if(MusicaOrden == 2){ 
        if (muteCheckbox.checked){
            ReproduccionMusica('batalla', false)
             console.log("Musica Batalla checkbox mark")
        } else {
            ReproduccionMusica('batalla', true)
            console.log("Musica Batalla checkbox unmark")
        }
    } else if(MusicaOrden == 3){ 
        if (muteCheckbox.checked){
            ReproduccionMusica('lowhp', false)
             console.log("Musica LowHP checkbox mark")
        } else {
            ReproduccionMusica('lowhp', true)
            console.log("Musica LowHP checkbox unmark")
        }
    } else if(MusicaOrden == 4){ 
        if (muteCheckbox.checked){
            ReproduccionMusica('victory', false)
             console.log("Musica Victory checkbox mark")
        } else {
            ReproduccionMusica('victory', true)
            console.log("Musica Victory checkbox unmark")
        }
    } else if(MusicaOrden == 5){ 
        if (muteCheckbox.checked){
            ReproduccionMusica('defeat', false)
             console.log("Musica Defeat checkbox mark")
        } else {
            ReproduccionMusica('defeat', true)
            console.log("Musica Defeat checkbox unmark")
        }
    }
}
async function mostrarAlerta(mensaje, tipo) {
    let miAlerta = document.getElementById('miAlerta');
    miAlerta.textContent = mensaje
    miAlerta.className = tipo
    miAlerta.style.display = 'block'

    await pausa(2500)
    miAlerta.style.display = 'none'
    
}
function FgetElementById(id, accion) { // 1. block  2. none
    let Variable = document.getElementById(id)

    if(accion == 1){
        Variable.style.display = 'block'
    } else if(accion == 2){
        Variable.style.display = 'none'
    } else if(accion == 3){
        Variable.style.display = 'flex'
    } else if(accion == 4){
        Variable.style.display = 'grid'
    }

}
  window.addEventListener('load', iniciarJuego)